import { useState, useEffect, useRef, useCallback } from 'react';
import { DJBoard } from '@/components/djboard/DJBoard';
import { ContentArea } from '@/components/content/ContentArea';
import { ScrollToTop } from '@/components/shared/ScrollToTop';
import { projects } from '@/data/projects';
import { aboutData } from '@/data/about';
import {
  DEFAULT_NARRATOR,
  IDLE_TIP,
  NARRATOR_VIEWING,
  NARRATOR_BALANCED,
  NARRATOR_ARCH_EXCLUDED,
  NARRATOR_PROD_EXCLUDED,
  NARRATOR_SW_EXCLUDED,
  NARRATOR_ARCH_EMPHASIS,
  NARRATOR_PROD_EMPHASIS,
  NARRATOR_SW_EMPHASIS,
  NARRATOR_MIX,
  NARRATOR_HERO_ON,
  NARRATOR_HERO_OFF,
  NARRATOR_META_ON,
  NARRATOR_META_OFF,
  NARRATOR_DETAIL,
  NARRATOR_ASK_ACTIVE,
  NARRATOR_SEARCHING,
} from '@/data/narratorMessages';
import { useDebounce } from '@/hooks/useDebounce';
import { useKeywordSearch } from '@/hooks/useKeywordSearch';
import { useProjectSort } from '@/hooks/useProjectSort';
import { updateDisciplineMix } from '@/utils/disciplineMath';
import { getDetailLabel } from '@/utils/formatters';
import type { DisciplineMix, ViewControls } from '@/types';

export function App() {
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);
  const [disciplineMix, setDisciplineMix] = useState<DisciplineMix>({
    arch: 50,
    prod: 50,
    sw: 50,
  });
  const [viewControls, setViewControls] = useState<ViewControls>({
    heroEnabled: true,
    metadataEnabled: true,
    detailDepth: 60,
  });
  const [narratorMessage, setNarratorMessage] = useState(DEFAULT_NARRATOR);
  const contentScrollRef = useRef<HTMLDivElement>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInitialMount = useRef(true);
  const { search: keywordSearch } = useKeywordSearch();

  const debouncedMix = useDebounce(disciplineMix, 150);
  const sortedProjects = useProjectSort(debouncedMix);

  const activeIndex =
    activeProjectId == null
      ? 0
      : sortedProjects.findIndex((p) => p.id === activeProjectId);
  const safeActiveIndex = activeIndex >= 0 ? activeIndex : 0;
  const currentProject =
    activeProjectId == null
      ? projects[0]
      : projects.find((p) => p.id === activeProjectId) ?? projects[0];

  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(
      () => setNarratorMessage(IDLE_TIP),
      10000
    );
  }, []);

  const handleDisciplineChange = useCallback(
    (knob: 'arch' | 'prod' | 'sw', newValue: number) => {
      setDisciplineMix((prev) => updateDisciplineMix(prev, knob, newValue));
      resetIdleTimer();
    },
    [resetIdleTimer]
  );

  const handleProjectChange = useCallback((index: number) => {
    const project = sortedProjects[index];
    if (project) setActiveProjectId(project.id);
  }, [sortedProjects]);

  const handleControlChange = useCallback(
    (key: keyof ViewControls, value: unknown) => {
      setViewControls((prev) => ({ ...prev, [key]: value }));
      resetIdleTimer();
    },
    [resetIdleTimer]
  );

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (activeProjectId == null) {
      setNarratorMessage(DEFAULT_NARRATOR);
      resetIdleTimer();
      return;
    }
    setNarratorMessage(NARRATOR_VIEWING(currentProject.title));
    resetIdleTimer();
  }, [activeProjectId, currentProject.title, resetIdleTimer]);

  const prevDisciplineMixRef = useRef<DisciplineMix | null>(null);
  useEffect(() => {
    const prev = prevDisciplineMixRef.current;
    prevDisciplineMixRef.current = disciplineMix;
    if (prev === null) return;
    const { arch, prod, sw } = disciplineMix;
    const balanced =
      Math.abs(arch - 33) <= 2 &&
      Math.abs(prod - 33) <= 2 &&
      Math.abs(sw - 34) <= 2;
    const oneDominates = arch > 60 || prod > 60 || sw > 60;
    const oneExcluded = arch === 0 || prod === 0 || sw === 0;
    if (balanced) {
      setNarratorMessage(NARRATOR_BALANCED);
    } else if (oneExcluded) {
      if (arch === 0) setNarratorMessage(NARRATOR_ARCH_EXCLUDED);
      else if (prod === 0) setNarratorMessage(NARRATOR_PROD_EXCLUDED);
      else setNarratorMessage(NARRATOR_SW_EXCLUDED);
    } else if (oneDominates) {
      if (arch > 60) setNarratorMessage(NARRATOR_ARCH_EMPHASIS);
      else if (prod > 60) setNarratorMessage(NARRATOR_PROD_EMPHASIS);
      else setNarratorMessage(NARRATOR_SW_EMPHASIS);
    } else {
      setNarratorMessage(NARRATOR_MIX(arch, prod, sw));
    }
    resetIdleTimer();
  }, [disciplineMix, resetIdleTimer]);

  const prevViewRef = useRef({
    heroEnabled: viewControls.heroEnabled,
    metadataEnabled: viewControls.metadataEnabled,
    detailDepth: viewControls.detailDepth,
  });
  useEffect(() => {
    const { heroEnabled, metadataEnabled, detailDepth } = viewControls;
    const prev = prevViewRef.current;
    if (heroEnabled !== prev.heroEnabled) {
      prevViewRef.current = { ...prev, heroEnabled };
      setNarratorMessage(heroEnabled ? NARRATOR_HERO_ON : NARRATOR_HERO_OFF);
      resetIdleTimer();
    }
    if (metadataEnabled !== prev.metadataEnabled) {
      prevViewRef.current = { ...prev, metadataEnabled };
      setNarratorMessage(
        metadataEnabled ? NARRATOR_META_ON : NARRATOR_META_OFF
      );
      resetIdleTimer();
    }
    if (detailDepth !== prev.detailDepth) {
      prevViewRef.current = { ...prev, detailDepth };
      setNarratorMessage(NARRATOR_DETAIL(getDetailLabel(detailDepth)));
      resetIdleTimer();
    }
  }, [
    viewControls.heroEnabled,
    viewControls.metadataEnabled,
    viewControls.detailDepth,
    resetIdleTimer,
  ]);

  const handleAskFocus = useCallback(() => {
    setNarratorMessage(NARRATOR_ASK_ACTIVE);
    resetIdleTimer();
  }, [resetIdleTimer]);

  const handleAskSubmit = useCallback(
    (question: string) => {
      setNarratorMessage(NARRATOR_SEARCHING(question));
      resetIdleTimer();
      const { response, action, payload } = keywordSearch(question);
      setNarratorMessage(response);
      if (action === 'navigate' && payload) {
        const navPayload = payload as { projectId?: number };
        if (typeof navPayload.projectId === 'number') {
          const idx = sortedProjects.findIndex(
            (p) => p.id === navPayload.projectId
          );
          if (idx >= 0) setActiveProjectId(sortedProjects[idx].id);
        }
      }
      if (action === 'filter' && payload) {
        const mixPayload = payload as DisciplineMix;
        setDisciplineMix(mixPayload);
      }
    },
    [resetIdleTimer, keywordSearch, sortedProjects]
  );

  useEffect(() => {
    resetIdleTimer();
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [resetIdleTimer]);

  return (
    <div className="app">
      <DJBoard
        projects={sortedProjects}
        activeIndex={safeActiveIndex}
        onProjectChange={handleProjectChange}
        disciplineMix={disciplineMix}
        onDisciplineChange={handleDisciplineChange}
        viewControls={viewControls}
        onControlChange={handleControlChange}
        narratorMessage={narratorMessage}
        onAskSubmit={handleAskSubmit}
        onAskFocus={handleAskFocus}
        onGoHome={() => setActiveProjectId(null)}
      />
      <main ref={contentScrollRef} className="content">
        <ScrollToTop trigger={activeProjectId} scrollRef={contentScrollRef} />
        <ContentArea
          project={currentProject}
          activeProjectId={activeProjectId}
          aboutData={aboutData}
          viewControls={viewControls}
          projects={sortedProjects}
          onOpenProject={(id) => setActiveProjectId(id)}
        />
      </main>
    </div>
  );
}
