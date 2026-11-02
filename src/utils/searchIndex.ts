import type { SearchResultItem } from '../types';
import { courseCategories, allChapters } from '../data/coursesData';
import { featuredVideos } from '../data/featuredVideosData';
import { studyResources } from '../data/studyResourcesData';

export function searchAll(query: string): SearchResultItem[] {
  const clean = query.trim().toLowerCase();
  if (!clean) return [];

  const results: SearchResultItem[] = [];

  // Search Course Categories
  courseCategories.forEach((cat) => {
    if (
      cat.title.toLowerCase().includes(clean) ||
      cat.description.toLowerCase().includes(clean) ||
      cat.featuredTopics.some((t) => t.toLowerCase().includes(clean))
    ) {
      results.push({
        type: 'course',
        title: cat.title,
        subtitle: cat.badge,
        badge: 'Course Level',
        url: `/courses/${cat.id}`,
        matchSnippet: cat.subtitle,
      });
    }
  });

  // Search Chapters and Formulas
  allChapters.forEach((ch) => {
    const titleMatch = ch.title.toLowerCase().includes(clean);
    const descMatch = ch.description.toLowerCase().includes(clean);

    if (titleMatch || descMatch) {
      results.push({
        type: 'chapter',
        title: ch.title,
        subtitle: `${ch.subject} • Chapter ${ch.chapterNumber}`,
        badge: 'Chapter',
        url: `/courses/${ch.levelId}/${ch.slug}`,
        matchSnippet: ch.summary,
      });
    }

    // Match Key Concepts
    ch.keyConcepts.forEach((kc) => {
      if (kc.title.toLowerCase().includes(clean) || kc.description.toLowerCase().includes(clean)) {
        results.push({
          type: 'chapter',
          title: kc.title,
          subtitle: `Concept in ${ch.title} (${ch.subject})`,
          badge: 'Concept',
          url: `/courses/${ch.levelId}/${ch.slug}`,
          matchSnippet: kc.description,
        });
      }
    });

    // Match Formulas
    ch.formulas.forEach((f) => {
      if (f.name.toLowerCase().includes(clean) || f.explanation.toLowerCase().includes(clean)) {
        results.push({
          type: 'formula',
          title: f.name,
          subtitle: `Formula in ${ch.title}`,
          badge: 'Formula',
          url: `/courses/${ch.levelId}/${ch.slug}#formulas`,
          matchSnippet: f.explanation,
        });
      }
    });

    // Match Questions
    ch.importantQuestions.forEach((q) => {
      if (q.question.toLowerCase().includes(clean)) {
        results.push({
          type: 'chapter',
          title: q.question,
          subtitle: `High-Yield Question in ${ch.title}`,
          badge: q.frequency,
          url: `/courses/${ch.levelId}/${ch.slug}#questions`,
          matchSnippet: q.solutionHints.join(' '),
        });
      }
    });
  });

  // Search Video Lessons
  featuredVideos.forEach((v) => {
    if (
      v.title.toLowerCase().includes(clean) ||
      v.description.toLowerCase().includes(clean) ||
      v.topicTags.some((tag) => tag.toLowerCase().includes(clean))
    ) {
      results.push({
        type: 'video',
        title: v.title,
        subtitle: `${v.subject} • ${v.duration}`,
        badge: 'YouTube Lesson',
        url: `/youtube-lessons?highlight=${v.id}`,
        matchSnippet: v.description,
      });
    }
  });

  // Search Study Resources
  studyResources.forEach((r) => {
    if (
      r.title.toLowerCase().includes(clean) ||
      r.description.toLowerCase().includes(clean) ||
      (r.chapterName && r.chapterName.toLowerCase().includes(clean))
    ) {
      results.push({
        type: 'resource',
        title: r.title,
        subtitle: `${r.subject} • ${r.fileFormat}`,
        badge: r.isAvailable ? 'PDF Available' : 'Coming Soon',
        url: `/study-materials?query=${encodeURIComponent(r.title)}`,
        matchSnippet: r.description,
      });
    }
  });

  const seen = new Set<string>();
  return results.filter((item) => {
    const key = `${item.type}-${item.title}-${item.url}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 15);
}
