package com.ilmizo.tarbiyah;

import android.app.Activity;
import androidx.annotation.NonNull;
import com.android.billingclient.api.AcknowledgePurchaseParams;
import com.android.billingclient.api.BillingClient;
import com.android.billingclient.api.BillingClientStateListener;
import com.android.billingclient.api.BillingFlowParams;
import com.android.billingclient.api.BillingResult;
import com.android.billingclient.api.PendingPurchasesParams;
import com.android.billingclient.api.ProductDetails;
import com.android.billingclient.api.Purchase;
import com.android.billingclient.api.PurchasesUpdatedListener;
import com.android.billingclient.api.QueryProductDetailsParams;
import com.android.billingclient.api.QueryPurchasesParams;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@CapacitorPlugin(name = "IlmizoBilling")
public class IlmizoBillingPlugin extends Plugin implements PurchasesUpdatedListener {

    private static final String SKU_INDIVIDUAL_99 = "ilmizo_individual_99";
    private static final String SKU_FAMILY_199 = "ilmizo_family_199";
    private static final String SKU_LIFETIME_499 = "ilmizo_lifetime_499";

    private BillingClient billingClient;
    private PluginCall pendingPurchaseCall;
    private String pendingPurchaseSku;

    private synchronized void ensureBillingClient() {
        if (billingClient != null) {
            return;
        }
        PendingPurchasesParams pendingParams = PendingPurchasesParams.newBuilder()
            .enableOneTimeProducts()
            .build();
        billingClient = BillingClient.newBuilder(getContext())
            .setListener(this)
            .enablePendingPurchases(pendingParams)
            .build();
    }

    private void connectBillingClient(final Runnable onConnected, final Runnable onDisconnected) {
        ensureBillingClient();
        if (billingClient.isReady()) {
            onConnected.run();
            return;
        }
        billingClient.startConnection(new BillingClientStateListener() {
            @Override
            public void onBillingSetupFinished(@NonNull BillingResult billingResult) {
                if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                    onConnected.run();
                } else {
                    onDisconnected.run();
                }
            }

            @Override
            public void onBillingServiceDisconnected() {
                // Reconnect automatically on next call
            }
        });
    }

    private String resolveProductType(String sku) {
        if (SKU_LIFETIME_499.equals(sku)) {
            return BillingClient.ProductType.INAPP;
        }
        return BillingClient.ProductType.SUBS;
    }

    private boolean isKnownSku(String sku) {
        return SKU_INDIVIDUAL_99.equals(sku)
            || SKU_FAMILY_199.equals(sku)
            || SKU_LIFETIME_499.equals(sku);
    }

    @PluginMethod
    public void isBillingAvailable(PluginCall call) {
        ensureBillingClient();
        if (billingClient.isReady()) {
            JSObject out = new JSObject();
            out.put("available", true);
            call.resolve(out);
            return;
        }
        billingClient.startConnection(new BillingClientStateListener() {
            @Override
            public void onBillingSetupFinished(@NonNull BillingResult billingResult) {
                JSObject out = new JSObject();
                boolean ok = billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK;
                out.put("available", ok);
                if (!ok) {
                    out.put("reason", billingResult.getDebugMessage());
                }
                call.resolve(out);
            }

            @Override
            public void onBillingServiceDisconnected() {
                // Next query will re-establish connection
            }
        });
    }

    @PluginMethod
    public void purchaseProduct(PluginCall call) {
        final String sku = call.getString("sku");
        if (sku == null || !isKnownSku(sku)) {
            JSObject out = new JSObject();
            out.put("purchased", false);
            out.put("error", "Unsupported Ilmizo SKU requested.");
            call.resolve(out);
            return;
        }

        if (pendingPurchaseCall != null) {
            JSObject busy = new JSObject();
            busy.put("purchased", false);
            busy.put("error", "Another Google Play purchase is already in progress.");
            call.resolve(busy);
            return;
        }

        pendingPurchaseCall = call;
        pendingPurchaseSku = sku;

        connectBillingClient(
            () -> launchProductFlow(sku),
            () -> {
                PluginCall activeCall = pendingPurchaseCall;
                pendingPurchaseCall = null;
                pendingPurchaseSku = null;
                if (activeCall != null) {
                    JSObject out = new JSObject();
                    out.put("purchased", false);
                    out.put("error", "Google Play Billing service unavailable on this device.");
                    activeCall.resolve(out);
                }
            }
        );
    }

    private void launchProductFlow(final String sku) {
        final String productType = resolveProductType(sku);
        QueryProductDetailsParams.Product product = QueryProductDetailsParams.Product.newBuilder()
            .setProductId(sku)
            .setProductType(productType)
            .build();

        QueryProductDetailsParams params = QueryProductDetailsParams.newBuilder()
            .setProductList(Collections.singletonList(product))
            .build();

        billingClient.queryProductDetailsAsync(params, (billingResult, productDetailsList) -> {
            if (billingResult.getResponseCode() != BillingClient.BillingResponseCode.OK
                || productDetailsList == null
                || productDetailsList.isEmpty()) {
                resolvePendingPurchaseFailure(
                    "Product SKU '" + sku + "' not found in Google Play Console yet."
                );
                return;
            }

            ProductDetails details = productDetailsList.get(0);
            BillingFlowParams.ProductDetailsParams.Builder detailParamsBuilder =
                BillingFlowParams.ProductDetailsParams.newBuilder()
                    .setProductDetails(details);

            if (BillingClient.ProductType.SUBS.equals(productType)) {
                List<ProductDetails.SubscriptionOfferDetails> offers =
                    details.getSubscriptionOfferDetails();
                if (offers == null || offers.isEmpty()) {
                    resolvePendingPurchaseFailure(
                        "No active subscription offer found for SKU '" + sku + "'."
                    );
                    return;
                }
                detailParamsBuilder.setOfferToken(offers.get(0).getOfferToken());
            }

            final BillingFlowParams flowParams = BillingFlowParams.newBuilder()
                .setProductDetailsParamsList(
                    Collections.singletonList(detailParamsBuilder.build())
                )
                .build();

            Activity activity = getActivity();
            if (activity == null) {
                resolvePendingPurchaseFailure("Android activity unavailable for Play checkout.");
                return;
            }

            activity.runOnUiThread(() -> {
                BillingResult launchResult = billingClient.launchBillingFlow(activity, flowParams);
                if (launchResult.getResponseCode() != BillingClient.BillingResponseCode.OK) {
                    resolvePendingPurchaseFailure(launchResult.getDebugMessage());
                }
            });
        });
    }

    @Override
    public void onPurchasesUpdated(
        @NonNull BillingResult billingResult,
        List<Purchase> purchases
    ) {
        int code = billingResult.getResponseCode();
        if (code == BillingClient.BillingResponseCode.OK && purchases != null && !purchases.isEmpty()) {
            Purchase matched = purchases.get(0);
            for (Purchase p : purchases) {
                if (pendingPurchaseSku != null && p.getProducts().contains(pendingPurchaseSku)) {
                    matched = p;
                    break;
                }
            }
            if (matched.getPurchaseState() == Purchase.PurchaseState.PURCHASED) {
                acknowledgeIfNeeded(matched);
                String skuOut = matched.getProducts().isEmpty()
                    ? pendingPurchaseSku
                    : matched.getProducts().get(0);
                JSObject out = new JSObject();
                out.put("purchased", true);
                out.put("pending", false);
                out.put("sku", skuOut);
                out.put("orderId", matched.getOrderId());
                out.put("purchaseToken", matched.getPurchaseToken());
                out.put("isAutoRenewing", matched.isAutoRenewing());
                resolvePendingPurchaseSuccess(out);
            } else if (matched.getPurchaseState() == Purchase.PurchaseState.PENDING) {
                PluginCall activeCall = pendingPurchaseCall;
                pendingPurchaseCall = null;
                pendingPurchaseSku = null;
                if (activeCall != null) {
                    JSObject out = new JSObject();
                    out.put("purchased", false);
                    out.put("pending", true);
                    out.put(
                        "error",
                        "Purchase is pending confirmation in Google Play. Use Restore Purchases once payment clears."
                    );
                    activeCall.resolve(out);
                }
            } else {
                resolvePendingPurchaseFailure(
                    "Purchase was not completed in Google Play. Use Restore Purchases if you were charged."
                );
            }
            return;
        }

        if (code == BillingClient.BillingResponseCode.USER_CANCELED) {
            resolvePendingPurchaseFailure("Purchase cancelled in Google Play.");
        } else if (code == BillingClient.BillingResponseCode.ITEM_ALREADY_OWNED) {
            resolvePendingPurchaseFailure(
                "You already own this plan on Google Play. Tap 'Restore Purchases' to activate."
            );
        } else {
            resolvePendingPurchaseFailure(
                billingResult.getDebugMessage().isEmpty()
                    ? "Google Play checkout failed (code " + code + ")."
                    : billingResult.getDebugMessage()
            );
        }
    }

    private void acknowledgeIfNeeded(Purchase purchase) {
        if (purchase.getPurchaseState() == Purchase.PurchaseState.PURCHASED
            && !purchase.isAcknowledged()
            && billingClient != null) {
            AcknowledgePurchaseParams ackParams = AcknowledgePurchaseParams.newBuilder()
                .setPurchaseToken(purchase.getPurchaseToken())
                .build();
            billingClient.acknowledgePurchase(ackParams, billingResult -> {
                // Google Play requires acknowledgement within 3 days to prevent auto-refund
            });
        }
    }

    private synchronized void resolvePendingPurchaseSuccess(JSObject payload) {
        PluginCall activeCall = pendingPurchaseCall;
        pendingPurchaseCall = null;
        pendingPurchaseSku = null;
        if (activeCall != null) {
            activeCall.resolve(payload);
        }
    }

    private synchronized void resolvePendingPurchaseFailure(String errorMessage) {
        PluginCall activeCall = pendingPurchaseCall;
        pendingPurchaseCall = null;
        pendingPurchaseSku = null;
        if (activeCall != null) {
            JSObject out = new JSObject();
            out.put("purchased", false);
            out.put("error", errorMessage);
            activeCall.resolve(out);
        }
    }

    @PluginMethod
    public void restorePurchases(final PluginCall call) {
        connectBillingClient(
            () -> queryAllOwnedPurchases(call),
            () -> {
                JSObject out = new JSObject();
                out.put("activeSkus", new JSArray());
                out.put("pendingSkus", new JSArray());
                out.put("queriedSuccessfully", false);
                out.put("error", "Google Play Billing unavailable.");
                call.resolve(out);
            }
        );
    }

    private void queryAllOwnedPurchases(final PluginCall call) {
        final List<String> activeSkus = new ArrayList<>();
        final List<String> pendingSkus = new ArrayList<>();
        final String[] latestOrderId = new String[]{null};
        final boolean[] latestAutoRenewing = new boolean[]{false};
        final long[] latestPurchaseTimeMs = new long[]{0L};

        QueryPurchasesParams subsParams = QueryPurchasesParams.newBuilder()
            .setProductType(BillingClient.ProductType.SUBS)
            .build();

        billingClient.queryPurchasesAsync(subsParams, (subsResult, subsPurchases) -> {
            boolean subsOk = subsResult.getResponseCode() == BillingClient.BillingResponseCode.OK;
            if (subsOk && subsPurchases != null) {
                for (Purchase p : subsPurchases) {
                    if (p.getPurchaseState() == Purchase.PurchaseState.PURCHASED) {
                        acknowledgeIfNeeded(p);
                        for (String sku : p.getProducts()) {
                            if (isKnownSku(sku) && !activeSkus.contains(sku)) {
                                activeSkus.add(sku);
                            }
                        }
                        if (latestOrderId[0] == null) {
                            latestOrderId[0] = p.getOrderId();
                            latestAutoRenewing[0] = p.isAutoRenewing();
                            latestPurchaseTimeMs[0] = p.getPurchaseTime();
                        }
                    } else if (p.getPurchaseState() == Purchase.PurchaseState.PENDING) {
                        for (String sku : p.getProducts()) {
                            if (isKnownSku(sku) && !pendingSkus.contains(sku)) {
                                pendingSkus.add(sku);
                            }
                        }
                    }
                }
            }

            QueryPurchasesParams inappParams = QueryPurchasesParams.newBuilder()
                .setProductType(BillingClient.ProductType.INAPP)
                .build();

            billingClient.queryPurchasesAsync(inappParams, (inappResult, inappPurchases) -> {
                boolean inappOk = inappResult.getResponseCode() == BillingClient.BillingResponseCode.OK;
                if (inappOk && inappPurchases != null) {
                    for (Purchase p : inappPurchases) {
                        if (p.getPurchaseState() == Purchase.PurchaseState.PURCHASED) {
                            acknowledgeIfNeeded(p);
                            for (String sku : p.getProducts()) {
                                if (isKnownSku(sku) && !activeSkus.contains(sku)) {
                                    activeSkus.add(sku);
                                }
                            }
                            if (latestOrderId[0] == null) {
                                latestOrderId[0] = p.getOrderId();
                                latestPurchaseTimeMs[0] = p.getPurchaseTime();
                            }
                        } else if (p.getPurchaseState() == Purchase.PurchaseState.PENDING) {
                            for (String sku : p.getProducts()) {
                                if (isKnownSku(sku) && !pendingSkus.contains(sku)) {
                                    pendingSkus.add(sku);
                                }
                            }
                        }
                    }
                }

                JSObject out = new JSObject();
                JSArray arr = new JSArray();
                for (String s : activeSkus) {
                    arr.put(s);
                }
                JSArray pendingArr = new JSArray();
                for (String s : pendingSkus) {
                    pendingArr.put(s);
                }
                out.put("activeSkus", arr);
                out.put("pendingSkus", pendingArr);
                out.put("queriedSuccessfully", subsOk && inappOk);
                out.put("isAutoRenewing", latestAutoRenewing[0]);
                if (latestPurchaseTimeMs[0] > 0) {
                    out.put("purchaseTimeMs", latestPurchaseTimeMs[0]);
                }
                if (latestOrderId[0] != null) {
                    out.put("orderId", latestOrderId[0]);
                }
                call.resolve(out);
            });
        });
    }

    @Override
    protected void handleOnDestroy() {
        if (billingClient != null) {
            billingClient.endConnection();
            billingClient = null;
        }
        super.handleOnDestroy();
    }
}
