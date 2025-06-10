"use client";

import { motion, AnimatePresence } from "framer-motion";

export const AnimateNumber = ({ value }) => {
  return (
    <div className="relative overflow-hidden flex justify-center items-center bg-[#eec802] rounded-full px-2 py-0.5">
      <AnimatePresence mode="wait">
        <motion.span
          key={value}
          initial={{ y: 20, opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-black rounded-full font-semibold"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};
