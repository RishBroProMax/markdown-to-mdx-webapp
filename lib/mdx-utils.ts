interface BlogFrontmatter {
  title: string;
  publishedAt: string;
  summary: string;
  category: string;
  readingTime: string;
  tags: string[];
}

function estimateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

function extractTags(content: string): string[] {
  const techTags = [
    'AI', 'Web Development', 'Mobile', 'Cloud', 'Security',
    'Blockchain', 'IoT', 'DevOps', 'Programming', 'Tech News'
  ];
  
  const contentLower = content.toLowerCase();
  return techTags.filter(tag => 
    contentLower.includes(tag.toLowerCase())
  ).slice(0, 3); // Limit to 3 most relevant tags
}

function determineCategory(content: string): string {
  const categories = {
    'AI & ML': ['ai', 'machine learning', 'deep learning', 'neural'],
    'Web Tech': ['javascript', 'react', 'web', 'css', 'html'],
    'Mobile': ['ios', 'android', 'mobile', 'app'],
    'Cloud & DevOps': ['aws', 'azure', 'cloud', 'docker', 'kubernetes'],
    'Security': ['security', 'privacy', 'encryption', 'cyber'],
    'Tech News': ['announced', 'released', 'launched', 'update']
  };

  const contentLower = content.toLowerCase();
  
  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => contentLower.includes(keyword))) {
      return category;
    }
  }

  return 'Tech News';
}

function extractTitle(content: string): string {
  const headingMatch = content.match(/^#+ (.+)$/m);
  if (headingMatch) {
    return headingMatch[1].trim();
  }

  const firstLine = content.split('\n').find(line => line.trim().length > 0);
  if (firstLine && firstLine.length < 100) {
    return firstLine.trim().replace(/[#*`_]/g, '');
  }

  const words = content.split(/\s+/).slice(0, 8).join(' ');
  if (words) {
    return capitalizeTitle(words);
  }

  return "Untitled Tech Post";
}

function generateSummary(content: string): string {
  const plainText = content
    .replace(/#+\s+/g, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/`(.+?)`/g, '$1')
    .replace(/\[(.+?)\]\(.+?\)/g, '$1');

  const paragraphs = plainText.split('\n\n');
  const firstParagraph = paragraphs.find(p => p.trim().length > 0) || '';

  if (firstParagraph.length < 160) {
    return firstParagraph.trim();
  }

  return firstParagraph.slice(0, 157).trim() + '...';
}

function formatMarkdownContent(content: string): string {
  const lines = content.split('\n');
  let formattedContent = content;
  
  if (lines[0]?.match(/^# /)) {
    formattedContent = lines.slice(1).join('\n').trim();
  }

  // Enhance code block formatting
  formattedContent = formattedContent
    .replace(/```(\w+)?/g, (match, lang) => `\`\`\`${lang || 'text'}`)
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^(?=##)/gm, '\n');
  
  return formattedContent;
}

function capitalizeTitle(text: string): string {
  const exceptions = ['a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at', 'to', 'from', 'by', 'with'];
  
  return text
    .split(' ')
    .map((word, index) => {
      if (index === 0 || !exceptions.includes(word.toLowerCase())) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    })
    .join(' ');
}

function getTodayDate(): string {
  const date = new Date();
  return date.toISOString().split('T')[0];
}

export function generateMdxContent(rawContent: string): string {
  if (!rawContent.trim()) return '';

  const title = extractTitle(rawContent);
  const today = getTodayDate();
  const summary = generateSummary(rawContent);
  const category = determineCategory(rawContent);
  const readingTime = estimateReadingTime(rawContent);
  const tags = extractTags(rawContent);
  
  const frontmatter: BlogFrontmatter = {
    title,
    publishedAt: today,
    summary,
    category,
    readingTime,
    tags
  };

  const formattedContent = formatMarkdownContent(rawContent);
  
  return `---
title: "${frontmatter.title}"
publishedAt: "${frontmatter.publishedAt}"
summary: "${frontmatter.summary}"
category: "${frontmatter.category}"
readingTime: "${frontmatter.readingTime}"
tags: ${JSON.stringify(frontmatter.tags)}
---

${formattedContent}`;
}