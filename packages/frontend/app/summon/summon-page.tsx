"use client";

import dynamic from "next/dynamic";
import React from "react";

const DynamicContent = dynamic(() => import("./Content"), {
  ssr: false,
});

export default function SummonPage() {
  return <DynamicContent />;
}
