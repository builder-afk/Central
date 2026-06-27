"use client";

import { useEffect, useRef } from "react";

interface FadingVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  className?: string;
}

export default function FadingVideo({ src, className, ...props }: FadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafId = useRef<number | null>(null);
  const fadingOutRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const FADE_MS = 500;
    const FADE_OUT_LEAD = 0.55;

    const fadeTo = (targetOpacity: number) => {
      if (rafId.current) cancelAnimationFrame(rafId.current);

      let startOpacity = parseFloat(video.style.opacity || "0");
      if (isNaN(startOpacity)) startOpacity = 0;

      const startTime = performance.now();

      const animateFade = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / FADE_MS, 1);
        
        // Easing can be linear for crossfade
        const currentOpacity = startOpacity + (targetOpacity - startOpacity) * progress;
        video.style.opacity = currentOpacity.toString();

        if (progress < 1) {
          rafId.current = requestAnimationFrame(animateFade);
        }
      };

      rafId.current = requestAnimationFrame(animateFade);
    };

    const handleLoadedData = () => {
      video.style.opacity = "0";
      video.play().catch(() => {});
      fadeTo(1);
    };

    const handleTimeUpdate = () => {
      const duration = video.duration;
      const currentTime = video.currentTime;
      
      if (!isNaN(duration) && !fadingOutRef.current && (duration - currentTime <= FADE_OUT_LEAD) && (duration - currentTime > 0)) {
        fadingOutRef.current = true;
        fadeTo(0);
      }
    };

    const handleEnded = () => {
      video.style.opacity = "0";
      setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(() => {});
        fadingOutRef.current = false;
        fadeTo(1);
      }, 100);
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      autoPlay
      muted
      playsInline
      preload="auto"
      style={{ opacity: 0 }}
      {...props}
    />
  );
}
