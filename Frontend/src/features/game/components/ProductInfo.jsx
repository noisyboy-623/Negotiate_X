"use client";

import React from "react";

const ProductInfo = ({ product, onSelect }) => {
  if (!product) return null;

  return (
   <div className="w-full max-w-4xl mx-auto flex items-center justify-between gap-10 mt-">

  {/* LEFT SIDE - PRODUCT DETAILS */}
  <div className="flex flex-col text-left max-w-lg">

    {/* PRODUCT NAME */}
    <h1 className="text-3xl md:text-2xl font-bold text-[#02C173]">
      {product.name}
    </h1>

    {/* PRICE */}
    <p className="text-xl font-semibold text-white mt-2">
      ₹{product.price}
    </p>

    {/* DESCRIPTION */}
    <p className="text-gray-400 mt-3">
      {product.description}
    </p>

    {/* FEATURES */}
    <div className="flex gap-3 mt-5 flex-wrap">
      <span className="px-3 py-1 bg-[#02C173]/10 text-[#02C173] rounded-full text-sm">
        Premium Quality
      </span>
      <span className="px-3 py-1 bg-[#02C173]/10 text-[#02C173] rounded-full text-sm">
        Trusted Seller
      </span>
      <span className="px-3 py-1 bg-[#02C173]/10 text-[#02C173] rounded-full text-sm">
        Limited Stock
      </span>
    </div>
  </div>

  {/* RIGHT SIDE - BUTTON */}
  <div className="flex items-center justify-center">
    <button
      onClick={() => onSelect(product)}
      className="px-10 py-4 rounded-xl bg-[#02C173] text-black font-semibold text-lg hover:scale-105 hover:bg-[#02C173]/90 transition shadow-[0_10px_30px_rgba(2,193,115,0.4)]"
    >
      Select Merchant
    </button>
  </div>

</div>  );
};

export default ProductInfo;