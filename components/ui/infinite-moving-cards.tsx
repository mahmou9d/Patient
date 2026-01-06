"use client";
import React from "react";

interface Doctor {
  id: number;
  first_name: string;
  last_name?: string;
  specialty: string;
  img_url?: string;
}

interface InfiniteMovingCardsProps {
  items: Doctor[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
}

export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "normal",
}: InfiniteMovingCardsProps) {
  const speedValues = {
    fast: 20,
    normal: 20,
    slow: 20,
  };

  const duration = speedValues[speed];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Scrolling container */}
      <div className="flex">
        <div
          className="flex gap-6 animate-scroll"
          style={{
            animationDuration: `${duration}s`,
            animationDirection: direction === "right" ? "reverse" : "normal",
          }}
        >
          {/* Original items */}
          {items.map((doctor) => (
            <DoctorCard key={`original-${doctor.id}`} doctor={doctor} />
          ))}
          {/* Duplicated items for seamless loop */}
          {items.map((doctor) => (
            <DoctorCard key={`duplicate-${doctor.id}`} doctor={doctor} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Doctor Card Component
function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <div className="w-[350px] flex-shrink-0 relative rounded-3xl border border-white/10 bg-white/5  p-8 hover:bg-white/10 transition-all duration-500 hover:border-emerald-500/30 hover:scale-[1.02] group">
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Doctor Image */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-teal-500/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-emerald-500/20 group-hover:border-emerald-500/50 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-emerald-500/30">
            {doctor.img_url ? (
              <img
                src={doctor.img_url}
                alt={`Dr. ${doctor.first_name} ${doctor.last_name || ""}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-4xl font-bold">
                {doctor.first_name.charAt(0)}
              </div>
            )}
          </div>
        </div>

        {/* Doctor Info */}
        <div className="space-y-2">
          <h3 className="text-xl font-black text-white group-hover:text-emerald-400 transition-colors duration-300">
            {doctor.last_name
              ? `Dr. ${doctor.first_name} ${doctor.last_name}`
              : `Dr. ${doctor.first_name}`}
          </h3>
          <p className="text-emerald-400 font-semibold text-sm tracking-wide">
            {doctor.specialty}
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center space-x-6 pt-4 border-t border-white/10 w-full">
          <div className="text-center">
            <p className="text-white/50 text-xs mb-1 font-medium">Experience</p>
            <p className="text-white font-bold">10+ Years</p>
          </div>
          <div className="w-px h-12 bg-white/10" />
          <div className="text-center">
            <p className="text-white/50 text-xs mb-1 font-medium">Rating</p>
            <p className="text-white font-bold">⭐ 4.9</p>
          </div>
        </div>

        {/* CTA Button */}
        <button className="w-full mt-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 text-emerald-400 hover:text-emerald-300 py-3 rounded-xl font-bold text-sm border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20">
          View Profile →
        </button>
      </div>
    </div>
  );
}
