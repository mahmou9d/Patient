"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    img_url: string;
    first_name: string;
    last_name:string
    specialty: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      // ✅ نكرر المحتوى مرة واحدة فقط عشان نعمل حركة مستمرة
      scrollerContent.forEach((item) => {
        const duplicated = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicated);
      });

      // إعداد الاتجاه والسرعة
      const dir = direction === "left" ? "forwards" : "reverse";
      const duration =
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";

      containerRef.current.style.setProperty("--animation-direction", dir);
      containerRef.current.style.setProperty("--animation-duration", duration);

      setStart(true);
    }
  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="relative w-[350px] max-w-full shrink-0 rounded-2xl border border-zinc-200 bg-[linear-gradient(180deg,#fafafa,#f5f5f5)] px-8 py-6 md:w-[450px] dark:border-zinc-700 dark:bg-[linear-gradient(180deg,#27272a,#18181b)]"
          >
            <blockquote>
              <img
                alt={item.img_url}
                src={item.img_url}
                className="relative z-20 rounded-xl w-full h-[250px] object-cover"
              />
              <div className="relative z-20 mt-4 flex flex-col items-start">
                <span className="text-base font-semibold text-neutral-800 dark:text-gray-100 capitalize">
                  {`${item.first_name} ${item.last_name}`}
                </span>
                <span className="text-sm text-neutral-500 dark:text-gray-400 capitalize">
                  {item.specialty}
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
      {/* ✅ أنيميشن سلسة */}
      {/* <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll var(--animation-duration, 10s)
            var(--animation-direction, forwards) linear infinite;
        }
      `}</style> */}
    </div>
  );
};
