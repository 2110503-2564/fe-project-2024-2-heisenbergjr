"use client";
import React from "react";

export default function InteractiveCard({
  children,
  contentName,
}: {
  children: React.ReactNode;
  contentName: string;
}) {

  return (
    <div
      className="w-full h-[400px] rounded-xl shadow-lg bg-white transition-all duration-300 ease-in-out 
                 hover:shadow-2xl hover:bg-neutral-200 active:scale-95 cursor-pointer"
    
    >
      {children}
    </div>
  );
}
