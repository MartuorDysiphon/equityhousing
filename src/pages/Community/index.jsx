// Community.jsx
import React, { useState } from 'react';
import styles from './Community.module.css';

// Material UI Icons
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HandshakeIcon from '@mui/icons-material/Handshake';
import GrassIcon from '@mui/icons-material/Grass';
import GroupIcon from '@mui/icons-material/Group';
import ChatIcon from '@mui/icons-material/Chat';
import GradeIcon from '@mui/icons-material/Grade';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Diversity3Icon from '@mui/icons-material/Diversity3';
// import SecurityIcon from '@mui/icons-material/Security';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import CampaignIcon from '@mui/icons-material/Campaign';
import CelebrationIcon from '@mui/icons-material/Celebration';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SchoolIcon from '@mui/icons-material/School';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ForumIcon from '@mui/icons-material/Forum';

// Owner of Equity image - you'll need to add this
import ownerImage from '../../assets/feature/funders.jpg';

const Community = () => {
  const [copied, setCopied] = useState(false);

  const whatsappLink = "https://chat.whatsapp.com/K3xVpLqR7sT9uVwXyZ1234";
  const inviteCode = "K3xVpLqR7sT9";

  const copyInviteCode = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const values = [
    {
      icon: <FavoriteIcon sx={{ fontSize: 32 }} />,
      title: "Mutual Respect",
      description: "We celebrate differences and treat every resident with dignity, regardless of background, beliefs, or identity."
    },
    {
      icon: <HandshakeIcon sx={{ fontSize: 32 }} />,
      title: "Collective Responsibility",
      description: "Your space. Our shared home. We take pride in keeping our community clean, safe, and welcoming for everyone."
    },
    {
      icon: <GrassIcon sx={{ fontSize: 32 }} />,
      title: "Sustainable Living",
      description: "Eco-conscious choices in energy, water, and waste. Small actions today protect tomorrow."
    },
    {
      icon: <Diversity3Icon sx={{ fontSize: 32 }} />,
      title: "Inclusive Community",
      description: "Everyone belongs here. We actively create spaces where all voices are heard and valued."
    },
    {
      icon: <ChatIcon sx={{ fontSize: 32 }} />,
      title: "Open Communication",
      description: "Speak up, listen well, resolve conflicts with empathy. Your concerns matter."
    },
    {
      icon: <GradeIcon sx={{ fontSize: 32 }} />,
      title: "Lead with Integrity",
      description: "Honesty, accountability, and fairness guide every interaction — from roommates to management."
    }
  ];

  const ethicalPractices = [
    "Share common spaces with care — clean up after yourself",
    "Respect quiet hours (10 PM – 7 AM) for study and rest",
    "No discrimination, harassment, or bullying — zero tolerance policy",
    "Report maintenance issues promptly — we fix things fast",
    "Conserve water and electricity — flip switches, close taps",
    "Attend community meetings — your voice shapes our home"
  ];

  const whatsappFeatures = [
    { icon: <CampaignIcon sx={{ fontSize: 16 }} />, label: "Announcements" },
    { icon: <CelebrationIcon sx={{ fontSize: 16 }} />, label: "Events" },
    { icon: <ShoppingCartIcon sx={{ fontSize: 16 }} />, label: "Buy/Sell" },
    { icon: <SchoolIcon sx={{ fontSize: 16 }} />, label: "Study Groups" },
    { icon: <DirectionsCarIcon sx={{ fontSize: 16 }} />, label: "Ride Share" },
    { icon: <ForumIcon sx={{ fontSize: 16 }} />, label: "24/7 Chat" }
  ];

  return (
    <div className={styles.communityPage}>
      
      {/* Hero Section */}
      <section className={styles.communityHero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          {/* <p className={styles.heroSubheader}>Our Culture</p> */}
          <h1 className={styles.heroHeader}>A Community Built on Equity & Ethics</h1>
          <div className={styles.heroUnderline}></div>
          <p className={styles.heroText}>
            More than just a place to live — we're a family that believes in fairness, 
            respect, and lifting each other up. Join a community where everyone thrives.
          </p>
        </div>
      </section>

      {/* Owner of Equity Section */}
      <section className={styles.ownerSection}>
        <div className={styles.container}>
          <div className={styles.ownerGrid}>
            <div className={styles.ownerImageWrapper}>
              <div className={styles.ownerImage}>
                <img src={ownerImage} alt="Theuns Myburgh - Owner of Equity" />
                <div className={styles.imageAccent}></div>
              </div>
              <div className={styles.ownerBadge}>
                <VolunteerActivismIcon sx={{ fontSize: 14, marginRight: '6px' }} />
                <span>Founder & Owner of Equity</span>
              </div>
            </div>
            <div className={styles.ownerContent}>
              <p className={styles.ownerTagline}>Meet The Visionary</p>
              <h2>Theuns Myburgh</h2>
              <h3>Owner of Equity — Your Home, Your Fair Share</h3>
              <p className={styles.ownerBio}>
                "I started this community because I believe that every student deserves 
                a home that treats them fairly. Not just a room — a place where you're 
                seen, heard, and valued. Equity isn't a buzzword here; it's the foundation 
                of how we operate. From transparent pricing to inclusive policies, 
                everything we do is about giving you what you deserve."
              </p>
              <div className={styles.ownerQuote}>
                <span className={styles.quoteMark}>"</span>
                <p>Your success is our success. Welcome home.</p>
              </div>
              <div className={styles.ownerSignature}>
                <span>— Theuns Myburgh</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Grid */}
      <section className={styles.valuesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Values That Guide Us Every Day</h2>
            <p>These aren't just words on a wall — they're how we treat each other, every single day.</p>
          </div>
          <div className={styles.valuesGrid}>
            {values.map((value, index) => (
              <div 
                key={value.title} 
                className={styles.valueCard}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className={styles.valueIcon}>
                  {value.icon}
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ethical Practices Banner */}
      <section className={styles.ethicsSection}>
        <div className={styles.ethicsContent}>
          <div className={styles.ethicsLeft}>
            <p className={styles.ethicsSubheader}>Living By Example</p>
            <h2>Ethical Ways to Live By</h2>
            <div className={styles.ethicsUnderline}></div>
            <p>Simple, powerful principles that make our community stronger, safer, and better for everyone.</p>
          </div>
          <div className={styles.ethicsRight}>
            <ul className={styles.ethicsList}>
              {ethicalPractices.map((practice, idx) => (
                <li key={idx}>
                  <CheckCircleIcon sx={{ fontSize: 18, color: '#C0201F', flexShrink: 0 }} />
                  {practice}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* WhatsApp Community Section */}
      <section className={styles.whatsappSection}>
        <div className={styles.container}>
          <div className={styles.whatsappCard}>
            <div className={styles.whatsappIconLarge}>
              <WhatsAppIcon sx={{ fontSize: 48, color: 'white' }} />
            </div>
            <h2>Join Our WhatsApp Community</h2>
            <p>
              Get instant updates, connect with neighbors, share ride requests, 
              find study buddies, and stay in the loop with community events.
              <strong> 340+ residents already inside!</strong>
            </p>
            
            <div className={styles.inviteBox}>
              <div className={styles.inviteCode}>
                <span className={styles.codeLabel}>Invite Code:</span>
                <code>{inviteCode}</code>
                <button onClick={copyInviteCode} className={styles.copyBtn}>
                  <ContentCopyIcon sx={{ fontSize: 14, marginRight: '4px' }} />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <a 
                href={whatsappLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.joinButton}
              >
                <WhatsAppIcon sx={{ fontSize: 18 }} />
                Join WhatsApp Group
                <ArrowForwardIcon sx={{ fontSize: 16 }} />
              </a>
            </div>

            <div className={styles.whatsappFeatures}>
              {whatsappFeatures.map((feature, idx) => (
                <div key={idx} className={styles.feature}>
                  {feature.icon}
                  <span>{feature.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Connect With Us */}
      <section className={styles.connectSection}>
        <div className={styles.connectContent}>
          <h2>Ready to Be Part of Something Greater?</h2>
          <div className={styles.connectDivider}></div>
          <p>
            Join a community where every voice matters, every resident is valued, 
            and everyone has an equal opportunity to thrive.
          </p>
          <div className={styles.connectButtons}>
            <a href='/contact' className={styles.connectPrimaryBtn}>
              <ChatIcon sx={{ fontSize: 16, marginRight: '8px' }} />
              Schedule a Visit
            </a>
            <a href='/contact' className={styles.connectSecondaryBtn}>
              <GroupIcon sx={{ fontSize: 16, marginRight: '8px' }} />
              Meet Our Residents
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Community;