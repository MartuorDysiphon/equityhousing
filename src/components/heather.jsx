import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  KingBed,
  Chair,
  Balcony,
  Light,
  TableRestaurant,
  Window,
  Shower,
  Bathtub,
  Wash,
  Elevator,
  Security,
  Wifi,
  FitnessCenter,
  LocalLaundryService,
  Kitchen,
  Countertops,
  LocalCafe,
  MeetingRoom,
  DirectionsCar,
  ZoomIn,
  Place
} from '@mui/icons-material';

import heatherExternal from '../assets/components/heather/2.-Heather-Court-IMG_4916.jpg';
import heatherInternal1 from '../assets/components/heather/H1.jpg';
import heatherInternal2 from '../assets/components/heather/H2.jpg';
import heatherInternal3 from '../assets/components/heather/H7.jpg';
import heatherInternal4 from '../assets/components/heather/H8.jpg';

import './components.css';

const Heather = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showGallery, setShowGallery] = useState(false);

  const images = [
    { 
      id: 1, 
      type: 'external', 
      title: 'heather Exterior', 
      description: 'Architectural Design',
      src: heatherExternal
    },
    { 
      id: 2, 
      type: 'internal', 
      title: 'Sharing Suite', 
      description: 'Premium Living Space',
      src: heatherInternal1
    },
    { 
      id: 3, 
      type: 'internal', 
      title: 'Kitchen Sanctuary', 
      description: 'Food Preparation Area',
      src: heatherInternal2
    },
    { 
      id: 4, 
      type: 'internal', 
      title: 'Decent Bathroom', 
      description: 'Clinical Cleanliness',
      src: heatherInternal3
    },
    { 
      id: 5, 
      type: 'internal', 
      title: 'Persona study Area', 
      description: 'Focused Academic Space',
      src: heatherInternal4
    }
  ];

  const openGallery = (imageIndex) => {
    setSelectedImage(imageIndex);
    setShowGallery(true);
  };

  const closeGallery = () => {
    setShowGallery(false);
    setSelectedImage(null);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="luxury-page">
      <header className="luxury-hero">
        <div className="luxury-hero-content">
          <div className="brand-watermark">Equity Housing</div>
          <h1 className="luxury-title">Heather Court</h1>
          <div className="luxury-indicators">
            <div className="indicator">
              <Place fontSize="small" />
              <span>18 BARNES STREET</span>
            </div>
            <div className="indicator">
              <Elevator fontSize="small" />
              <span>Friendly Stairs</span>
            </div>
            <div className="indicator">
              <Security fontSize="small" />
              <span>24/7 Security</span>
            </div>
          </div>
        </div>
      </header>

      <div className="luxury-container">
        <section className="luxury-gallery-section">
          <div className="luxury-gallery">
            <div className="featured-luxury-image" onClick={() => openGallery(0)}>
              <img 
                src={heatherExternal} 
                alt="heather Exterior" 
                className="gallery-image"
              />
              <div className="image-overlay">
                <div className="overlay-content">
                  <span className="image-title">heather Exterior</span>
                </div>
              </div>
            </div>
            <div className="luxury-gallery-grid">
              {images.slice(1, 5).map((image, index) => (
                <div 
                  key={image.id} 
                  className="luxury-gallery-item" 
                  onClick={() => openGallery(index + 1)}
                >
                  <img 
                    src={image.src} 
                    alt={image.title} 
                    className="gallery-image"
                  />
                  <div className="image-overlay">
                    <div className="overlay-content">
                      <span className="image-title">{image.title}</span>
                      <span className="image-desc">{image.description}</span>
                      <div className="zoom-hint">
                        <ZoomIn fontSize="small" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="luxury-features-section">
          <div className="section-header">
            <h2>Curated Living Experience</h2>
            <p>Every detail crafted for exceptional living</p>
          </div>

          <div className="luxury-features-grid">
            <div className="luxury-feature-category">
              <div className="category-header">
                <KingBed />
                <h3>Bedroom</h3>
              </div>
              <div className="luxury-feature-list">
                <div className="luxury-feature-item">
                  <KingBed fontSize="small" />
                  <span>Single Bed</span>
                </div>
                <div className="luxury-feature-item">
                  <TableRestaurant fontSize="small" />
                  <span>Built-in Wardrobe</span>
                </div>
                <div className="luxury-feature-item">
                  <TableRestaurant fontSize="small" />
                  <span>Study Desk</span>
                </div>
                <div className="luxury-feature-item">
                  <Light fontSize="small" />
                  <span>Study Light</span>
                </div>
                <div className="luxury-feature-item">
                  <Chair fontSize="small" />
                  <span>Study Chair</span>
                </div>
                <div className="luxury-feature-item">
                  <Balcony fontSize="small" />
                  <span>Private Balcony</span>
                </div>
                <div className="luxury-feature-item">
                  <Window fontSize="small" />
                  <span>Blackout Blinds</span>
                </div>
              </div>
            </div>

            <div className="luxury-feature-category">
              <div className="category-header">
                <Shower />
                <h3>Bathroom</h3>
              </div>
              <div className="luxury-feature-list">
                <div className="luxury-feature-item">
                  <Shower fontSize="small" />
                  <span>Shower System</span>
                </div>
                <div className="luxury-feature-item">
                  <Bathtub fontSize="small" />
                  <span>Bathtub</span>
                </div>
                <div className="luxury-feature-item">
                  <Wash fontSize="small" />
                  <span>Toilet</span>
                </div>
                <div className="luxury-feature-item">
                  <Countertops fontSize="small" />
                  <span>Zink</span>
                </div>
                <div className="luxury-feature-item">
                  <Window fontSize="small" />
                  <span>Frosted Windows</span>
                </div>
                <div className="luxury-feature-item">
                  <LocalLaundryService fontSize="small" />
                  <span>Towel Rail</span>
                </div>
              </div>
            </div>

            <div className="luxury-feature-category">
              <div className="category-header">
                <Kitchen />
                <h3>Kitchen</h3>
              </div>
              <div className="luxury-feature-list">
                <div className="luxury-feature-item">
                  <Kitchen fontSize="small" />
                  <span>Refrigerator</span>
                </div>
                <div className="luxury-feature-item">
                  <LocalCafe fontSize="small" />
                  <span>Stove</span>
                </div>
                <div className="luxury-feature-item">
                  <Countertops fontSize="small" />
                  <span>Microwave</span>
                </div>
                <div className="luxury-feature-item">
                  <Countertops fontSize="small" />
                  <span>Sink</span>
                </div>
                <div className="luxury-feature-item">
                  <LocalCafe fontSize="small" />
                  <span>Hot Water</span>
                </div>
                <div className="luxury-feature-item">
                  <Window fontSize="small" />
                  <span>Windows</span>
                </div>
              </div>
            </div>

            <div className="luxury-feature-category">
              <div className="category-header">
                <Elevator />
                <h3>Amenities</h3>
              </div>
              <div className="luxury-feature-list">
                <div className="luxury-feature-item">
                  <Elevator fontSize="small" />
                  <span>Elevator</span>
                </div>
                <div className="luxury-feature-item">
                  <Security fontSize="small" />
                  <span>24/7 Security</span>
                </div>
                <div className="luxury-feature-item">
                  <Wifi fontSize="small" />
                  <span>Wifi</span>
                </div>
                <div className="luxury-feature-item">
                  <FitnessCenter fontSize="small" />
                  <span>Entertainment Room</span>
                </div>
                <div className="luxury-feature-item">
                  <MeetingRoom fontSize="small" />
                  <span>Study Room</span>
                </div>
                <div className="luxury-feature-item">
                  <DirectionsCar fontSize="small" />
                  <span>Parking</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="luxury-cta-section">
          <div className="luxury-pricing-card">
            <div className="pricing-header">
              <h3>Exclusive Pricing</h3>
              <p>Investment in exceptional student living</p>
            </div>
            <div className="pricing-options">
              <div className="pricing-option">
                <div className="price-amount">R 5,000</div>
                <div className="price-period">per month</div>
                <div className="room-type">Single Rooms</div>
              </div>
              <div className="pricing-divider">or</div>
              <div className="pricing-option">
                <div className="price-amount">R 4,500</div>
                <div className="price-period">per month</div>
                <div className="room-type">Sharing Rooms</div>
              </div>
            </div>
            <div className="cta-actions">
              <Link to="/apply" className="luxury-btn primary">
                Start Application
              </Link>
              <Link to="/contact" className="luxury-btn secondary">
                Schedule Viewing
              </Link>
            </div>
          </div>
        </section>
      </div>

      {showGallery && (
        <div className="gallery-modal" onClick={closeGallery}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeGallery}>×</button>
            <div className="modal-image-container">
              <button className="nav-button prev" onClick={prevImage}>‹</button>
              <div className="modal-image">
                <img 
                  src={images[selectedImage].src} 
                  alt={images[selectedImage].title}
                  className="modal-image-content"
                />
              </div>
              <button className="nav-button next" onClick={nextImage}>›</button>
            </div>
            <div className="modal-caption">
              <h3>{images[selectedImage].title}</h3>
              <p>{images[selectedImage].description}</p>
              <div className="image-counter">
                {selectedImage + 1} / {images.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Heather;