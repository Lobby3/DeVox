"use client";

import dynamic from "next/dynamic";
import React from "react";

const MyDonations = dynamic(
  () => import("../../components/my-donations/my-donations"),
  {
    ssr: false,
  }
);

export default function MyDonationsPage() {
  return <MyDonations />;
}
