'use client'

import React, { useEffect, useState } from 'react'
import gsap from 'gsap'
import Link from 'next/link'

export const Navbar = () => {
  const [menu, menuToggle] = useState(false)

  const toggle = () => {
    menuToggle(!menu)
  }

  useEffect(() => {
    if (menu) {
      // Animate hamburger bars into "X"
      gsap.to('.bars div:nth-child(1)', {
        rotation: 45,
        translateY: 2,
        y: 6,
        ease: 'power2.inOut',
      })
      gsap.to('.bars div:nth-child(2)', {
        rotation: -45,
        y: -6,
        ease: 'power2.inOut',
      })

      // Show home menu with fade-in effect
      gsap.to('.home', {
        opacity: 1,
        visibility: 'visible', 
        duration: 0.5,
        ease: 'power2.inOut',
      })
    } else {
      // Reset hamburger bars to original state
      gsap.to('.bars div:nth-child(1)', {
        rotation: 0,
        translateY: 0,
        ease: 'power2.inOut',
      })
      gsap.to('.bars div:nth-child(2)', {
        rotation: 0,
        translateY: 0,
        ease: 'power2.inOut',
      })

      // Fade-out home menu, then hide it after opacity transition is complete
      gsap.to('.home', {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.set('.home', { visibility: 'hidden' })
        }
      })
    }
  }, [menu])

  return (
    <div className=" h-[5vw] w-full flex items-center justify-between px-12 fixed z-[999]">
      {/* Logo Section */}
      <div className="">
        <h1 className="text-3xl font-semibold flex">
          <div className="logo"><img src="/logo.png" alt="" className="h-40 w-40" /></div>
        </h1>
      </div>

      {/* Hamburger Icon */}
      <div>
        <div onClick={toggle} className="">
          <button className="bars space-y-1">
            <div className="h-1 w-7 bg-black"></div>
            <div className="h-1 w-7 bg-black"></div>
          </button>
        </div>

        {/* Menu Section - Positioned below the bars */}
        <div className={`home fixed w-80 mt-16 mr-8 right-0 border-4 border-zinc-500 rounded-3xl`}>
          <ul className="flex flex-col w-full bg-white rounded-3xl">
            <li className="inline-block text-2xl text-center py-5 hover:text-zinc-500">
              <Link href={'/'}>Home</Link>
            </li>
            <div className="inline-block h-[.5px] w-full bg-zinc-500"></div>
            <li className="inline-block text-2xl text-center py-5 hover:text-zinc-500">
              <Link href={'#'}>Photo Collage</Link>
            </li>
            <div className="inline-block h-[.5px] w-full bg-zinc-500"></div>
            <li className="inline-block text-2xl text-center py-5 hover:text-zinc-500">
              <Link href={'/collection'}>Collection</Link>
            </li>
            <div className="inline-block h-[.5px] w-full bg-zinc-500"></div>
            <li className="inline-block text-2xl text-center py-5 hover:text-zinc-500">
              <Link href={'#'}>About</Link>
            </li>
            <div className="inline-block h-[.5px] w-full bg-zinc-500"></div>
            <li className="inline-block text-2xl text-center py-5 hover:text-zinc-500">
              <Link href="/contacts">Contact</Link>
            </li>
            <div className="inline-block h-[.5px] w-full bg-zinc-500"></div>
            <div className="text-center mt-6 space-x-4 pb-6">
              <button className="text-xl text-slate-800 bg-green-300 px-6 py-2 rounded-full hover:bg-green-400">Log in</button>
              <button className="text-xl text-slate-800 bg-green-100 px-6 py-2 rounded-full border-2 border-green-300 hover:bg-green-200">Sign Up</button>
            </div>
          </ul>
        </div>
      </div>
    </div>
  )
}
