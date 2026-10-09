"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MostarGuide() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mostarTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".mostar-stage",
          start: "top top",
          end: "+=3000",
          scrub: 1,
          pin: true,
        }
      });

      mostarTl
        .to(".mostar-title", { y: -200, scale: 0.9, opacity: 0, duration: 1 }, 0)
        .to(".mostar-intro", { y: 100, opacity: 0, duration: 1 }, 0)
        .to(".mostar-bridge", { scale: 1.4, y: -500, duration: 3 }, 0)
        .to(".mostar-split-left", { xPercent: -50, scale: 1.5, y: -100, duration: 3 }, 0)
        .to(".mostar-split-right", { xPercent: 50, scale: 1.5, y: -100, duration: 3 }, 0)
        .to(".mostar-blur-layer", { opacity: 1, duration: 1 }, 1)
        .fromTo(".mostar-panel-1", { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1 }, 1.5)
        .to(".mostar-panel-1", { opacity: 0, y: -100, duration: 1 }, 2.5)
        .to(".mostar-bazaar", { filter: "saturate(1.5)", duration: 1 }, 2.5)
        .fromTo(".mostar-panel-2", { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1 }, 3);

    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="font-sans">
      <div className="mostar-stage relative h-screen w-full overflow-hidden bg-[#7fb4d4] text-white isolate">
        
        {/* Sky Background */}
        <div className="absolute inset-0 z-0">
          <img src="https://raft-blast-61784561.figma.site/_assets/v11/16b5007d9c93971e26ffe4e0e3e37946f6bd538c.png" className="w-full h-full object-cover opacity-80" />
        </div>

        {/* Bazaar Mid-Back */}
        <div className="mostar-bazaar absolute inset-x-0 bottom-0 w-full z-10 opacity-90">
          <img src="https://raft-blast-61784561.figma.site/_assets/v11/864afe00e41e2fa20a5aa546e15cb807e0f81384.png" className="w-full h-auto object-cover" />
        </div>

        {/* Back Four Glow */}
        <div className="absolute inset-x-0 bottom-0 w-full z-10 opacity-70 mix-blend-screen">
          <img src="https://raft-blast-61784561.figma.site/_assets/v11/8a7f8af50e0ce92ec2e228e7b0b4112178c51cf1.png" className="w-full h-auto object-cover" />
        </div>

        {/* Split Sights Layer */}
        <div className="mostar-split-left absolute inset-y-0 left-0 w-1/2 overflow-hidden z-20">
          <img src="https://raft-blast-61784561.figma.site/_assets/v11/7536d7b60a1fce482cf6edf3f0bffd3bad5d0f8a.png" className="absolute top-0 right-0 w-[200%] h-full object-cover origin-right" />
        </div>
        <div className="mostar-split-right absolute inset-y-0 right-0 w-1/2 overflow-hidden z-20">
          <img src="https://raft-blast-61784561.figma.site/_assets/v11/392db6a6a6b98e868bd7f8d3f55bb719d51e5028.png" className="absolute top-0 left-0 w-[200%] h-full object-cover origin-left" />
        </div>

        {/* Bridge Foreground */}
        <div className="mostar-bridge absolute inset-x-0 bottom-[-5vh] w-full z-30">
          <img src="https://raft-blast-61784561.figma.site/_assets/v11/c6a6d8ef49bca43f708aa852692942c45ec950d4.png" className="w-full h-auto object-cover" />
        </div>

        {/* Frame Two River (hidden initially, fades in via scroll) */}
        <div className="mostar-blur-layer absolute inset-0 z-40 opacity-0 bg-black/20 backdrop-blur-md pointer-events-none">
          <img src="https://raft-blast-61784561.figma.site/_assets/v11/ba75252bab2b1c510987b74837770f7bc8a6b2d4.png" className="w-full h-full object-cover" />
        </div>

        {/* Typography Elements */}
        <h1 className="mostar-title absolute top-[20%] w-full text-center z-50 font-instrument text-[12vw] leading-none text-[#fdf1e1]">
          TIMELESS
        </h1>
        
        <div className="mostar-intro absolute bottom-12 w-full text-center z-50 font-inter text-[#fdf1e1] max-w-lg mx-auto left-1/2 -translate-x-1/2 text-lg">
          <p className="drop-shadow-lg">Every old city street reminds me of you... beautiful, timeless, and completely unforgettable.</p>
        </div>

        {/* Story Panels */}
        <div className="mostar-panel-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 text-center opacity-0 pointer-events-none">
          <h2 className="font-instrument text-5xl md:text-7xl text-[#fdf1e1] drop-shadow-xl">You are my compass.</h2>
          <p className="font-inter mt-6 text-[#fdf1e1] text-lg max-w-md mx-auto drop-shadow-md">Every path, every memory, and every step I take always leads me back to you.</p>
        </div>

        <div className="mostar-panel-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 text-center opacity-0 pointer-events-none">
          <h2 className="font-instrument text-5xl md:text-7xl text-[#fdf1e1] drop-shadow-xl">My heart belongs to you.</h2>
          <p className="font-inter mt-6 text-[#fdf1e1] text-lg max-w-md mx-auto drop-shadow-md">Walking through this life with you is the greatest journey. I will cherish every memory we make.</p>
        </div>

      </div>
    </div>
  );
}
