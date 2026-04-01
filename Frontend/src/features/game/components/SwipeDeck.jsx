/* eslint-disable no-unused-vars */
"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/effect-coverflow";

/**
 * Clean Infinite Coverflow (3 items, no manual duplication)
 */

const SwipeDeck = ({ products, onChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-4xl px-5"
    >
      <style>{`
        .coverflow-container {
          height: 380px;
        }

        .coverflow-container .swiper-slide {
          width: 260px;
        }

        .swiper-slide-active {
          transform: scale(1.1);
        }
      `}</style>

      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        loop={false} // ✅ infinite
        // loopAdditionalSlides={3} // 🔥 FIX glitch
        // loopedslides={products.length}
        onSlideChange={(swiper) => {
          onChange(swiper.realIndex);
        }}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 120,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow]}
        className="coverflow-container"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="relative h-[340px] w-full rounded-3xl overflow-hidden border border-[#02C173]/20 bg-white/5 backdrop-blur-xl hover:shadow-[0_0_40px_rgba(2,193,115,0.3)] transition">
              {/* IMAGE */}
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover object-left"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* TEXT */}
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-lg font-semibold text-[#02C173]">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-300">₹{product.price}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default SwipeDeck;
