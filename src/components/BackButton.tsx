'use client';

import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import React from 'react';

const BackButton = () => {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };
  return (
    <button onClick={onClick} className="absolute left-4">
      <ArrowLeftIcon className="h-6 w-6" />
    </button>
  );
};

export default BackButton;
