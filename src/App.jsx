import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu } from 'lucide-react';
import { Restation } from './Rest.jsx';

import {
  Layers,
  Store,
  Lightbulb,
  Star,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  ChevronDown,
  Quote,
  Building2,
  Award,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const useScrollReveal = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(currentRef);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    

    observer.observe(currentRef);
    return () => {
      if (currentRef) observer.disconnect();
    };
  }, []);

  return [ref, isVisible];
};

const PremiumLoader = ({ progress, onComplete }) => {
  const [statusText, setStatusText] = useState('INITIALIZING ENVIRONMENT');
  const loaderRef = useRef(null);
  const progressBarRef = useRef(null);
  const percentTextRef = useRef(null);
  const elementsContainerRef = useRef(null);

  const statusPhrases = [
    'INITIALIZING ENVIRONMENT',
    'COMPOSING THE DESCENT',
    'MATERIALIZING STRUCTURE',
    'RENDERING BIOPHILIC LUXURY',
    'ELEVATING LIGHT FIELDS'
  ];

  useEffect(() => {
    // Map the current numerical download state to a descriptive phrase index
    const phraseIndex = Math.min(
      Math.floor((progress / 100) * statusPhrases.length),
      statusPhrases.length - 1
    );
    setStatusText(statusPhrases[phraseIndex]);

    // Fast-track element text writing loops manually to bypass structural lag
    if (percentTextRef.current) percentTextRef.current.innerText = progress;
    if (progressBarRef.current) progressBarRef.current.style.width = `${progress}%`;

    // Drop out loader overlay frame smoothly at full load metrics
    if (progress === 100) {
      setStatusText('READY');

      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        }
      });

      tl.to({}, { duration: 0.4 }) // Cinematic break delay 
        .to(elementsContainerRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: 'power2.inOut'
        })
        .to(loaderRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out'
        });
    }
  }, [progress, onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed top-0 left-0 w-screen h-screen z-50 flex justify-center items-center select-none bg-[#020617] text-[#f8fafc]"
    >
      <div ref={elementsContainerRef} className="w-4/5 max-w-125 flex flex-col items-center tracking-[0.25em] font-sans">
        <h1 className="text-sm font-light mb-8 uppercase opacity-90">
          ready | homes
        </h1>
        <div className="w-full h-px bg-sky-400/15 relative mb-6">
          <div
            ref={progressBarRef}
            className="absolute top-0 left-0 h-full w-0 bg-sky-400 transition-all duration-300 ease-out"
          />
        </div>
        <div className="w-full flex justify-between text-[9px] font-light opacity-60 uppercase">
          <div className="min-w-62.5 tracking-widest">{statusText}</div>
          <div><span ref={percentTextRef}>0</span>%</div>
        </div>
      </div>
    </div>
  );
};

const HeroVideoScrub = ({ preloadedVideoUrl }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const introRef = useRef(null);
  const slideRefs = useRef([]);
  slideRefs.current = [];

  const addToSlideRefs = (el) => {
    if (el && !slideRefs.current.includes(el)) {
      slideRefs.current.push(el);
    }
  };

  const slidesData = [
    { title: "Design", desc: "Biophilic Architectural Harmony" },
    { title: "Precision", desc: "Calculated For Perfection" },
    { title: "Craft", desc: "Crafted Beyond Measure" }
  ];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Explicitly halt native automatic video loop pipelines
    video.pause();

    let mm = gsap.matchMedia();

    const createScrollTimeline = () => {
      const duration = video.duration || 8;

      mm.add({
        isMobile: "(max-width: 768px)",
        isDesktop: "(min-width: 769px)"
      }, (context) => {
        let { isMobile } = context.conditions;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=400%',
            pin: true,
            scrub: 1.2, // Premium cinematic lag tracking
            invalidateOnRefresh: true,
          }
        });

        // Frame interpolation controller matching scroll tracking bounds
        tl.fromTo(video, 
          { currentTime: 0 }, 
          { currentTime: duration, ease: 'none', duration: duration },
          0
        );

        const totalPhases = 1 + slidesData.length;
        const phaseDuration = duration / totalPhases;

        // Position transformations dynamically computed inside the layout context
        tl.fromTo(introRef.current,
          { opacity: 1, scale: 1, y: isMobile ? 0 : 30, x: isMobile ? 10 : 55 },
          { opacity: 0, scale: 0.95, y: -60, x: isMobile ? 10 : 55, duration: phaseDuration * 0.8, ease: 'power2.inOut' },
          0
        );

        // Map typography slide blocks sequentially onto the scrub layout timeline
        slidesData.forEach((slide, index) => {
          const slideEl = slideRefs.current[index];
          if (!slideEl) return;
          const startTime = (index + 1) * phaseDuration;
          
          tl.fromTo(slideEl,
            { opacity: 0, y: 48 },
            { opacity: 1, y: 0, duration: phaseDuration * 0.4, ease: 'power2.out' },
            startTime
          )
          .to(slideEl,
            { opacity: 0, y: -20, duration: phaseDuration * 0.4, ease: 'power2.in' },
            startTime + phaseDuration * 0.6
          );
        });
      });
    };

    if (video.readyState >= 1) {
      createScrollTimeline();
    } else {
      video.addEventListener('loadedmetadata', createScrollTimeline);
    }

    return () => {
      video.removeEventListener('loadedmetadata', createScrollTimeline);
      mm.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#020617]">
      <video
        ref={videoRef}
        src={preloadedVideoUrl} // Uses memory-mapped byte block addresses directly
        preload="auto"
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none opacity-80"
      />

      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-[#020617]/80 via-[#020617]/10 to-[#020617] z-10 pointer-events-none" />

      {/* Main Core Viewport Typography Elements */}
      <div className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none flex items-center justify-center">
        <div ref={introRef} className="absolute flex flex-col items-center justify-center text-center px-4 select-none">
          <h1 className="text-[40px] md:text-[5rem] font-bold tracking-[0.2em] leading-[0.85] uppercase text-[#f8fafc] drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            READY
          </h1>
          <h1 className="text-[65px] md:text-[11rem] font-bold tracking-tighter leading-[0.85] uppercase text-sky-300/90 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] mt-4">
            HOMES
          </h1>
        </div>
      </div>

      {/* Persistent Immersive HUD Display Panels */}
      <div className="absolute top-0 left-0 w-full h-full z-30 flex flex-col justify-between p-6 md:p-12 pointer-events-none">
       

        {/* Slides Content Layer */}
        <div className="absolute bottom-10 left-1/2 w-full max-w-4xl -translate-x-1/2 px-6 md:px-12 pointer-events-auto flex flex-col items-center justify-end text-center h-44 md:h-52">
          {slidesData.map((item, i) => (
            <div 
              key={i} 
              ref={addToSlideRefs} 
              className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end text-center px-6 opacity-0 select-none"
            >
              <p className="text-xs md:text-sm font-light tracking-[0.4em] mb-3 uppercase text-slate-300/80 drop-shadow-[0px_2px_10px_rgba(0,0,0,0.6)]">
                {item.desc}
              </p>
              <h2 className="text-4xl md:text-6xl font-semibold tracking-[0.15em] uppercase text-[#f8fafc] drop-shadow-[0px_4px_20px_rgba(0,0,0,0.8)]">
                {item.title}
              </h2>
            </div>
          ))}
        </div>

        
      </div>
    </div>
  );
};

const BiophilicChronicles = () => {
  const projects = [
    {
      id: "01",
      title: "Villa Satori",
      location: "Kyoto forest, Japan",
      specs: "8,200 SQ. FT. / BIOPHILIC SANCTUARY",
      desc: "Entwining ancient redwood timbercraft with modern clean air filtration and warm geothermal springs.",
      img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "02",
      title: "Obsidian Dune",
      location: "Mojave Desert, USA",
      specs: "6,400 SQ. FT. / SOLARIUM BIOSPHERE",
      desc: "A stunning volcanic glass structure designed with responsive solar shields and intelligent indoor microclimates.",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "03",
      title: "Aura Cliffs",
      location: "Sunnmøre, Norway",
      specs: "11,500 SQ. FT. / FJORD LOOKOUT",
      desc: "Suspended structural wings utilizing micro-wind turbine fabrics that interact seamlessly with maritime air currents.",
      img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section id="chronicles-section" className="min-h-screen w-full flex flex-col justify-center items-center bg-[#020617] py-24 px-6 md:px-12 relative z-20">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-950/40 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-6xl w-full z-10">
        <div className="text-center mb-20">
          <span className="text-[10px] tracking-[0.4em] text-sky-400 font-semibold uppercase mb-3 block">Estates Catalog</span>
          <h2 className="text-3xl md:text-5xl font-light tracking-wide text-[#f8fafc] uppercase">The Chronicles</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto mt-4 tracking-wider leading-relaxed">
            Explore our signature biophilic developments tailored perfectly to harmonise with world-class natural matrices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((proj) => (
            <div key={proj.id} className="group flex flex-col justify-between bg-slate-950/60 border border-sky-400/10 rounded-2xl p-6 hover:bg-slate-900/80 hover:border-sky-300/20 transition-all duration-500 cursor-pointer">
              <div>
                <div className="relative w-full h-64 overflow-hidden rounded-xl mb-6 bg-black/40">
                  <img 
                    src={proj.img} 
                    alt={proj.title}
                    className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/800x640/15202b/ffffff?text=${proj.title}`;
                    }}
                  />
                  <div className="absolute top-4 left-4 text-[10px] bg-[#020617]/70 backdrop-blur-md px-3 py-1 rounded-full text-sky-300 tracking-widest font-mono border border-sky-400/15">
                    {proj.id}
                  </div>
                </div>

                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-normal text-[#f8fafc] tracking-wide group-hover:text-sky-300 transition-colors">{proj.title}</h3>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest pt-1">{proj.location}</span>
                </div>
                
                <p className="text-[9px] tracking-widest text-sky-400 uppercase font-semibold mb-4 opacity-90">{proj.specs}</p>
                <p className="text-xs text-slate-300 leading-relaxed font-light">{proj.desc}</p>
              </div>

              <div className="pt-6 border-t border-sky-400/10 mt-6 flex justify-between items-center text-[10px] uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">
                <span>Acquire Manifest</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


const ContactFooter = () => {
  const [contactRef, isVisible] = useScrollReveal();

  return (
    <section
      ref={contactRef}
      className="bg-[#060606] text-white pt-24 md:pt-32 px-6 md:px-[5vw] relative z-10"
      id="contact"
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 pb-24 border-b border-sky-400/10 mb-20">
        {/* Contact Left - Information */}
        <div className="col-span-1 lg:col-span-5">
          <div
            className={`flex items-center gap-4 mb-4 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="h-px w-12 bg-white"></div>
            <span className="font-mono tracking-[0.2em] text-sm uppercase font-bold text-[#f8fafc]">
              Get in Touch
            </span>
          </div>

          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-light mb-6 tracking-tight leading-[1.1] transition-all duration-1000 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            Let's build something
            <br />
            <span className="font-semibold text-sky-400">extraordinary.</span>
          </h2>

          <p
            className={`text-lg text-slate-400 leading-relaxed mb-12 max-w-[450px] transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            Ready to transform your legacy into authority? Whether it's a
            flagship rollout or a bespoke hospitality space, we bring visionary
            concepts into disciplined execution.
          </p>

          <div
            className={`flex flex-col gap-6 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="flex items-start gap-4 text-white text-[15px] font-light">
              <MapPin size={20} className="text-sky-400 shrink-0 mt-1" />
              <span>
               Malkapur Bypass Rd, Ganesh Nagar, Buldhana, Maharashtra 443001
              </span>
            </div>
            <div className="flex items-center gap-4 text-white text-[15px] font-light">
              <Mail size={20} className="text-sky-400 shrink-0" />
              <span>studio@happyhomes.in</span>
            </div>
            <div className="flex items-center gap-4 text-white text-[15px] font-light">
              <Phone size={20} className="text-sky-400 shrink-0" />
              <span>+91 8180951999 </span>
            </div>
          </div>
        </div>

        {/* Contact Right - Form */}
        <div className="col-span-1 lg:col-span-7">
          <form
            className="flex flex-col gap-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <div
              className={`w-full transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <input
                type="text"
                className="w-full bg-transparent border-0 border-b border-sky-400/20 text-white py-4 text-lg font-inherit transition-colors focus:outline-none focus:border-sky-400 placeholder-slate-500 font-light"
                placeholder="Your Name"
                required
              />
            </div>
            <div
              className={`w-full transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <input
                type="email"
                className="w-full bg-transparent border-0 border-b border-sky-400/20 text-white py-4 text-lg font-inherit transition-colors focus:outline-none focus:border-sky-400 placeholder-slate-500 font-light"
                placeholder="Email Address"
                required
              />
            </div>
            <div
              className={`w-full transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <input
                type="text"
                className="w-full bg-transparent border-0 border-b border-sky-400/20 text-white py-4 text-lg font-inherit transition-colors focus:outline-none focus:border-sky-400 placeholder-slate-500 font-light"
                placeholder="Company / Project Name"
              />
            </div>
            <div
              className={`w-full transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <textarea
                className="w-full bg-transparent border-0 border-b border-sky-400/20 text-white py-4 text-lg font-inherit transition-colors focus:outline-none focus:border-sky-400 placeholder-slate-500 font-light resize-y min-h-[120px]"
                placeholder="Tell us about your project..."
                rows="4"
                required
              ></textarea>
            </div>
            <div
              className={`transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <button
                type="submit"
                className="flex items-center gap-3 bg-[#f8fafc] text-[#020617] border-none px-10 py-4 uppercase tracking-[0.1em] text-sm font-bold cursor-pointer transition-colors mt-4 rounded hover:bg-sky-400 hover:text-[#020617] group w-max"
              >
                Send Message
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-2"
                />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer Area */}
      <footer className="pb-10">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between gap-12 mb-10">
          <div className="flex flex-col gap-6 ">
            <span className="text-2xl font-bold tracking-[2px]">
           


            </span>
          </div>
          <div className="flex flex-col md:flex-row gap-12 md:gap-20">
            <div className="flex flex-col gap-4">
              <h4 className="text-sm text-slate-400 uppercase tracking-[2px] mb-2">
                Studio
              </h4>
              <a
                href="#"
                className="text-slate-300 no-underline text-[15px] font-light hover:text-sky-300 transition-colors"
              >
                About Us
              </a>
              <a
                href="#"
                className="text-slate-300 no-underline text-[15px] font-light hover:text-sky-300 transition-colors"
              >
                Selected Works
              </a>
              <a
                href="#"
                className="text-slate-300 no-underline text-[15px] font-light hover:text-sky-300 transition-colors"
              >
                Services
              </a>
              <a
                href="#"
                className="text-slate-300 no-underline text-[15px] font-light hover:text-sky-300 transition-colors"
              >
                Careers
              </a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-sm text-slate-400 uppercase tracking-[2px] mb-2">
                Legal
              </h4>
              <a
                href="#"
                className="text-slate-300 no-underline text-[15px] font-light hover:text-sky-300 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-slate-300 no-underline text-[15px] font-light hover:text-sky-300 transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-slate-300 no-underline text-[15px] font-light hover:text-sky-300 transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto flex justify-center pt-10 border-t border-sky-400/10">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Tak Spaces Architecture & Design.
            All rights reserved.
          </p>
        </div>
      </footer>
    </section>
  );
};

const App = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [videoUrlPath, setVideoUrlPath] = useState('');
  const [isXhrFailed, setIsXhrFailed] = useState(false);

  useEffect(() => {
    const useMobileFile = window.matchMedia('(max-width: 768px)').matches;
    const targetVideoFile = useMobileFile ? '/output1.mp4' : '/output2.mp4';
    
    // Fallback path setup right away to prevent empty string ("") warnings
    setVideoUrlPath(targetVideoFile);

    const xhr = new XMLHttpRequest();
    xhr.open('GET', targetVideoFile, true);
    xhr.responseType = 'blob';

    xhr.onprogress = (event) => {
      if (event.lengthComputable && !isXhrFailed) {
        const percentage = Math.round((event.loaded / event.total) * 100);
        setDownloadProgress(percentage);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const blobUrl = URL.createObjectURL(xhr.response);
        setVideoUrlPath(blobUrl);
        setDownloadProgress(100);
      } else {
        setIsXhrFailed(true);
      }
    };

    xhr.onerror = () => {
      console.warn("XHR Thread blocked by local server constraints. Switching to native HTML5 preload engine.");
      setIsXhrFailed(true);
    };

    xhr.send();

    return () => {
      xhr.abort();
    };
  }, [isXhrFailed]);

  // Native HTML5 Video Buffering Tracker (Fires only if XHR gets blocked)
  const handleNativeVideoProgress = (e) => {
    if (!isXhrFailed) return;
    
    const videoElement = e.target;
    if (videoElement.buffered.length > 0) {
      const bufferedEnd = videoElement.buffered.end(videoElement.buffered.length - 1);
      const duration = videoElement.duration;
      if (duration > 0) {
        const percentage = Math.round((bufferedEnd / duration) * 100);
        
        // Don't let progress go backward if it's already higher
        setDownloadProgress((prev) => Math.max(prev, percentage));
        
        if (percentage >= 95) {
          setDownloadProgress(100);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-[#f8fafc] font-sans antialiased selection:bg-sky-500/30">
      
      {/* Hidden background video link acting as native preloader if XHR fails */}
      {isXhrFailed && !loadingComplete && (
        <video
          src={videoUrlPath}
          preload="auto"
          muted
          className="hidden"
          onProgress={handleNativeVideoProgress}
          onCanPlayThrough={() => setDownloadProgress(100)}
        />
      )}

      {/* Loader UI Element */}
      {!loadingComplete && (
        <PremiumLoader 
          progress={downloadProgress} 
          onComplete={() => setLoadingComplete(true)} 
        />
      )}

      {/* Main UI Container */}
      <div 
        className="w-full transition-opacity duration-1000 ease-out"
        style={{ opacity: loadingComplete ? 1 : 0 }}
      >
        {loadingComplete && videoUrlPath && (
          <HeroVideoScrub preloadedVideoUrl={videoUrlPath} />
        )}

       

        <Restation />

        <BiophilicChronicles />
        <ContactFooter />

       
      </div>
    </div>
  );
};

export default App;