import { AdultRoute, AppMode, KidsRoute } from '../types/ilmizo';

export interface NavigationHistoryState {
  mode: AppMode;
  previousNonParentMode: 'adult' | 'kids';
  adultRoute: AdultRoute;
  adultHistory: AdultRoute[];
  kidsRoute: KidsRoute;
  kidsHistory: KidsRoute[];
  parentHubUnlocked: boolean;
}

export const INITIAL_NAVIGATION_HISTORY_STATE: NavigationHistoryState = {
  mode: 'adult',
  previousNonParentMode: 'adult',
  adultRoute: 'home',
  adultHistory: [],
  kidsRoute: 'kids_home',
  kidsHistory: [],
  parentHubUnlocked: false,
};

const MAX_HISTORY_DEPTH = 32;

/**
 * Transitions between Adult Mode, Kids World, and Parent Hub.
 * - Switching to or from 'parent' mode always resets `parentHubUnlocked: false` so back/forward
 *   navigation cannot bypass the Parent Hub PIN security gate.
 * - Preserves separate `adultHistory` and `kidsHistory` stacks.
 */
export function transitionMode(
  state: NavigationHistoryState,
  nextMode: AppMode
): NavigationHistoryState {
  if (state.mode === nextMode) {
    return state;
  }

  const nextPreviousNonParent: 'adult' | 'kids' =
    state.mode === 'adult' || state.mode === 'kids'
      ? state.mode
      : state.previousNonParentMode;

  return {
    ...state,
    mode: nextMode,
    previousNonParentMode: nextPreviousNonParent,
    // Always lock Parent Hub when entering or leaving it
    parentHubUnlocked: false,
  };
}

/**
 * Pushes a new Adult Mode route onto the Adult history stack.
 * - Prevents duplicate consecutive entries.
 * - Switches `mode` to `'adult'` if not already in Adult Mode.
 */
export function pushAdultRoute(
  state: NavigationHistoryState,
  nextRoute: AdultRoute
): NavigationHistoryState {
  const baseState = state.mode !== 'adult' ? transitionMode(state, 'adult') : state;
  if (baseState.adultRoute === nextRoute) {
    return baseState;
  }

  const nextHistory = [...baseState.adultHistory];
  if (nextHistory[nextHistory.length - 1] !== baseState.adultRoute) {
    nextHistory.push(baseState.adultRoute);
  }

  return {
    ...baseState,
    adultRoute: nextRoute,
    adultHistory: nextHistory.slice(-MAX_HISTORY_DEPTH),
  };
}

/**
 * Pushes a new Kids World route onto the Kids history stack.
 * - Prevents duplicate consecutive entries.
 * - Switches `mode` to `'kids'` if not already in Kids Mode.
 */
export function pushKidsRoute(
  state: NavigationHistoryState,
  nextRoute: KidsRoute
): NavigationHistoryState {
  const baseState = state.mode !== 'kids' ? transitionMode(state, 'kids') : state;
  if (baseState.kidsRoute === nextRoute) {
    return baseState;
  }

  const nextHistory = [...baseState.kidsHistory];
  if (nextHistory[nextHistory.length - 1] !== baseState.kidsRoute) {
    nextHistory.push(baseState.kidsRoute);
  }

  return {
    ...baseState,
    kidsRoute: nextRoute,
    kidsHistory: nextHistory.slice(-MAX_HISTORY_DEPTH),
  };
}

/**
 * Computes whether a back action is available in the current mode.
 * Main Home screens ('home' in Adult Mode, 'kids_home' in Kids World) do not show a back button.
 */
export function canNavigateBack(
  state: NavigationHistoryState,
  hasSubScreenBackHandler = false
): boolean {
  if (hasSubScreenBackHandler) return true;
  if (state.mode === 'parent') return true;
  if (state.mode === 'adult') return state.adultRoute !== 'home';
  if (state.mode === 'kids') return state.kidsRoute !== 'kids_home';
  return false;
}

/**
 * Navigates back to the actual previous screen in the active mode's history stack.
 * - In 'parent' mode: always locks Parent Hub (`parentHubUnlocked: false`) and returns to `previousNonParentMode`.
 * - In 'adult' mode: pops `adultHistory`; if stack is empty and not on 'home', falls back safely to 'home'.
 * - In 'kids' mode: pops `kidsHistory`; if stack is empty and not on 'kids_home', falls back safely to 'kids_home'.
 */
export function popNavigationHistory(state: NavigationHistoryState): NavigationHistoryState {
  if (state.mode === 'parent') {
    return {
      ...state,
      mode: state.previousNonParentMode,
      parentHubUnlocked: false,
    };
  }

  if (state.mode === 'adult') {
    if (state.adultHistory.length > 0) {
      const nextHistory = [...state.adultHistory];
      let targetRoute = nextHistory.pop()!;
      while (targetRoute === state.adultRoute && nextHistory.length > 0) {
        targetRoute = nextHistory.pop()!;
      }
      if (targetRoute === state.adultRoute) {
        targetRoute = 'home';
      }
      return {
        ...state,
        adultRoute: targetRoute,
        adultHistory: nextHistory,
      };
    }
    if (state.adultRoute !== 'home') {
      return {
        ...state,
        adultRoute: 'home',
        adultHistory: [],
      };
    }
    return state;
  }

  if (state.mode === 'kids') {
    if (state.kidsHistory.length > 0) {
      const nextHistory = [...state.kidsHistory];
      let targetRoute = nextHistory.pop()!;
      while (targetRoute === state.kidsRoute && nextHistory.length > 0) {
        targetRoute = nextHistory.pop()!;
      }
      if (targetRoute === state.kidsRoute) {
        targetRoute = 'kids_home';
      }
      return {
        ...state,
        kidsRoute: targetRoute,
        kidsHistory: nextHistory,
      };
    }
    if (state.kidsRoute !== 'kids_home') {
      return {
        ...state,
        kidsRoute: 'kids_home',
        kidsHistory: [],
      };
    }
    return state;
  }

  return state;
}
