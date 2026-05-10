import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  isPositive?: boolean;
  isSpecial?: boolean;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4, 
      ease: "easeOut" 
    }
  }
};

const StatsCard = ({
  title,
  value,
  icon: Icon,
  trend,
  isPositive = true,
  isSpecial = false,
}: Props) => {
  // Special Card (Gradient)
  if (isSpecial) {
    return (
      <motion.div
        variants={cardVariants}
        whileHover={{ y: -4, boxShadow: "0 12px 30px rgba(0,0,0,0.12)" }}
        className="
          bg-gradient-to-br
          from-[#8B5CF6]
          to-[#D946EF]
          text-white
          rounded-2xl
          p-5
          shadow-[0_4px_20px_rgba(0,0,0,0.04)]
          cursor-default
          relative
          overflow-hidden
        "
      >
        <div className="flex items-start justify-between relative z-10">
          <div>
            <p className="text-white/80 text-sm font-medium">
              {title}
            </p>

            <h2
              className="
                text-3xl
                font-bold
                mt-2
                tracking-tight
              "
            >
              {value}
            </h2>

            {trend && (
              <p className="text-[11px] text-white mt-3 font-bold bg-white/20 w-fit px-2 py-0.5 rounded-md">
                {trend}
              </p>
            )}
          </div>

          <div
            className="
              w-11
              h-11
              rounded-xl
              bg-white/20
              flex
              items-center
              justify-center
              backdrop-blur-md
            "
          >
            <Icon
              className="text-white"
              size={22}
            />
          </div>
        </div>
      </motion.div>
    );
  }

  // Primary Card
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, boxShadow: "0 12px 30px rgba(0,0,0,0.08)" }}
      className="
        bg-white
        rounded-2xl
        p-5
        border
        border-[#E5E7EB]
        shadow-[0_4px_20px_rgba(0,0,0,0.04)]
        cursor-default
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[#6B7280] text-sm font-medium">
            {title}
          </p>

          <h2
            className="
              text-3xl
              font-bold
              text-[#111827]
              mt-2
              tracking-tight
            "
          >
            {value}
          </h2>

          {trend && (
            <p className={`text-[11px] mt-3 font-bold ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
              {trend}
            </p>
          )}
        </div>

        <div
          className="
            w-11
            h-11
            rounded-xl
            bg-[#F5F7FB]
            flex
            items-center
            justify-center
            border border-[#E5E7EB]
          "
        >
          <Icon
            className="text-[#111827]"
            size={22}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
