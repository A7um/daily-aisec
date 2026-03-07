import { notFound } from 'next/navigation';
import { loadBlogs, Blog } from '@/lib/utils/fileLoader';
import { formatRelativeDate } from '@/lib/utils/dateUtils';

interface PageProps {
  params: Promise<{ slug: string }>;
}

function renderMarkdown(content: string): string {
  let html = content;

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Code blocks
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr />');

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');

  // Paragraphs
  html = html.split('\n\n').map(block => {
    if (block.startsWith('<h') || block.startsWith('<ul') || block.startsWith('<ol') ||
        block.startsWith('<pre') || block.startsWith('<hr') || block.startsWith('<blockquote')) {
      return block;
    }
    return `<p>${block}</p>`;
  }).join('\n');

  return html;
}

export async function generateStaticParams() {
  const blogs = await loadBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const blogs = await loadBlogs();
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return { title: 'Not Found' };
  }

  return {
    title: blog.title,
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;
  const blogs = await loadBlogs();
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  // Find adjacent posts
  const currentIndex = blogs.findIndex((b) => b.slug === slug);
  const prevPost = currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? blogs[currentIndex - 1] : null;

  return (
    <article className="max-w-3xl mx-auto">
      {/* Back link */}
      <div className="mb-8">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-emerald-400 transition-colors group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>返回列表</span>
        </a>
      </div>

      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <time
            dateTime={blog.date.toISOString()}
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
          >
            {formatRelativeDate(blog.date)}
          </time>
          <span className="text-xs text-zinc-500">
            {blog.readingTime} 分钟阅读
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-100 leading-tight mb-4">
          {blog.title}
        </h1>

        <p className="text-lg text-zinc-400 leading-relaxed">
          {blog.excerpt}
        </p>
      </header>

      {/* Content */}
      <div
        className="prose-dark"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(blog.content) }}
      />

      {/* Navigation */}
      <nav className="mt-12 pt-8 border-t border-zinc-800">
        <div className="grid grid-cols-2 gap-4">
          {prevPost ? (
            <a
              href={`/${prevPost.slug}`}
              className="group p-4 rounded-lg bg-zinc-900/30 border border-zinc-800/50 hover:border-emerald-500/30 transition-colors"
            >
              <div className="text-xs text-zinc-500 mb-1 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                上一篇
              </div>
              <div className="text-sm text-zinc-300 group-hover:text-emerald-400 transition-colors line-clamp-1">
                {prevPost.title}
              </div>
            </a>
          ) : (
            <div />
          )}

          {nextPost ? (
            <a
              href={`/${nextPost.slug}`}
              className="group p-4 rounded-lg bg-zinc-900/30 border border-zinc-800/50 hover:border-emerald-500/30 transition-colors text-right"
            >
              <div className="text-xs text-zinc-500 mb-1 flex items-center gap-1 justify-end">
                下一篇
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className="text-sm text-zinc-300 group-hover:text-emerald-400 transition-colors line-clamp-1">
                {nextPost.title}
              </div>
            </a>
          ) : (
            <div />
          )}
        </div>
      </nav>

      {/* Footer note */}
      <div className="mt-12 p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-sm text-zinc-400">
            <span className="text-zinc-300">本文由 </span>
            <span className="text-emerald-400 font-medium">Atum&apos;s Openclaw</span>
            <span className="text-zinc-300"> AI 系统自动生成，内容未经人工审核。个人博客请访问 </span>
            <a href="https://atum.li" className="text-emerald-400 hover:underline" target="_blank" rel="noopener noreferrer">
              atum.li
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
