/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Palette, 
  Workflow, 
  Award, 
  ChevronDown, 
  Instagram, 
  Linkedin, 
  Share2,
  Mail,
  ExternalLink,
  Menu,
  X,
  MessageCircle,
  Send,
  Bell,
  User,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { io } from 'socket.io-client';

// Initialize socket
const socket = io();

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-nav py-3 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-display font-extrabold text-brand-primary">Titan</span>
          <span className="text-2xl font-display font-extrabold text-brand-ink">Studio</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-semibold text-brand-ink/70 hover:text-brand-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <button className="bg-brand-primary text-white px-6 py-2.5 rounded-full font-display font-bold text-sm hover:bg-brand-primary-hover transition-all shadow-md shadow-brand-primary/20">
            Hire Me
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-brand-ink" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl p-6 md:hidden flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-lg font-semibold text-brand-ink"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button className="btn-primary w-full mt-2">Hire Me</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-brand-secondary/10 text-[#6c5000] px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest mb-6">
            <Star size={14} fill="currentColor" />
            TOP RATED PLUS SELLER ON FIVERR
          </div>
          
          <h1 className="text-6xl md:text-7xl font-display font-extrabold leading-[1.1] mb-8">
            Bringing <span className="text-brand-primary">Magic</span> to Every Page.
          </h1>
          
          <p className="text-xl text-brand-ink/60 leading-relaxed mb-10 max-w-lg">
            Custom high-energy illustrations for children's books, character design, and whimsical worlds. Let's tell your story together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button className="btn-primary">Request Quote</button>
            <button className="btn-secondary">View Portfolio</button>
          </div>
          
          <div className="flex items-center gap-8 opacity-40 grayscale">
            <span className="text-xs font-bold uppercase tracking-widest">AS SEEN ON</span>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Fiverr_Logo_09.2020.svg/1200px-Fiverr_Logo_09.2020.svg.png" alt="Fiverr" className="h-5" referrerPolicy="no-referrer" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Upwork_logo.svg/1200px-Upwork_logo.svg.png" alt="Upwork" className="h-5" referrerPolicy="no-referrer" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative grid grid-cols-2 gap-4"
        >
          <div className="space-y-4 pt-12">
            <div className="rounded-3xl overflow-hidden aspect-square shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500">
              <img src="https://picsum.photos/seed/fox/600/600" alt="Fox Illustration" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img src="https://picsum.photos/seed/room/600/750" alt="Cozy Room" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <img src="https://picsum.photos/seed/dragon/600/450" alt="Dragon Illustration" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="rounded-3xl overflow-hidden aspect-square shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500">
              <img src="https://picsum.photos/seed/party/600/600" alt="Animal Party" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-primary/5 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const [activeTab, setActiveTab] = useState('fiverr');

  const services = [
    {
      title: 'Character Design',
      desc: 'Unique, expressive characters tailored to your book\'s personality. Includes 3 expression sketches.',
      price: '$45',
      unit: '/ character',
      btnText: 'Book on Fiverr',
      icon: <Palette className="text-brand-primary" size={24} />,
      popular: false
    },
    {
      title: 'Full Book Package',
      desc: 'Complete storytelling from cover to back. Includes layout, text placement, and print-ready files.',
      price: '$5',
      unit: '/ page',
      btnText: 'Get a Quote',
      icon: <Workflow className="text-brand-primary" size={24} />,
      popular: true
    },
    {
      title: 'Background Art',
      desc: 'Immersive environments that set the perfect mood. High-resolution detailed scenery for covers or spreads.',
      price: '$75',
      unit: '/ scene',
      btnText: 'Learn More',
      icon: <Share2 className="text-brand-primary" size={24} />,
      popular: false
    }
  ];

  return (
    <section id="services" className="py-24 px-6 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-5xl font-display font-extrabold mb-4">Creative Services</h2>
            <p className="text-lg text-brand-ink/60 max-w-md">
              Simple, transparent pricing for every stage of your storytelling journey.
            </p>
          </div>
          
          <div className="bg-white p-1.5 rounded-full shadow-sm inline-flex border border-gray-100">
            <button 
              onClick={() => setActiveTab('fiverr')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'fiverr' ? 'bg-brand-ink text-white shadow-md' : 'text-brand-ink/50 hover:text-brand-ink'}`}
            >
              Fiverr Bookings
            </button>
            <button 
              onClick={() => setActiveTab('direct')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'direct' ? 'bg-brand-ink text-white shadow-md' : 'text-brand-ink/50 hover:text-brand-ink'}`}
            >
              Direct Hire
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div 
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative card-whimsical flex flex-col ${service.popular ? 'ring-2 ring-brand-primary' : ''}`}
            >
              {service.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-ink text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
                  Most Popular
                </div>
              )}
              
              <div className="bg-brand-primary/5 w-14 h-14 rounded-2xl flex items-center justify-center mb-8">
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-display font-bold mb-4">{service.title}</h3>
              <p className="text-brand-ink/60 mb-8 flex-grow leading-relaxed">
                {service.desc}
              </p>
              
              <div className="mb-8">
                <span className="text-xs font-bold text-brand-ink/40 uppercase tracking-widest block mb-1">STARTING AT</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-display font-extrabold text-brand-primary">{service.price}</span>
                  <span className="text-brand-ink/40 font-bold">{service.unit}</span>
                </div>
              </div>
              
              <button className={`w-full py-4 rounded-xl font-display font-bold transition-all ${service.popular ? 'bg-brand-primary text-white hover:bg-brand-primary-hover shadow-lg shadow-brand-primary/20' : 'bg-gray-100 text-brand-ink hover:bg-gray-200'}`}>
                {service.btnText}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { label: 'Projects Delivered', value: '1,500+', icon: <CheckCircle2 className="text-brand-primary" size={20} /> },
    { label: 'Global Rating', value: '5.0 Star', icon: <Star className="text-brand-secondary" size={20} fill="currentColor" /> },
    { label: 'Official Fiverr Plus', value: 'Top Rated', icon: <Award className="text-brand-primary" size={20} /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-10">
      <div className="bg-white rounded-3xl shadow-xl shadow-brand-ink/5 p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 border border-gray-100">
        {stats.map((stat, idx) => (
          <div key={stat.label} className={`flex items-center justify-center gap-4 ${idx !== stats.length - 1 ? 'md:border-r border-gray-100' : ''}`}>
            <div className="bg-gray-50 p-3 rounded-full">
              {stat.icon}
            </div>
            <div>
              <div className="text-2xl font-display font-extrabold text-brand-ink">{stat.value}</div>
              <div className="text-xs font-bold text-brand-ink/40 uppercase tracking-widest">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Gallery = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Characters', 'Backgrounds', 'Book Covers', 'Sketches'];

  const items = [
    { title: 'The Garden Secret', category: 'Backgrounds', price: '$85', img: 'https://picsum.photos/seed/garden/800/1000', desc: 'Full character and environment suite for an upcoming floral-themed picture book.' },
    { title: 'Space Scout Oliver', category: 'Characters', price: '$120', img: 'https://picsum.photos/seed/scout/800/1000', desc: 'Cover design and key conceptual art for a middle-grade space adventure series.' },
    { title: 'Expressive Souls', category: 'Sketches', price: '$45', img: 'https://picsum.photos/seed/elephant/800/1000', desc: 'High-energy character studies focusing on unique facial expressions and movement.' },
  ];

  return (
    <section id="portfolio" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-display font-extrabold mb-8">World Building Gallery</h2>
          
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${filter === cat ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'bg-gray-100 text-brand-ink/60 hover:bg-gray-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {items.map((item, idx) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] mb-6 shadow-xl">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute bottom-6 right-6">
                  <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg flex flex-col items-end">
                    <span className="text-[10px] font-black text-brand-ink/40 uppercase tracking-widest">STARTS AT</span>
                    <span className="text-xl font-display font-extrabold text-brand-ink">{item.price}</span>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-brand-primary transition-colors">{item.title}</h3>
              <p className="text-brand-ink/60 leading-relaxed text-sm">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    { title: 'On-Time Delivery', desc: 'Maintaining a consistent 100% on-time record across 1,500+ orders.', icon: <Clock size={20} /> },
    { title: 'Unique Style', desc: 'Hand-painted feel with professional digital precision and vibrant palettes.', icon: <Palette size={20} /> },
    { title: 'Smooth Workflow', desc: 'Clear communication from the first sketch to the final delivery.', icon: <Workflow size={20} /> },
    { title: 'Pro Standards', desc: 'Print-ready CMYK files at 300DPI, perfectly prepared for publishing.', icon: <Award size={20} /> },
  ];

  return (
    <section className="py-24 px-6 bg-brand-primary/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-5xl font-display font-extrabold mb-12 leading-tight">
            Why Work with <span className="text-brand-primary italic">Titan Studio?</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10 mb-12">
            {features.map((f) => (
              <div key={f.title} className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-brand-primary/10 text-brand-primary p-2 rounded-lg">
                    {f.icon}
                  </div>
                  <h4 className="font-display font-bold text-lg">{f.title}</h4>
                </div>
                <p className="text-sm text-brand-ink/60 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
          
          <button className="btn-primary">
            Visit my Fiverr Profile <ExternalLink size={18} />
          </button>
        </div>

        <div className="relative">
          <div className="rounded-[3rem] overflow-hidden shadow-2xl aspect-[4/3]">
            <img src="https://picsum.photos/seed/drawing/800/600" alt="Artist Drawing" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          
          <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-2xl flex items-center gap-4 border border-gray-100">
            <div className="bg-brand-secondary/10 text-brand-secondary p-3 rounded-full">
              <Star size={24} fill="currentColor" />
            </div>
            <div>
              <div className="text-2xl font-display font-extrabold">5.0 Star</div>
              <div className="text-xs font-bold text-brand-ink/40 uppercase tracking-widest">Verified Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    {
      name: 'John D.',
      role: 'Fiverr Author',
      text: 'Exceeded all expectations. The level of detail and character expression is world-class. My kids\' book is finally coming to life!',
      stars: 5,
      initials: 'JD'
    },
    {
      name: 'Maria L.',
      role: 'Publisher',
      text: 'Incredible talent. Very communicative and open to feedback. The final assets were delivered ahead of schedule and were perfect.',
      stars: 5,
      initials: 'ML'
    },
    {
      name: 'Robert K.',
      role: 'Indie Author',
      text: 'A absolute pleasure to work with. Titan Studio took my rough ideas and turned them into something magical. Highly recommend!',
      stars: 5,
      initials: 'RK'
    }
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block bg-brand-primary/10 text-brand-primary px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            Loved by Authors Worldwide
          </div>
          <h2 className="text-5xl font-display font-extrabold mb-4">Wall of Love</h2>
          <p className="text-lg text-brand-ink/60 max-w-2xl mx-auto">
            Real stories from real clients who transformed their vision into reality at Titan Studio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div 
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="card-whimsical"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(review.stars)].map((_, i) => (
                  <Star key={i} size={16} fill="#fdc003" className="text-brand-secondary" />
                ))}
              </div>
              
              <p className="text-lg font-medium leading-relaxed mb-8 italic text-brand-ink/80">
                "{review.text}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold">
                  {review.initials}
                </div>
                <div>
                  <div className="font-display font-bold">{review.name}</div>
                  <div className="text-xs font-bold text-brand-ink/40 uppercase tracking-widest">{review.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <div id="about" className="overflow-hidden">
      {/* Hero Section: The Artist's Canvas */}
      <section className="relative px-8 py-20 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex-1 space-y-8 z-10"
        >
          <div className="inline-flex items-center gap-2 bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            Top Rated Seller
          </div>
          <h2 className="font-headline text-5xl md:text-7xl font-extrabold text-on-surface tracking-tighter leading-[1.1]">
            Every sketch tells a <span className="text-primary italic">story.</span>
          </h2>
          <p className="text-lg text-on-surface-variant leading-relaxed max-w-xl">
            I'm Titan, a visual storyteller dedicated to bringing the magic of childhood wonder to life. For over a decade, I've been turning whispers of imagination into vibrant, tactile realities for authors around the globe.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex-1 relative"
        >
          <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
            <img 
              alt="Artist at work" 
              className="w-full h-[500px] object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_kp0NbjwQQvVzZ1Lm_gvJJK8JL5dciR4lVUPovINrRNVj8_UL2FqBax0PkFRyi3qjycT62bVu2xQdi3Z77qyCTrFtq5Jrs-9Cy4O8IsPyGPmtLxphWwggjdB6L45p8HYknhZu1mZbrxDEUOghifQqiNiUF-CZDqAE45xQAoZaQ97IFhnjD1ctjfXQVrIbJzZStQGuT1JSkFrWlzXoPtPans_4_ItiQCREvsf6qTSWDbX8O2BnmPCkNcjo5zNZDY_viihFIzj615Y"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary-fixed-dim/30 rounded-full blur-3xl -z-10"></div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-tertiary-container/30 rounded-full blur-3xl -z-10"></div>
        </motion.div>
      </section>

      {/* Journey Section: Bento Grid */}
      <section className="bg-surface-container-low py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-headline text-4xl font-bold mb-16 text-center">My Journey as a Creator</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Bento Item 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 bg-surface-container-lowest p-10 rounded-xl flex flex-col justify-between group hover:shadow-lg transition-shadow"
            >
              <div className="space-y-4">
                <span className="material-symbols-outlined text-primary text-4xl">auto_stories</span>
                <h3 className="font-headline text-2xl font-bold">The Fiverr Evolution</h3>
                <p className="text-on-surface-variant">Starting as a hobbyist, I found my tribe on Fiverr. Today, as a Top-Rated Seller, I've collaborated with over 500 authors, helping them self-publish dreams that sit on bedside tables across six continents.</p>
              </div>
              <div className="mt-8 flex gap-4 overflow-hidden">
                <img className="h-24 w-32 object-cover rounded-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKM1zHBeGx9PAPqpzMl8bHQkUqcwRomsSnAJq0HgPKttMG-CUmDKCZV7Xo-pNEUWj8-KukcqI8EbpvDZVWPpyRWeyeJQMMiwuxp6g9yn6jq8qyl1ykoDq7u5tp9vF8mdv6o-4SSLbO8_MwabjaBlL87iVXP9CYqF1hU8XWbSTUWd_epRPX-tg2yC_mOzUrP09JXqqWZnS6M8eqyR537xLXQIJAwA7AiePuoPAjVgPTok0pDF6AifHLXmxRgGE1SaAzKljGJorkSHw" referrerPolicy="no-referrer" />
                <img className="h-24 w-32 object-cover rounded-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD__RK6_DKSidxTnciyxzTRcHlU3Gy76L2tFRGNIKtGTffc2229gqjDpolZ-77VULT0ciAoaACOHe-N9tFBxeL7UNWmBPTbkKaU5n9aqtjvD882RU_PvZfzyiHrTOscRm8zEn1cfVLXJp2gDqRe-lmfGqHLi7C0t9i0EJwRjE5LdaT3TiBNwEw-ZZj4-FoBhMDrGaIzSXOb12bbD33ZCpUEcfCCAKZk8tACAg27tfMuG8_KVerwwDdJo18AjnErQPqCYw5P5qIM9Zs" referrerPolicy="no-referrer" />
                <img className="h-24 w-32 object-cover rounded-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHcq81QVulU_PJtpxp2f44IVzAm3ecBXncEiUeApKJxY-iwLi2wcefPFG4f1cx9foFLoAB5PIZHx86Ahb415_Zd0IYpPu6Im-Dqpv1dOenQaPjWP9Ey3848KiwwlJI82DL9nTzP2Ki7YAcA97WPOPTbpD4OWeAfUnBivA-hc6hB3lwFHxYgTwD2wgKtZpXLTCTgr_Vr7XzX8RLAdTAzxZWlyCtcKN1W5p2iO0oeqHihWab9Q3aEE1x84prGDUdfk6HVDS3gM2WTaY" referrerPolicy="no-referrer" />
              </div>
            </motion.div>
            {/* Bento Item 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-primary text-on-primary p-10 rounded-xl flex flex-col justify-center items-center text-center space-y-6"
            >
              <div className="text-6xl font-black">500+</div>
              <p className="font-label font-bold uppercase tracking-widest text-primary-fixed">Stories Illustrated</p>
              <div className="w-16 h-1 bg-primary-container rounded-full"></div>
              <p className="text-sm opacity-90">Building worlds for the next generation of dreamers, one brushstroke at a time.</p>
            </motion.div>
            {/* Bento Item 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-tertiary-container text-on-tertiary-container p-10 rounded-xl space-y-4"
            >
              <span className="material-symbols-outlined text-tertiary text-4xl">palette</span>
              <h3 className="font-headline text-2xl font-bold">The Technique</h3>
              <p className="text-sm leading-relaxed">I blend traditional watercolor textures with digital precision. This creates a "warm" feel that digital-only art often misses, perfect for the tactile nature of children's books.</p>
            </motion.div>
            {/* Bento Item 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-2 bg-surface-container-highest p-10 rounded-xl flex items-center gap-8"
            >
              <div className="hidden sm:block shrink-0">
                <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-md">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjwql2Dh9FaAUYMT5OnUP9FIEvXfHknJa5RkvFmKmHncmoIypz7lfFPJz6kmGkJfpjHIlUcYR5P-PB4n4pxWiP8FvGZyIsktVJ6w6Qzva7gLRkNg0ySzLuH1j30-8nihZybkRONyMtrWKJhNWIpCVqSCO0dU3bkMSWEnK_JtRnirblZc0tOih4ULmYUyFWZj-7QfnFPIZiliWXPJxTHpHB3FD0yBytMUm6Pz1G0DDQ5OMz8pJu51rdhPFtmF6VQlaVEySihLAspus" referrerPolicy="no-referrer" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-headline text-xl font-bold italic">"Storytelling isn't just about the words; it's about the feeling a child gets when they turn the page."</h3>
                <p className="text-sm font-semibold">— Titan, Lead Artist</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story-Spacer Squiggle */}
      <div className="flex justify-center py-12 bg-surface">
        <svg fill="none" height="40" viewBox="0 0 200 40" width="200" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 20C20 20 30 10 50 10C70 10 80 30 100 30C120 30 130 10 150 10C170 10 180 20 200 20" stroke="#6efdaa" strokeLinecap="round" strokeWidth="6"></path>
        </svg>
      </div>

      {/* Wall of Love: Testimonials */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="font-headline text-4xl font-bold mb-4">Wall of Love</h2>
            <p className="text-on-surface-variant">Real words from authors who trusted Titan Studio with their precious stories.</p>
          </div>
          <button className="bg-surface-container-high text-on-surface px-8 py-3 rounded-full font-label font-bold flex items-center gap-2 hover:bg-surface-container-highest transition-colors">
            View Fiverr Profile
            <span className="material-symbols-outlined">arrow_outward</span>
          </button>
        </div>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {[
            { name: "Sarah Jenkins", role: "Author of 'The Moon's Secret'", text: "Titan took my simple manuscript and turned it into a visual masterpiece. My children literally gasp at the colors on every page. Truly a top-rated experience!", initials: "SH", color: "bg-secondary-container text-on-secondary-container" },
            { name: "Robert Miller", role: "Self-Published Author", text: "The communication was flawless. Titan understands children's psychology and how they interact with art. Our book is now a bestseller in its category!", initials: "RM", color: "bg-primary-container text-on-primary-container" },
            { name: "Elena Lopez", role: "Storyteller", text: "Absolutely stunning work. The character design is so unique. Titan didn't just draw my characters; they gave them souls.", initials: "EL", color: "bg-tertiary-container text-on-tertiary-container" },
            { name: "David Kim", role: "Independent Publisher", text: "Fast, professional, and incredibly talented. Titan Studio is my go-to for all my illustration needs.", initials: "DK", color: "bg-secondary-fixed text-on-secondary-fixed" }
          ].map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="break-inside-avoid bg-surface-container-lowest p-8 rounded-lg shadow-sm border border-outline-variant/10"
            >
              <div className="flex gap-1 mb-4 text-tertiary">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p className="text-on-surface mb-6 italic leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${t.color}`}>{t.initials}</div>
                <div>
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-on-surface-variant">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-8 overflow-hidden">
        <div className="max-w-4xl mx-auto bg-primary rounded-xl p-12 text-center text-on-primary relative z-10">
          <h2 className="font-headline text-4xl font-bold mb-6">Ready to start your story?</h2>
          <p className="text-lg mb-10 opacity-90">Let's collaborate to create something magical that children will cherish forever.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-on-primary text-primary px-10 py-4 rounded-full font-label font-bold text-lg hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-xl">
              Hire Titan on Fiverr
            </button>
            <button className="bg-transparent border-2 border-on-primary/30 text-on-primary px-10 py-4 rounded-full font-label font-bold text-lg hover:bg-white/10 transition-colors">
              View Portfolio
            </button>
          </div>
        </div>
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-secondary-container/20 rounded-full blur-3xl -translate-y-1/2"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-tertiary-container/20 rounded-full blur-3xl -translate-y-1/2"></div>
      </section>
    </div>
  );
};

const Contact = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto bg-brand-ink rounded-[3rem] p-12 md:p-20 text-white overflow-hidden relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
          <div>
            <h2 className="text-6xl font-display font-extrabold mb-8 leading-tight">
              Let's Build Your World.
            </h2>
            <p className="text-xl text-white/60 mb-12 leading-relaxed max-w-md">
              Have a large-scale project or need a unique visual identity? I offer custom packages for publishers and commercial brands.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-brand-ink px-8 py-4 rounded-full font-display font-bold hover:bg-gray-100 transition-all">
                Get a Custom Quote
              </button>
              <button className="bg-white/10 text-white px-8 py-4 rounded-full font-display font-bold hover:bg-white/20 transition-all border border-white/10">
                Schedule a Consultation
              </button>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10">
            <form className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">NAME</label>
                <input 
                  type="text" 
                  placeholder="Enter your name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-primary/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">PROJECT TYPE</label>
                <div className="relative">
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white appearance-none focus:outline-none focus:border-brand-primary/50 transition-colors">
                    <option className="bg-brand-ink">Children's Book Series</option>
                    <option className="bg-brand-ink">Character Design</option>
                    <option className="bg-brand-ink">Commercial Illustration</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">MESSAGE</label>
                <textarea 
                  rows={4}
                  placeholder="Tell me about your vision..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-primary/50 transition-colors resize-none"
                />
              </div>
              <button className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white py-4 rounded-full font-display font-bold transition-all shadow-lg shadow-brand-primary/20">
                Send Inquiry
              </button>
            </form>
          </div>
        </div>

        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-secondary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-display font-extrabold text-brand-primary">Titan</span>
              <span className="text-2xl font-display font-extrabold text-brand-ink">Studio</span>
            </div>
            <p className="text-brand-ink/50 text-sm leading-relaxed max-w-xs">
              Bringing magic to every page through vibrant illustrations and immersive character designs.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-ink/40 hover:text-brand-primary hover:shadow-md transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-ink/40 hover:text-brand-primary hover:shadow-md transition-all">
                <Share2 size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold mb-6">QUICK LINKS</h4>
            <ul className="space-y-4 text-sm font-medium text-brand-ink/50">
              <li><a href="#" className="hover:text-brand-primary transition-colors">Fiverr Profile</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Portfolio</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Service Packages</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Process Guide</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-6">SUPPORT</h4>
            <ul className="space-y-4 text-sm font-medium text-brand-ink/50">
              <li><a href="#" className="hover:text-brand-primary transition-colors">Contact Me</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-6">PAYMENT</h4>
            <div className="flex gap-3">
              <div className="bg-white px-3 py-2 rounded-lg shadow-sm flex items-center gap-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" referrerPolicy="no-referrer" />
                <span className="text-[8px] font-black text-brand-ink/30 uppercase tracking-widest">ACCEPTED</span>
              </div>
              <div className="bg-white px-3 py-2 rounded-lg shadow-sm flex items-center">
                <Mail size={16} className="text-brand-ink/30" />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-black text-brand-ink/30 uppercase tracking-widest">
          <div>© 2024 TITAN STUDIO. ALL RIGHTS RESERVED. DESIGNED FOR EXCELLENCE.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-brand-primary transition-colors">INSTAGRAM</a>
            <a href="#" className="hover:text-brand-primary transition-colors">BEHANCE</a>
            <a href="#" className="hover:text-brand-primary transition-colors">LINKEDIN</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: string; timestamp: string }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isArtistMode, setIsArtistMode] = useState(false);
  const [notifications, setNotifications] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [room] = useState(() => `room_${Math.random().toString(36).substr(2, 9)}`);

  const playSound = () => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3');
    audio.volume = 0.2;
    audio.play().catch(() => {}); // Ignore if browser blocks autoplay
  };

  useEffect(() => {
    // Join a unique room for the client
    socket.emit('join_room', isArtistMode ? 'artist_global' : room);

    // Auto-welcome message for new clients
    if (!isArtistMode && messages.length === 0) {
      setTimeout(() => {
        const welcomeMsg = {
          text: "Hi there! 👋 I'm Titan. How can I help you bring your story to life today?",
          sender: 'Titan (Artist)',
          timestamp: new Date().toISOString()
        };
        setMessages([welcomeMsg]);
        if (!isOpen) setNotifications(1);
      }, 1500);
    }

    const handleMessage = (data: { text: string; sender: string; timestamp: string }) => {
      setMessages((prev) => [...prev, data]);
      if (!isOpen) {
        setNotifications((prev) => prev + 1);
        playSound();
      }
    };

    const handleNotification = (data: { room: string; text: string; sender: string }) => {
      if (isArtistMode) {
        setMessages((prev) => [...prev, { text: `[${data.room}] ${data.text}`, sender: data.sender, timestamp: new Date().toISOString() }]);
        if (!isOpen) {
          setNotifications((prev) => prev + 1);
          playSound();
        }
      }
    };

    const handleTyping = (data: { sender: string }) => {
      setIsTyping(data.sender);
    };

    const handleStopTyping = () => {
      setIsTyping(null);
    };

    socket.on('receive_message', handleMessage);
    socket.on('new_chat_notification', handleNotification);
    socket.on('user_typing', handleTyping);
    socket.on('user_stop_typing', handleStopTyping);

    return () => {
      socket.off('receive_message', handleMessage);
      socket.off('new_chat_notification', handleNotification);
      socket.off('user_typing', handleTyping);
      socket.off('user_stop_typing', handleStopTyping);
    };
  }, [room, isArtistMode, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    
    // Emit typing event
    socket.emit('typing', { room: isArtistMode ? 'artist_global' : room, sender: isArtistMode ? 'Titan' : 'Client' });

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('stop_typing', { room: isArtistMode ? 'artist_global' : room, sender: isArtistMode ? 'Titan' : 'Client' });
    }, 2000);
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const messageData = {
      room: isArtistMode ? 'artist_global' : room,
      text: text,
      sender: isArtistMode ? 'Titan (Artist)' : 'Client',
    };

    socket.emit('send_message', messageData);
    socket.emit('stop_typing', { room: isArtistMode ? 'artist_global' : room, sender: isArtistMode ? 'Titan' : 'Client' });
    setInputValue('');
  };

  const quickReplies = [
    "How much for a book cover?",
    "What's your timeline?",
    "Do you do character design?",
    "I have a story idea!"
  ];

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
      {/* Artist Mode Toggle (For Demo) */}
      <button 
        onClick={() => setIsArtistMode(!isArtistMode)}
        className="bg-white/90 backdrop-blur-sm border border-gray-200 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-brand-ink/40 hover:text-brand-primary transition-all shadow-sm hover:shadow-md"
      >
        {isArtistMode ? 'Switch to Client View' : 'Switch to Artist View'}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-[380px] h-[600px] bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-brand-ink p-8 text-white flex items-center justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-brand-primary flex items-center justify-center shadow-lg shadow-brand-primary/20">
                  <Sparkles size={24} className="text-white" />
                </div>
                <div>
                  <div className="font-display font-bold text-lg">
                    {isArtistMode ? 'Artist Dashboard' : 'Titan Studio'}
                  </div>
                  <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Online & Ready
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
                <X size={24} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-gray-50/50 scrollbar-hide">
              {messages.map((msg, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i} 
                  className={`flex flex-col ${msg.sender.includes('Titan') ? 'items-start' : 'items-end'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed ${msg.sender.includes('Titan') ? 'bg-white text-brand-ink shadow-sm rounded-tl-none border border-gray-100' : 'bg-brand-primary text-white shadow-lg shadow-brand-primary/10 rounded-tr-none'}`}>
                    {msg.text}
                  </div>
                  <span className="text-[9px] font-black text-brand-ink/20 uppercase tracking-widest mt-2 px-2">
                    {msg.sender} • {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </motion.div>
              ))}
              
              {isTyping && (
                <div className="flex flex-col items-start">
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex gap-1">
                    <div className="w-1.5 h-1.5 bg-brand-ink/20 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-brand-ink/20 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-brand-ink/20 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-[9px] font-black text-brand-ink/20 uppercase tracking-widest mt-2 px-2">
                    {isTyping} is typing...
                  </span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {!isArtistMode && messages.length < 3 && (
              <div className="px-6 py-4 bg-white border-t border-gray-50 flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button 
                    key={reply}
                    onClick={() => handleSendMessage(reply)}
                    className="text-[10px] font-bold text-brand-ink/60 bg-gray-50 hover:bg-brand-primary/10 hover:text-brand-primary border border-gray-100 px-3 py-1.5 rounded-full transition-all"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }} 
              className="p-6 bg-white border-t border-gray-100 flex gap-3 items-center"
            >
              <div className="flex-grow relative">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Type your message..."
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-brand-primary/50 transition-all placeholder:text-brand-ink/20"
                />
              </div>
              <button 
                type="submit" 
                disabled={!inputValue.trim()}
                className="bg-brand-primary text-white w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-brand-primary-hover transition-all shadow-lg shadow-brand-primary/20 disabled:opacity-50 disabled:shadow-none"
              >
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <div className="relative">
        <button 
          onClick={() => {
            setIsOpen(!isOpen);
            setNotifications(0);
          }}
          className={`w-20 h-20 rounded-[2rem] flex items-center justify-center shadow-2xl transition-all duration-500 relative group ${notifications > 0 ? 'bg-brand-secondary text-brand-ink scale-110' : 'bg-brand-primary text-white hover:scale-110'}`}
        >
          {isOpen ? <X size={32} /> : <MessageCircle size={32} className="group-hover:rotate-12 transition-transform" />}
          
          {notifications > 0 && (
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-ink text-white text-[12px] font-black rounded-full flex items-center justify-center border-4 border-white animate-bounce shadow-lg">
              {notifications}
            </div>
          )}
        </button>
        
        {/* Pulse effect when unread */}
        {notifications > 0 && !isOpen && (
          <div className="absolute inset-0 bg-brand-secondary rounded-[2rem] animate-ping opacity-20 -z-10" />
        )}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <Gallery />
      <About />
      <Features />
      <Contact />
      <Footer />
      <ChatWidget />
    </div>
  );
}
