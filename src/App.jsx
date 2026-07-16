import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileX } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ScrollAnimation= () => {
  const videoRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    video.currentTime = 0.001;
    
    // We target the section that wraps the sticky video
    const setupAnimation = () => {
      gsap.fromTo(
        video,
        { currentTime: 0 },
        {
          currentTime: video.duration || 5,
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top", // Starts when the sticky container hits the top
            end: "+=3000",    // How many pixels the user must scroll to finish the video
            scrub: 1,
            pin: true,        // This "freezes" the section in place while scrubbing
            anticipatePin: 1,
          },
        }
      );
    };

    if (video.readyState >= 2) {
      setupAnimation();
    } else {
      video.addEventListener("loadedmetadata", setupAnimation);
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      video.removeEventListener("loadedmetadata", setupAnimation);
    };
  }, []);

  return (
    <div>
      {/* 1. Normal Component Before */}
      <div style={{ height: "100vh", background: "#f0f0f0", display: "grid", placeItems: "center" }}>
        {/* <h1>Scroll down to see the video</h1> */}
      </div>

      {/* 2. Video Scrubbing Component */}
      <div ref={triggerRef} style={{ background: "#000", overflow: "hidden" }}>
        <div style={stickyWrapper}>
          <video
            ref={videoRef}
            src="output2.mp4"
            type="video/mp4"
            playsInline
            muted
            style={videoStyle}
          />
          <div style={overlayText}>
            {/* <div><h1 className="connect" style={{fontSize:"6rem"}}>CONNECT WITH US</h1></div>
            
            <div><h3 style={{fontSize:"2rem"}}>Stay Updated! Follow our jourey</h3></div>

            <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:"150px",marginBottom:"75px",gap:"40px"}}>
              <img src="instagram (2).png" alt="" />
              <img src="whatsapp (3).png" alt="" />
              <img src="youtube (2).png" alt="" />
              <img src="facebook (2).png" alt="" />
            </div>

            <div><h3 className="crafted">Crafted for the Open Road</h3></div>
            <div><h6>@2026 Bike Creators All the Reshrived</h6></div> */}
        </div>
      </div>

      {/* 3. Normal Component After */}
      {/* <div style={{ height: "100vh", background: "#333", color: "white", display: "grid", placeItems: "center" }}>
        <h1>The end of the scroll effect</h1>
      </div> */}
    </div>
    </div>
  );
};

// --- Styles ---
const stickyWrapper = {
  height: "100vh",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const videoStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const overlayText = {
  position: "absolute",
  top:"15%",
  left:"5%",
  color: "#000000",
  // fontSize: "3rem",
  zIndex: 10,
  display:"flex",
  flexDirection:"column",
  alignItems:"center",
  justifyContent:"space-between"
};

export default ScrollAnimation;