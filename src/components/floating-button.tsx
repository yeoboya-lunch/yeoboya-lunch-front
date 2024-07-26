import Link from 'next/link';
import React from 'react';

interface Props {
  children: React.ReactNode;
  href: string;
}

export default function FloatingButton({ children, href }: Props) {
  return (
    <div className="sticky bottom-20 ">
      <Link
        href={href}
        scroll={false}
        className="absolute bottom-2 right-2 flex aspect-square w-14 cursor-pointer items-center justify-center
       rounded-full border-0 border-transparent bg-primary text-white shadow-xl transition-colors"
      >
        {children}
      </Link>
    </div>
  );
}
