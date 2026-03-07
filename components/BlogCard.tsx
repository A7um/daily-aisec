import { Blog } from '@/lib/utils/fileLoader';
import { formatRelativeDate } from '@/lib/utils/dateUtils';

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <a
      href={`/${blog.slug}`}
      className="block p-4 bg-[#111111] border border-[#2a2a2a] rounded hover:border-[#22c55e] hover:shadow-[0_0_12px_rgba(34,197,94,0.1)] transition-all duration-200 group"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <time dateTime={blog.date.toISOString()} className="font-mono text-xs text-[#22c55e]">
              [{formatRelativeDate(blog.date)}]
            </time>
            <span className="font-mono text-xs text-[#888888] bg-[#1a1a1a] px-2 py-0.5 rounded border border-[#2a2a2a]">
              {blog.readingTime} min
            </span>
          </div>
          <h3 className="font-mono text-sm font-semibold text-[#e5e5e5] group-hover:text-[#22c55e] transition-colors mb-1 leading-snug">
            {blog.title}
          </h3>
          <p className="text-[#888888] text-xs line-clamp-2 leading-relaxed">
            {blog.excerpt}
          </p>
        </div>
        <span className="font-mono text-[#2a2a2a] group-hover:text-[#22c55e] transition-colors text-sm mt-1 flex-shrink-0">
          ›
        </span>
      </div>
    </a>
  );
}
