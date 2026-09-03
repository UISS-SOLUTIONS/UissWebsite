"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

const ANIMATION_DURATION = 25;
const STAGGER_DELAY = 0.1;
const HOVER_SCALE = 1.2;
const HOVER_ROTATE = 5;
const SPRING_STIFFNESS = 300;
const SCROLL_DISTANCE = "-33.333333%";

type PartnerLogo = {
  name: string;
  src: string;
  width: number;
  height: number;
  displayClassName: string;
};

const partnerLogos: PartnerLogo[] = [
  { name: "Vodacom", src: "/partners/vodacom.svg", width: 180, height: 54, displayClassName: "h-12 w-40 sm:h-14 sm:w-44" },
  { name: "Huawei", src: "/partners/huawei.svg", width: 84, height: 84, displayClassName: "size-20 sm:size-24" },
  { name: "Binance", src: "/partners/binance.png", width: 84, height: 84, displayClassName: "size-20 sm:size-24" },
  { name: "TEDI", src: "/partners/tedi.png", width: 84, height: 84, displayClassName: "size-20 sm:size-24" },
  { name: "3D Robotics", src: "/partners/3d-robotics.png", width: 96, height: 96, displayClassName: "size-24 sm:size-28" },
];

interface LogoCloudAnimatedProps {
  title?: string;
}

export function LogoCloudAnimated({
  title = "Organizations we collaborate with.",
}: LogoCloudAnimatedProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="overflow-hidden border-y border-line bg-surface py-20">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          className="mb-14 text-center"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-ink lg:text-3xl">{title}</h2>
        </motion.div>

        <div
          className="relative overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          }}
        >
          <motion.div
            animate={shouldReduceMotion ? { x: 0 } : { x: ["0%", SCROLL_DISTANCE] }}
            className="flex w-max items-center"
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    x: {
                      duration: ANIMATION_DURATION,
                      ease: "linear",
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                    },
                  }
            }
          >
            {["first", "second", "third"].map((setName, setIndex) => (
              <div
                aria-hidden={setIndex === 0 ? undefined : true}
                className="flex shrink-0 items-center gap-10 pr-10 sm:gap-16 sm:pr-16"
                key={setName}
              >
                {partnerLogos.map((logo, index) => (
                  <motion.div
                    animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                    aria-label={setIndex === 0 ? logo.name : undefined}
                    className="flex h-28 w-44 shrink-0 items-center justify-center p-4 sm:h-32 sm:w-52"
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
                    key={`${setName}-${logo.name}`}
                    role={setIndex === 0 ? "img" : undefined}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { delay: index * STAGGER_DELAY, duration: 0.4 }
                    }
                  >
                    <motion.div
                      className="flex size-full items-center justify-center"
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { stiffness: SPRING_STIFFNESS, type: "spring" as const }
                      }
                      whileHover={
                        shouldReduceMotion
                          ? {}
                          : { rotate: HOVER_ROTATE, scale: HOVER_SCALE }
                      }
                    >
                      <Image
                        alt=""
                        className={`${logo.displayClassName} object-contain`}
                        height={logo.height}
                        src={logo.src}
                        width={logo.width}
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default LogoCloudAnimated;
