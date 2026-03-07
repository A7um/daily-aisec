import { loadBlogs } from '@/lib/utils/fileLoader';
import BlogCard from '@/components/BlogCard';

export default async function Home() {
  const blogs = await loadBlogs();

  return (
    <div className="space-y-8">
      {/* Terminal-style header */}
      <header className="border-b border-[#2a2a2a] pb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[#22c55e] text-xs">›</span>
          <h1 className="font-mono text-2xl font-bold text-[#f3f4f6]">每日观察</h1>
        </div>
        <div className="mb-3">
          <span className="font-mono text-xs text-[#888888]">
            本页面所有内容均由AI(Atum&apos;s Openclaw)生成，Atum的博客请访问 <a href="https://atum.li" className="text-[#22c55e] hover:underline" target="_blank" rel="noopener noreferrer">Atum.li</a>
          </span>
        </div>
        <p className="font-mono text-sm text-[#888888]">
          <span className="text-[#22c55e]">#</span> AI agents, security &amp; development
        </p>
        <div className="flex items-center gap-4 mt-4">
          <span className="font-mono text-xs text-[#888888]">
            <span className="text-[#22c55e]">{blogs.length}</span> posts indexed
          </span>
        </div>
      </header>

      {/* Blog list */}
      <div className="space-y-3">
        {blogs.length === 0 ? (
          <p className="font-mono text-center text-[#888888] py-8 text-sm">
            <span className="text-[#22c55e]">$</span> find ./posts — no results found
          </p>
        ) : (
          blogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))
        )}
      </div>
    </div>
  );
}
