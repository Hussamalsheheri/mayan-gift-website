"use client";

import SmoothScroll from '@/components/SmoothScroll';
import JungleMind from '@/components/JungleMind';
import WellnessDevice from '@/components/WellnessDevice';
import OrbitFlora from '@/components/OrbitFlora';
import CelestialRenewal from '@/components/CelestialRenewal';
import MostarGuide from '@/components/MostarGuide';

export default function Home() {
  return (
    <SmoothScroll>
      <main className="bg-black text-white overflow-x-hidden">
        
        {/* 1. الورده */}
        <OrbitFlora />

        {/* 2. كل العالم */}
        <CelestialRenewal />

        {/* 3. المدينه القديمه */}
        <MostarGuide />

        {/* 4. الـ AI */}
        <JungleMind />

        {/* 6. شخصياتنا آخر شي */}
        <WellnessDevice />

      </main>
    </SmoothScroll>
  );
}
