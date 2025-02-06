"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setCount((prev) => prev + 1)}
        className="blend border border-black/25 px-3 py-1 hover:bg-black/5 dark:border-white/25 dark:hover:bg-white/15"
      >
        Increment
      </button>
      <div>
        Clicked {count} {count > 1 ? "times" : "time"}
      </div>
    </div>
  );
}
