import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/layout';

import Home from './pages/Home';
import Residences from './pages/Residences';
import Features from './pages/Features';
import Community from './pages/Community';
import StudentLife from './pages/Student';
import Contact from './pages/Contact'

import HeatherCourt from './components/heather'
import MildineCourt from './components/meldine'
import AshbroughHeights from './components/ashbrough';
import Rosenhof from './components/rosenhof';
import VLU from './components/vlu'

import Apply from './components/apply/apply'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/residences" element={<Residences />} />
          <Route path="/features" element={<Features />} />
          <Route path="/community" element={<Community />} />
          <Route path="/student" element={<StudentLife />} />
          <Route path="/contact" element={<Contact />} />

          <Route path='/heather' element={<HeatherCourt />} />
          <Route path='/meldine' element={<MildineCourt />} />
          <Route path='/ashbrough' element={<AshbroughHeights />} />
          <Route path='/rosenhof' element={<Rosenhof />} />
          <Route path='./vlu' element={<VLU />} />

          <Route path='/apply' element={<Apply />}/>

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
