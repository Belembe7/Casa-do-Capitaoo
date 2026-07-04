'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import BenefitsTicker from './BenefitsTicker';
import { HERO_POSTER } from '@/components/media/MediaWarmup';

const VIDEO_PLAY_MS = 15_000;
const POSTER_HOLD_MS = 6_000;
const FADE_TO_POSTER_MS = 1_500;
const FADE_TO_VIDEO_MS = 2_500;

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [posterVisible, setPosterVisible] = useState(false);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
  }, []);

  const runCycle = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    setPosterVisible(false);
    video.currentTime = 0;
    void video.play();

    schedule(() => {
      setPosterVisible(true);
      video.pause();

      schedule(() => {
        setPosterVisible(false);
        video.currentTime = 0;
        void video.play();

        schedule(runCycle, FADE_TO_VIDEO_MS + VIDEO_PLAY_MS);
      }, FADE_TO_POSTER_MS + POSTER_HOLD_MS);
    }, VIDEO_PLAY_MS);
  }, [schedule]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      runCycle();
    };

    video.addEventListener('canplay', start, { once: true });
    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      start();
    }

    return () => {
      video.removeEventListener('canplay', start);
      clearTimers();
    };
  }, [runCycle, clearTimers]);

  const fadeMs = posterVisible ? FADE_TO_POSTER_MS : FADE_TO_VIDEO_MS;

  return (
    <section className="hero-video-container">
      <Image
        src={HERO_POSTER}
        alt=""
        fill
        priority
        fetchPriority="high"
        aria-hidden
        className="hero-poster z-0 object-cover"
        style={{
          opacity: posterVisible ? 1 : 0,
          transition: `opacity ${fadeMs}ms ease-in-out`,
        }}
        sizes="100vw"
      />

      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        poster={HERO_POSTER}
        aria-hidden
        className="z-[1]"
        style={{
          opacity: posterVisible ? 0 : 1,
          transition: `opacity ${fadeMs}ms ease-in-out`,
        }}
      >
        <source src="/videos/hero.mp4?v=3" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/30 z-[2]" />

      <div className="absolute inset-0 z-[3] flex flex-col items-center justify-center">
        <h1 className="sr-only">Casa do Capitão — Hotel Boutique em Inhambane</h1>
        <div className="px-4">
          <Image
            src="/images/logo.png"
            alt="Casa do Capitão — Inhambane, Moçambique"
            width={1024}
            height={682}
            className="w-[min(75vw,420px)] h-auto drop-shadow-lg"
            priority
          />
        </div>
      </div>

      <BenefitsTicker />
    </section>
  );
}
