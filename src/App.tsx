import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'motion/react';
import { Menu, X, ArrowRight, ArrowUpRight, Instagram, Linkedin, Moon, Sun, ArrowLeft, Figma } from 'lucide-react';
import LegalPage from './components/LegalPage';
import ProductDesignPage from './components/ProductDesignPage';
import PrintEditorialPage from './components/PrintEditorialPage';
import SocialMediaPage from './components/SocialMediaPage';
import SocialMediaThumbnail from './components/SocialMediaThumbnail';
import PrintEditorialThumbnail from './components/PrintEditorialThumbnail';

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Services', href: '#services' },
];

const STATS = [
  { value: '1.5+', label: 'Years of Experience' },
  { value: '10+', label: 'Projects Completed' },
];


const PORTFOLIO = [
  { id: 1, title: 'Product Design', category: 'Product Design', image: 'https://i.ibb.co/0VyWM8P4/Gemini-Generated-Image-e2prnle2prnle2pr-Photoroom.png' },
  { id: 2, title: 'Print & Editorial', category: 'Layout & Design', image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800' },
  { id: 3, title: 'Umeed Website', category: 'UI/UX Designing', image: 'https://i.ibb.co/60BgBfzT/Screenshot-2026-03-30-120458.png', link: 'https://youtu.be/IEJMYBwhV-M' },
  { id: 4, title: 'Social Media Designs', category: 'Social Media Design', image: 'https://i.ibb.co/9348YDX8/Collab-post-thumbnail.png' },
];

const SERVICES = [
  { title: 'Social Media Design', description: 'Producing engaging, shareable, and platform-optimized visual assets to boost online presence and audience interaction.', highlighted: false },
  { title: 'Print & Editorial', description: 'Designing compelling and polished layouts for brochures, posters, magazines, and physical marketing materials.', highlighted: true },
  { title: 'Product Design', description: 'End-to-end product design from conceptualization to high-fidelity prototyping and testing.', highlighted: false },
  { title: 'UI Design', description: 'Crafting intuitive and visually stunning user interfaces for digital products with a focus on aesthetics and usability.', highlighted: false },
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [legalView, setLegalView] = useState<'privacy' | 'terms' | null>(null);
  const [productDesignView, setProductDesignView] = useState(false);
  const [printEditorialView, setPrintEditorialView] = useState(false);
  const [socialMediaView, setSocialMediaView] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollPosRef = useRef(0);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("access_key", "448b224e-9546-4a6b-9b05-d70459534a6b");
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        setName('');
        setEmail('');
        setMessage('');
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        console.error("Error", data);
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (legalView) {
    return <LegalPage type={legalView} onBack={() => {
      setLegalView(null);
      setTimeout(() => {
        window.scrollTo(0, scrollPosRef.current);
      }, 0);
    }} />;
  }

  if (productDesignView) {
    return <ProductDesignPage onBack={() => {
      setProductDesignView(false);
      setTimeout(() => {
        window.scrollTo(0, scrollPosRef.current);
      }, 0);
    }} />;
  }

  if (printEditorialView) {
    return <PrintEditorialPage onBack={() => {
      setPrintEditorialView(false);
      setTimeout(() => {
        window.scrollTo(0, scrollPosRef.current);
      }, 0);
    }} />;
  }

  if (socialMediaView) {
    return <SocialMediaPage onBack={() => {
      setSocialMediaView(false);
      setTimeout(() => {
        window.scrollTo(0, scrollPosRef.current);
      }, 0);
    }} />;
  }

  return (
    <div className="min-h-screen bg-brand-bg text-brand-primary font-sans selection:bg-brand-accent selection:text-white">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-accent z-[60] origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-brand-bg/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#home" className="text-2xl font-bold tracking-tighter">
            ADITYA<span className="text-brand-accent">.</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-brand-primary hover:text-brand-accent transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-accent transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-brand-primary/10 transition-colors text-brand-primary"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center space-x-4 md:hidden">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-brand-primary/10 transition-colors text-brand-primary"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button 
              className="text-brand-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-brand-bg pt-24 px-6 md:hidden flex flex-col"
          >
            <nav className="flex flex-col space-y-6 text-2xl font-bold">
              {NAV_LINKS.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-brand-accent transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section id="home" className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-40 right-10 md:right-32 w-24 h-24 border-2 border-brand-accent rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-16 h-16 bg-brand-accent opacity-10 rotate-45"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.2,
                      delayChildren: 0.3
                    }
                  }
                }}
              >
                <motion.p 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="text-sm font-bold tracking-widest uppercase text-brand-secondary mb-4"
                >
                  Hi, I'm Aditya Dhawan
                </motion.p>
                <motion.h1 
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="text-5xl md:text-7xl lg:text-[80px] leading-[1.1] font-bold tracking-tighter mb-6"
                >
                  A CREATIVE <br/>
                  <span className="text-brand-accent">DESIGNER</span> <br/>
                  BASED IN JPR
                </motion.h1>
                <motion.p 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="text-lg md:text-xl text-brand-secondary mb-10 max-w-lg"
                >
                  Design • Visuals • Aesthetics
                </motion.p>
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="flex flex-wrap gap-4"
                >
                  <a href="#portfolio" className="px-8 py-4 bg-brand-bg border border-brand-primary text-brand-primary rounded-full font-medium hover:bg-brand-primary hover:text-brand-bg transition-all duration-300 flex items-center gap-2 group">
                    View Portfolio <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a href="#contact" className="px-8 py-4 bg-transparent border border-brand-primary text-brand-primary rounded-full font-medium hover:bg-brand-primary hover:text-brand-bg transition-all duration-300">
                    Contact Me
                  </a>
                </motion.div>
              </motion.div>
            </div>
            
            <div className="lg:col-span-5 order-1 lg:order-2 relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-brand-primary/5 relative z-10 shadow-2xl">
                  <img 
                    src="https://i.ibb.co/jvJBRQf4/20260208-003212-jpg.jpg" 
                    alt="Aditya Dhawan - Creative Designer" 
                    className="w-full h-full object-cover grayscale dark:opacity-80 hover:grayscale-0 hover:scale-110 transition-all duration-1000 ease-out"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Decorative background block */}
                <motion.div 
                  initial={{ x: 20, y: 20, opacity: 0 }}
                  animate={{ x: 0, y: 0, opacity: 0.2 }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="absolute -bottom-6 -right-6 w-full h-full bg-brand-accent rounded-2xl z-0"
                ></motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-brand-primary/10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12"
          >
            <div className="lg:col-span-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">About Me</h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-xl md:text-2xl leading-relaxed text-brand-secondary mb-8">
                Hello! I'm Aditya, a graphic designer with a passion for bringing bold ideas to life through visual storytelling. My design journey really accelerated on the Plinth Organising Committee, where I developed creative assets to promote science and technology events across our college. That fast-paced, collaborative environment taught me how to adapt quickly and deliver high-quality designs that resonate with a large audience. I love merging my analytical mindset with creativity to build engaging and memorable brand experiences.
              </p>
              
              <div className="mb-12">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-secondary mb-3">Softwares Used</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {['Figma', 'Adobe Photoshop', 'Canva'].map((software) => (
                    <li key={software} className="flex items-center gap-2 text-lg font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span>
                      {software}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-brand-secondary mb-2">Location</p>
                  <p className="text-lg font-medium">Jaipur, India</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-brand-secondary mb-2">Experience</p>
                  <p className="text-lg font-medium">1.5+ Years</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-brand-secondary mb-2">Projects</p>
                  <p className="text-lg font-medium">10+ Completed</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Statistics Section */}
        <section className="py-10 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STATS.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  delay: index * 0.1 
                }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="bg-brand-card p-10 rounded-2xl border border-brand-primary/5 hover:border-brand-accent/30 transition-all duration-300 shadow-sm hover:shadow-xl"
              >
                <h3 className="text-5xl md:text-6xl font-bold mb-4">{stat.value}</h3>
                <p className="text-brand-secondary font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>


        {/* Portfolio Section */}
        <section id="portfolio" className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex justify-between items-end mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Recent Work</h2>
              <a href="#" className="hidden md:flex items-center gap-2 font-medium hover:text-brand-accent transition-colors">
                View All <ArrowRight size={18} />
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {PORTFOLIO.map((project, index) => (
                <motion.a 
                  href={project.link || "#"}
                  target={project.link ? "_blank" : undefined}
                  rel={project.link ? "noopener noreferrer" : undefined}
                  onClick={(e) => {
                    if (project.title === 'Product Design') {
                      e.preventDefault();
                      scrollPosRef.current = window.scrollY;
                      setProductDesignView(true);
                    } else if (project.title === 'Print & Editorial') {
                      e.preventDefault();
                      scrollPosRef.current = window.scrollY;
                      setPrintEditorialView(true);
                    } else if (project.title === 'Social Media Designs') {
                      e.preventDefault();
                      scrollPosRef.current = window.scrollY;
                      setSocialMediaView(true);
                    }
                  }}
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ 
                    scale: 1.02, 
                    y: -8,
                    transition: { duration: 0.4, ease: "easeOut" }
                  }}
                  className="group cursor-pointer block"
                >
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-6 bg-brand-primary/5 shadow-md group-hover:shadow-2xl transition-all duration-500">
                    {project.title === 'Social Media Designs' ? (
                      <SocialMediaThumbnail />
                    ) : project.title === 'Print & Editorial' ? (
                      <PrintEditorialThumbnail />
                    ) : (
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover grayscale dark:opacity-80 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-in-out"
                        referrerPolicy="no-referrer"
                      />
                    )}
                    <div className="absolute inset-0 bg-brand-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                      <motion.span 
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        className="px-8 py-4 bg-brand-bg text-brand-primary rounded-full font-bold shadow-xl"
                      >
                        View Project
                      </motion.span>
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <motion.div whileHover={{ x: 5 }}>
                      <p className="text-xs font-bold uppercase tracking-widest text-brand-secondary mb-2">{project.category}</p>
                      <h3 className="text-2xl font-bold group-hover:text-brand-accent transition-colors">{project.title}</h3>
                    </motion.div>
                    <motion.div
                      whileHover={{ rotate: 45, scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <ArrowUpRight className="text-brand-secondary group-hover:text-brand-accent transition-colors" />
                    </motion.div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Figma Designs CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20 p-8 md:p-12 bg-brand-card border border-brand-primary/10 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-8"
            >
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold mb-3">View My Figma Designs</h3>
                <p className="text-brand-secondary max-w-md">
                  Interested in seeing the raw design process? Explore my full collection of design assets and prototypes directly on Figma.
                </p>
              </div>
              <motion.a 
                href="https://www.figma.com/design/E9lq6Z4DP7STQEURbjsDZb/Aditya-Dhawan-Portfolio_Assets?node-id=0-1&t=zk6uJAQa3h9o0RgI-1"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-8 py-4 bg-brand-primary text-brand-bg rounded-full font-bold shadow-xl hover:bg-brand-accent hover:text-white transition-all duration-300 group"
              >
                <Figma size={24} className="group-hover:rotate-12 transition-transform" />
                Open in Figma
                <ArrowUpRight size={20} />
              </motion.a>
            </motion.div>

            <div className="mt-12 text-center md:hidden">
              <a href="#" className="inline-flex items-center gap-2 font-medium hover:text-brand-accent transition-colors">
                View All Projects <ArrowRight size={18} />
              </a>
            </div>
          </motion.div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto bg-brand-primary text-brand-bg rounded-[2.5rem] my-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mb-16 md:mb-24 px-10 md:px-12 pt-10 md:pt-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">My Services</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-10 md:px-12 pb-10 md:pb-12">
              {SERVICES.map((service, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.02 }}
                  className={`p-10 md:p-12 rounded-3xl transition-all duration-500 ${
                    service.highlighted 
                      ? 'bg-brand-accent text-white shadow-2xl shadow-brand-accent/20' 
                      : 'bg-brand-bg/10 hover:bg-brand-bg/20 border border-brand-bg/10'
                  }`}
                >
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{service.title}</h3>
                  <p className={`text-lg leading-relaxed ${service.highlighted ? 'text-white/90' : 'text-brand-bg/60'}`}>
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Newsletter Section */}
        <section id="contact" className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="bg-brand-card rounded-3xl p-10 md:p-20 text-center border border-brand-primary/10 relative overflow-hidden">
            {/* Decorative shape */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-accent rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-brand-primary rounded-full opacity-10 blur-3xl"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Looking for a graphic designer?</h2>
              <p className="text-lg text-brand-secondary mb-10">
                I'm currently open for new opportunities. Leave your contact info, and I'll reach out to chat about your next project.
              </p>
              <form className="flex flex-col gap-4 max-w-md mx-auto" onSubmit={handleContactSubmit}>
                <div className="flex flex-col gap-4 w-full">
                  <input 
                    type="text" 
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name" 
                    className="w-full px-6 py-4 rounded-full border border-brand-primary/20 focus:outline-none focus:border-brand-accent bg-transparent transition-colors"
                    required
                  />
                  <div className="relative">
                    <input 
                      type="email" 
                      name="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError('');
                      }}
                      placeholder="Email address" 
                      className={`w-full px-6 py-4 rounded-full border ${emailError ? 'border-red-500' : 'border-brand-primary/20'} focus:outline-none focus:border-brand-accent bg-transparent transition-colors`}
                      required
                    />
                    {emailError && (
                      <p className="absolute -bottom-6 left-6 text-xs text-red-500">{emailError}</p>
                    )}
                  </div>
                  <textarea 
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your Message" 
                    className="w-full px-6 py-4 rounded-3xl border border-brand-primary/20 focus:outline-none focus:border-brand-accent bg-transparent transition-colors min-h-[120px] resize-none"
                    required
                  ></textarea>
                  <button 
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className="w-full px-8 py-4 bg-brand-bg border border-brand-primary text-brand-primary rounded-full font-medium hover:bg-brand-primary hover:text-brand-bg transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : (isSubmitted ? 'Sent!' : "Let's Talk")}
                  </button>
                </div>
                {isSubmitted && (
                  <p className="text-green-500 mt-2">Thanks! I'll be in touch soon.</p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brand-primary text-brand-bg pt-20 pb-10 px-6 md:px-12 mt-10 rounded-t-[2.5rem] md:rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="lg:col-span-2">
              <a href="#home" className="text-3xl font-bold tracking-tighter mb-6 block">
                ADITYA<span className="text-brand-accent">.</span>
              </a>
              <p className="text-brand-bg/60 max-w-sm text-lg">
                A creative designer crafting digital experiences that are minimal, bold, and effective.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">Navigation</h4>
              <ul className="space-y-4">
                {NAV_LINKS.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-brand-bg/60 hover:text-brand-bg transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">Contact</h4>
              <div className="space-y-6">
                <div>
                  <p className="text-brand-bg/40 text-xs font-bold uppercase tracking-widest mb-2">Email</p>
                  <a href="mailto:addydhawan27@gmail.com" className="text-brand-bg/60 hover:text-brand-bg transition-colors text-lg">
                    addydhawan27@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-brand-bg/40 text-xs font-bold uppercase tracking-widest mb-4">Socials</p>
                  <div className="flex gap-4">
                    <a href="https://www.instagram.com/aditya_dha1/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-brand-bg/10 flex items-center justify-center text-brand-bg/60 hover:text-brand-bg hover:border-brand-accent hover:bg-brand-accent/10 transition-all">
                      <Instagram size={18} />
                    </a>
                    <a href="https://www.linkedin.com/in/aditya-dhawan-6ab143317" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-brand-bg/10 flex items-center justify-center text-brand-bg/60 hover:text-brand-bg hover:border-brand-accent hover:bg-brand-accent/10 transition-all">
                      <Linkedin size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-brand-bg/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-brand-bg/40 text-sm">
            <p>&copy; {new Date().getFullYear()} Aditya Dhawan. All rights reserved.</p>
            <div className="flex gap-6">
              <button 
                onClick={() => {
                  scrollPosRef.current = window.scrollY;
                  setLegalView('privacy');
                  window.scrollTo(0, 0);
                }} 
                className="hover:text-brand-bg transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => {
                  scrollPosRef.current = window.scrollY;
                  setLegalView('terms');
                  window.scrollTo(0, 0);
                }} 
                className="hover:text-brand-bg transition-colors cursor-pointer"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
