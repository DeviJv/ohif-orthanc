"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("has_seen_preloader");
    if (!hasSeen) {
      sessionStorage.setItem("has_seen_preloader", "true");
      setShow(true);
    }
  }, []);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  const faceClass = "absolute inset-0 border-[1.5px] border-primary/50 bg-primary/5 backdrop-blur-sm shadow-[0_0_15px_rgba(var(--primary),0.2)]";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.785, 0.135, 0.15, 0.86] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white dark:bg-slate-950 overflow-hidden"
        >
          {/* Background grid for extra techy feel */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute inset-0 bg-white/50 dark:bg-slate-950/50 backdrop-blur-[2px]"></div>

          <div className="relative flex h-48 w-48 items-center justify-center" style={{ perspective: "1000px" }}>
            <motion.div
              animate={{
                rotateX: [0, 90, 90, 180, 180, 270, 270, 360],
                rotateY: [0, 0, 90, 90, 180, 180, 270, 270],
              }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875],
                repeat: Infinity,
              }}
              className="relative h-16 w-16"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Faces of the cube */}
              <div className={faceClass} style={{ transform: "translateZ(32px)" }}></div>
              <div className={faceClass} style={{ transform: "rotateY(180deg) translateZ(32px)" }}></div>
              <div className={faceClass} style={{ transform: "rotateY(90deg) translateZ(32px)" }}></div>
              <div className={faceClass} style={{ transform: "rotateY(-90deg) translateZ(32px)" }}></div>
              <div className={faceClass} style={{ transform: "rotateX(90deg) translateZ(32px)" }}></div>
              <div className={faceClass} style={{ transform: "rotateX(-90deg) translateZ(32px)" }}></div>

              {/* Inner glowing core */}
              <div 
                className="absolute inset-0 bg-primary/40 rounded-full blur-md"
                style={{ transform: "translateZ(0) scale(0.5)" }}
              ></div>
            </motion.div>
          </div>

          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 flex flex-col items-center gap-2"
          >
            <span className="text-xs font-bold tracking-[0.3em] text-primary uppercase">
              Initializing
            </span>
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                  className="h-1 w-1 rounded-full bg-primary"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ClearPreloader() {
  useEffect(() => {
    sessionStorage.removeItem("has_seen_preloader");
  }, []);
  return null;
}
