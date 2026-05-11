import React, { useState } from 'react';
import styles from './Residences.module.css';
import heartIcon from '../../assets/icon/heart.svg';
import lockIcon from '../../assets/icon/lock.svg';
import carIcon from '../../assets/icon/car-front.svg';
import { Link } from 'react-router-dom';

import heatherImg from '../../assets/quick/2.-Heather-Court-IMG_4916.jpg';
import mildeneImg from '../../assets/quick/3.-Mildene-Court-IMG_4910-1.jpg';
import ashboroughImg from '../../assets/quick/4.-Ashborough-Heights-IMG_4909.jpg';
import rosenhofImg from '../../assets/quick/1.-Rosenhof-IMG_4911.jpg';
import vluImg from '../../assets/quick/VLU-Building.jpg';
import comingSoonImg from '../../assets/cs.jpg';

const heatherGallery = [heatherImg, "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop", "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&h=500&fit=crop"];
const mildeneGallery = [mildeneImg, "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=500&fit=crop", "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=500&fit=crop"];
const ashboroughGallery = [ashboroughImg, "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=500&fit=crop", "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=800&h=500&fit=crop"];
const rosenhofGallery = [rosenhofImg, "https://images.unsplash.com/photo-1560185009-5e34b44af0a9?w=800&h=500&fit=crop", "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=500&fit=crop"];
const vluGallery = [vluImg, "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=500&fit=crop", "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&h=500&fit=crop"];

const accommodations = [
  {
    id: 1,
    name: "Heather Court",
    description: "Comfortable and secure, designed for focused living and relaxation. Fully furnished with modern amenities.",
    images: heatherGallery,
    pricing: { single: 5000, shared: 4500 },
    link: "/heather"
  },
  {
    id: 2,
    name: "Mildene Court",
    description: "Classic and convenient, ideal for students who value easy living. Close to campus and transport.",
    images: mildeneGallery,
    pricing: { single: 5000, shared: 4500 },
    link: "/meldine"
  },
  {
    id: 3,
    name: "Ashborough Heights",
    description: "Stylish and private, offering a calm space for academic success. Premium finishes throughout.",
    images: ashboroughGallery,
    pricing: { single: 5000, shared: 4500 },
    link: "/ashbrough"
  },
  {
    id: 4,
    name: "Rosenhof",
    description: "Practical and welcoming, perfect for building friendships and routines. Great community vibe.",
    images: rosenhofGallery,
    pricing: { single: 5000, shared: 4500 },
    link: "/rosenhof"
  },
  {
    id: 5,
    name: "VLU Building",
    description: "Fresh and fully equipped, a smart choice for students who want quality and independence.",
    images: vluGallery,
    pricing: { single: 5000, shared: 4500 },
    link: "/vlu"
  },
  {
    id: 6,
    name: "Coming Soon",
    description: "A new residence is on the way. Stay tuned for premium living spaces launching soon.",
    images: [comingSoonImg, comingSoonImg, comingSoonImg],
    pricing: null,
    link: "/contact",
    isComingSoon: true
  }
];

const Residences = () => {
  const [currentIndices, setCurrentIndices] = useState(accommodations.map(() => 0));

  const nextImage = (idx) => {
    setCurrentIndices(prev => {
      const next = [...prev];
      next[idx] = (next[idx] + 1) % accommodations[idx].images.length;
      return next;
    });
  };

  const prevImage = (idx) => {
    setCurrentIndices(prev => {
      const next = [...prev];
      next[idx] = (next[idx] - 1 + accommodations[idx].images.length) % accommodations[idx].images.length;
      return next;
    });
  };

  return (
    <div className={styles.sectionContainer} id="accommodations">

      {/* Header */}
      <div className={styles.exploreHeader}>
        <h2 className={styles.sectionHeader}>The Most Memorable Student Life Starts Here.</h2>
        <p className={styles.sectionSubheader}>With Accommodations</p>
        <div className={styles.headerUnderline} />
      </div>

      {/* Grid */}
      <div className={styles.roomGrid}>
        {accommodations.map((acc, idx) => (
          <div className={styles.roomCard} key={acc.id}>

            {/* Image */}
            <div className={styles.roomCardImage}>
              <img
                className={styles.accImg}
                src={acc.images[currentIndices[idx]]}
                alt={acc.name}
              />

              {acc.images.length > 1 && !acc.isComingSoon && (
                <>
                  <button className={`${styles.carouselBtn} ${styles.carouselPrev}`} onClick={() => prevImage(idx)}>‹</button>
                  <button className={`${styles.carouselBtn} ${styles.carouselNext}`} onClick={() => nextImage(idx)}>›</button>
                  <div className={styles.imageCounter}>
                    {currentIndices[idx] + 1} / {acc.images.length}
                  </div>
                </>
              )}

              <div className={styles.roomCardIcons}>
                <span><img src={heartIcon} alt="favourite" /></span>
                <span><img src={lockIcon} alt="secure" /></span>
                <span><img src={carIcon} alt="parking" /></span>
              </div>
            </div>

            {/* Details */}
            <div className={styles.roomCardDetails}>
              <h4>{acc.name}</h4>
              <p className={styles.roomDesc}>{acc.description}</p>

              {/* Pricing */}
              {!acc.isComingSoon && acc.pricing && (
                <div className={styles.pricingSection}>
                  <div className={styles.priceItem}>
                    <span className={styles.priceLabel}>Single Room</span>
                    <span className={styles.priceValue}>R{acc.pricing.single}<small>/mo</small></span>
                  </div>
                  <div className={styles.priceItem}>
                    <span className={styles.priceLabel}>Shared Room</span>
                    <span className={styles.priceValue}>R{acc.pricing.shared}<small>/mo</small></span>
                  </div>
                </div>
              )}

              {acc.isComingSoon && (
                <div className={styles.comingSoonBadge}>
                  <span>Register for updates</span>
                </div>
              )}

              <Link to={acc.link} className={styles.btn1}>
                {acc.isComingSoon ? 'Notify Me' : 'View Details'}
              </Link>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Residences;