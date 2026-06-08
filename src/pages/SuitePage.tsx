import { type SyntheticEvent, useEffect, useMemo, useRef, useState } from 'react';
import { CalendarDays, ClipboardList, Layers3, NotebookTabs } from 'lucide-react';
import { useAutoHideOnScroll } from '../hooks/useAutoHideOnScroll';

const assetVersion = '20260608-tablet-nav-perf';

const modules = [
  {
    id: 'plan',
    label: '学习计划',
    href: './3天学习计划.html',
    icon: CalendarDays
  },
  {
    id: 'cards',
    label: '速记卡片',
    href: './速记卡片.html',
    icon: Layers3
  },
  {
    id: 'mnemonics',
    label: '重点口诀',
    href: './重点难点口诀.html',
    icon: NotebookTabs
  },
  {
    id: 'quiz',
    label: '自测模拟',
    href: './自测模拟题.html',
    icon: ClipboardList
  }
];

export function SuitePage() {
  const [activeId, setActiveId] = useState(modules[0].id);
  const navHidden = useAutoHideOnScroll(48);
  const [frameNavHidden, setFrameNavHidden] = useState(false);
  const frameCleanup = useRef<null | (() => void)>(null);
  const activeModule = useMemo(() => modules.find((module) => module.id === activeId) ?? modules[0], [activeId]);
  const activeHref = `${activeModule.href}?v=${assetVersion}`;
  const navIsHidden = navHidden || frameNavHidden;

  useEffect(() => {
    return () => frameCleanup.current?.();
  }, []);

  function handleFrameLoad(event: SyntheticEvent<HTMLIFrameElement>) {
    frameCleanup.current?.();
    frameCleanup.current = null;
    setFrameNavHidden(false);

    const frameWindow = event.currentTarget.contentWindow;
    if (!frameWindow) return;

    let lastY = Math.max(frameWindow.scrollY || 0, 0);
    let ticking = false;
    const delta = 8;
    const showAtTop = 24;
    const hideAfter = 48;
    let lastTouchY: number | null = null;

    function update() {
      const currentY = Math.max(frameWindow?.scrollY || 0, 0);
      const diff = currentY - lastY;

      if (currentY <= showAtTop) {
        setFrameNavHidden(false);
      } else if (diff > delta && currentY > hideAfter) {
        setFrameNavHidden(true);
      } else if (diff < -delta) {
        setFrameNavHidden(false);
      }

      lastY = currentY;
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        frameWindow?.requestAnimationFrame(update);
        ticking = true;
      }
    }

    function onWheel(event: WheelEvent) {
      if (event.deltaY < -4) {
        setFrameNavHidden(false);
      } else if (event.deltaY > 12 && Math.max(frameWindow?.scrollY || 0, 0) > hideAfter) {
        setFrameNavHidden(true);
      }
    }

    function onTouchStart(event: TouchEvent) {
      lastTouchY = event.touches[0]?.clientY ?? null;
    }

    function onTouchMove(event: TouchEvent) {
      const currentTouchY = event.touches[0]?.clientY;
      if (typeof currentTouchY !== 'number' || lastTouchY === null) return;

      const touchDiff = currentTouchY - lastTouchY;
      if (touchDiff > 5) {
        setFrameNavHidden(false);
      } else if (touchDiff < -10 && Math.max(frameWindow?.scrollY || 0, 0) > hideAfter) {
        setFrameNavHidden(true);
      }

      lastTouchY = currentTouchY;
    }

    frameWindow.addEventListener('scroll', onScroll, { passive: true });
    frameWindow.addEventListener('wheel', onWheel, { passive: true });
    frameWindow.addEventListener('touchstart', onTouchStart, { passive: true });
    frameWindow.addEventListener('touchmove', onTouchMove, { passive: true });
    frameCleanup.current = () => {
      frameWindow.removeEventListener('scroll', onScroll);
      frameWindow.removeEventListener('wheel', onWheel);
      frameWindow.removeEventListener('touchstart', onTouchStart);
      frameWindow.removeEventListener('touchmove', onTouchMove);
    };
  }

  return (
    <main className="suite-shell">
      <nav className={navIsHidden ? 'suite-nav auto-hide-nav nav-hidden' : 'suite-nav auto-hide-nav'} aria-label="学习模块">
        <div className="suite-nav-inner">
          <a className="suite-brand" href="./">
            中医药学概论
          </a>

          <div className="suite-tabs" role="tablist" aria-label="学习模块">
            {modules.map((module) => {
              const selected = module.id === activeId;
              return (
                <button
                  key={module.id}
                  className={selected ? 'suite-tab suite-tab-active' : 'suite-tab'}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveId(module.id)}
                >
                  <module.icon size={17} aria-hidden="true" />
                  {module.label}
                </button>
              );
            })}
          </div>

          <a className="suite-open-link" href={activeHref}>
            新窗口打开
          </a>
        </div>
      </nav>

      <iframe className="suite-frame" title={activeModule.label} src={activeHref} onLoad={handleFrameLoad} />
    </main>
  );
}
