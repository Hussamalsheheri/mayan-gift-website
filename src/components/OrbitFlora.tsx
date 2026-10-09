import { useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';

export default function OrbitFlora() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  
  const mouse = useRef({ x: 0, y: 0, hovering: false });
  const trail = useRef<{x: number, y: number, r: number, alpha: number, seed: number}[]>([]);
  const headRadius = useRef(0);

  const frontImgRef = useRef<HTMLImageElement | null>(null);
  const revealImgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const img1 = new Image();
    img1.crossOrigin = "anonymous";
    img1.src = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260808_192942_e1086505-d7da-433b-a59b-8220f4e6c808.png&w=1280&q=85";
    img1.onload = () => { frontImgRef.current = img1; };

    const img2 = new Image();
    img2.crossOrigin = "anonymous";
    img2.src = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260808_151324_bf318a5f-5525-4fc7-aab5-e9a341018828.png&w=1280&q=85";
    img2.onload = () => { revealImgRef.current = img2; };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    let animationFrameId: number;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };
    window.addEventListener('resize', resize);
    resize();

    const drawMorphBlob = (cx: number, cy: number, r: number, t: number, seed: number) => {
      if (r < 2) return;
      ctx.beginPath();
      const points = 24;
      for (let i = 0; i <= points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const n1 = Math.sin(angle * 3 + t * 1.4 + seed) * 0.45;
        const n2 = Math.sin(angle * 5 - t * 0.9 + seed * 2.3) * 0.3;
        const n3 = Math.cos(angle * 2 + t * 1.8 + seed * 0.7) * 0.25;
        const noise = (n1 + n2 + n3) * 44 * (r / 140);
        
        const finalR = r + noise;
        const px = cx + Math.cos(angle) * finalR;
        const py = cy + Math.sin(angle) * finalR;
        
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    };

    const drawImageCover = (context: CanvasRenderingContext2D, img: HTMLImageElement, cw: number, ch: number) => {
      if (!img.naturalWidth) return;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = cw / ch;
      let sx = 0, sy = 0, sWidth = img.naturalWidth, sHeight = img.naturalHeight;
      
      if (imgRatio > canvasRatio) {
        sWidth = img.naturalHeight * canvasRatio;
        sx = (img.naturalWidth - sWidth) / 2;
      } else {
        sHeight = img.naturalWidth / canvasRatio;
        sy = (img.naturalHeight - sHeight) / 2;
      }
      context.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, cw, ch);
    };

    const render = () => {
      const targetR = mouse.current.hovering ? 140 : 0;
      headRadius.current += (targetR - headRadius.current) * (mouse.current.hovering ? 0.14 : 0.04);
      
      if (mouse.current.hovering && headRadius.current > 5) {
        const last = trail.current[trail.current.length - 1];
        const dist = last ? Math.hypot(mouse.current.x - last.x, mouse.current.y - last.y) : Infinity;
        if (dist > 8) {
          trail.current.push({
            x: mouse.current.x,
            y: mouse.current.y,
            r: headRadius.current,
            alpha: 1,
            seed: Math.random() * 100
          });
          if (trail.current.length > 60) trail.current.shift();
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (trail.current.length === 0) {
        if (frontImgRef.current && frontImgRef.current.complete) {
          ctx.globalCompositeOperation = 'source-over';
          ctx.globalAlpha = 1;
          drawImageCover(ctx, frontImgRef.current, canvas.width, canvas.height);
        }
      } else {
        // Draw the blobs first
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = 'white';
        trail.current.forEach((pt) => {
          ctx.globalAlpha = pt.alpha;
          drawMorphBlob(pt.x, pt.y, pt.r, time, pt.seed);
          pt.alpha *= 0.92;
          pt.r *= 0.995;
        });

        // Fill blobs with Reveal image (source-in: keeps Reveal image ONLY where blobs exist, clears blobs)
        if (revealImgRef.current && revealImgRef.current.complete) {
          ctx.globalCompositeOperation = 'source-in';
          ctx.globalAlpha = 1;
          drawImageCover(ctx, revealImgRef.current, canvas.width, canvas.height);
        }

        // Draw Front image behind the blobs (destination-over: draws behind existing pixels)
        if (frontImgRef.current && frontImgRef.current.complete) {
          ctx.globalCompositeOperation = 'destination-over';
          ctx.globalAlpha = 1;
          drawImageCover(ctx, frontImgRef.current, canvas.width, canvas.height);
        }
      }
      
      trail.current = trail.current.filter(pt => pt.alpha > 0.01);
      time += 0.016;

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    mouse.current.x = e.clientX - rect.left;
    mouse.current.y = e.clientY - rect.top;
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#161616] isolate cursor-crosshair"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => mouse.current.hovering = true}
      onMouseLeave={() => mouse.current.hovering = false}
    >
      {/* Header */}
      <header className="absolute top-6 left-8 right-8 z-50 flex justify-between items-center text-sm font-medium opacity-80 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="tracking-widest">FOR MAYAN</span>
        </div>
      </header>

      {/* Wordmark */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <h1 className="font-instrument text-[18vw] leading-[0.8] tracking-tight uppercase text-white drop-shadow-2xl">
          MAYAN
        </h1>
      </div>

      {/* Direct Canvas Rendering */}
      <div className="absolute top-[15vh] md:top-[10vh] left-1/2 -translate-x-1/2 w-[85vw] h-[60vh] md:w-auto md:h-[90vh] aspect-[3/4] z-20 pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-105" />
      </div>

      {/* Corner Copy (Love messages) */}
      <div className="absolute top-24 left-6 md:top-auto md:bottom-12 md:left-12 z-30 max-w-[150px] md:max-w-[200px] text-white/70 text-xs md:text-sm font-medium leading-relaxed font-inter pointer-events-none">
        I compare you to this flower,<br/> rare and enchanting.
      </div>
      <div className="absolute bottom-10 right-6 md:bottom-12 md:right-12 z-30 max-w-[150px] md:max-w-[200px] text-white/70 text-xs md:text-sm font-medium leading-relaxed text-right font-inter pointer-events-none">
        You are the most beautiful<br/> coincidence in my life.
      </div>
    </section>
  );
}
