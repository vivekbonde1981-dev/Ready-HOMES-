 import React, { useRef, useEffect ,useState} from 'react';
 import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu} from 'lucide-react'

// // Register the ScrollTrigger plugin
// gsap.registerPlugin(ScrollTrigger);

// const GsapScrollVideo = () => {
//   const containerRef = useRef(null);
//   const videoRef = useRef(null);
  // const [isMobile, setIsMobile] = useState(false);

  // useEffect(() => {
  //   // 768px tak mobile/tablet treat karega (jaisa tailwind ya bootstrap me hota hai)
  //   const mediaQuery = window.matchMedia('(max-width: 768px)');
    
  //   // Initial check lagao component mount hote hi
  //   setIsMobile(mediaQuery.matches);

  //   // Event handler jo dynamic resize ko check karega
  //   const handleBreakpointChange = (e) => {
  //     setIsMobile(e.matches);
  //   };

  //   // Modern browsers ke liye listener attach karo
  //   mediaQuery.addEventListener('change', handleBreakpointChange);

  //   // Cleanup taaki memory leaks na hon
  //   return () => {
  //     mediaQuery.removeEventListener('change', handleBreakpointChange);
  //   };
  // }, []);

//   useEffect(() => {
//     const video = videoRef.current;
//     const container = containerRef.current;
//     if (!video || !container) return;

//     let onLoaded;

//     const ctx = gsap.context(() => {
//       const setupScrollTrigger = () => {
//         gsap.to(video, {
//           currentTime: video.duration,
//           ease: 'none',
//           scrollTrigger: {
//             trigger: container,
//             start: 'top top',
//             end: '+=300%',
//             scrub: true,
//             pin: true,
//           },
//         });
//       };

//       onLoaded = () => setupScrollTrigger();

//       if (video.readyState >= 1) {
//         setupScrollTrigger();
//       } else {
//         video.addEventListener('loadedmetadata', onLoaded);
//       }
//     }, container);

//     return () => {
//       if (onLoaded) video.removeEventListener('loadedmetadata', onLoaded);
//       ctx.revert();
//     };
//   }, []);

//   return (
//     // GSAP will automatically wrap this in a pin-spacer and manage the height
//     <div ref={containerRef} style={{ width: '100%', height: '100vh', backgroundColor: '#000' }}>
//       {isMobile ? (
//   <video
//     ref={videoRef}
//     src="output1.mp4" // Your newly generated mobile video
//     preload="auto"
//     muted
//     playsInline
//     style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
//   />
// ) : (
//   <video
//     ref={videoRef}
//     src="output2.mp4" // Your verified desktop video
//     preload="auto"
//     muted
//     playsInline
//     style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
//   />
// )}
//     </div>
//   );
// };

// export default GsapScrollVideo;





// const App = () => {
//   const [loadingComplete, setLoadingComplete] = useState(false);
//   const videoUrl = "https://flow-content.google/video/c83163b0-823e-495e-9458-589a00ab246f?Expires=1783261827&KeyName=labs-flow-prod-cdn-key&Signature=CIno_7Amu88AMD0E6Z0aSqPWKw0";

//   return (
//     <div className="min-h-[200vh] bg-[#050a0e] text-[#f5f2eb] font-sans antialiased selection:bg-white/20">
      
//       {/* Render Loader until complete */}
//       {!loadingComplete && (
//         <PremiumLoader onComplete={() => setLoadingComplete(true)} />
//       )}
      
//       {/* Reveal Main App smoothly */}
//       <div 
//         className="w-full transition-opacity duration-1000 ease-out"
//         style={{ opacity: loadingComplete ? 1 : 0 }}
//       >
//         <HeroVideoScrub videoUrl={videoUrl} />
        
//         {/* Next Section Placeholder */}
//         <section className="h-screen w-full flex flex-col items-center justify-center border-t border-white/5 relative z-20">
//           <h2 className="text-2xl font-light tracking-widest uppercase mb-4">Daylight Amenities Tour</h2>
//           <p className="text-xs tracking-widest opacity-40 uppercase">Keep scrolling for horizontal reveals</p>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default App;



    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    const PremiumLoader = ({ onComplete }) => {
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
        let phraseIndex = 0;
        const statusInterval = setInterval(() => {
          if (phraseIndex < statusPhrases.length - 1) {
            phraseIndex++;
            setStatusText(statusPhrases[phraseIndex]);
          }
        }, 800);

        let currentProgress = 0;
        const progressInterval = setInterval(() => {
          currentProgress += Math.floor(Math.random() * 8) + 3;
          if (currentProgress > 100) {
            currentProgress = 100;
          }

          if (percentTextRef.current) {
            percentTextRef.current.innerText = currentProgress;
          }
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${currentProgress}%`;
          }

          if (currentProgress === 100) {
            clearInterval(progressInterval);
            clearInterval(statusInterval);
            setStatusText('READY');

            const tl = gsap.timeline({
              onComplete: () => {
                if (onComplete) onComplete();
              }
            });

            tl.to({}, { duration: 0.3 })
              .to(elementsContainerRef.current, {
                opacity: 0,
                y: -20,
                duration: 0.6,
                ease: 'power2.inOut'
              })
              .to(loaderRef.current, {
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out'
              });
          }
        }, 100);

        return () => {
          clearInterval(progressInterval);
          clearInterval(statusInterval);
        };
      }, [onComplete]);

      return (
        <div
          ref={loaderRef}
          className="fixed top-0 left-0 w-screen h-screen z-50 flex justify-center items-center select-none bg-[#050a0e] text-[#f5f2eb]"
        >
          <div ref={elementsContainerRef} className="w-4/5 max-w-[500px] flex flex-col items-center tracking-[0.25em] font-sans">
            <h1 className="text-sm font-light mb-8 uppercase opacity-90">
              ready | homes
            </h1>
            <div className="w-full h-[1px] bg-white/10 relative mb-6">
              <div
                ref={progressBarRef}
                className="absolute top-0 left-0 h-full w-0 bg-[#f5f2eb] transition-all duration-100"
              />
            </div>
            <div className="w-full flex justify-between text-[9px] font-light opacity-60 uppercase">
              <div className="min-w-[250px] tracking-widest">{statusText}</div>
              <div><span ref={percentTextRef}>0</span>%</div>
            </div>
          </div>
        </div>
      );
    };

    const HeroVideoScrub = ({ videoUrl }) => {
      const containerRef = useRef(null);
      const videoRef = useRef(null);
      const [isMobile, setIsMobile] = useState(false);

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
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        setIsMobile(mediaQuery.matches);
        const handleResize = (e) => setIsMobile(e.matches);
        mediaQuery.addEventListener('change', handleResize);
        return () => mediaQuery.removeEventListener('change', handleResize);
      }, []);

      useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const createScrollTimeline = () => {
          // Clean up prior triggers
          ScrollTrigger.getAll().forEach(t => {
            if (t.trigger === containerRef.current) t.kill();
          });

          const duration = video.duration || 8;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: '+=400%', // cinematic scroll depth
              pin: true,
              scrub: 1.2, // buttery premium cinematic lag
              invalidateOnRefresh: true,
            }
          });

          // Scrub video progress linearly with scroll
          tl.fromTo(video, 
            { currentTime: 0 }, 
            { 
              currentTime: duration, 
              ease: 'none',
              duration: duration 
            },
            0
          );

          // 1 intro phase + slides count
          const totalPhases = 1 + slidesData.length;
          const phaseDuration = duration / totalPhases;

          // Animate the big "READY HOMES" title in the center (visible first, fades out sliding up)
          // tl.fromTo(introRef.current,
          //   { opacity: 1, scale: 1, y: 30 ,x:70},
          //   { opacity: 0, scale: 0.95, y: -60,x:70,duration: phaseDuration * 0.8, ease: 'power2.inOut' },
          //   0
          // );

          {isMobile ? (tl.fromTo(introRef.current,
            { opacity: 1, scale: 1, y:0 ,x:10},
            { opacity: 0, scale: 0.95, y: -60,x:10,duration: phaseDuration * 0.8, ease: 'power2.inOut' },
            0
          )):(tl.fromTo(introRef.current,
            { opacity: 1, scale: 1, y: 30 ,x:55},
            { opacity: 0, scale: 0.95, y: -60,x:55,duration: phaseDuration * 0.8, ease: 'power2.inOut' },
            0
          ))}

          // Animate sequential slides to fade in at center and fade out to the BOTTOM
          slidesData.forEach((slide, index) => {
            const slideEl = slideRefs.current[index];
            if (!slideEl) return;
            const startTime = (index + 1) * phaseDuration;
            
            tl.fromTo(slideEl,
              { opacity: 0, y:400 },
              { opacity: 1, y:280, duration: phaseDuration * 0.4, ease: 'power2.out' },
              startTime
            )
            .to(slideEl,
              { 
                opacity: 0, 
                y: 180, // Fades an glides directly down towards the bottom 
                duration: phaseDuration * 0.4, 
                ease: 'power2.in' 
              },
              startTime + phaseDuration * 0.6
            );
          });
        };

        if (video.readyState >= 1) {
          createScrollTimeline();
        } else {
          video.addEventListener('loadedmetadata', createScrollTimeline);
        }

        return () => {
          video.removeEventListener('loadedmetadata', createScrollTimeline);
        };
      }, [isMobile]);

      // Handle custom smooth jump down to Chronicles Catalog
      const scrollToChronicles = () => {
        const chroniclesSection = document.getElementById('chronicles-section');
        if (chroniclesSection) {
          chroniclesSection.scrollIntoView({ behavior: 'smooth' });
        }
      };

      return (
        <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#050a0e]">
          {/* Background Cinematic Video */}
          <video
            key={isMobile ? 'mobile' : 'desktop'}
            ref={videoRef}
            src={isMobile ? "output1.mp4" : "output2.mp4"} // Verified desktop video
            preload="auto"
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none opacity-80"
          />

          {/* Overlay Vistas */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#050a0e]/60 via-transparent to-[#050a0e] z-10 pointer-events-none"></div>

          {/* Scrolling Typography Panels */}
          <div className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none flex items-center justify-center">
            
            {/* Phase 1: Huge Centered Title ("READY" on Line 1, "HOMES" on Line 2) */}
            <div 
              ref={introRef} 
              className="absolute flex flex-col items-center justify-center text-center px-4 select-none"
            >
              <h1 className="text-[40px] md:text-[5rem] font-bold tracking-[0.2em] leading-[0.85] text-center uppercase text-[#f5f2eb] drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                READY
              </h1>
              <h1 className="text-[65px] md:text-[11rem] font-bold tracking-tighter leading-[0.85] text-center uppercase text-[#f5f2eb]/90 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] mt-4">
                HOMES
              </h1>
            </div>

            {/* Subsequent Phases: Title & Description coming in, then fading out to the bottom */}
            {/* {slidesData.map((item, i) => (
              <div 
                key={i} 
                ref={addToSlideRefs} 
                className="fixed border-0 left-0 flex flex-col items-center justify-center text-center px-6 opacity-0 select-none"
              >
                <p 
                  className="text-xs md:text-sm font-light tracking-[0.4em] mb-4 uppercase text-[#f5f2eb]/80"
                  style={{ textShadow: '0px 2px 10px rgba(0,0,0,0.6)' }}
                >
                  {item.desc}
                </p>
                <h2 
                  className="text-5xl md:text-7xl font-semibold tracking-[0.15em] uppercase text-[#f5f2eb]"
                  style={{ textShadow: '0px 4px 20px rgba(0,0,0,0.8)' }}
                >
                  {item.title}
                </h2>
              </div>
            ))} */}
          </div>

          {/* Immersive HUD (Heads-up Display) Overlay */}
          <div className="absolute top-0 left-0 w-full h-full z-30 flex flex-col justify-between p-6 md:p-12 pointer-events-none">
            <div className="flex justify-between items-center text-[#f5f2eb] pointer-events-auto">
              <div className="tracking-[0.3em] md:text-lg text-sm font-semibold uppercase">
                ready | homes
              </div>

              <div  className=" invisible md:visible text-[10px] md:text-[15px] lg:text-[15px] tracking-widest text-white/50 border border-white/10 px-8 py-3 rounded-full uppercase backdrop-blur-md bg-[#050a0e]/30 flex flex-row gap-2 md:gap-8 items-center">
                 <h2>Home</h2>
                 <h2>SERVICES</h2>
                <h2>PROJECTS</h2>
                <h2>CONTACT US</h2>
              </div>
              <div className="text-[10px] tracking-widest text-white/50 border border-white/10 px-3 py-1 rounded-full uppercase backdrop-blur-md bg-[#050a0e]/30">
                <Menu size={34} className="inline-block ml-1" />
              </div>
            </div>

            {/* Premium Call to Action */}
            <div className="self-center mb-12 md:mb-16 pointer-events-auto flex flex-col items-center visibility-hidden">
              {slidesData.map((item, i) => (
              <div 
                key={i} 
                ref={addToSlideRefs} 
                className="absolute flex flex-col items-center justify-center text-center px-6 opacity-0 select-none"
              >
                <p 
                  className="text-xs md:text-sm font-light tracking-[0.4em] mb-4 uppercase text-[#f5f2eb]/80"
                  style={{ textShadow: '0px 2px 10px rgba(0,0,0,0.6)' }}
                >
                  {item.desc}
                </p>
                <h2 
                  className="text-5xl md:text-7xl font-semibold tracking-[0.15em] uppercase text-[#f5f2eb]"
                  style={{ textShadow: '0px 4px 20px rgba(0,0,0,0.8)' }}
                >
                  {item.title}
                </h2>
              </div>
            ))}
            </div>
            <span className=" relative bottom-0 left-[45%] text-[#f5f2eb] mt-9 text-[9px] tracking-[0.3em] uppercase items-center font-light opacity-60">
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
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full filter blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full filter blur-[120px] pointer-events-none"></div>

          <div className="max-w-6xl w-full z-10">
            {/* Header Section */}
            <div className="text-center mb-20">
              <span className="text-[10px] tracking-[0.4em] text-[#d4af37] font-semibold uppercase mb-3 block">Estates Catalog</span>
              <h2 className="text-3xl md:text-5xl font-light tracking-wide text-white uppercase">The Chronicles</h2>
              <p className="text-xs text-[#f5f2eb]/40 max-w-md mx-auto mt-4 tracking-wider leading-relaxed">
                Explore our signature biophilic developments tailored perfectly to harmonise with world-class natural matrices.
              </p>
            </div>

            {/* Showcase Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((proj) => (
                <div key={proj.id} className="group flex flex-col justify-between bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.04] hover:border-white/15 transition-all duration-500 cursor-pointer">
                  <div>
                    {/* Media Block with absolute layout fallback */}
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
      const videoUrl = "https://flow-content.google/video/c83163b0-823e-495e-9458-589a00ab246f?Expires=1783261827&KeyName=labs-flow-prod-cdn-key&Signature=CIno_7Amu88AMD0E6Z0aSqPWKw0";

      return (
        <div className="min-h-screen bg-[#050a0e] text-[#f5f2eb] font-sans antialiased selection:bg-blue-500/30">
          
          {/* Universal Premium Loader */}
          {!loadingComplete && (
            <PremiumLoader onComplete={() => setLoadingComplete(true)} />
          )}

          {/* Core Web Framework (Smooth-reveals on complete loaded states) */}
          <div 
            className="w-full transition-opacity duration-1000 ease-out"
            style={{ opacity: loadingComplete ? 1 : 0 }}
          >
            {/* Cinematic Video Scrub Section */}
            <HeroVideoScrub videoUrl={videoUrl} />

             <section className="h-screen w-full flex flex-col items-center justify-center border-t border-white/5 relative z-20">
          <h2 className="text-2xl font-light tracking-widest uppercase mb-4">Daylight Amenities Tour</h2>
           <p className="text-xs tracking-widest opacity-40 uppercase">Keep scrolling for horizontal reveals</p>
        </section>

            {/* Seamless Biophilic Showcase Catalog (Replaced calculator) */}
            <BiophilicChronicles />

            {/* Micro footer component */}
            <footer className="border-t border-white/5 py-8 text-center text-[10px] tracking-widest uppercase opacity-40 relative z-20">
              © 2026 READY HOMES INTUITION. ALL POWER COMPLIANT.
            </footer>
          </div>

        </div>
      );
    };

    export default App;
