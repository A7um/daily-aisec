import fs from 'fs';
import path from 'path';

export interface Blog {
  id: string;
  slug: string;
  title: string;
  date: Date;
  content: string;
  excerpt: string;
  readingTime: number;
}

function parseBlog(content: string, filename: string): Blog | null {
  const dateMatch = filename.match(/(\d{4}-\d{2}-\d{2})/);
  if (!dateMatch) return null;

  const date = new Date(dateMatch[1]);
  if (isNaN(date.getTime())) return null;

  const slug = filename.replace('.md', '');

  const title = extractTitle(content, filename);
  const excerpt = extractExcerpt(content);
  const readingTime = Math.ceil(content.split(/\s+/).length / 200);

  return {
    id: `blog-${slug}`,
    slug,
    title,
    date,
    content,
    excerpt,
    readingTime,
  };
}

function extractTitle(content: string, filename: string): string {
  const titleMatch = content.match(/^#\s+(.+)$/m);
  if (titleMatch) return titleMatch[1].trim();

  const dateMatch = filename.match(/(\d{4}-\d{2}-\d{2})/);
  if (dateMatch) return `Daily Observation: ${dateMatch[1]}`;

  return 'Untitled';
}

function extractExcerpt(content: string): string {
  const text = content
    .replace(/#+\s+/g, '')
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (text.length <= 150) return text;

  const truncated = text.slice(0, 150);
  const lastSpace = truncated.lastIndexOf(' ');

  if (lastSpace > 120) {
    return truncated.slice(0, lastSpace) + '...';
  }
  return truncated + '...';
}

export async function loadBlogs(): Promise<Blog[]> {
  const contentDir = path.join(process.cwd(), 'content');
  const blogs: Blog[] = [];

  try {
    const stats = await fs.promises.stat(contentDir).catch(() => null);
    if (!stats || !stats.isDirectory()) {
      console.warn(`Blogs directory not found: ${contentDir}`);
      return [];
    }

    const files = await fs.promises.readdir(contentDir);
    const mdFiles = files.filter((f) => f.endsWith('.md'));

    for (const filename of mdFiles) {
      const filePath = path.join(contentDir, filename);
      const content = await fs.promises.readFile(filePath, 'utf-8');
      const blog = parseBlog(content, filename);
      if (blog) blogs.push(blog);
    }

    blogs.sort((a, b) => b.date.getTime() - a.date.getTime());
  } catch (err) {
    console.warn(`Could not load blogs from ${contentDir}:`, err);
  }

  return blogs;
}
