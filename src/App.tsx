/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import {
  BookMarked,
  Globe,
  Lock,
  Sparkles,
  User,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { IlmizoProvider, useIlmizo, useTranslation } from './context/IlmizoContext';
import { OfflineIndicator, PWAInstallPromptBanner } from './components/pwa/PWAComponents';
import { AdultRoute, AppMode, KidsRoute } from './types/ilmizo';
import { FirstRunOnboardingModal } from './components/shared/FirstRunOnboardingModal';
import {
  loadLocalOnboardingProfile,
  LocalOnboardingProfile,
  saveLocalOnboardingProfile,
} from './services/onboardingPlanEngine';
import {
  ScreenSkeleton,
  ThemeModeSegmentedControl,
} from './components/design-system/IlmizoPrimitives';
import { SelectSheetField } from './components/sheets/SelectSheet';
import { FloatingAudioMiniPlayer } from './components/audio/FloatingAudioMiniPlayer';
import { KIDS_STORIES } from './data/islamicContent';

const AdultModeView = lazy(() =>
  import('./components/adult/AdultModeView').then((m) => ({ default: m.AdultModeView }))
);
const KidsWorldView = lazy(() =>
  import('./components/kids/KidsWorldView').then((m) => ({ default: m.KidsWorldView }))
);
const ParentHubView = lazy(() =>
  import('./components/parent/ParentHubView').then((m) => ({ default: m.ParentHubView }))
);

interface SidebarNavItem<T extends string> {
  route: T;
  label: string;
  group: string;
}

const ADULT_SIDEBAR_NAV: SidebarNavItem<AdultRoute>[] = [
  { route: 'home', label: 'Home', group: 'Core' },
  { route: 'quran_list', label: 'Quran & Mushaf', group: 'Core' },
  { route: 'quran_journal', label: 'My Quran Journal', group: 'Core' },
  { route: 'salah', label: 'Salah & Guides', group: 'Worship' },
  { route: 'hifz', label: 'Hifz Studio', group: 'Learn' },
  { route: 'lessons', label: 'Islamic Lessons', group: 'Learn' },
  { route: 'duas', label: 'Duas & Adhkar', group: 'Learn' },
  { route: 'names99', label: '99 Names of Allah', group: 'Learn' },
  { route: 'seerah', label: 'Seerah Library', group: 'Learn' },
  { route: 'quizzes', label: 'Quizzes & Vocabulary', group: 'Learn' },
  { route: 'progress', label: 'Progress & Streaks', group: 'Learn' },
  { route: 'qibla', label: 'Qibla Compass', group: 'Tools' },
  { route: 'tasbih', label: 'Tasbih Counter', group: 'Tools' },
  { route: 'calendar', label: 'Islamic Calendar', group: 'Tools' },
  { route: 'tasks_expenses', label: 'Tasks & Sadaqah', group: 'Tools' },
  { route: 'profile', label: 'Profile', group: 'Settings' },
  { route: 'more', label: 'More & Settings', group: 'Settings' },
];

const KIDS_SIDEBAR_NAV: SidebarNavItem<KidsRoute>[] = [
  { route: 'kids_home', label: 'Kids Home', group: 'Explore' },
  { route: 'todays_quest', label: 'Today’s Quest', group: 'Explore' },
  { route: 'quran_learning', label: 'Noorani Qaida & Quran', group: 'Learn' },
  { route: 'recitation_practice', label: 'Recitation Practice', group: 'Learn' },
  { route: 'duas_learning', label: 'Kids Duas', group: 'Learn' },
  { route: 'salah_learning', label: 'Salah Steps', group: 'Learn' },
  { route: 'stories', label: `Stories (${KIDS_STORIES.length})`, group: 'Stories & Play' },
  { route: 'adventure_map', label: 'Adventure Map', group: 'Stories & Play' },
  { route: 'daily_quiz', label: 'Daily Quiz', group: 'Stories & Play' },
  { route: 'good_deed', label: 'Good Deeds', group: 'Stories & Play' },
  { route: 'family_challenge', label: 'Family Challenge', group: 'Stories & Play' },
  { route: 'kids_progress', label: 'Stars & Progress', group: 'Rewards' },
  { route: 'needs_practice', label: 'Needs Practice', group: 'Rewards' },
  { route: 'badges', label: 'Badges & Certificates', group: 'Rewards' },
];

const ADULT_ROUTE_ORDER: AdultRoute[] = [
  'home',
  'quran_list',
  'quran_read',
  'quran_journal',
  'salah',
  'lessons',
  'hifz',
  'duas',
  'names99',
  'seerah',
  'quizzes',
  'progress',
  'qibla',
  'tasbih',
  'calendar',
  'tasks_expenses',
  'profile',
  'more',
];

const KIDS_ROUTE_ORDER: KidsRoute[] = [
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

function getScreenPosition(mode: AppMode, adultRoute: AdultRoute, kidsRoute: KidsRoute): number {
  if (mode === 'parent') return 100;
  if (mode === 'adult') {
    const idx = ADULT_ROUTE_ORDER.indexOf(adultRoute);
    return idx >= 0 ? idx : 0;
  }
  const idx = KIDS_ROUTE_ORDER.indexOf(kidsRoute);
  return idx >= 0 ? idx : 0;
}

const screenSlideVariants = {
  enter: (direction: number) => ({
    x: direction >= 0 ? 24 : -24,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction >= 0 ? -24 : 24,
    opacity: 0,
  }),
};

const IlmizoShell: React.FC = () => {
  const {
    mode,
    setMode,
    adultRoute,
    setAdultRoute,
    kidsRoute,
    setKidsRoute,
    themeMode,
    setThemeMode,
    isAudioMuted,
    toggleAudioMute,
    activeChild,
    addChildProfile,
    updateChildProfile,
  } = useIlmizo();

  const { language, setLanguage, supportedLanguages, languageMeta } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  const [onboardingProfile, setOnboardingProfile] = useState<LocalOnboardingProfile>(() =>
    loadLocalOnboardingProfile()
  );
  const [showOnboarding, setShowOnboarding] = useState<boolean>(
    () => loadLocalOnboardingProfile().status === 'pending'
  );

  useEffect(() => {
    const handleReplay = () => {
      setOnboardingProfile(loadLocalOnboardingProfile());
      setShowOnboarding(true);
    };
    window.addEventListener('ilmizo:open-onboarding', handleReplay);
    return () => window.removeEventListener('ilmizo:open-onboarding', handleReplay);
  }, []);

  const currentPos = getScreenPosition(mode, adultRoute, kidsRoute);
  const prevPosRef = useRef<number>(currentPos);
  const prevModeRef = useRef<AppMode>(mode);

  const rawDirection =
    prevModeRef.current !== mode
      ? mode === 'kids'
        ? 1
        : -1
      : currentPos >= prevPosRef.current
      ? 1
      : -1;

  const slideDirection = languageMeta.dir === 'rtl' ? -rawDirection : rawDirection;

  useEffect(() => {
    prevPosRef.current = currentPos;
    prevModeRef.current = mode;
  }, [currentPos, mode]);

  // Key outer transition on top-level mode only so Adult & Kids Bottom Navigation Bars
  // stay rock-solid pinned without unmounting/flickering when switching inner tabs.
  const activeScreenKey = mode;

  const sidebarItems = mode === 'kids' ? KIDS_SIDEBAR_NAV : ADULT_SIDEBAR_NAV;
  const sidebarGroups = Array.from(new Set(sidebarItems.map((item) => item.group)));

  return (
    <div
      dir={languageMeta.dir}
      className="min-h-dvh w-full flex flex-col lg:flex-row bg-[var(--bg-app)] text-[var(--text-primary)] transition-colors"
    >
      <OfflineIndicator />
      <PWAInstallPromptBanner />
      <FirstRunOnboardingModal
        open={showOnboarding}
        initialProfile={onboardingProfile}
        defaultChildName={activeChild?.name || ''}
        language={language}
        onSkip={() => {
          const skipped: LocalOnboardingProfile = {
            ...onboardingProfile,
            status: 'skipped',
          };
          saveLocalOnboardingProfile(skipped);
          setOnboardingProfile(skipped);
          setShowOnboarding(false);
        }}
        onComplete={({ profile, childSetup }) => {
          setOnboardingProfile(profile);
          setShowOnboarding(false);
          if (childSetup) {
            if (activeChild && activeChild.name === 'Ayaan' && childSetup.name !== 'Ayaan') {
              updateChildProfile(activeChild.id, {
                name: childSetup.name,
                age: childSetup.age,
                avatar: childSetup.avatar,
                dailyGoalMinutes: childSetup.dailyMinutes,
              });
            } else if (!activeChild || activeChild.name.toLowerCase() !== childSetup.name.toLowerCase()) {
              addChildProfile(
                childSetup.name,
                childSetup.age,
                childSetup.avatar,
                childSetup.dailyMinutes
              );
            }
          }
          if (profile.primaryMode === 'kids') {
            setMode('kids');
            setKidsRoute('kids_home');
          } else {
            setMode('adult');
            setAdultRoute('home');
          }
        }}
      />

      {/* Desktop Left Navigation Sidebar (visible on lg+ for full responsive layout) */}
      <aside
        aria-label="Primary Desktop Navigation"
        className="hidden lg:flex lg:w-72 xl:w-80 shrink-0 flex-col justify-between bg-[#082016] text-white border-r border-amber-400/15 p-5 select-none sticky top-0 h-dvh"
      >
        <div className="space-y-5 min-h-0 flex flex-col flex-1">
          {/* Brand Header */}
          <div className="flex items-center gap-3 border-b border-white/10 pb-4 shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-300 to-amber-500 text-emerald-950 font-black flex items-center justify-center text-lg shadow-sm">
              إ
            </div>
            <div>
              <h1 className="text-base font-extrabold tracking-tight text-amber-300 leading-tight">
                Ilmizo
              </h1>
              <p className="text-xs text-emerald-100/75">
                Family Islamic Learning
              </p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="grid grid-cols-3 gap-1.5 bg-black/30 p-1.5 rounded-2xl border border-white/10 shrink-0">
            <button
              type="button"
              onClick={() => setMode('adult')}
              className={`min-h-[40px] px-2 py-1.5 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-1.5 ${
                mode === 'adult'
                  ? 'bg-gradient-to-r from-[#FDE68A] via-[#F59E0B] to-[#D97706] text-emerald-950 shadow-xs'
                  : 'text-emerald-100/90 hover:bg-white/10'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Adult</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('kids')}
              className={`min-h-[40px] px-2 py-1.5 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-1.5 ${
                mode === 'kids'
                  ? 'bg-gradient-to-r from-[#4ADE80] to-[#22C55E] text-emerald-950 shadow-xs'
                  : 'text-emerald-100/90 hover:bg-white/10'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Kids</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('parent')}
              className={`min-h-[40px] px-2 py-1.5 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-1.5 ${
                mode === 'parent'
                  ? 'bg-amber-400 text-emerald-950 shadow-xs'
                  : 'text-emerald-100/90 hover:bg-white/10'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Parent</span>
            </button>
          </div>

          {/* Grouped Clean Consumer Navigation Links */}
          <nav
            aria-label="Destination Navigation"
            className="space-y-4 overflow-y-auto pr-1 flex-1 min-h-0"
          >
            {sidebarGroups.map((group) => (
              <div key={group} className="space-y-1">
                <p className="text-[11px] font-bold text-emerald-200/65 px-2.5 pb-0.5">
                  {group}
                </p>
                {sidebarItems
                  .filter((item) => item.group === group)
                  .map((item) => {
                    const isActive =
                      mode === 'kids'
                        ? kidsRoute === item.route
                        : mode === 'adult' &&
                          (adultRoute === item.route ||
                            (item.route === 'quran_list' && adultRoute === 'quran_read'));
                    return (
                      <button
                        key={item.route}
                        type="button"
                        onClick={() => {
                          if (mode === 'kids') {
                            setKidsRoute(item.route as KidsRoute);
                          } else {
                            setMode('adult');
                            setAdultRoute(item.route as AdultRoute);
                          }
                        }}
                        className={`w-full min-h-[40px] px-3 py-2 rounded-xl text-xs font-bold text-left transition flex items-center justify-between ${
                          isActive
                            ? 'bg-[#14532D] text-amber-300 border border-amber-400/35 shadow-2xs'
                            : 'text-emerald-100/80 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <span className="truncate">{item.label}</span>
                        {item.route === 'quran_journal' && (
                          <BookMarked className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                        )}
                      </button>
                    );
                  })}
              </div>
            ))}
          </nav>
        </div>

        {/* Desktop Sidebar Footer: Appearance + Audio + Language Sheet */}
        <div className="pt-4 border-t border-white/10 space-y-2.5 shrink-0">
          <ThemeModeSegmentedControl value={themeMode} onChange={setThemeMode} compact />
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={toggleAudioMute}
              aria-pressed={isAudioMuted}
              className={`flex-1 min-h-[42px] px-3 py-2 rounded-xl text-xs font-extrabold border transition flex items-center justify-center gap-1.5 ${
                !isAudioMuted
                  ? 'bg-[#22C55E] text-emerald-950 border-emerald-300'
                  : 'bg-rose-500/20 text-rose-200 border-rose-400/40'
              }`}
            >
              {!isAudioMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span>{!isAudioMuted ? 'Sound On' : 'Muted'}</span>
            </button>

            <SelectSheetField
              value={language}
              onChange={(val) => setLanguage(val as any)}
              title="Choose Language"
              subtitle="Update app menus and translations"
              ariaLabel="Select Language"
              variant="dark-pill"
              leftIcon={<Globe className="w-3.5 h-3.5 text-amber-300" />}
              options={supportedLanguages.map((lang) => ({
                value: lang.code,
                label: lang.label,
              }))}
            />
          </div>
          <p className="text-[11px] text-emerald-200/70 text-center">
            Saved on this device · Works offline
          </p>
        </div>
      </aside>

      {/* Full-Viewport Native-Feeling Main Workspace (Zero Double Global Header) */}
      <div className="flex-1 flex flex-col min-h-dvh w-full bg-[var(--bg-app)] text-[var(--text-primary)] relative overflow-x-hidden transition-colors">
        <main className="flex-1 flex flex-col w-full max-w-5xl mx-auto bg-[var(--bg-app)] text-[var(--text-primary)] overflow-x-hidden relative transition-colors">
          <AnimatePresence mode="wait" initial={false} custom={prefersReducedMotion ? 0 : slideDirection}>
            <motion.div
              key={activeScreenKey}
              custom={prefersReducedMotion ? 0 : slideDirection}
              variants={
                prefersReducedMotion
                  ? {
                      enter: { opacity: 0 },
                      center: { opacity: 1 },
                      exit: { opacity: 0 },
                    }
                  : screenSlideVariants
              }
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 400, damping: 36, mass: 0.8 },
                opacity: { duration: 0.14, ease: 'easeOut' },
              }}
              className="flex-1 flex flex-col will-change-transform"
            >
              <Suspense fallback={<ScreenSkeleton />}>
                {mode === 'adult' && <AdultModeView />}
                {mode === 'kids' && <KidsWorldView />}
                {mode === 'parent' && (
                  <div className="w-full flex-1 flex flex-col">
                    <ParentHubView />
                  </div>
                )}
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Persistent Floating Audio Mini-Player */}
        <FloatingAudioMiniPlayer />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <IlmizoProvider>
      <IlmizoShell />
    </IlmizoProvider>
  );
}
