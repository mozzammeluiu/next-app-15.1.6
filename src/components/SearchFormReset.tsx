"use client";

import { X } from "lucide-react";
import Link from "next/link";

function SearchFormReset() {
  const reset = (e: React.MouseEvent) => {
    e.preventDefault();
    const form = document.getElementsByClassName("search-form")[0] as unknown as HTMLFormElement;
    if (form) form.reset();
  };
  return (
    <button type="reset" className="search-btn" onClick={reset}>
      <Link href="/" className="search-btn text-white">
        <X className="size-5" />
      </Link>
    </button>
  );
}

export default SearchFormReset;
