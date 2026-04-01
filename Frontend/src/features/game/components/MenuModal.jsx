/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const STAGGER = 0.035;

const TextRoll = ({ children }) => {
  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className="relative block overflow-hidden text-4xl font-extrabold uppercase tracking-[-0.03em]"
      style={{ lineHeight: 0.8 }}
    >
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
          >
            {l}
          </motion.span>
        ))}
      </div>

      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            key={i}
            className="inline-block text-[#02C173]"
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.span>
  );
};

const MenuModal = ({ onClose }) => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "HOME", path: "/dashboard" },
    { name: "NEW GAME", path: "/game" },
    { name: "LEADERBOARD", path: "/leaderboard" },
    { name: "DASHBOARD", path: "/dashboard" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-[500px] max-w-[90%] bg-black border border-gray-800 rounded-2xl p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <ul className="flex flex-col items-center gap-6">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => {
                  navigate(item.path);
                  onClose();
                }}
              >
                <TextRoll>{item.name}</TextRoll>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MenuModal;