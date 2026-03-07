import { loadBlogs } from '@/lib/utils/fileLoader';
import BlogCard from '@/components/BlogCard';

export default async function Home() {
  const blogs = await loadBlogs();

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="relative py-8 animate-fade-in">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
              Live
            </span>
            <span className="text-xs text-zinc-500 font-mono">
              {new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-4 leading-tight">
            每日<span className="gradient-text">观察</span>
          </h1>

          <p className="text-zinc-400 text-lg mb-6 leading-relaxed">
            AI Agent 时代的前沿观察站，追踪安全、开发与自动化的最新动态。
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span><strong className="text-zinc-300">{blogs.length}</strong> 篇文章</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>AI 自动生成</span>
            </div>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -z-10"></div>
      </section>

      {/* Notice */}
      <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800 animate-slide-up">
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 rounded bg-amber-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-3 h-3 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-sm">
            <span className="text-zinc-300">本页面所有内容均由 </span>
            <span className="text-emerald-400 font-medium">Atum&apos;s Openclaw</span>
            <span className="text-zinc-300"> AI 系统自动生成。个人博客请访问 </span>
            <a href="https://atum.li" className="text-emerald-400 hover:underline" target="_blank" rel="noopener noreferrer">
              atum.li
            </a>
          </div>
        </div>
      </div>

      {/* Blog List */}
      <section className="animate-slide-up-delay-1">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
            <span className="font-mono text-emerald-500">❯</span>
            文章列表
          </h2>
          <span className="text-xs text-zinc-500 font-mono">
            按日期排序
          </span>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-zinc-800/50 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="font-mono text-zinc-500 text-sm">
              <span className="text-emerald-500">$</span> find ./posts — no results found
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {blogs.map((blog, index) => (
              <BlogCard key={blog.id} blog={blog} index={index} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
