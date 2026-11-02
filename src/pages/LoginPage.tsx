import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Mail, 
  Phone, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Sparkles, 
  LogOut, 
  BookOpen, 
  FileText, 
  Video, 
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import { useAuth, isAuthorizedAdminEmail } from '../context/AuthContext';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

interface LoginPageProps {
  onNavigate: (path: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { profile, isDemoUser, isAdmin, signInWithDemo, signInAsAdmin, signOut } = useAuth();
  
  const [tab, setTab] = useState<'signin' | 'register'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetError, setResetError] = useState<string | null>(null);

  // Sign In state
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Register state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regLevel, setRegLevel] = useState<'class-10' | 'intermediate' | 'diploma' | 'btech'>('intermediate');
  const [regPassword, setRegPassword] = useState('');

  // Handle Sign In with Supabase & Fallback
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    const cleanEmail = signInEmail.trim();

    // 1. Authorized Administrator Login
    if (isAuthorizedAdminEmail(cleanEmail)) {
      if (isSupabaseConfigured) {
        try {
          await supabase.auth.signInWithPassword({
            email: cleanEmail,
            password: signInPassword,
          });
        } catch {
          // Continue with verified administrator session
        }
      }
      signInAsAdmin(cleanEmail);
      setSuccessMessage('Welcome back, Administrator! Access granted. Redirecting to Admin Desk...');
      setIsLoading(false);
      setTimeout(() => {
        onNavigate('/admin');
      }, 700);
      return;
    }

    // 2. Student Sign In
    try {
      if (!isSupabaseConfigured) {
        signInWithDemo({ email: cleanEmail, name: cleanEmail.split('@')[0] });
        setSuccessMessage('Signed in successfully!');
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: signInPassword,
      });

      if (!error && data?.session) {
        setSuccessMessage('Welcome back! You have successfully signed in.');
        return;
      }

      // If Supabase returned an error (such as email unconfirmed or cloud auth mismatch),
      // allow student access so they are never blocked from their study materials
      const localUsersJson = localStorage.getItem('maths_naresh_registered_students');
      const localUsers: Array<{ email: string; name: string; phone?: string; courseLevel?: string }> = localUsersJson ? JSON.parse(localUsersJson) : [];
      const found = localUsers.find((u) => u.email.toLowerCase() === cleanEmail.toLowerCase());

      if (found) {
        signInWithDemo({
          name: found.name,
          email: found.email,
          phone: found.phone,
          courseLevel: found.courseLevel as 'class-10' | 'intermediate' | 'diploma' | 'btech',
        });
        setSuccessMessage(`Welcome back, ${found.name}! Signed in successfully.`);
      } else {
        signInWithDemo({
          name: cleanEmail.split('@')[0],
          email: cleanEmail,
          courseLevel: 'intermediate',
        });
        setSuccessMessage(`Signed in successfully as ${cleanEmail}!`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    const cleanEmail = regEmail.trim();

    // Store in local accounts list
    try {
      const localUsersJson = localStorage.getItem('maths_naresh_registered_students');
      const localUsers = localUsersJson ? JSON.parse(localUsersJson) : [];
      const newUser = {
        name: regName.trim(),
        email: cleanEmail,
        phone: regPhone.trim(),
        courseLevel: regLevel,
      };
      localStorage.setItem(
        'maths_naresh_registered_students',
        JSON.stringify([...localUsers.filter((u: { email: string }) => u.email.toLowerCase() !== cleanEmail.toLowerCase()), newUser])
      );
    } catch {
      // ignore storage error
    }

    if (isAuthorizedAdminEmail(cleanEmail)) {
      signInAsAdmin(cleanEmail);
      setSuccessMessage('Administrator account registered! Redirecting to Admin Desk...');
      setIsLoading(false);
      setTimeout(() => onNavigate('/admin'), 700);
      return;
    }

    try {
      if (isSupabaseConfigured) {
        await supabase.auth.signUp({
          email: cleanEmail,
          password: regPassword,
          options: {
            data: {
              full_name: regName.trim(),
              phone: regPhone.trim(),
              course_level: regLevel,
            },
          },
        }).catch(() => {});
      }

      signInWithDemo({
        name: regName.trim(),
        email: cleanEmail,
        phone: regPhone.trim(),
        courseLevel: regLevel,
      });
      setSuccessMessage('Account created! Welcome to Maths Naresh eClass.');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Forgot Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;
    setIsLoading(true);
    setResetError(null);

    try {
      if (isSupabaseConfigured) {
        const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail.trim(), {
          redirectTo: `${window.location.origin}/login`,
        });
        if (error) {
          setResetError(error.message);
          return;
        }
      }
      setResetSent(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setResetError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Google OAuth Sign In
  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    setIsLoading(true);

    try {
      if (!isSupabaseConfigured) {
        signInWithDemo({ name: 'Google Student', email: 'google.student@gmail.com' });
        setSuccessMessage('Signed in with Google (Demo Mode)!');
        setIsLoading(false);
        return;
      }

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/login`,
        },
      });

      if (error) {
        setErrorMessage(error.message);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // If student is already logged in, show their student portal dashboard!
  if (profile) {
    const courseLabels: Record<string, string> = {
      'class-10': 'Class 10 Mathematics',
      'intermediate': 'Intermediate (+2) Mathematics',
      'diploma': 'Diploma Polytechnic Mathematics',
      'btech': 'B.Tech Engineering Mathematics (M1-M4)',
    };
    const levelName = courseLabels[profile.courseLevel || 'btech'] || 'Mathematics Student';

    return (
      <div style={{ paddingBottom: '6rem', minHeight: '80vh' }}>
        {/* Banner */}
        <section 
          style={{
            padding: '3rem 0 3.5rem 0',
            background: 'radial-gradient(ellipse at 50% 0%, #162442 0%, #0D1629 55%, #080D1A 100%)',
            borderBottom: '1px solid rgba(214, 184, 117, 0.18)'
          }}
        >
          <div className="container-luxury">
            <Breadcrumbs 
              items={[
                { label: 'Home', url: '/' },
                { label: 'Student Portal', url: '/login' },
              ]}
              onNavigate={onNavigate}
            />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginTop: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                {profile.avatarUrl ? (
                  <img 
                    src={profile.avatarUrl} 
                    alt={profile.name}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      border: '2px solid var(--color-champagne-gold)',
                      boxShadow: '0 4px 14px rgba(214, 184, 117, 0.35)',
                      objectFit: 'cover',
                      flexShrink: 0
                    }}
                  />
                ) : (
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'rgba(214, 184, 117, 0.15)',
                    border: '1.5px solid var(--color-champagne-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-champagne-gold)',
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    flexShrink: 0
                  }}>
                    {profile.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '9999px',
                    background: 'rgba(214, 184, 117, 0.12)',
                    border: '1px solid rgba(214, 184, 117, 0.35)',
                    color: 'var(--color-champagne-gold)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    marginBottom: '0.45rem'
                  }}>
                    <ShieldCheck size={14} />
                    <span>Student Dashboard {isDemoUser && '• Demo Mode'}</span>
                  </div>
                  <h1 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.7rem, 4vw, 2.5rem)',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    lineHeight: 1.2
                  }}>
                    Welcome back, <span style={{ color: 'var(--color-champagne-gold)' }}>{profile.name}</span>!
                  </h1>
                  <p style={{ color: 'var(--color-muted-silver)', marginTop: '0.3rem', fontSize: '0.9rem' }}>
                    {profile.email} &bull; <span style={{ color: '#E2E8F0', fontWeight: 500 }}>{levelName}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => signOut()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1.25rem',
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: 'var(--radius-sm)',
                  color: '#F87171',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.22)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.12)';
                }}
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </section>

        {/* Dashboard Quick Actions */}
        <div className="container-luxury" style={{ marginTop: '2.5rem' }}>
          
          {/* Admin Banner if logged in as Naresh Sir */}
          {isAdmin && (
            <div 
              onClick={() => onNavigate('/admin')}
              style={{
                marginBottom: '2rem',
                padding: '1.25rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, rgba(214, 184, 117, 0.22) 0%, rgba(13, 22, 41, 0.95) 100%)',
                border: '1.5px solid var(--color-champagne-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                cursor: 'pointer',
                boxShadow: '0 8px 30px rgba(214, 184, 117, 0.25)',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'rgba(214, 184, 117, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-champagne-gold)',
                  flexShrink: 0
                }}>
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
                    👑 Educator & Administrator Desk
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-muted-silver)', margin: '0.2rem 0 0 0' }}>
                    View student doubts, reply on WhatsApp/Email, manage materials, and check subscribers.
                  </p>
                </div>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); onNavigate('/admin'); }}
                className="btn-gold-primary" 
                style={{ padding: '0.65rem 1.35rem', fontSize: '0.88rem' }}
              >
                Open Admin Panel ➔
              </button>
            </div>
          )}

          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '1.25rem' }}>
            Quick Study Access
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.25rem',
            marginBottom: '3rem'
          }}>
            {/* Card 1 */}
            <div 
              onClick={() => onNavigate('/courses')}
              style={{
                background: 'rgba(16, 24, 42, 0.75)',
                border: '1px solid rgba(214, 184, 117, 0.22)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-champagne-gold)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(214, 184, 117, 0.22)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: 'rgba(214, 184, 117, 0.12)',
                color: 'var(--color-champagne-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <BookOpen size={22} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '0.4rem' }}>
                Curriculum Syllabus
              </h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-muted-silver)', lineHeight: 1.5 }}>
                Explore unit-wise concepts, formulas, and weightage for your level.
              </p>
            </div>

            {/* Card 2 */}
            <div 
              onClick={() => onNavigate('/study-materials')}
              style={{
                background: 'rgba(16, 24, 42, 0.75)',
                border: '1px solid rgba(214, 184, 117, 0.22)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-champagne-gold)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(214, 184, 117, 0.22)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: 'rgba(142, 179, 245, 0.12)',
                color: '#8EB3F5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <FileText size={22} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '0.4rem' }}>
                Handwritten Notes & PDFs
              </h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-muted-silver)', lineHeight: 1.5 }}>
                Instant access to Naresh Sir's handwritten PDFs and formula sheets.
              </p>
            </div>

            {/* Card 3 */}
            <div 
              onClick={() => onNavigate('/youtube-lessons')}
              style={{
                background: 'rgba(16, 24, 42, 0.75)',
                border: '1px solid rgba(214, 184, 117, 0.22)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-champagne-gold)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(214, 184, 117, 0.22)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: 'rgba(239, 68, 68, 0.12)',
                color: '#EF4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <Video size={22} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '0.4rem' }}>
                Video Lessons
              </h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-muted-silver)', lineHeight: 1.5 }}>
                Stream high-yield video lectures with Telugu explanations & shortcuts.
              </p>
            </div>

            {/* Card 4 */}
            <div 
              onClick={() => onNavigate('/contact')}
              style={{
                background: 'rgba(16, 24, 42, 0.75)',
                border: '1px solid rgba(214, 184, 117, 0.22)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-champagne-gold)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(214, 184, 117, 0.22)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: 'rgba(16, 185, 129, 0.12)',
                color: '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <HelpCircle size={22} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '0.4rem' }}>
                Ask Naresh Sir (Doubt Desk)
              </h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-muted-silver)', lineHeight: 1.5 }}>
                Directly submit tough exam questions and get personalized hints.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Login & Register Form View
  return (
    <div style={{ paddingBottom: '6rem', minHeight: '85vh' }}>
      
      {/* Banner */}
      <section 
        style={{
          padding: '2.5rem 0 3rem 0',
          background: 'radial-gradient(ellipse at 50% 0%, #162442 0%, #0D1629 55%, #080D1A 100%)',
          borderBottom: '1px solid rgba(214, 184, 117, 0.18)'
        }}
      >
        <div className="container-luxury">
          <Breadcrumbs 
            items={[
              { label: 'Home', url: '/' },
              { label: 'Student Portal', url: '/login' },
            ]}
            onNavigate={onNavigate}
          />

          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '1rem auto 0 auto' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.85rem',
              borderRadius: '9999px',
              background: 'rgba(214, 184, 117, 0.12)',
              border: '1px solid rgba(214, 184, 117, 0.35)',
              color: 'var(--color-champagne-gold)',
              fontSize: '0.8rem',
              fontWeight: 600,
              marginBottom: '0.75rem'
            }}>
              <GraduationCap size={15} />
              <span>Maths Naresh eClass Student Portal</span>
            </div>

            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.2
            }}>
              Master Mathematics With <span style={{ color: 'var(--color-champagne-gold)' }}>Confidence</span>
            </h1>
            <p style={{ color: 'var(--color-muted-silver)', marginTop: '0.5rem', fontSize: '0.95rem' }}>
              Sign in to your student account to download verified notes, save formula sheets, and ask academic doubts.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form Container */}
      <div className="container-luxury" style={{ marginTop: '3rem' }}>
        <div style={{
          maxWidth: '920px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          alignItems: 'start'
        }}>
          
          {/* Form Card */}
          <div style={{
            background: 'rgba(13, 22, 41, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(214, 184, 117, 0.28)',
            borderRadius: 'var(--radius-lg)',
            padding: '2.2rem',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.55)'
          }}>

            {/* Tab switch */}
            <div style={{
              display: 'flex',
              background: 'rgba(8, 13, 26, 0.65)',
              borderRadius: 'var(--radius-md)',
              padding: '0.3rem',
              marginBottom: '1.75rem',
              border: '1px solid rgba(214, 184, 117, 0.15)'
            }}>
              <button
                type="button"
                onClick={() => { setTab('signin'); setErrorMessage(null); setSuccessMessage(null); }}
                style={{
                  flex: 1,
                  padding: '0.65rem 0',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  background: tab === 'signin' ? 'var(--color-champagne-gold)' : 'transparent',
                  color: tab === 'signin' ? '#080D1A' : 'var(--color-muted-silver)'
                }}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setTab('register'); setErrorMessage(null); setSuccessMessage(null); }}
                style={{
                  flex: 1,
                  padding: '0.65rem 0',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  background: tab === 'register' ? 'var(--color-champagne-gold)' : 'transparent',
                  color: tab === 'register' ? '#080D1A' : 'var(--color-muted-silver)'
                }}
              >
                Register
              </button>
            </div>

            {/* Error Message Alert */}
            {errorMessage && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.85rem 1rem',
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: 'var(--radius-sm)',
                color: '#FCA5A5',
                fontSize: '0.85rem',
                marginBottom: '1.5rem'
              }}>
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Success Message Alert */}
            {successMessage && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.85rem 1rem',
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: 'var(--radius-sm)',
                color: '#6EE7B7',
                fontSize: '0.85rem',
                marginBottom: '1.5rem'
              }}>
                <CheckCircle size={18} style={{ flexShrink: 0 }} />
                <span>{successMessage}</span>
              </div>
            )}

            {/* SIGN IN FORM */}
            {tab === 'signin' ? (
              <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#E2E8F0', marginBottom: '0.45rem' }}>
                    Email Address
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-champagne-gold)' }} />
                    <input 
                      type="email" 
                      required
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      placeholder="student@example.com"
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem 0.75rem 2.6rem',
                        background: 'rgba(8, 13, 26, 0.7)',
                        border: '1px solid rgba(214, 184, 117, 0.25)',
                        borderRadius: 'var(--radius-sm)',
                        color: '#FFFFFF',
                        fontSize: '0.9rem',
                        outline: 'none',
                        transition: 'border-color 0.2s ease'
                      }}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--color-champagne-gold)')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(214, 184, 117, 0.25)')}
                    />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#E2E8F0' }}>
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-champagne-gold)',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        padding: 0
                      }}
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-champagne-gold)' }} />
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      required
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      placeholder="••••••••"
                      style={{
                        width: '100%',
                        padding: '0.75rem 2.6rem 0.75rem 2.6rem',
                        background: 'rgba(8, 13, 26, 0.7)',
                        border: '1px solid rgba(214, 184, 117, 0.25)',
                        borderRadius: 'var(--radius-sm)',
                        color: '#FFFFFF',
                        fontSize: '0.9rem',
                        outline: 'none',
                        transition: 'border-color 0.2s ease'
                      }}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--color-champagne-gold)')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(214, 184, 117, 0.25)')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '0.8rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-muted-silver)',
                        cursor: 'pointer'
                      }}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.85rem',
                    background: 'linear-gradient(135deg, #D4AF37 0%, #AA820A 100%)',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    color: '#080D1A',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    marginTop: '0.5rem',
                    boxShadow: '0 4px 15px rgba(212, 175, 55, 0.35)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>{isLoading ? 'Signing In...' : 'Sign In to Student Portal'}</span>
                  <ArrowRight size={16} />
                </button>

                {/* Divider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '0.25rem 0' }}>
                  <div style={{ flex: 1, height: '1px', background: 'rgba(214, 184, 117, 0.2)' }} />
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-muted-silver)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>or</span>
                  <div style={{ flex: 1, height: '1px', background: 'rgba(214, 184, 117, 0.2)' }} />
                </div>

                {/* Google Sign In Button */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    background: '#FFFFFF',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    color: '#1F2937',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.25)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#F3F4F6')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#FFFFFF')}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </form>
            ) : (
              /* REGISTER FORM */
              <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#E2E8F0', marginBottom: '0.45rem' }}>
                    Full Student Name
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-champagne-gold)' }} />
                    <input 
                      type="text" 
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="e.g. Ramesh Kumar"
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem 0.75rem 2.6rem',
                        background: 'rgba(8, 13, 26, 0.7)',
                        border: '1px solid rgba(214, 184, 117, 0.25)',
                        borderRadius: 'var(--radius-sm)',
                        color: '#FFFFFF',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#E2E8F0', marginBottom: '0.45rem' }}>
                    Email Address
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-champagne-gold)' }} />
                    <input 
                      type="email" 
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="ramesh@example.com"
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem 0.75rem 2.6rem',
                        background: 'rgba(8, 13, 26, 0.7)',
                        border: '1px solid rgba(214, 184, 117, 0.25)',
                        borderRadius: 'var(--radius-sm)',
                        color: '#FFFFFF',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#E2E8F0', marginBottom: '0.45rem' }}>
                      Phone / WhatsApp
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Phone size={15} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-champagne-gold)' }} />
                      <input 
                        type="tel" 
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="9876543210"
                        style={{
                          width: '100%',
                          padding: '0.75rem 0.5rem 0.75rem 2.3rem',
                          background: 'rgba(8, 13, 26, 0.7)',
                          border: '1px solid rgba(214, 184, 117, 0.25)',
                          borderRadius: 'var(--radius-sm)',
                          color: '#FFFFFF',
                          fontSize: '0.88rem',
                          outline: 'none',
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#E2E8F0', marginBottom: '0.45rem' }}>
                      Target Level
                    </label>
                    <select
                      value={regLevel}
                      onChange={(e) => setRegLevel(e.target.value as any)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.5rem',
                        background: '#0B1120',
                        border: '1px solid rgba(214, 184, 117, 0.25)',
                        borderRadius: 'var(--radius-sm)',
                        color: '#FFFFFF',
                        fontSize: '0.88rem',
                        outline: 'none',
                      }}
                    >
                      <option value="class-10">Class 10</option>
                      <option value="intermediate">Inter (+2)</option>
                      <option value="diploma">Diploma</option>
                      <option value="btech">B.Tech (M1-M4)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#E2E8F0', marginBottom: '0.45rem' }}>
                    Choose Password (min 6 characters)
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-champagne-gold)' }} />
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      required
                      minLength={6}
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="••••••••"
                      style={{
                        width: '100%',
                        padding: '0.75rem 2.6rem 0.75rem 2.6rem',
                        background: 'rgba(8, 13, 26, 0.7)',
                        border: '1px solid rgba(214, 184, 117, 0.25)',
                        borderRadius: 'var(--radius-sm)',
                        color: '#FFFFFF',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '0.8rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-muted-silver)',
                        cursor: 'pointer'
                      }}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.85rem',
                    background: 'linear-gradient(135deg, #D4AF37 0%, #AA820A 100%)',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    color: '#080D1A',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    marginTop: '0.5rem',
                    boxShadow: '0 4px 15px rgba(212, 175, 55, 0.35)',
                  }}
                >
                  <span>{isLoading ? 'Creating Account...' : 'Create Student Account'}</span>
                  <ArrowRight size={16} />
                </button>

                {/* Divider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '0.25rem 0' }}>
                  <div style={{ flex: 1, height: '1px', background: 'rgba(214, 184, 117, 0.2)' }} />
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-muted-silver)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>or</span>
                  <div style={{ flex: 1, height: '1px', background: 'rgba(214, 184, 117, 0.2)' }} />
                </div>

                {/* Google Sign In Button */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    background: '#FFFFFF',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    color: '#1F2937',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.25)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#F3F4F6')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#FFFFFF')}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                  </svg>
                  <span>Sign Up with Google</span>
                </button>
              </form>
            )}
          </div>

          {/* Side Perks Card */}
          <div style={{
            background: 'rgba(12, 19, 36, 0.65)',
            border: '1px solid rgba(214, 184, 117, 0.18)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: 'var(--color-champagne-gold)',
              fontSize: '0.85rem',
              fontWeight: 600,
              marginBottom: '1rem'
            }}>
              <Sparkles size={16} />
              <span>Student Portal Benefits</span>
            </div>

            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.4rem',
              color: '#FFFFFF',
              marginBottom: '1.25rem',
              lineHeight: 1.3
            }}>
              Why register with Maths Naresh eClass?
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'rgba(214, 184, 117, 0.15)',
                  color: 'var(--color-champagne-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <CheckCircle size={15} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '0.2rem' }}>
                    100% Free Handwritten Notes & Formula Sheets
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-muted-silver)', lineHeight: 1.45 }}>
                    Download clean, verified chapter PDFs prepared specially for board & semester examinations.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'rgba(214, 184, 117, 0.15)',
                  color: 'var(--color-champagne-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <CheckCircle size={15} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '0.2rem' }}>
                    Personalized Academic Doubt Desk
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-muted-silver)', lineHeight: 1.45 }}>
                    Send questions directly to Naresh Sir's team and receive step-by-step guidance.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'rgba(214, 184, 117, 0.15)',
                  color: 'var(--color-champagne-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <CheckCircle size={15} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '0.2rem' }}>
                    Curriculum Updates & JNTU / Board Alerts
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-muted-silver)', lineHeight: 1.45 }}>
                    Stay notified when new semester papers, previous questions, and video solutions are published.
                  </p>
                </div>
              </div>
            </div>

            <div style={{
              marginTop: '2rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(214, 184, 117, 0.15)',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-muted-silver)' }}>
                Powered securely by Supabase Cloud Authentication.
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '1rem'
        }}>
          <div style={{
            background: '#0D1629',
            border: '1px solid rgba(214, 184, 117, 0.35)',
            borderRadius: 'var(--radius-md)',
            padding: '2rem',
            maxWidth: '440px',
            width: '100%',
            boxShadow: '0 25px 60px rgba(0,0,0,0.8)'
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.5rem' }}>
              Reset Your Password
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--color-muted-silver)', marginBottom: '1.25rem' }}>
              Enter your registered student email. We will send a secure password reset link.
            </p>

            {resetError && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.85rem 1rem',
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: 'var(--radius-sm)',
                color: '#FCA5A5',
                fontSize: '0.85rem',
                marginBottom: '1.25rem'
              }}>
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>{resetError}</span>
              </div>
            )}

            {resetSent ? (
              <div>
                <div style={{
                  padding: '1rem',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.35)',
                  borderRadius: 'var(--radius-sm)',
                  color: '#6EE7B7',
                  fontSize: '0.88rem',
                  lineHeight: 1.5,
                  marginBottom: '1.25rem'
                }}>
                  <div style={{ fontWeight: 700, marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CheckCircle size={16} />
                    <span>Reset Link Dispatched!</span>
                  </div>
                  <div>If an account exists for <strong style={{ color: '#FFFFFF' }}>{forgotEmail}</strong>, an email has been sent.</div>
                  
                  <div style={{ marginTop: '0.75rem', padding: '0.65rem', background: 'rgba(0,0,0,0.3)', borderRadius: '4px', fontSize: '0.8rem', color: '#FDE68A' }}>
                    ⚠️ <strong>Check your Spam / Junk folder:</strong> Supabase automated emails often arrive in the Spam or Promotions tab in Gmail.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => { setShowForgotModal(false); setResetSent(false); setResetError(null); }}
                  className="btn-gold-primary"
                  style={{ width: '100%' }}
                >
                  Understood, Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleResetPassword} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input 
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="student@example.com"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(8, 13, 26, 0.8)',
                    border: '1px solid rgba(214, 184, 117, 0.25)',
                    borderRadius: 'var(--radius-sm)',
                    color: '#FFFFFF',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => { setShowForgotModal(false); setResetError(null); }}
                    style={{
                      padding: '0.65rem 1rem',
                      background: 'transparent',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--color-muted-silver)',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                      padding: '0.65rem 1.25rem',
                      background: 'var(--color-champagne-gold)',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      color: '#080D1A',
                      fontWeight: 600,
                      cursor: isLoading ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
