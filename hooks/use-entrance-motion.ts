"use client";

import { useLayoutEffect } from "react";
import { useAnimate } from "motion/react-mini";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { getMotionDurationSeconds } from "@/lib/motion";

type EntranceMotionOptions = {
  enabled: boolean;
  fromOpacity: number;
  fromTransform?: string;
  duration: "control" | "section";
};

export function useEntranceMotion<Element extends HTMLElement>({
  enabled,
  fromOpacity,
  fromTransform,
  duration,
}: EntranceMotionOptions) {
  const [scope, animate] = useAnimate<Element>();
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    const element = scope.current;

    if (!enabled || !element) return;

    const tokens = getComputedStyle(element);
    const durationToken = reduceMotion ? "press" : duration;

    const seconds = getMotionDurationSeconds(
      tokens.getPropertyValue(`--uiss-duration-${durationToken}`),
    );

    const [x1, y1, x2, y2] = tokens
      .getPropertyValue("--uiss-ease-out")
      .trim()
      .replace(/^cubic-bezier\((.*)\)$/, "$1")
      .split(",")
      .map(Number);

    const opacity = [reduceMotion ? 0.9 : fromOpacity, 1];

    const keyframes =
      fromTransform && !reduceMotion
        ? { opacity, transform: [fromTransform, "none"] }
        : { opacity };

    const animation = animate(element, keyframes, { duration: seconds, ease: [x1, y1, x2, y2] });

    return () => {
      animation.complete();
      animation.stop();
    };
  }, [animate, duration, enabled, fromOpacity, fromTransform, reduceMotion, scope]);

  return scope;
}
