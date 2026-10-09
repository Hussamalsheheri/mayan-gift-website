import { useEffect, useRef, useState } from 'react';

export default function WellnessDevice() {
  const revealRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -999, y: -999 });

  useEffect(() => {
    let frame: number;
    let smoothX = mouse.current.x;
    let smoothY = mouse.current.y;

    const render = () => {
      smoothX += (mouse.current.x - smoothX) * 0.1;
      smoothY += (mouse.current.y - smoothY) * 0.1;

      if (gridRef.current) {
        // Simple parallax for grid
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const offsetX = ((smoothX - cx) / cx) * 16;
        const offsetY = ((smoothY - cy) / cy) * 16;
        gridRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      }

      if (revealRef.current) {
        // Using pure CSS radial gradient instead of heavy canvas dataUrl!
        const mask = `radial-gradient(260px circle at ${smoothX}px ${smoothY}px, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 40%, rgba(255,255,255,0.75) 60%, rgba(255,255,255,0.4) 75%, rgba(255,255,255,0.12) 88%, transparent 100%)`;
        revealRef.current.style.maskImage = mask;
        revealRef.current.style.webkitMaskImage = mask;
      }
      
      frame = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleMouse = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouse.current.x = e.clientX - rect.left;
    mouse.current.y = e.clientY - rect.top;
  };

  return (
    <section className="relative w-full h-screen bg-[#0a0a0a] overflow-hidden cursor-crosshair font-inter" onMouseMove={handleMouse}>
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none overflow-visible">
        <div ref={gridRef} className="absolute -inset-[100px] w-[calc(100%+200px)] h-[calc(100%+200px)]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="gridP" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M 48 0 L 0 0 0 48" fill="none" stroke="#64748b" strokeWidth="0.6"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#gridP)" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10 pointer-events-none" style={{ backgroundImage: 'url(https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260713_140344_79e1296a-86d7-43fd-9b5f-63ffe560f291.png&w=1280&q=85)' }} />
      <div className="absolute top-20 sm:top-28 md:top-32 w-full text-center z-20 pointer-events-none px-4">
        <h2 className="font-instrument italic text-[18vw] sm:text-[10rem] md:text-[13rem] lg:text-[15rem] leading-[0.9] text-white drop-shadow-2xl whitespace-nowrap">YOU & ME</h2>
      </div>
      <img src="https://soft-zoom-63098134.figma.site/_assets/v11/3f10f1876e118f72a396e05a6c2d099569478272.png" className="absolute inset-0 w-full h-full object-cover z-25 pointer-events-none opacity-80" alt="" />
      
      <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
        <div ref={revealRef} className="absolute inset-0" style={{ maskSize: '100% 100%', WebkitMaskSize: '100% 100%' }}>
          <div className="absolute inset-0" style={{ clipPath: 'inset(40% 0 0 0)' }}>
            <video autoPlay muted loop playsInline className="w-full h-full object-cover" src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260713_162101_0d7498c5-29bb-47bf-a99f-2773c0a880a9.mp4" />
          </div>
        </div>
      </div>
    </section>
  );
}
