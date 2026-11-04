"use client";

import React, {
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { motion, AnimatePresence, MotionConfig, type Transition, type Variant } from "motion/react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import useClickOutside from "@/hooks/useClickOutside";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export type MorphingDialogContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  instant: boolean;
  setIsInstant: React.Dispatch<React.SetStateAction<boolean>>;
  uniqueId: string;
  triggerRef: React.MutableRefObject<HTMLButtonElement | null>;
};

const MorphingDialogContext = React.createContext<MorphingDialogContextType | null>(null);

function useMorphingDialog() {
  const context = useContext(MorphingDialogContext);

  if (!context) {
    throw new Error("useMorphingDialog must be used within a MorphingDialogProvider");
  }

  return context;
}

export type MorphingDialogProviderProps = {
  children: React.ReactNode;
  transition?: Transition;
};

function MorphingDialogProvider({ children, transition }: MorphingDialogProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isInstant, setIsInstant] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const instant = isInstant || shouldReduceMotion;
  const uniqueId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null!);

  const contextValue = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      instant,
      setIsInstant,
      uniqueId,
      triggerRef,
    }),
    [isOpen, instant, uniqueId],
  );

  return (
    <MorphingDialogContext.Provider value={contextValue}>
      <MotionConfig reducedMotion="user" transition={instant ? { duration: 0 } : transition}>
        {children}
      </MotionConfig>
    </MorphingDialogContext.Provider>
  );
}

export type MorphingDialogProps = {
  children: React.ReactNode;
  transition?: Transition;
};

function MorphingDialog({ children, transition }: MorphingDialogProps) {
  return <MorphingDialogProvider transition={transition}>{children}</MorphingDialogProvider>;
}

export type MorphingDialogTriggerProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  triggerRef?: React.MutableRefObject<HTMLButtonElement | null>;
  ariaLabel?: string;
};

function MorphingDialogTrigger({
  children,
  className,
  style,
  triggerRef,
  ariaLabel,
}: MorphingDialogTriggerProps) {
  const {
    setIsOpen,
    isOpen,
    instant,
    setIsInstant,
    uniqueId,
    triggerRef: contextTriggerRef,
  } = useMorphingDialog();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setIsInstant(event.detail === 0);
      setIsOpen(!isOpen);
    },
    [isOpen, setIsOpen, setIsInstant],
  );

  const setTriggerRef = useCallback(
    (node: HTMLButtonElement | null) => {
      contextTriggerRef.current = node;

      if (triggerRef) triggerRef.current = node;
    },
    [contextTriggerRef, triggerRef],
  );

  return (
    <motion.button
      ref={setTriggerRef}
      type="button"
      layoutId={instant ? undefined : `dialog-${uniqueId}`}
      className={cn("relative cursor-pointer", className)}
      onClick={handleClick}
      style={style}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      aria-controls={`motion-ui-morphing-dialog-content-${uniqueId}`}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  );
}

export type MorphingDialogContentProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function MorphingDialogContent({ children, className, style }: MorphingDialogContentProps) {
  const { setIsOpen, isOpen, instant, setIsInstant, uniqueId, triggerRef } = useMorphingDialog();
  const containerRef = useRef<HTMLDivElement>(null!);

  const [firstFocusableElement, setFirstFocusableElement] = useState<HTMLElement | null>(null);

  const [lastFocusableElement, setLastFocusableElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsInstant(true);
        setIsOpen(false);
      }

      if (event.key === "Tab") {
        if (!firstFocusableElement || !lastFocusableElement) return;

        if (event.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            event.preventDefault();
            lastFocusableElement.focus();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            event.preventDefault();
            firstFocusableElement.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setIsOpen, setIsInstant, firstFocusableElement, lastFocusableElement]);

  useEffect(() => {
    if (!isOpen) return;

    const trigger = triggerRef.current;
    const wasScrollLocked = document.body.classList.contains("overflow-hidden");
    document.body.classList.add("overflow-hidden");

    const focusableElements = Array.from(
      containerRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ) ?? [],
    ).flatMap((element) => (element instanceof HTMLElement ? [element] : []));

    if (focusableElements && focusableElements.length > 0) {
      setFirstFocusableElement(focusableElements[0]);
      setLastFocusableElement(focusableElements[focusableElements.length - 1]);
      focusableElements[0].focus();
    }

    return () => {
      if (!wasScrollLocked) document.body.classList.remove("overflow-hidden");
      trigger?.focus({ preventScroll: true });
    };
  }, [isOpen, triggerRef]);

  useClickOutside(containerRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  return (
    <motion.div
      ref={containerRef}
      id={`motion-ui-morphing-dialog-content-${uniqueId}`}
      layoutId={instant ? undefined : `dialog-${uniqueId}`}
      className={cn("overflow-hidden", className)}
      style={style}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`motion-ui-morphing-dialog-title-${uniqueId}`}
      aria-describedby={`motion-ui-morphing-dialog-description-${uniqueId}`}
    >
      {children}
    </motion.div>
  );
}

export type MorphingDialogContainerProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const subscribeToHydration = () => () => {};

function MorphingDialogContainer({ children }: MorphingDialogContainerProps) {
  const { isOpen, instant, uniqueId } = useMorphingDialog();

  const mounted = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence initial={false} mode="sync">
      {isOpen && (
        <>
          <motion.div
            key={`backdrop-${uniqueId}`}
            className="fixed inset-0 z-40 h-full w-full bg-black/40 backdrop-blur-xs"
            initial={instant ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            data-testid="morphing-dialog-layer"
          >
            {children}
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export type MorphingDialogTitleProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function MorphingDialogTitle({ children, className, style }: MorphingDialogTitleProps) {
  const { uniqueId, instant } = useMorphingDialog();

  return (
    <motion.div
      id={`motion-ui-morphing-dialog-title-${uniqueId}`}
      layoutId={instant ? undefined : `dialog-title-container-${uniqueId}`}
      className={className}
      style={style}
      layout={!instant}
    >
      {children}
    </motion.div>
  );
}

export type MorphingDialogSubtitleProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function MorphingDialogSubtitle({ children, className, style }: MorphingDialogSubtitleProps) {
  const { uniqueId, instant } = useMorphingDialog();

  return (
    <motion.div
      layoutId={instant ? undefined : `dialog-subtitle-container-${uniqueId}`}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export type MorphingDialogDescriptionProps = {
  children: React.ReactNode;
  className?: string;
  disableLayoutAnimation?: boolean;
  variants?: {
    initial: Variant;
    animate: Variant;
    exit: Variant;
  };
};

function MorphingDialogDescription({
  children,
  className,
  variants,
  disableLayoutAnimation,
}: MorphingDialogDescriptionProps) {
  const { uniqueId } = useMorphingDialog();

  return (
    <motion.div
      key={`dialog-description-${uniqueId}`}
      layoutId={disableLayoutAnimation ? undefined : `dialog-description-content-${uniqueId}`}
      variants={variants}
      className={className}
      initial="initial"
      animate="animate"
      exit="exit"
      id={`motion-ui-morphing-dialog-description-${uniqueId}`}
    >
      {children}
    </motion.div>
  );
}

export type MorphingDialogImageProps = {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
};

function MorphingDialogImage({ src, alt, className, style }: MorphingDialogImageProps) {
  const { uniqueId } = useMorphingDialog();

  return (
    <motion.img
      src={src}
      alt={alt}
      className={cn(className)}
      layoutId={`dialog-img-${uniqueId}`}
      style={style}
    />
  );
}

export type MorphingDialogCloseProps = {
  children?: React.ReactNode;
  className?: string;
  variants?: {
    initial: Variant;
    animate: Variant;
    exit: Variant;
  };
};

function MorphingDialogClose({ children, className, variants }: MorphingDialogCloseProps) {
  const { setIsOpen, setIsInstant, uniqueId } = useMorphingDialog();

  const handleClose = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setIsInstant(event.detail === 0);
      setIsOpen(false);
    },
    [setIsOpen, setIsInstant],
  );

  return (
    <motion.button
      onClick={handleClose}
      type="button"
      aria-label="Close dialog"
      key={`dialog-close-${uniqueId}`}
      className={cn("absolute top-6 right-6", className)}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
    >
      {children || <XIcon aria-hidden="true" />}
    </motion.button>
  );
}

export {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogTitle,
  MorphingDialogSubtitle,
  MorphingDialogDescription,
  MorphingDialogImage,
};
