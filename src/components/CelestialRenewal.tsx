"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CelestialRenewal() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Celestial Renewal Parallax
      gsap.to(".rainbow-img", {
        y: -160,
        ease: "none",
        scrollTrigger: {
          trigger: ".celestial-quote-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });

      gsap.fromTo(".cloud-left", 
        { x: -200, opacity: 0 },
        { x: 0, opacity: 1, y: -50, ease: "none", scrollTrigger: {
          trigger: ".celestial-quote-section",
          start: "top 80%",
          end: "center center",
          scrub: 1,
        }}
      );

      gsap.fromTo(".cloud-right", 
        { x: 200, opacity: 0 },
        { x: 0, opacity: 1, y: -50, ease: "none", scrollTrigger: {
          trigger: ".celestial-quote-section",
          start: "top 80%",
          end: "center center",
          scrub: 1,
        }}
      );
    }, container);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={container}>
      {/* Celestial Video Hero */}
      <section className="relative w-full h-screen bg-[#0a0a0c] overflow-hidden flex flex-col items-center justify-center isolate">
        <video 
          autoPlay muted loop playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4"
        />
        <div className="absolute inset-0 bg-black/40 z-10" />
        
        <div className="relative z-20 flex flex-col items-center text-center -mt-20 px-4">
          <h2 className="font-instrument text-5xl md:text-7xl lg:text-[110px] leading-[0.9] tracking-tight text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]">
            Gentle touch.<br/>Radiant presence.
          </h2>
          <p className="text-white/80 text-lg md:text-xl mt-6 max-w-xl font-light font-inter">
            I love you more than everything in this world,<br/> my most beautiful destiny.
          </p>
        </div>
      </section>

      {/* Celestial Quote Parallax */}
      <section className="celestial-quote-section relative w-full h-screen overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#010A17] via-[#0A4267] to-[#6BADC4]">
        <img 
          src="https://soft-zoom-63098134.figma.site/_assets/v11/8d520a7515d06cbfc403d0125e3d05b1a7ccd29c.png" 
          alt="Rainbow" 
          className="rainbow-img absolute inset-x-0 top-0 w-full object-cover z-30"
        />
        <img 
          src="https://soft-zoom-63098134.figma.site/_assets/v11/0d6dfd3f90b930f21726f2ed56a3320d79b7a797.png" 
          alt="Cloud Left" 
          className="cloud-left absolute left-0 bottom-[10%] w-[500px] md:w-[650px] -ml-[20%] z-10 hidden sm:block"
        />
        <img 
          src="https://soft-zoom-63098134.figma.site/_assets/v11/0d6dfd3f90b930f21726f2ed56a3320d79b7a797.png" 
          alt="Cloud Right" 
          className="cloud-right absolute right-0 bottom-[15%] w-[500px] md:w-[650px] -mr-[30%] scale-x-[-1] z-10 hidden sm:block"
        />
        
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
          <h3 className="font-instrument text-3xl md:text-5xl lg:text-[52px] leading-[1.45] text-white">
            "You are my celestial renewal. I love you more than the whole world, Mayan. You are my flower, my sky, and every beautiful detail of my life."
          </h3>
          <p className="font-inter mt-8 text-white/80 text-lg tracking-wide">
            Forever Yours, Husam.
          </p>
        </div>
      </section>
    </div>
  );
}
