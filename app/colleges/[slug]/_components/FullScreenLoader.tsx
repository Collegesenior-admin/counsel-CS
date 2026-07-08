"use client";

import Loader from "./Loader";

export default function FullScreenLoader() {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40 backdrop-blur-md">
      <Loader />
    </div>
  );
}