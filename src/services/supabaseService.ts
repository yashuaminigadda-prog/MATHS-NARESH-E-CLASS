import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { StudyResource, VideoLesson, EducationLevelId, ResourceType } from '../types';
import { studyResources } from '../data/studyResourcesData';
import { featuredVideos } from '../data/featuredVideosData';

export interface ContactSubmission {
  name: string;
  email?: string;
  phone: string;
  courseLevel: string;
  message: string;
}

export interface InquiryRecord {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  course_level: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved' | 'archived';
  created_at: string;
}

export interface SubscriberRecord {
  id: string;
  email: string | null;
  phone: string | null;
  created_at: string;
  education_level?: string;
}

// Local Storage keys for offline / instant persistence
const KEY_CUSTOM_RESOURCES = 'maths_naresh_custom_resources';
const KEY_DELETED_RESOURCES = 'maths_naresh_deleted_resources';
const KEY_CUSTOM_VIDEOS = 'maths_naresh_custom_videos';
const KEY_DELETED_VIDEOS = 'maths_naresh_deleted_videos';
const KEY_CUSTOM_INQUIRIES = 'maths_naresh_custom_inquiries';
const KEY_DELETED_INQUIRIES = 'maths_naresh_deleted_inquiries';
const KEY_CUSTOM_SUBSCRIBERS = 'maths_naresh_custom_subscribers';
const KEY_DELETED_SUBSCRIBERS = 'maths_naresh_deleted_subscribers';

const getFromStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const saveToStorage = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('Storage write error for', key, err);
  }
};

const MOCK_ADMIN_INQUIRIES: InquiryRecord[] = [
  {
    id: 'mock-1',
    name: 'Venkatesh Rao',
    email: 'venkatesh.btech@gmail.com',
    phone: '9848012345',
    course_level: 'B.Tech Engineering Mathematics (M1)',
    message: 'Sir Cayley-Hamilton theorem problem inverse matrix finding lo difficulty undi. Can you please share handwritten step-by-step solution hints?',
    status: 'new',
    created_at: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: 'mock-2',
    name: 'Anusha Reddy',
    email: 'anusha.ipe@gmail.com',
    phone: '9701234567',
    course_level: 'Intermediate (+2 / 11th & 12th)',
    message: 'Sir Inter 1A Trigonometric transformations 7 marks important questions PDF eppudu upload chestaru? Need it for upcoming pre-final exams.',
    status: 'in_progress',
    created_at: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: 'mock-3',
    name: 'Sai Krishna',
    email: 'saikrishna.diploma@gmail.com',
    phone: '9988776655',
    course_level: 'Diploma (Polytechnic Maths)',
    message: 'Integration by partial fractions video lecture chala bagundi sir! Thank you so much.',
    status: 'resolved',
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
];

const DEFAULT_SUBSCRIBERS: SubscriberRecord[] = [
  { id: 'sub-1', email: 'suresh.kumar@gmail.com', phone: '9848022338', created_at: new Date().toISOString(), education_level: 'btech' },
  { id: 'sub-2', email: 'priya.inter@yahoo.com', phone: '9123456789', created_at: new Date(Date.now() - 86400000).toISOString(), education_level: 'intermediate' },
  { id: 'sub-3', email: 'kiran.ssc@gmail.com', phone: null, created_at: new Date(Date.now() - 172800000).toISOString(), education_level: 'class-10' },
];

export const SupabaseService = {
  /**
   * Save a student inquiry/message to Supabase public.contact_inquiries
   */
  async submitContactInquiry(data: ContactSubmission): Promise<{ success: boolean; error?: string }> {
    const newInquiry: InquiryRecord = {
      id: 'inq-' + Date.now(),
      name: data.name,
      email: data.email || null,
      phone: data.phone,
      course_level: data.courseLevel,
      message: data.message,
      status: 'new',
      created_at: new Date().toISOString(),
    };

    // Save locally
    const customInquiries = getFromStorage<InquiryRecord[]>(KEY_CUSTOM_INQUIRIES, []);
    saveToStorage(KEY_CUSTOM_INQUIRIES, [newInquiry, ...customInquiries]);

    if (!isSupabaseConfigured) {
      return { success: true };
    }

    try {
      const { error } = await supabase.from('contact_inquiries').insert([
        {
          name: data.name,
          email: data.email || null,
          phone: data.phone,
          course_level: data.courseLevel,
          message: data.message,
          status: 'new',
        },
      ]);

      if (error) {
        console.error('Supabase contact submission error:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error('Contact submission exception:', err);
      return { success: false, error: errorMsg };
    }
  },

  /**
   * Subscribe to newsletter/study updates
   */
  async subscribeNewsletter(emailOrPhone: string, level?: string): Promise<{ success: boolean; error?: string }> {
    const isEmail = emailOrPhone.includes('@');
    const newSub: SubscriberRecord = {
      id: 'sub-' + Date.now(),
      email: isEmail ? emailOrPhone : null,
      phone: !isEmail ? emailOrPhone : null,
      education_level: level || 'all',
      created_at: new Date().toISOString(),
    };

    const customSubs = getFromStorage<SubscriberRecord[]>(KEY_CUSTOM_SUBSCRIBERS, []);
    saveToStorage(KEY_CUSTOM_SUBSCRIBERS, [newSub, ...customSubs]);

    if (!isSupabaseConfigured) {
      return { success: true };
    }

    try {
      const { error } = await supabase.from('newsletter_subscribers').insert([
        {
          email: isEmail ? emailOrPhone : null,
          phone: !isEmail ? emailOrPhone : null,
          education_level: level || 'all',
        },
      ]);

      if (error) {
        if (error.code === '23505') {
          return { success: true };
        }
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      return { success: false, error: errorMsg };
    }
  },

  /**
   * Fetch Study Resources (Supabase + Local Custom - Deleted)
   */
  async getStudyResources(): Promise<StudyResource[]> {
    const customList = getFromStorage<StudyResource[]>(KEY_CUSTOM_RESOURCES, []);
    const deletedIds = new Set(getFromStorage<string[]>(KEY_DELETED_RESOURCES, []));

    let baseResources: StudyResource[] = [];

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('study_resources')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          baseResources = data.map((item) => ({
            id: item.slug_id || item.id,
            title: item.title,
            levelId: item.level_id as EducationLevelId,
            subject: item.subject,
            chapterName: item.chapter_name || undefined,
            resourceType: item.resource_type as ResourceType,
            fileFormat: item.file_format || 'PDF',
            fileSize: item.file_size || '1.0 MB',
            fileUrl: item.file_url,
            isAvailable: item.is_available ?? true,
            pages: item.pages || 1,
            year: item.year || '2024-25',
            relatedVideoId: item.related_video_id || undefined,
            description: item.description || '',
          }));
        } else {
          baseResources = studyResources;
        }
      } catch {
        baseResources = studyResources;
      }
    } else {
      baseResources = studyResources;
    }

    // Merge custom resources with base resources, filtering deleted
    const all = [...customList, ...baseResources];
    const uniqueMap = new Map<string, StudyResource>();
    for (const r of all) {
      if (!deletedIds.has(r.id) && !uniqueMap.has(r.id)) {
        uniqueMap.set(r.id, r);
      }
    }
    return Array.from(uniqueMap.values());
  },

  /**
   * ADMIN: Add a new Study Resource
   */
  async addStudyResource(resource: Omit<StudyResource, 'id'> & { id?: string }): Promise<{ success: boolean; data?: StudyResource; error?: string }> {
    const newId = resource.id || `res-custom-${Date.now()}`;
    const newResource: StudyResource = {
      ...resource,
      id: newId,
    };

    // Save in custom list
    const customList = getFromStorage<StudyResource[]>(KEY_CUSTOM_RESOURCES, []);
    saveToStorage(KEY_CUSTOM_RESOURCES, [newResource, ...customList]);

    // Un-delete if previously deleted
    const deletedIds = getFromStorage<string[]>(KEY_DELETED_RESOURCES, []).filter((id) => id !== newId);
    saveToStorage(KEY_DELETED_RESOURCES, deletedIds);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('study_resources').insert([
          {
            slug_id: newId,
            title: newResource.title,
            level_id: newResource.levelId,
            subject: newResource.subject,
            chapter_name: newResource.chapterName || null,
            resource_type: newResource.resourceType,
            file_format: newResource.fileFormat || 'PDF',
            file_size: newResource.fileSize || '1.2 MB',
            file_url: newResource.fileUrl,
            is_available: newResource.isAvailable,
            pages: newResource.pages || 10,
            year: newResource.year || '2024-25',
            related_video_id: newResource.relatedVideoId || null,
            description: newResource.description,
          },
        ]);
      } catch (err) {
        console.warn('Supabase remote addStudyResource failed, saved locally:', err);
      }
    }

    return { success: true, data: newResource };
  },

  /**
   * ADMIN: Delete a Study Resource
   */
  async deleteStudyResource(id: string): Promise<boolean> {
    // Record in deleted IDs
    const deletedIds = Array.from(new Set([...getFromStorage<string[]>(KEY_DELETED_RESOURCES, []), id]));
    saveToStorage(KEY_DELETED_RESOURCES, deletedIds);

    // Remove from custom list if present
    const customList = getFromStorage<StudyResource[]>(KEY_CUSTOM_RESOURCES, []).filter((r) => r.id !== id);
    saveToStorage(KEY_CUSTOM_RESOURCES, customList);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('study_resources').delete().or(`slug_id.eq.${id},id.eq.${id}`);
      } catch (err) {
        console.warn('Supabase remote deleteStudyResource error:', err);
      }
    }

    return true;
  },

  /**
   * Fetch Video Lessons (Supabase + Local Custom - Deleted)
   */
  async getVideoLessons(): Promise<VideoLesson[]> {
    const customList = getFromStorage<VideoLesson[]>(KEY_CUSTOM_VIDEOS, []);
    const deletedIds = new Set(getFromStorage<string[]>(KEY_DELETED_VIDEOS, []));

    let baseVideos: VideoLesson[] = [];

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('video_lessons')
          .select('*')
          .order('order_index', { ascending: true });

        if (!error && data && data.length > 0) {
          baseVideos = data.map((item) => ({
            id: item.slug_id || item.id,
            youtubeId: item.youtube_id,
            title: item.title,
            duration: item.duration,
            levelId: item.level_id as EducationLevelId,
            subject: item.subject,
            chapterTitle: item.chapter_title,
            chapterSlug: item.chapter_slug,
            unitName: item.unit_name,
            description: item.description || '',
            thumbnailUrl: item.thumbnail_url || 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80',
            isFeatured: item.is_featured ?? false,
            topicTags: item.topic_tags || [],
            playlistId: item.playlist_id || undefined,
            playlistUrl: item.playlist_url || undefined,
          }));
        } else {
          baseVideos = featuredVideos;
        }
      } catch {
        baseVideos = featuredVideos;
      }
    } else {
      baseVideos = featuredVideos;
    }

    const all = [...customList, ...baseVideos];
    const uniqueMap = new Map<string, VideoLesson>();
    for (const v of all) {
      if (!deletedIds.has(v.id) && !uniqueMap.has(v.id)) {
        uniqueMap.set(v.id, v);
      }
    }
    return Array.from(uniqueMap.values());
  },

  /**
   * ADMIN: Add a new Video Lesson
   */
  async addVideoLesson(video: Omit<VideoLesson, 'id'> & { id?: string }): Promise<{ success: boolean; data?: VideoLesson; error?: string }> {
    const newId = video.id || `vid-custom-${Date.now()}`;
    const newVideo: VideoLesson = {
      ...video,
      id: newId,
    };

    const customList = getFromStorage<VideoLesson[]>(KEY_CUSTOM_VIDEOS, []);
    saveToStorage(KEY_CUSTOM_VIDEOS, [newVideo, ...customList]);

    const deletedIds = getFromStorage<string[]>(KEY_DELETED_VIDEOS, []).filter((id) => id !== newId);
    saveToStorage(KEY_DELETED_VIDEOS, deletedIds);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('video_lessons').insert([
          {
            slug_id: newId,
            youtube_id: newVideo.youtubeId,
            title: newVideo.title,
            duration: newVideo.duration,
            level_id: newVideo.levelId,
            subject: newVideo.subject,
            chapter_title: newVideo.chapterTitle,
            chapter_slug: newVideo.chapterSlug || 'general',
            unit_name: newVideo.unitName,
            description: newVideo.description,
            thumbnail_url: newVideo.thumbnailUrl,
            is_featured: newVideo.isFeatured ?? false,
            topic_tags: newVideo.topicTags || [],
          },
        ]);
      } catch (err) {
        console.warn('Supabase remote addVideoLesson failed, saved locally:', err);
      }
    }

    return { success: true, data: newVideo };
  },

  /**
   * ADMIN: Delete a Video Lesson
   */
  async deleteVideoLesson(id: string): Promise<boolean> {
    const deletedIds = Array.from(new Set([...getFromStorage<string[]>(KEY_DELETED_VIDEOS, []), id]));
    saveToStorage(KEY_DELETED_VIDEOS, deletedIds);

    const customList = getFromStorage<VideoLesson[]>(KEY_CUSTOM_VIDEOS, []).filter((v) => v.id !== id);
    saveToStorage(KEY_CUSTOM_VIDEOS, customList);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('video_lessons').delete().or(`slug_id.eq.${id},id.eq.${id}`);
      } catch (err) {
        console.warn('Supabase remote deleteVideoLesson error:', err);
      }
    }

    return true;
  },

  /**
   * ADMIN: Fetch all student inquiries and doubts
   */
  async getAdminInquiries(): Promise<InquiryRecord[]> {
    const customList = getFromStorage<InquiryRecord[]>(KEY_CUSTOM_INQUIRIES, []);
    const deletedIds = new Set(getFromStorage<string[]>(KEY_DELETED_INQUIRIES, []));

    let baseInquiries: InquiryRecord[] = [];

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('contact_inquiries')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          baseInquiries = data as InquiryRecord[];
        } else {
          baseInquiries = MOCK_ADMIN_INQUIRIES;
        }
      } catch {
        baseInquiries = MOCK_ADMIN_INQUIRIES;
      }
    } else {
      baseInquiries = MOCK_ADMIN_INQUIRIES;
    }

    const all = [...customList, ...baseInquiries];
    const uniqueMap = new Map<string, InquiryRecord>();
    for (const inq of all) {
      if (!deletedIds.has(inq.id) && !uniqueMap.has(inq.id)) {
        uniqueMap.set(inq.id, inq);
      }
    }
    return Array.from(uniqueMap.values());
  },

  /**
   * ADMIN: Add inquiry directly (e.g. phone call / in-person doubt note)
   */
  async addInquiry(inquiry: Omit<InquiryRecord, 'id' | 'created_at'>): Promise<InquiryRecord> {
    const newRecord: InquiryRecord = {
      ...inquiry,
      id: 'inq-' + Date.now(),
      created_at: new Date().toISOString(),
    };
    const custom = getFromStorage<InquiryRecord[]>(KEY_CUSTOM_INQUIRIES, []);
    saveToStorage(KEY_CUSTOM_INQUIRIES, [newRecord, ...custom]);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('contact_inquiries').insert([
          {
            name: newRecord.name,
            email: newRecord.email,
            phone: newRecord.phone,
            course_level: newRecord.course_level,
            message: newRecord.message,
            status: newRecord.status,
          },
        ]);
      } catch (err) {
        console.warn('Supabase remote addInquiry error:', err);
      }
    }
    return newRecord;
  },

  /**
   * ADMIN: Update inquiry status (new -> in_progress -> resolved)
   */
  async updateInquiryStatus(id: string, status: 'new' | 'in_progress' | 'resolved' | 'archived'): Promise<boolean> {
    // Update local custom inquiries
    const custom = getFromStorage<InquiryRecord[]>(KEY_CUSTOM_INQUIRIES, []);
    const updated = custom.map((i) => (i.id === id ? { ...i, status } : i));
    saveToStorage(KEY_CUSTOM_INQUIRIES, updated);

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from('contact_inquiries')
          .update({ status })
          .eq('id', id);
        return !error;
      } catch {
        return false;
      }
    }
    return true;
  },

  /**
   * ADMIN: Delete an inquiry
   */
  async deleteInquiry(id: string): Promise<boolean> {
    const deletedIds = Array.from(new Set([...getFromStorage<string[]>(KEY_DELETED_INQUIRIES, []), id]));
    saveToStorage(KEY_DELETED_INQUIRIES, deletedIds);

    const custom = getFromStorage<InquiryRecord[]>(KEY_CUSTOM_INQUIRIES, []).filter((i) => i.id !== id);
    saveToStorage(KEY_CUSTOM_INQUIRIES, custom);

    if (isSupabaseConfigured) {
      try {
        await supabase
          .from('contact_inquiries')
          .delete()
          .eq('id', id);
      } catch (err) {
        console.warn('Supabase remote deleteInquiry error:', err);
      }
    }
    return true;
  },

  /**
   * ADMIN: Fetch newsletter subscribers
   */
  async getNewsletterSubscribers(): Promise<SubscriberRecord[]> {
    const customList = getFromStorage<SubscriberRecord[]>(KEY_CUSTOM_SUBSCRIBERS, []);
    const deletedIds = new Set(getFromStorage<string[]>(KEY_DELETED_SUBSCRIBERS, []));

    let baseSubs: SubscriberRecord[] = [];

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('newsletter_subscribers')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          baseSubs = data as SubscriberRecord[];
        } else {
          baseSubs = DEFAULT_SUBSCRIBERS;
        }
      } catch {
        baseSubs = DEFAULT_SUBSCRIBERS;
      }
    } else {
      baseSubs = DEFAULT_SUBSCRIBERS;
    }

    const all = [...customList, ...baseSubs];
    const uniqueMap = new Map<string, SubscriberRecord>();
    for (const sub of all) {
      if (!deletedIds.has(sub.id) && !uniqueMap.has(sub.id)) {
        uniqueMap.set(sub.id, sub);
      }
    }
    return Array.from(uniqueMap.values());
  },

  /**
   * ADMIN: Add subscriber
   */
  async addSubscriber(sub: { email?: string; phone?: string; education_level?: string }): Promise<SubscriberRecord> {
    const newRecord: SubscriberRecord = {
      id: 'sub-' + Date.now(),
      email: sub.email || null,
      phone: sub.phone || null,
      education_level: sub.education_level || 'all',
      created_at: new Date().toISOString(),
    };

    const custom = getFromStorage<SubscriberRecord[]>(KEY_CUSTOM_SUBSCRIBERS, []);
    saveToStorage(KEY_CUSTOM_SUBSCRIBERS, [newRecord, ...custom]);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('newsletter_subscribers').insert([
          {
            email: newRecord.email,
            phone: newRecord.phone,
            education_level: newRecord.education_level,
          },
        ]);
      } catch (err) {
        console.warn('Supabase remote addSubscriber error:', err);
      }
    }
    return newRecord;
  },

  /**
   * ADMIN: Delete subscriber
   */
  async deleteSubscriber(id: string): Promise<boolean> {
    const deletedIds = Array.from(new Set([...getFromStorage<string[]>(KEY_DELETED_SUBSCRIBERS, []), id]));
    saveToStorage(KEY_DELETED_SUBSCRIBERS, deletedIds);

    const custom = getFromStorage<SubscriberRecord[]>(KEY_CUSTOM_SUBSCRIBERS, []).filter((s) => s.id !== id);
    saveToStorage(KEY_CUSTOM_SUBSCRIBERS, custom);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('newsletter_subscribers').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase remote deleteSubscriber error:', err);
      }
    }
    return true;
  },
};
