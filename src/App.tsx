import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import SignIn from './pages/SignIn';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import PrivacyConsent from './components/PrivacyConsent';
import AIAssistant from './components/AIAssistant';
import { AuthProvider } from './context/AuthContext';
import WebDevelopment from './pages/services/WebDevelopment';
import MobileDevelopment from './pages/services/MobileDevelopment';
import UIDesign from './pages/services/UIDesign';
import CloudServices from './pages/services/CloudServices';
import CV from './pages/CV';
import MatlabDev from './pages/services/MatlabDev';
import Robotics from './pages/services/Robotics';
import AIModelTrainer from './pages/services/AIModelTrainer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin/*" element={<Admin />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/services/web-development" element={<WebDevelopment />} />
              <Route path="/services/mobile-development" element={<MobileDevelopment />} />
              <Route path="/services/ui-design" element={<UIDesign />} />
              <Route path="/services/cloud-services" element={<CloudServices />} />
              <Route path="/cv" element={<CV />} />
              <Route path="/services/matlab-development" element={<MatlabDev />} />
              <Route path="/services/robotics" element={<Robotics />} />
              <Route path="/services/ai-model-trainer" element={<AIModelTrainer />} />
            </Routes>
          </main>
          <Footer />
          <PrivacyConsent />
          <AIAssistant />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;