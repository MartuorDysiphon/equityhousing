// Features.jsx
import React from 'react';
import styles from './Features.module.css';

import securityImg from '../../assets/feature/guards.jpg';
import cctvImg from '../../assets/feature/cctv.jpg';
import entertainmentImg from '../../assets/feature/pool.jpg';
import recreationalImg from '../../assets/feature/packing.webp';
import biometricImg from '../../assets/feature/bio1.jpg';
import wifiImg from '../../assets/feature/office.jpg';
import furnishedImg from '../../assets/feature/furnished.jpg';

const features = [
  {
    id: 1,
    title: 'High Class Security',
    description: '24/7 professional security personnel ensuring a safe and secure living environment for all residents.',
    image: securityImg,
    detail: 'Trained guards & emergency response'
  },
  {
    id: 2,
    title: '24 Hours CCTV',
    description: 'Strategically placed cameras covering all common areas, entry points, and parking zones for complete peace of mind.',
    image: cctvImg,
    detail: 'HD recording & remote monitoring'
  },
  {
    id: 3,
    title: 'Entertainment Room',
    description: 'Dedicated space with gaming consoles, big-screen TV, board games, and comfortable seating for social evenings.',
    image: entertainmentImg,
    detail: '65" 4K TV & Pool Tables'
  },
  {
    id: 4,
    title: 'Recreational Spaces',
    description: 'Beautiful landscaped gardens, rooftop terraces, and indoor lounges designed for relaxation and socializing.',
    image: recreationalImg,
    detail: 'BBQ area & Play Area'
  },
  {
    id: 5,
    title: 'Biometric Access',
    description: 'State-of-the-art fingerprint and keycard entry systems for dormitories and private rooms.',
    image: biometricImg,
    detail: 'Fingerprint'
  },
  {
    id: 6,
    title: 'High-Speed WiFi',
    description: 'Fast, reliable internet throughout the property with dedicated bandwidth for streaming and online classes.',
    image: wifiImg,
    detail: 'Quality Wifi & 24/7 support'
  },
  {
    id: 7,
    title: 'Fully Furnished Rooms',
    description: 'Move-in ready rooms with modern furniture, including bed, desk, wardrobe, and storage solutions.',
    image: furnishedImg,
    detail: 'Bed + mattress + desk + chair + wardrobe + shelves'
  }
];

const Features = () => {
  return (
    <div className={styles.featuresPage}>

      {/* Features Grid */}
      <section className={styles.featuresGridSection}>
        <div className={styles.container}>
          <div className={styles.gridHeader}>
            <h2>Everything You Need, Nothing You Don't</h2>
            <p>From security to entertainment, we've thought of every detail to enhance your student experience.</p>
          </div>

          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div 
                key={feature.id} 
                className={styles.featureCard}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className={styles.cardImage}>
                  <img src={feature.image} alt={feature.title} />
                </div>
                <div className={styles.cardContent}>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <div className={styles.featureDetail}>
                    <span className={styles.detailDot}></span>
                    <span>{feature.detail}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;