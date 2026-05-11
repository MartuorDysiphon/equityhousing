// StudentLife.jsx
import React, { useState } from 'react';
import { useUser, SignInButton, SignUpButton } from '@clerk/clerk-react';
import styles from './Student.module.css';

// Material UI Icons
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import StarIcon from '@mui/icons-material/Star';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SendIcon from '@mui/icons-material/Send';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

// Sample images - replace with your actual images
// Sample images - replace with your actual images
import studyLoungeImg from '../../assets/student/img (1).jpg';
import gameNightImg from '../../assets/student/img (4).jpg';
import gymImg from '../../assets/student/img (3).jpg';
import cafeImg from '../../assets/student/img (6).jpg';
// import eventImg from '../../assets/student/img (5).jpg';
import rooftopImg from '../../assets/student/img (5).jpg';

const StudentLife = () => {
  const { isSignedIn, user, signOut } = useUser();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRSVPModal, setShowRSVPModal] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    age: '',
    dietaryRestrictions: '',
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState(null);

  const events = [
    { 
      id: 1,
      title: "Welcome Braai", 
      date: "2024-02-15", 
      time: "17:00", 
      endTime: "21:00",
      location: "Rooftop Terrace",
      attendees: 120,
      maxAttendees: 150,
      description: "Join us for our annual welcome braai! Meet new friends, enjoy free food.",
      image: rooftopImg
    },
    { 
      id: 2,
      title: "Study Skills Workshop", 
      date: "2024-02-20", 
      time: "14:00", 
      endTime: "16:00",
      location: "Study Lounge B",
      attendees: 45,
      maxAttendees: 60,
      description: "Learn proven study techniques and time management strategies.",
      image: studyLoungeImg
    },
    { 
      id: 3,
      title: "Fitness Challenge", 
      date: "2024-03-01", 
      time: "07:30", 
      endTime: "08:30",
      location: "Gym",
      attendees: 30,
      maxAttendees: 40,
      description: "Kickstart your month with our fitness challenge! Prizes for top performers.",
      image: gymImg
    },
    { 
      id: 4,
      title: "Game Tournament", 
      date: "2024-03-05", 
      time: "18:00", 
      endTime: "22:00",
      location: "Entertainment Room",
      attendees: 60,
      maxAttendees: 80,
      description: "Fortnite, FIFA, and board game tournaments. Bring your A-game!",
      image: gameNightImg
    }
  ];

  const testimonials = [
    {
      name: "Jessica M.",
      course: "Business Management",
      text: "The study lounges are my favorite spot. I've met so many friends while studying.",
      rating: 5
    },
    {
      name: "Thabo K.",
      course: "Computer Science",
      text: "The game nights and social events helped me find my people.",
      rating: 5
    },
    {
      name: "Lerato S.",
      course: "Law",
      text: "Having a gym on-site saved me. Early morning workouts keep me energized.",
      rating: 5
    }
  ];

  const galleryImages = [
    { src: rooftopImg, caption: "Rooftop Braai Nights", large: true },
    { src: studyLoungeImg, caption: "Study Lounges", large: false },
    { src: gameNightImg, caption: "Game Tournaments", large: false },
    { src: gymImg, caption: "Fitness Center", large: false },
    { src: cafeImg, caption: "Coffee & Chat", large: false }
  ];

  const generateTicketNumber = () => {
    const prefix = 'EQ';
    const date = new Date().toISOString().slice(2, 10).replace(/-/g, '');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${prefix}${date}${random}`;
  };

  const handleRSVPClick = (event) => {
    if (!isSignedIn) return;
    setSelectedEvent(event);
    setShowRSVPModal(true);
    setSubmitError('');
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRSVPSubmit = async (e) => {
    e.preventDefault();
    
    const ageNum = parseInt(formData.age);
    if (ageNum < 18) {
      setSubmitError('You must be 18 or older to RSVP for events.');
      return;
    }
    
    if (!formData.phone) {
      setSubmitError('Phone number is required.');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');

    const ticketNumber = generateTicketNumber();
    const rsvpData = {
      ticketNumber,
      eventName: selectedEvent.title,
      eventDate: selectedEvent.date,
      eventTime: `${selectedEvent.time} - ${selectedEvent.endTime}`,
      eventLocation: selectedEvent.location,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.primaryEmailAddress?.emailAddress || '',
      phone: formData.phone,
      age: formData.age,
      dietaryRestrictions: formData.dietaryRestrictions,
      specialRequests: formData.specialRequests,
      rsvpDate: new Date().toISOString()
    };

    try {
      const formspreeData = new FormData();
      Object.entries(rsvpData).forEach(([key, value]) => {
        formspreeData.append(key, value);
      });

      const response = await fetch('https://formspree.io/f/xwvyaaeq', {
        method: 'POST',
        body: formspreeData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setSubmittedTicket(rsvpData);
        setShowRSVPModal(false);
        setFormData({ phone: '', age: '', dietaryRestrictions: '', specialRequests: '' });
      } else {
        setSubmitError('Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitError('Network error. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadTicket = () => {
    const content = `EQUITY RESIDENCES - EVENT TICKET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TICKET NUMBER: ${submittedTicket.ticketNumber}

EVENT DETAILS:
Event: ${submittedTicket.eventName}
Date: ${submittedTicket.eventDate}
Time: ${submittedTicket.eventTime}
Location: ${submittedTicket.eventLocation}

ATTENDEE:
Name: ${submittedTicket.firstName} ${submittedTicket.lastName}
Email: ${submittedTicket.email}
Phone: ${submittedTicket.phone}
Age: ${submittedTicket.age}

${submittedTicket.dietaryRestrictions ? `Dietary: ${submittedTicket.dietaryRestrictions}` : ''}
${submittedTicket.specialRequests ? `Special Requests: ${submittedTicket.specialRequests}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Please present this ticket at the entrance.`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Equity_Ticket_${submittedTicket.ticketNumber}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Not signed in view
  if (!isSignedIn) {
    return (
      <div className={styles.page}>
        <div className={styles.videoSection}>
          <div className={styles.videoOverlay}></div>
          <div className={styles.videoContent}>
            <h2>Take a Video Tour</h2>
            <div className={styles.redLine}></div>
            <p>See what life is really like in our community.</p>
            <button className={styles.videoBtn}>
              <PlayArrowIcon /> Watch Tour
            </button>
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.badge}>Upcoming Events</span>
            <h2>Don't Miss Out</h2>
            <p>Sign in to RSVP for events</p>
          </div>

          <div className={styles.eventsGrid}>
            {events.map(event => (
              <div key={event.id} className={styles.eventCard}>
                <div className={styles.eventDate}>
                  <span className={styles.eventDay}>{new Date(event.date).getDate()}</span>
                  <span className={styles.eventMonth}>{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                </div>
                <div className={styles.eventInfo}>
                  <h4>{event.title}</h4>
                  <div className={styles.eventMeta}>
                    <span><AccessTimeIcon /> {event.time}</span>
                    <span><LocationOnIcon /> {event.location}</span>
                    <span><PeopleIcon /> {event.attendees}/{event.maxAttendees}</span>
                  </div>
                  <SignInButton mode="modal">
                    <button className={styles.eventBtn}>Sign in to RSVP</button>
                  </SignInButton>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2>Ready to Experience Student Life?</h2>
            <p>Sign in to join our community and RSVP for events.</p>
            <div className={styles.ctaButtons}>
              <SignInButton mode="modal">
                <button className={styles.ctaPrimary}>Sign In</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className={styles.ctaSecondary}>Create Account</button>
              </SignUpButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Signed in view
  return (
    <div className={styles.page}>
      {/* Video Section */}
      <div className={styles.videoSection}>
        <div className={styles.videoOverlay}></div>
        <div className={styles.videoContent}>
          <div className={styles.userBar}>
            <span>Welcome, {user.firstName || user.username}</span>
            <button onClick={() => signOut()} className={styles.logoutBtn}>Sign Out</button>
          </div>
          <h2>Take a Video Tour</h2>
          <div className={styles.redLine}></div>
          <p>See what life is really like in our community.</p>
          <button className={styles.videoBtn}>
            <PlayArrowIcon /> Watch Tour
          </button>
        </div>
      </div>

      {/* Events Section */}
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2>Don't Miss Out</h2>
          <p>Join the fun — there's always something happening</p>
        </div>

        <div className={styles.eventsGrid}>
          {events.map(event => (
            <div key={event.id} className={styles.eventCard}>
              <div className={styles.eventDate}>
                <span className={styles.eventDay}>{new Date(event.date).getDate()}</span>
                <span className={styles.eventMonth}>{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
              </div>
              <div className={styles.eventInfo}>
                <h4>{event.title}</h4>
                <div className={styles.eventMeta}>
                  <span><AccessTimeIcon /> {event.time} - {event.endTime}</span>
                  <span><LocationOnIcon /> {event.location}</span>
                  <span><PeopleIcon /> {event.attendees}/{event.maxAttendees}</span>
                </div>
                <p className={styles.eventDesc}>{event.description}</p>
                <button 
                  onClick={() => handleRSVPClick(event)} 
                  className={styles.eventBtn}
                  disabled={event.attendees >= event.maxAttendees}
                >
                  {event.attendees >= event.maxAttendees ? 'Sold Out' : 'RSVP Now'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className={styles.testimonialsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>What Our Residents Say</h2>
            <p>Join 500+ happy students who call this home</p>
          </div>

          <div className={styles.testimonialsGrid}>
            {testimonials.map((t, idx) => (
              <div key={idx} className={styles.testimonialCard}>
                <div className={styles.quote}>“</div>
                <p>{t.text}</p>
                <div className={styles.stars}>
                  {[...Array(t.rating)].map((_, i) => <StarIcon key={i} />)}
                </div>
                <div className={styles.author}>
                  <strong>{t.name}</strong>
                  <span>{t.course}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className={styles.gallerySection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Life in Photos</h2>
            <p>A glimpse into daily life at our residences</p>
          </div>

          <div className={styles.galleryGrid}>
            {galleryImages.map((img, idx) => (
              <div key={idx} className={`${styles.galleryItem} ${img.large ? styles.galleryLarge : ''}`}>
                <img src={img.src} alt={img.caption} />
                <div className={styles.caption}>{img.caption}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2>Ready to Experience Student Life at Its Best?</h2>
          <p>Book a tour and see for yourself what makes our community special</p>
          <div className={styles.ctaButtons}>
            <a href='/contact' className={styles.ctaPrimary}>Schedule a Tour</a>
            <a href='/contact' className={styles.ctaSecondary}>Chat with Students</a>
          </div>
        </div>
      </div>

      {/* RSVP Modal */}
      {showRSVPModal && selectedEvent && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.modalClose} onClick={() => setShowRSVPModal(false)}>
              <CloseIcon />
            </button>
            <div className={styles.modalHeader}>
              <ConfirmationNumberIcon />
              <h3>RSVP for {selectedEvent.title}</h3>
            </div>
            
            <div className={styles.eventDetails}>
              <p><CalendarTodayIcon /> {new Date(selectedEvent.date).toLocaleDateString()}</p>
              <p><AccessTimeIcon /> {selectedEvent.time} - {selectedEvent.endTime}</p>
              <p><LocationOnIcon /> {selectedEvent.location}</p>
            </div>
            
            <form onSubmit={handleRSVPSubmit}>
              <div className={styles.formGroup}>
                <label>Full Name</label>
                <input type="text" value={`${user.firstName || ''} ${user.lastName || ''}`} disabled />
              </div>
              
              <div className={styles.formGroup}>
                <label>Email</label>
                <input type="email" value={user.primaryEmailAddress?.emailAddress || ''} disabled />
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Phone Number *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} required placeholder="+27 XX XXX XXXX" />
                </div>
                <div className={styles.formGroup}>
                  <label>Age *</label>
                  <input type="number" name="age" value={formData.age} onChange={handleFormChange} required min="18" max="100" placeholder="18" />
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label>Dietary Restrictions</label>
                <input type="text" name="dietaryRestrictions" value={formData.dietaryRestrictions} onChange={handleFormChange} placeholder="Vegetarian, Halal, Allergies, etc." />
              </div>
              
              <div className={styles.formGroup}>
                <label>Special Requests</label>
                <textarea name="specialRequests" value={formData.specialRequests} onChange={handleFormChange} rows="2" placeholder="Any accessibility needs or special accommodations?" />
              </div>
              
              {submitError && <div className={styles.errorMsg}>{submitError}</div>}
              
              <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : <>Confirm RSVP <SendIcon /></>}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Ticket Modal */}
      {submittedTicket && (
        <div className={styles.modal}>
          <div className={styles.ticketContent}>
            <button className={styles.modalClose} onClick={() => setSubmittedTicket(null)}>
              <CloseIcon />
            </button>
            <div className={styles.ticketHeader}>
              <div className={styles.ticketIcon}>🎟️</div>
              <h3>RSVP Confirmed!</h3>
              <p>Your ticket has been reserved</p>
            </div>
            
            <div className={styles.ticketBody}>
              <div className={styles.ticketNumber}>
                <span>Ticket Number</span>
                <strong>{submittedTicket.ticketNumber}</strong>
              </div>
              <div className={styles.ticketInfo}>
                <div><span>Event:</span> <strong>{submittedTicket.eventName}</strong></div>
                <div><span>Date:</span> <strong>{new Date(submittedTicket.eventDate).toLocaleDateString()}</strong></div>
                <div><span>Time:</span> <strong>{submittedTicket.eventTime}</strong></div>
                <div><span>Location:</span> <strong>{submittedTicket.eventLocation}</strong></div>
                <div><span>Attendee:</span> <strong>{submittedTicket.firstName} {submittedTicket.lastName}</strong></div>
              </div>
            </div>
            
            <div className={styles.ticketActions}>
              <button onClick={downloadTicket} className={styles.downloadBtn}>
                <DownloadIcon /> Download Ticket
              </button>
              <button onClick={() => setSubmittedTicket(null)} className={styles.doneBtn}>Done</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentLife;