'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const BackButton = () => {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };
  return (
    <button onClick={onClick} className="absolute left-4">
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 19l-7-7 7-7"
        ></path>
      </svg>
    </button>
  );
};

export default BackButton;
