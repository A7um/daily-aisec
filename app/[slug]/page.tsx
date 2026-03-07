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
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr />');

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <a
          href="/"
          className="font-mono text-xs text-[#888888] hover:text-[#22c55e] transition-colors inline-flex items-center gap-1"
        >
          <span>←</span>
          <span>back to index</span>
        </a>
      </div>

      <div className="mb-6 pb-4 border-b border-[#2a2a2a]">
        <div className="flex items-center gap-3 flex-wrap">
          <time dateTime={blog.date.toISOString()} className="font-mono text-xs text-[#22c55e]">
            [{formatRelativeDate(blog.date)}]
          </time>
          <span className="font-mono text-xs text-[#888888] bg-[#111111] px-2 py-0.5 rounded border border-[#2a2a2a]">
            {blog.readingTime} min read
          </span>
        </div>
      </div>

      <article>
        <div
          className="prose prose-terminal max-w-none prose-headings:font-mono prose-headings:text-[#f3f4f6] prose-headings:font-bold prose-h1:text-2xl prose-h1:mb-4 prose-h1:border-b prose-h1:border-[#2a2a2a] prose-h1:pb-3 prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3 prose-p:text-[#d1d5db] prose-p:leading-relaxed prose-p:mb-4 prose-a:text-[#22c55e] prose-a:no-underline hover:prose-a:underline hover:prose-a:text-[#4ade80] prose-strong:text-[#f9fafb] prose-strong:font-semibold prose-em:text-[#d1d5db] prose-code:text-[#22c55e] prose-code:bg-[#0d1117] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-[#2a2a2a] prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-auto prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4 prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4 prose-li:text-[#d1d5db] prose-li:mb-1 prose-blockquote:border-l-4 prose-blockquote:border-[#22c55e] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-[#9ca3af] prose-blockquote:bg-[#111111] prose-blockquote:py-1 prose-blockquote:rounded-r prose-hr:border-[#2a2a2a] prose-table:text-sm prose-thead:border-b prose-thead:border-[#374151] prose-th:text-[#f3f4f6] prose-th:font-mono prose-th:font-semibold prose-th:py-2 prose-th:px-3 prose-td:text-[#d1d5db] prose-td:py-2 prose-td:px-3 prose-td:border-b prose-td:border-[#1f2937] prose-img:rounded-lg prose-img:border prose-img:border-[#2a2a2a]"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(blog.content) }}
        />
      </article>
    </div>
  );
}
