import React from "react";
import { HiPlus } from "react-icons/hi";
import { FaHospitalAlt } from "react-icons/fa";

export default function AuthLogo({
  variant = "plus",
  size = "w-20 h-20",
  iconSize = "w-8 h-8",
  className = "",
}) {
  const Icon = variant === "hospital" ? FaHospitalAlt : HiPlus;

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md ${size} ${className} transform transition-transform hover:scale-105`}
      aria-hidden="false"
      role="img"
    >
      <Icon className={`${iconSize}`} aria-hidden="true" />
      <span className="sr-only">Hospital</span>
    </div>
  );
}
