import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.home}>

      {/* ── Hero ── */}
      <section className={styles.home__hero}>

        <div className={styles.home__bg} />
        <div className={styles.home__overlay} />
        <div className={styles.home__tint} />
        <div className={styles.home__vignette} />

        <header className={styles.home__header}>
          <div className={styles.header__container}>

            <h1 className={styles.header__headline}>
              The Simplicity of a
              <em>Home Away From Home</em>
            </h1>

            <p className={styles.header__sub}>
              Purpose-built student living designed for comfort, community,
              and focus, everything you need, right where you need it.
            </p>

            <div className={styles.header__cta}>
              <Link to="/apply" className={styles.btn86}>Apply Now</Link>
              <Link to="/explore" className={`${styles.btn86} ${styles.btn86__ghost}`}>Explore Rooms</Link>
            </div>

          </div>

          <div className={styles.scroll__indicator}>
            <div className={styles.scroll__line} />
            <span className={styles.scroll__label}>Scroll</span>
          </div>
        </header>
      </section>

    </div>
  );
}

export default Home;