import { useEffect, useRef } from "react";

interface OpeningAnimationProps {
  onComplete: () => void;
}

const OpeningAnimation = ({ onComplete }: OpeningAnimationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let startTime: number | null = null;
    const DURATION = 2200; // ms

    // Floating numbers
    const nums = Array.from({ length: 20 }, () => ({
      x: Math.random() * window.innerWidth,
      y: window.innerHeight * 0.3 + Math.random() * window.innerHeight * 0.4,
      val: String(Math.floor(Math.random() * 9) + 1),
      speed: 0.3 + Math.random() * 0.5,
      size: 16 + Math.random() * 40,
      opacity: 0,
      delay: Math.random() * 0.4,
    }));

    // Sacred geometry circles
    const circles = [
      { r: 180, rot: 0, speed: 0.002, color: "255,195,0" },
      { r: 140, rot: Math.PI / 6, speed: -0.003, color: "0,220,240" },
      { r: 220, rot: Math.PI / 4, speed: 0.0015, color: "220,0,180" },
      { r: 90, rot: 0, speed: 0.005, color: "255,195,0" },
    ];

    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / DURATION, 1);

      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const cy = H / 2;

      // Clear
      ctx.clearRect(0, 0, W, H);

      // BG gradient
      const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.7);
      bgGrad.addColorStop(0, `rgba(20,10,40,${Math.min(progress * 3, 1)})`);
      bgGrad.addColorStop(0.5, `rgba(5,8,25,${Math.min(progress * 3, 1)})`);
      bgGrad.addColorStop(1, `rgba(0,3,12,${Math.min(progress * 3, 1)})`);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // Grid pattern
      const gridAlpha = Math.max(0, Math.min((progress - 0.1) * 4, 0.06));
      ctx.strokeStyle = `rgba(255,195,0,${gridAlpha})`;
      ctx.lineWidth = 0.5;
      const gridSize = 50;
      for (let x = 0; x < W; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // Sacred geometry
      circles.forEach((c, i) => {
        const delay = i * 0.12;
        const alpha = Math.max(0, Math.min((progress - delay) * 6, 1)) *
          (progress > 0.75 ? 1 - (progress - 0.75) * 4 : 1);
        if (alpha <= 0) return;

        c.rot += c.speed;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(c.rot);
        ctx.strokeStyle = `rgba(${c.color},${alpha * 0.5})`;
        ctx.lineWidth = 1;

        // Circle
        ctx.beginPath();
        ctx.arc(0, 0, c.r * Math.min(progress * 3, 1), 0, Math.PI * 2);
        ctx.stroke();

        // Inner star polygon
        const sides = 6;
        ctx.beginPath();
        for (let k = 0; k < sides; k++) {
          const angle = (k / sides) * Math.PI * 2 + c.rot * 2;
          const x = Math.cos(angle) * c.r * 0.8 * Math.min(progress * 2, 1);
          const y = Math.sin(angle) * c.r * 0.8 * Math.min(progress * 2, 1);
          k === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(${c.color},${alpha * 0.3})`;
        ctx.stroke();
        ctx.restore();
      });

      // Central glow
      const glowAlpha = Math.min(progress * 4, 1) * (progress > 0.7 ? 1 - (progress - 0.7) * 3 : 1);
      if (glowAlpha > 0) {
        const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 120);
        glow.addColorStop(0, `rgba(255,195,0,${glowAlpha * 0.6})`);
        glow.addColorStop(0.4, `rgba(200,100,255,${glowAlpha * 0.2})`);
        glow.addColorStop(1, `rgba(0,0,0,0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(cx, cy, 120, 0, Math.PI * 2);
        ctx.fill();
      }

      // Central title text
      const textPhase = Math.max(0, (progress - 0.2) / 0.4);
      const textAlpha = Math.min(textPhase * 2, 1) * (progress > 0.8 ? 1 - (progress - 0.8) * 5 : 1);
      if (textAlpha > 0) {
        ctx.save();
        ctx.textAlign = "center";
        ctx.fillStyle = `rgba(255,195,0,${textAlpha})`;
        ctx.font = `bold ${Math.min(W * 0.06, 48)}px 'Space Grotesk', sans-serif`;
        ctx.shadowColor = `rgba(255,195,0,${textAlpha * 0.8})`;
        ctx.shadowBlur = 20;
        ctx.fillText("生命靈數宇宙觀測站", cx, cy - 20);
        ctx.font = `${Math.min(W * 0.025, 18)}px 'Space Mono', monospace`;
        ctx.fillStyle = `rgba(0,220,240,${textAlpha})`;
        ctx.shadowColor = `rgba(0,220,240,${textAlpha * 0.8})`;
        ctx.fillText("LIFE NUMEROLOGY COSMOS · 福星何大師", cx, cy + 20);
        ctx.restore();
      }

      // Floating numbers
      nums.forEach((n) => {
        const numProgress = Math.max(0, (progress - n.delay) / (1 - n.delay));
        if (numProgress <= 0) return;
        n.opacity = Math.min(numProgress * 3, 1) * Math.max(0, 1 - numProgress * 1.5);
        n.y -= n.speed;
        if (n.opacity <= 0) return;
        ctx.save();
        ctx.globalAlpha = n.opacity;
        ctx.fillStyle = `hsl(${45 + n.val.charCodeAt(0) * 30},100%,60%)`;
        ctx.font = `bold ${n.size}px 'Space Mono', monospace`;
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 15;
        ctx.textAlign = "center";
        ctx.fillText(n.val, n.x, n.y);
        ctx.restore();
      });

      // Fade out overlay
      if (progress > 0.85) {
        const fadeAlpha = (progress - 0.85) / 0.15;
        ctx.fillStyle = `rgba(5,8,25,${Math.min(fadeAlpha, 1)})`;
        ctx.fillRect(0, 0, W, H);
      }

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        onComplete();
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-background">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default OpeningAnimation;
