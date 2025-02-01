'use client'

import React, { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import Link from 'next/link';
import gsap from 'gsap';

export default function Page() {
  useEffect(() => {
    // GSAP Animations
    gsap.from('.column-transition', {
      opacity: 0,
      y: -30,
      stagger: 0.2,
      duration: 1,
      ease: 'power4.out',
    });

    // Remove the 'column-transition-new' class when the component mounts
    document.querySelectorAll('.column-transition').forEach((el) => {
      el.classList.remove('column-transition-new');
    });
  }, []);

  return (
    <div>
      <Navbar />
      <div className='bg-green-50 w-full h-screen flex pt-4 pb-4'>
        <div className='flex-auto flex flex-col items-center justify-center'>
          <h1 className="text-9xl font-semibold text-slate-600">CREATE ART</h1>
          <Link href="/CollageMaker">
            <button className="mt-4 text-slate-600 bg-green-300 shadow-lg rounded-br-full rounded-tl-full rounded-tr-full px-8 py-4 text-2xl font-semibold hover:bg-green-400 transition duration-300 ease-in-out">
              🖌️ヾ(⌒ー⌒;)ノ
            </button>
          </Link>
        </div>
        <div className='h-full w-1/2 flex flex-col justify-end items-end space-y-4'>
          <div id='column-1' className='inline bg-green-300 w-1/4 h-1/5 rounded-full column-transition'></div>
          <div id='column-2' className='inline bg-green-300 w-2/4 h-1/5 rounded-full column-transition'></div>
          <div id='column-3' className='inline bg-green-300 w-8/12 h-1/5 rounded-full column-transition'></div>
          <div id='column-4' className='inline bg-green-300 w-4/5 h-1/5 rounded-full column-transition'></div>
          <div id='column-5' className='inline bg-green-300 w-full h-1/5 rounded-full column-transition'></div>
        </div>
      </div>
    </div>
  );
}
