// Contact.jsx
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import styles from './Contact.module.css';

// Material UI Icons
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import SendIcon from '@mui/icons-material/Send';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Contact = () => {
  const { isSignedIn, user } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Auto-fill form with Clerk user data when signed in
  useEffect(() => {
    if (isSignedIn && user) {
      setFormData(prev => ({
        ...prev,
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username || '',
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

      const response = await fetch('https://formspree.io/f/mzdoyjja', {
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
          subject: '',
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

  if (submitSuccess) {
    return (
      <div className={styles.successPage}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>✓</div>
          <h1>Message Sent!</h1>
          <p>Thank you for reaching out, {formData.name.split(' ')[0]}! We'll get back to you within 24 hours.</p>
          <button onClick={() => setSubmitSuccess(false)} className={styles.newBtn}>
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.contactPage}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1>Get in Touch</h1>
          <div className={styles.heroLine}></div>
          <p>We'd love to hear from you</p>
        </div>
      </div>

      {/* Content */}
      <div className={styles.contentContainer}>
        <div className={styles.container}>
          {/* Contact Info Cards */}
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <EmailIcon />
              </div>
              <h3>Email Us</h3>
              <p>info@equityhousing.co.za</p>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <PhoneIcon />
              </div>
              <h3>Call Us</h3>
              <p>+27 82 580 8046</p>
              <p>Mon-Fri, 9am - 5pm</p>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <LocationOnIcon />
              </div>
              <h3>Visit Us</h3>
              <p>94 Zastron St, Westdene</p>
              <p>Bloemfontein, 9300</p>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <AccessTimeIcon />
              </div>
              <h3>Office Hours</h3>
              <p>Monday - Friday: 9am - 5pm</p>
              <p>Saturday: 10am - 1pm</p>
            </div>
          </div>

          {/* Form and Map */}
          <div className={styles.formMapGrid}>
            {/* Contact Form */}
            <div className={styles.formCard}>
              <div className={styles.formHeader}>
                <h2>Send us a Message</h2>
                <p>Fill out the form below and we'll respond as soon as possible</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className={styles.formGrid}>
                  <div className={styles.inputGroup}>
                    <label>Your Name *</label>
                    <div className={styles.inputWrapper}>
                      <PersonIcon />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Email Address *</label>
                    <div className={styles.inputWrapper}>
                      <EmailIcon />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="hello@example.com"
                      />
                    </div>
                  </div>

                  <div className={styles.inputGroupFull}>
                    <label>Subject *</label>
                    <div className={styles.inputWrapper}>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="What is this regarding?"
                      />
                    </div>
                  </div>

                  <div className={styles.inputGroupFull}>
                    <label>Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us how we can help you..."
                      rows="5"
                    />
                  </div>
                </div>

                {submitError && (
                  <div className={styles.errorMsg}>{submitError}</div>
                )}

                <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : (
                    <>
                      Send Message
                      <SendIcon />
                    </>
                  )}
                </button>
              </form>

              {isSignedIn && (
                <div className={styles.signedInNote}>
                  <span>✓ Signed in as {user.firstName || user.emailAddresses[0]?.emailAddress}</span>
                </div>
              )}
            </div>

            {/* Map */}
            <div className={styles.mapCard}>
              <h3>Find Us Here</h3>
              <div className={styles.mapContainer}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.813616128893!2d26.2169696!3d-29.1121521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e8fc558c3d937d7%3A0x8b87904b8dd2fa91!2sEQUITY%20HOUSING!5e1!3m2!1sen!2sza!4v1778530986118!5m2!1sen!2sza"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Equity Residences Location"
                ></iframe>
              </div>
              <div className={styles.directionsBtn}>
                <LocationOnIcon />
                <span>Get Directions</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className={styles.socialSection}>
            <h3>Follow Us</h3>
            <div className={styles.socialLinks}>
              <a href="https://www.instagram.com/equityhousingsa/" className={styles.socialLink}>
                <InstagramIcon />
                <span>Instagram</span>
              </a>
              <a href="https://www.facebook.com/equityhousingsa" className={styles.socialLink}>
                <FacebookIcon />
                <span>Facebook</span>
              </a>
              <a href="https://api.whatsapp.com/send?phone=27825808046" className={styles.socialLink}>
                <WhatsAppIcon />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* FAQ Note */}
          <div className={styles.faqNote}>
            <p>Have a quick question? Check out our <a href="/contact">FAQs</a> or call us directly at <strong>+27 82 580 8046</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;