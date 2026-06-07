import {
  ArrowRight,
  BookOpen,
  Brain,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Layers3,
  LibraryBig,
  NotebookTabs,
  Printer,
  Sparkles
} from 'lucide-react';

const modules = [
  {
    title: '3天学习计划',
    href: './3天学习计划.html',
    description: '按 Day 1-3 拆解章节、时间、难度和复习节奏，适合从零开始推进。',
    meta: '72 小节 · 19.5 小时',
    accent: 'teal',
    icon: CalendarDays
  },
  {
    title: '速记卡片',
    href: './速记卡片.html',
    description: '177 张可翻转卡片，支持搜索、章节筛选、已掌握/未掌握标记。',
    meta: '交互卡片 · 本地进度',
    accent: 'rose',
    icon: Layers3
  },
  {
    title: '重点难点口诀',
    href: './重点难点口诀.html',
    description: '五脏、五行、诊法、方药等高频混淆点，用口诀和速查表压缩记忆。',
    meta: '13 模块 · 可折叠',
    accent: 'amber',
    icon: NotebookTabs
  },
  {
    title: '自测模拟题',
    href: './自测模拟题.html',
    description: '填空、选择、名词解释、简答、论述题全套练习，保留作答进度。',
    meta: '86 题 · 自动核对',
    accent: 'emerald',
    icon: ClipboardList
  }
];

const reviewFlow = [
  '先用学习计划建立章节顺序',
  '用速记卡片刷高频定义',
  '用口诀页专攻易混点',
  '最后做自测模拟题查漏'
];

export function SuitePage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-950">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:py-10">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-800">
              <Sparkles size={16} aria-hidden="true" />
              中医药学概论 · 备考工具箱
            </div>
            <h1 className="text-3xl font-semibold tracking-normal text-stone-950 md:text-5xl">3天备考全套</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
              把学习计划、速记卡片、重点口诀和自测模拟统一放在一个在线入口里。打开 GitHub Pages 后，从这里进入对应模块就可以直接学习。
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <Metric icon={LibraryBig} label="章节覆盖" value="12章" />
            <Metric icon={Brain} label="速记卡片" value="177张" />
            <Metric icon={CheckCircle2} label="自测训练" value="86题" />
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">学习模块</h2>
            <p className="text-sm text-stone-500">推荐按顺序使用，也可以直接进入你当前需要的部分。</p>
          </div>
          <button className="secondary-button" type="button" onClick={() => window.print()}>
            <Printer size={17} aria-hidden="true" />
            打印
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {modules.map((module) => (
            <a key={module.title} className={`module-card module-card-${module.accent}`} href={module.href}>
              <div className="flex items-start justify-between gap-3">
                <div className="module-icon">
                  <module.icon size={22} aria-hidden="true" />
                </div>
                <ArrowRight size={18} className="mt-1 text-stone-400" aria-hidden="true" />
              </div>
              <div className="mt-5">
                <h3 className="text-lg font-semibold">{module.title}</h3>
                <p className="mt-2 min-h-[4.8rem] text-sm leading-6 text-stone-600">{module.description}</p>
              </div>
              <div className="mt-4 rounded-md bg-stone-100 px-2.5 py-1.5 text-xs font-semibold text-stone-600">{module.meta}</div>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-8 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <BookOpen size={20} className="text-teal-700" aria-hidden="true" />
            <h2 className="font-semibold">建议路线</h2>
          </div>
          <ol className="grid gap-3">
            {reviewFlow.map((item, index) => (
              <li key={item} className="flex gap-3 text-sm text-stone-700">
                <span className="grid size-6 shrink-0 place-items-center rounded-md bg-stone-900 text-xs font-bold text-white">{index + 1}</span>
                <span className="pt-0.5">{item}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <ClipboardList size={20} className="text-rose-700" aria-hidden="true" />
            <h2 className="font-semibold">上线说明</h2>
          </div>
          <p className="text-sm leading-6 text-stone-600">
            当前全套首页和速记卡片已经在现代 React 框架内；学习计划、重点口诀、自测模拟作为稳定模块一起纳入 Vite 构建，GitHub Pages 会统一发布。后续可以继续把这些旧模块逐个组件化。
          </p>
        </div>
      </section>
    </main>
  );
}

function Metric({ icon: Icon, label, value }: { icon: typeof LibraryBig; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 shadow-sm">
      <Icon size={19} className="text-stone-500" aria-hidden="true" />
      <div className="mt-3 text-2xl font-semibold text-stone-950">{value}</div>
      <div className="mt-1 text-xs font-medium text-stone-500">{label}</div>
    </div>
  );
}
