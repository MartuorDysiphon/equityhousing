// Apply.jsx
import React, { useState, useEffect } from 'react';
import { useUser, SignInButton, SignUpButton } from '@clerk/clerk-react';
import styles from './apply.module.css';

// Material UI Icons
// import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import BedIcon from '@mui/icons-material/Bed';
import SendIcon from '@mui/icons-material/Send';
import LogoutIcon from '@mui/icons-material/Logout';

const Apply = () => {
  const { isSignedIn, user, signOut } = useUser();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    institution: '',
    residence: '',
    roomType: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const residences = [
    { value: 'heather', label: 'Heather Court' },
    { value: 'mildene', label: 'Mildene Court' },
    { value: 'ashborough', label: 'Ashborough Heights' },
    { value: 'rosenhof', label: 'Rosenhof' },
    { value: 'vlu', label: 'VLU Building' }
  ];

  const roomTypes = [
    { value: 'single', label: 'Single Room - R5,000/mo' },
    { value: 'shared', label: 'Shared Room - R4,500/mo' }
  ];

  // Auto-fill form with Clerk user data when signed in
  useEffect(() => {
    if (isSignedIn && user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.primaryEmailAddress?.emailAddress || '',
      }));
    }
  }, [isSignedIn, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const form = e.target;
      const formDataToSend = new FormData(form);
      
      // Ensure firstName and lastName are included even though fields are hidden
      formDataToSend.set('firstName', formData.firstName);
      formDataToSend.set('lastName', formData.lastName);
      formDataToSend.set('email', formData.email);

      const response = await fetch('https://formspree.io/f/xojryklr', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData(prev => ({
          ...prev,
          phone: '',
          institution: '',
          residence: '',
          roomType: '',
          message: ''
        }));
      } else {
        setSubmitError('Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitError('Network error. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOut = () => {
    signOut();
  };

  // Success page after submission
  if (submitSuccess) {
    return (
      <div className={styles.successPage}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>✓</div>
          <h1>Application Sent!</h1>
          <p>Thank you, {formData.firstName}! We'll get back to you within 48 hours.</p>
          <button onClick={() => setSubmitSuccess(false)} className={styles.newBtn}>
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  // Not signed in - show auth screen
  if (!isSignedIn) {
    return (
      <div className={styles.applyPage}>
        <div className={styles.hero}>
          <div className={styles.heroOverlay}></div>
          <div className={styles.heroContent}>
            <h1>Apply for Residence</h1>
            <div className={styles.heroLine}></div>
            <p>Please sign in to continue with your application</p>
          </div>
        </div>

        <div className={styles.authContainer}>
          <div className={styles.authCard}>
            <div className={styles.authIcon}>🏠</div>
            <h2>Welcome Back</h2>
            <p>Sign in to access the application form</p>
            
            <div className={styles.authButtons}>
              <SignInButton mode="modal">
                <button className={styles.signInBtn}>Sign In</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className={styles.signUpBtn}>Create Account</button>
              </SignUpButton>
            </div>
            
            <div className={styles.authNote}>
              <p>New here? Creating an account takes less than a minute.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Signed in - show form
  return (
    <div className={styles.applyPage}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div className={styles.userBadge}>
            <span>Welcome, {user.firstName || user.username}</span>
            <button onClick={handleSignOut} className={styles.logoutBtn}>
              <LogoutIcon />
              Sign Out
            </button>
          </div>
          <h1>Apply for Residence</h1>
          <div className={styles.heroLine}></div>
          <p>Your new home is just a few clicks away</p>
        </div>
      </div>

      {/* Form */}
      <div className={styles.formContainer}>
        <div className={styles.formCard}>
          <form onSubmit={handleSubmit}>
            {/* Hidden fields for Clerk user data */}
            <input type="hidden" name="firstName" value={formData.firstName} />
            <input type="hidden" name="lastName" value={formData.lastName} />
            <input type="hidden" name="email" value={formData.email} />

            <div className={styles.userInfoPreview}>
              <div className={styles.previewItem}>
                <span className={styles.previewLabel}>Name:</span>
                <span>{formData.firstName} {formData.lastName}</span>
              </div>
              <div className={styles.previewItem}>
                <span className={styles.previewLabel}>Email:</span>
                <span>{formData.email}</span>
              </div>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label>Phone Number *</label>
                <div className={styles.inputWrapper}>
                  <PhoneIcon />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+27 XX XXX XXXX"
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>University / Institution *</label>
                <div className={styles.inputWrapper}>
                  <SchoolIcon />
                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    required
                    placeholder="University of Cape Town"
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Preferred Residence *</label>
                <div className={styles.inputWrapper}>
                  <HomeIcon />
                  <select
                    name="residence"
                    value={formData.residence}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select residence</option>
                    {residences.map(r => (
                      <option key={r.value} value={r.label}>{r.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Room Type *</label>
                <div className={styles.inputWrapper}>
                  <BedIcon />
                  <select
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select room type</option>
                    {roomTypes.map(r => (
                      <option key={r.value} value={r.label}>{r.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.inputGroupFull}>
                <label>Additional Information (Optional)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Any special requirements or questions?"
                  rows="3"
                />
              </div>
            </div>

            {submitError && (
              <div className={styles.errorMsg}>{submitError}</div>
            )}

            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : (
                <>
                  Submit Application
                  <SendIcon />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Apply;