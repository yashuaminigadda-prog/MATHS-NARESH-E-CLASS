/**
 * CENTRAL SITE CONFIGURATION
 * 
 * Supports environment variables from .env with fallback defaults.
 * Update Brand name, Sir's details, YouTube links and social channels.
 */

export interface SiteConfig {
  brand: {
    name: string;
    tagline: string;
    shortBio: string;
    logoSymbol: string;
    establishedYear: string;
  };
  teacher: {
    name: string;
    formalTitle: string;
    qualifications: string;
    experienceYears: string;
    videoCount?: string;
    photoUrl: string;
    bio: string;
    teachingPhilosophy: string;
  };
  youtube: {
    channelName: string;
    channelHandle: string;
    channelUrl: string;
    subscribeUrl: string;
    directVideoBaseUrl: string;
  };
  social: {
    telegramUrl: string;
    whatsappNumber: string;
    email: string;
    instagramUrl: string;
  };
  curriculumDefaults: {
    class10: string;
    intermediate: string;
    diploma: string;
    btech: string;
  };
}

export const siteConfig: SiteConfig = {
  brand: {
    name: import.meta.env.VITE_BRAND_NAME || "Maths Naresh eClass",
    tagline: import.meta.env.VITE_BRAND_TAGLINE || "Mathematics, Made Clear.",
    shortBio: import.meta.env.VITE_BRAND_SHORT_BIO || "From Class 10 foundations to Engineering Mathematics — learn every concept with clarity and confidence.",
    logoSymbol: "∑",
    establishedYear: "2024",
  },
  teacher: {
    name: import.meta.env.VITE_TEACHER_NAME || "Naresh Sir",
    formalTitle: import.meta.env.VITE_TEACHER_FORMAL_TITLE || "Senior Mathematics Educator & Academic Mentor",
    qualifications: import.meta.env.VITE_TEACHER_QUALIFICATIONS || "M.Sc. Mathematics, B.Ed",
    experienceYears: import.meta.env.VITE_TEACHER_EXPERIENCE || "12+ Years Experience",
    videoCount: "3000+ Videos",
    photoUrl: import.meta.env.VITE_TEACHER_IMAGE || "/images/naresh_sir.jpg",
    bio: "With over 12+ years of dedicated teaching experience and an extensive library of 3,000+ free video lessons on YouTube, Naresh Sir has empowered tens of thousands of students across Secondary Boards, Intermediate (+2), Polytechnic Diplomas, and Engineering Universities (M1 to M4). His mission is simple: to make world-class mathematical clarity 100% free and accessible to every learner.",
    teachingPhilosophy: "Mathematics is not about memorizing endless formulas—it is the art of seeing patterns and connecting logical steps with absolute confidence.",
  },
  youtube: {
    channelName: import.meta.env.VITE_YOUTUBE_CHANNEL_NAME || "Maths Naresh eClass",
    channelHandle: import.meta.env.VITE_YOUTUBE_CHANNEL_HANDLE || "@MathsNareshEclass",
    channelUrl: import.meta.env.VITE_YOUTUBE_CHANNEL_URL || "https://www.youtube.com/@MathsNareshEclass",
    subscribeUrl: import.meta.env.VITE_YOUTUBE_SUBSCRIBE_URL || "https://www.youtube.com/@MathsNareshEclass?sub_confirmation=1",
    directVideoBaseUrl: "https://www.youtube.com/watch?v=",
  },
  social: {
    telegramUrl: import.meta.env.VITE_TELEGRAM_URL || "https://t.me/MathsNareshEclass",
    whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || "919059057424",
    email: import.meta.env.VITE_EMAIL || "contact@mathsnaresh.com",
    instagramUrl: "https://instagram.com/mathsnaresheclass",
  },
  curriculumDefaults: {
    class10: "CBSE & State Board Integrated",
    intermediate: "CBSE Class 11-12 / State Intermediate",
    diploma: "State Board of Technical Education (Polytechnic Curricula)",
    btech: "AICTE Model / University Engineering Mathematics (M1, M2, M3, M4)",
  },
};
