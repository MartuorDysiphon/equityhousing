// // Layout.jsx
// import Navbar from './navigation/navigation';
// import Footer from './footer/footer';
// import Home from '../pages/Home';
// import Residences from '../pages/Residences';
// import Features from '../pages/Features';
// import StudentLife from '../pages/Student';
// import Community from '../pages/Community';
// import Contact from '../pages/Contact';

// function Layout() {
//   return (
//     <>
//       <Navbar />
//       <main>
//         <Home />
//         <Residences />
//         <Features />
//         <StudentLife />
//         <Community />
//         <Contact />
//       </main>
//       <Footer />
//     </>
//   );
// }

// export default Layout;


// Layout.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './navigation/navigation';
import Footer from './footer/footer';

function Layout({ children }) {
  const location = useLocation();

  useEffect(() => {
    // Simple scroll reveal - add .animate class when elements come into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    // Find all sections to animate
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
      section.style.transition = 'all 0.6s ease';
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;