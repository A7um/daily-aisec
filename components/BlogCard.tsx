import { Blog } from '@/lib/utils/fileLoader';
import { formatRelativeDate } from '@/lib/utils/dateUtils';

interface BlogCardProps {
  blog: Blog;
  index: number;
}

export default function BlogCard({ blog, index }: BlogCardProps) {
  // Alternate tag colors for visual variety
  const tagStyles = [
    'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'bg-purple-500/10 text-purple-400 border-purple-500/20',
  ];
  const tagStyle = tagStyles[index % tagStyles.length];

  return (
    <a
      href={`/${blog.slug}`}
      className="group block p-5 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:border-emerald-500/30 hover:bg-zinc-900/50 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        {/* Date indicator */}
        <div className="hidden sm:flex flex-col items-center justify-center w-14 h-14 rounded-lg bg-zinc-800/50 border border-zinc-700/50 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/5 transition-colors flex-shrink-0">
          <span className="text-xs text-zinc-400 font-mono uppercase">
            {blog.date.toLocaleDateString('zh-CN', { month: 'short' })}
          </span>
          <span className="text-lg font-bold text-zinc-300 group-hover:text-emerald-400 transition-colors">
            {blog.date.getDate()}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Meta */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <time
              dateTime={blog.date.toISOString()}
              className="sm:hidden font-mono text-xs text-emerald-400"
            >
              {formatRelativeDate(blog.date)}
            </time>
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${tagStyle}`}>
              {blog.readingTime} 分钟阅读
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-zinc-100 group-hover:text-emerald-400 transition-colors mb-2 leading-snug line-clamp-2">
            {blog.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">
            {blog.excerpt}
          </p>
        </div>

        {/* Arrow */}
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-800/50 border border-zinc-700/50 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-all flex-shrink-0">
          <svg
            className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </a>
  );
}