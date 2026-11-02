/**
 * Type definitions for Axiom Maths Academy
 */

export type EducationLevelId = 'class-10' | 'intermediate' | 'diploma' | 'btech';

export interface CourseCategory {
  id: EducationLevelId;
  title: string;
  shortTitle: string;
  badge: string;
  subtitle: string;
  description: string;
  curriculumOptions: string[];
  defaultCurriculum: string;
  iconName: string;
  unitsCount: number;
  totalChapters: number;
  videoCount: number;
  featuredTopics: string[];
}

export interface FormulaItem {
  id: string;
  name: string;
  latex: string;
  explanation: string;
  tags?: string[];
}

export interface ImportantQuestion {
  id: string;
  question: string;
  questionLatex?: string;
  difficulty: 'Foundation' | 'Standard' | 'Advanced';
  frequency: 'Frequently Asked' | 'High Weightage' | 'Concept Master';
  solutionHints: string[];
  videoTimestamp?: string;
  videoId?: string;
}

export interface Chapter {
  id: string;
  levelId: EducationLevelId;
  subject: string;
  unitNumber: number;
  chapterNumber: number;
  title: string;
  slug: string;
  description: string;
  summary: string;
  keyConcepts: {
    title: string;
    description: string;
    latexFormula?: string;
  }[];
  formulas: FormulaItem[];
  importantQuestions: ImportantQuestion[];
  hasNotesPdf: boolean;
  notesPdfUrl?: string | null;
  notesPageCount?: number;
  relatedVideoIds: string[];
  boardWeightage?: string;
}

export interface VideoLesson {
  id: string;
  youtubeId: string; // YouTube Video ID or parameter
  title: string;
  duration: string;
  levelId: EducationLevelId;
  subject: string;
  chapterTitle: string;
  chapterSlug: string;
  unitName: string;
  description: string;
  thumbnailUrl: string;
  isFeatured?: boolean;
  topicTags: string[];
  playlistId?: string;
  playlistUrl?: string;
}

export type ResourceType = 'notes' | 'formula_sheet' | 'important_questions' | 'model_paper' | 'pyq';

export interface StudyResource {
  id: string;
  title: string;
  levelId: EducationLevelId;
  subject: string;
  chapterName?: string;
  resourceType: ResourceType;
  fileFormat: 'PDF';
  fileSize?: string;
  fileUrl: string | null; // null represents "Coming Soon" state without fake downloads
  isAvailable: boolean;
  pages?: number;
  year?: string;
  relatedVideoId?: string;
  description: string;
}

export interface SearchResultItem {
  type: 'course' | 'chapter' | 'formula' | 'video' | 'resource';
  title: string;
  subtitle: string;
  badge: string;
  url: string;
  matchSnippet?: string;
}
