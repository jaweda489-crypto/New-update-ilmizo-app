import React, { useCallback, useRef, useState } from 'react';
import { AdultRoute, KidsRoute } from '../types/ilmizo';

export const ADULT_ROUTE_ORDER: AdultRoute[] = [
  'home',
  'quran_list',
  'quran_read',
  'hifz',
  'salah',
  'duas',
  'names99',
  'seerah',
  'lessons',
  'quizzes',
  'progress',
  'qibla',
  'tasbih',
  'calendar',
  'more',
  'profile',
  'tasks_expenses',
];

export const KIDS_ROUTE_ORDER: KidsRoute[] = [
  'kids_home',
  'todays_quest',
  'quran_learning',
  'recitation_practice',
  'duas_learning',
  'salah_learning',
  'stories',
  'adventure_map',
  'daily_quiz',
  'good_deed',
  'family_challenge',
  'mission_complete',
  'kids_progress',
  'needs_practice',
  'badges',
  'certificate',
];

interface SwipeNavigationOptions<T extends string> {
  routes: readonly T[];
  activeRoute: T;
  onSelectRoute: (route: T) => void;
  isRTL?: boolean;
  minSwipeDistance?: number;
  maxSwipeTimeMs?: number;
  enabled?: boolean;
}

export interface SwipeFeedbackState {
  direction: 'next' | 'prev' | null;
  offsetX: number;
  swiping: boolean;
}

function isInsideInteractiveOrScrollableElement(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const interactiveSelector =
    'input, textarea, select, [data-no-swipe="true"], .overflow-x-auto';
  return Boolean(target.closest(interactiveSelector));
}

export function useSwipeNavigation<T extends string>({
  routes,
  activeRoute,
  onSelectRoute,
  isRTL = false,
  minSwipeDistance = 52,
  maxSwipeTimeMs = 700,
  enabled = true,
}: SwipeNavigationOptions<T>) {
  const touchStartRef = useRef<{ x: number; y: number; time: number; ignore: boolean } | null>(
    null
  );
  const [feedback, setFeedback] = useState<SwipeFeedbackState>({
    direction: null,
    offsetX: 0,
    swiping: false,
  });

  const currentIndex = Math.max(0, routes.indexOf(activeRoute));

  const goToNext = useCallback(() => {
    if (!enabled || routes.length === 0) return;
    const nextIdx = (currentIndex + 1) % routes.length;
    setFeedback({ direction: 'next', offsetX: 0, swiping: false });
    onSelectRoute(routes[nextIdx]);
  }, [currentIndex, enabled, onSelectRoute, routes]);

  const goToPrev = useCallback(() => {
    if (!enabled || routes.length === 0) return;
    const prevIdx = (currentIndex - 1 + routes.length) % routes.length;
    setFeedback({ direction: 'prev', offsetX: 0, swiping: false });
    onSelectRoute(routes[prevIdx]);
  }, [currentIndex, enabled, onSelectRoute, routes]);

  const onTouchStart = useCallback(
    (e: React.TouchEvent<HTMLElement>) => {
      if (!enabled || e.touches.length !== 1) return;
      const touch = e.touches[0];
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now(),
        ignore: isInsideInteractiveOrScrollableElement(e.target),
      };
    },
    [enabled]
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent<HTMLElement>) => {
      const start = touchStartRef.current;
      if (!enabled || !start || start.ignore || e.touches.length !== 1) return;
      const touch = e.touches[0];
      const deltaX = touch.clientX - start.x;
      const deltaY = touch.clientY - start.y;

      // Only show horizontal drag feedback if horizontal movement dominates vertical movement
      if (Math.abs(deltaX) > 18 && Math.abs(deltaX) > Math.abs(deltaY) * 1.35) {
        const dampedOffset = Math.max(-48, Math.min(48, deltaX * 0.25));
        setFeedback((prev) => ({
          ...prev,
          offsetX: dampedOffset,
          swiping: true,
        }));
      }
    },
    [enabled]
  );

  const onTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLElement>) => {
      const start = touchStartRef.current;
      touchStartRef.current = null;

      if (!enabled || !start || start.ignore || e.changedTouches.length === 0) {
        setFeedback((prev) => (prev.swiping ? { ...prev, offsetX: 0, swiping: false } : prev));
        return;
      }

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - start.x;
      const deltaY = touch.clientY - start.y;
      const elapsed = Date.now() - start.time;

      const isHorizontalSwipe =
        elapsed <= maxSwipeTimeMs &&
        Math.abs(deltaX) >= minSwipeDistance &&
        Math.abs(deltaX) > Math.abs(deltaY) * 1.35;

      if (!isHorizontalSwipe) {
        setFeedback({ direction: null, offsetX: 0, swiping: false });
        return;
      }

      const swipedLeft = deltaX < 0;
      if (isRTL) {
        if (swipedLeft) goToPrev();
        else goToNext();
      } else {
        if (swipedLeft) goToNext();
        else goToPrev();
      }
    },
    [enabled, goToNext, goToPrev, isRTL, maxSwipeTimeMs, minSwipeDistance]
  );

  const onTouchCancel = useCallback(() => {
    touchStartRef.current = null;
    setFeedback({ direction: null, offsetX: 0, swiping: false });
  }, []);

  return {
    currentIndex,
    totalRoutes: routes.length,
    goToNext,
    goToPrev,
    feedback,
    swipeHandlers: {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onTouchCancel,
    },
  };
}
