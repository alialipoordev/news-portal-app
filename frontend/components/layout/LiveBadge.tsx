"use client";

import moment from "moment";
import { motion } from "framer-motion";
import { Divider } from "../ui/Divider";

export function LiveBadge() {
  return (
    <div className="flex space-x-2 items-center">
      <div className="flex gap-1.5 items-center">
        {/* Animated live dot with double pulse ring */}
        <span className="relative flex h-2.5 w-2.5">
          <motion.span
            className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"
            animate={{ scale: [1, 2], opacity: [0.6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
          />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
        </span>

        <motion.span
          className="text-xs font-bold tracking-widest text-red-400 uppercase"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Live
        </motion.span>
      </div>

      <Divider
        orientation="vertical"
        className="bg-white/15"
      />

      <span className="text-xs font-medium md:text-sm">{moment().format("LLLL")}</span>
    </div>
  );
}
