import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu } from 'lucide-react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

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
      className="fixed top-0 left-0 w-screen h-screen z-50 flex justify-center items-center select-none bg-[#050a0e] text-[#f5f2eb]"
    >
      <div ref={elementsContainerRef} className="w-4/5 max-w-125 flex flex-col items-center tracking-[0.25em] font-sans">
        <h1 className="text-sm font-light mb-8 uppercase opacity-90">
          ready | homes
        </h1>
        <div className="w-full h-px bg-white/10 relative mb-6">
          <div
            ref={progressBarRef}
            className="absolute top-0 left-0 h-full w-0 bg-[#f5f2eb] transition-all duration-300 ease-out"
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
            { opacity: 0, y: 400 },
            { opacity: 1, y: 280, duration: phaseDuration * 0.4, ease: 'power2.out' },
            startTime
          )
          .to(slideEl,
            { opacity: 0, y: 180, duration: phaseDuration * 0.4, ease: 'power2.in' },
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
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#050a0e]">
      <video
        ref={videoRef}
        src={preloadedVideoUrl} // Uses memory-mapped byte block addresses directly
        preload="auto"
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none opacity-80"
      />

      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-[#050a0e]/60 via-transparent to-[#050a0e] z-10 pointer-events-none" />

      {/* Main Core Viewport Typography Elements */}
      <div className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none flex items-center justify-center">
        <div ref={introRef} className="absolute flex flex-col items-center justify-center text-center px-4 select-none">
          <h1 className="text-[40px] md:text-[5rem] font-bold tracking-[0.2em] leading-[0.85] uppercase text-[#f5f2eb] drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            READY
          </h1>
          <h1 className="text-[65px] md:text-[11rem] font-bold tracking-tighter leading-[0.85] uppercase text-[#f5f2eb]/90 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] mt-4">
            HOMES
          </h1>
        </div>
      </div>

      {/* Persistent Immersive HUD Display Panels */}
      <div className="absolute top-0 left-0 w-full h-full z-30 flex flex-col justify-between p-6 md:p-12 pointer-events-none">
        <div className="flex justify-between items-center text-[#f5f2eb] pointer-events-auto">
          <div className="tracking-[0.3em] md:text-lg text-[10px] font-semibold uppercase">
            <p>ready | homes</p>
          </div>

          <div className="hidden md:flex text-[15px] tracking-widest text-white/50 border border-white/10 px-8 py-3 rounded-full uppercase backdrop-blur-md bg-[#050a0e]/30 flex-row gap-8 items-center">
            <h2>Home</h2>
            <h2>SERVICES</h2>
            <h2>PROJECTS</h2>
            <h2>CONTACT US</h2>
          </div>
          <div className="text-[10px] tracking-widest text-white/50 border border-white/10 px-3 py-1 rounded-full uppercase backdrop-blur-md bg-[#050a0e]/30">
            <Menu size={34} className="inline-block ml-1" />
          </div>
        </div>

        {/* Slides Content Layer */}
        <div className="self-center mb-12 md:mb-16 pointer-events-auto flex flex-col items-center relative w-full h-40">
          {slidesData.map((item, i) => (
            <div 
              key={i} 
              ref={addToSlideRefs} 
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 opacity-0 select-none"
            >
              <p className="text-xs md:text-sm font-light tracking-[0.4em] mb-4 uppercase text-[#f5f2eb]/80 drop-shadow-[0px_2px_10px_rgba(0,0,0,0.6)]">
                {item.desc}
              </p>
              <h2 className="text-5xl md:text-7xl font-semibold tracking-[0.15em] uppercase text-[#f5f2eb] drop-shadow-[0px_4px_20px_rgba(0,0,0,0.8)]">
                {item.title}
              </h2>
            </div>
          ))}
        </div>

        <span className="text-center w-full text-[#f5f2eb] text-[9px] tracking-[0.3em] uppercase font-light opacity-60">
          Scroll to Chronicles
        </span>
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
    <section id="chronicles-section" className="min-h-screen w-full flex flex-col justify-center items-center bg-[#050a0e] py-24 px-6 md:px-12 relative z-20">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-6xl w-full z-10">
        <div className="text-center mb-20">
          <span className="text-[10px] tracking-[0.4em] text-[#d4af37] font-semibold uppercase mb-3 block">Estates Catalog</span>
          <h2 className="text-3xl md:text-5xl font-light tracking-wide text-white uppercase">The Chronicles</h2>
          <p className="text-xs text-[#f5f2eb]/40 max-w-md mx-auto mt-4 tracking-wider leading-relaxed">
            Explore our signature biophilic developments tailored perfectly to harmonise with world-class natural matrices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((proj) => (
            <div key={proj.id} className="group flex flex-col justify-between bg-white/2 border border-white/5 rounded-2xl p-6 hover:bg-white/4 hover:border-white/15 transition-all duration-500 cursor-pointer">
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
                  <div className="absolute top-4 left-4 text-[10px] bg-[#050a0e]/60 backdrop-blur-md px-3 py-1 rounded-full text-[#d4af37] tracking-widest font-mono border border-white/10">
                    {proj.id}
                  </div>
                </div>

                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-normal text-[#f5f2eb] tracking-wide group-hover:text-[#d4af37] transition-colors">{proj.title}</h3>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest pt-1">{proj.location}</span>
                </div>
                
                <p className="text-[9px] tracking-widest text-[#d4af37] uppercase font-semibold mb-4 opacity-90">{proj.specs}</p>
                <p className="text-xs text-[#f5f2eb]/60 leading-relaxed font-light">{proj.desc}</p>
              </div>

              <div className="pt-6 border-t border-white/5 mt-6 flex justify-between items-center text-[10px] uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
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

const App = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [videoBlobUrl, setVideoBlobUrl] = useState('');

  useEffect(() => {
    // Dynamically query target assets based on hardware layout profiles
    const useMobileFile = window.matchMedia('(max-width: 768px)').matches;
    const targetVideoFile = useMobileFile ? '/output1.mp4' : '/output2.mp4';

    const xhr = new XMLHttpRequest();
    xhr.open('GET', targetVideoFile, true);
    xhr.responseType = 'blob';

    // Track binary frame metrics transferring across network hooks
    xhr.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = Math.round((event.loaded / event.total) * 100);
        setDownloadProgress(percentage);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        // Convert binary stream data into an immediately accessible local object URL pointer
        const blobUrl = URL.createObjectURL(xhr.response);
        setVideoBlobUrl(blobUrl);
        setDownloadProgress(100);
      }
    };

    xhr.onerror = () => {
      console.error("Local resource preload thread tracking interrupted.");
      setDownloadProgress(100); // Safety validation switch to unblock layout access
    };

    xhr.send();

    return () => {
      xhr.abort();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050a0e] text-[#f5f2eb] font-sans antialiased selection:bg-blue-500/30">
      
      {/* Structural Network Context Loader */}
      {!loadingComplete && (
        <PremiumLoader 
          progress={downloadProgress} 
          onComplete={() => setLoadingComplete(true)} 
        />
      )}

      {/* Render core landing blocks once caching validation finishes */}
      <div 
        className="w-full transition-opacity duration-1000 ease-out"
        style={{ opacity: loadingComplete ? 1 : 0 }}
      >
        {loadingComplete && <HeroVideoScrub preloadedVideoUrl={videoBlobUrl} />}

        <section className="h-screen w-full flex flex-col items-center justify-center border-t border-white/5 relative z-20">
          <h2 className="text-2xl font-light tracking-widest uppercase mb-4">Daylight Amenities Tour</h2>
          <p className="text-xs tracking-widest opacity-40 uppercase">Keep scrolling for horizontal reveals</p>
        </section>

        <BiophilicChronicles />

        <footer className="border-t border-white/5 py-8 text-center text-[10px] tracking-widest uppercase opacity-40 relative z-20">
          © 2026 READY HOMES INTUITION. ALL POWER COMPLIANT.
        </footer>
      </div>
    </div>
  );
};

export default App;