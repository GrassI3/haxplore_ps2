'use client'

import React, { useEffect } from 'react'
import { Navbar } from '../components/Navbar'
import { FaInstagram, FaLinkedin } from 'react-icons/fa'
import gsap from 'gsap'

export default function ContactPage() {

  useEffect(() => {
    // Ensure elements start from opacity 0, and then fade in with GSAP
    gsap.from('.fade-in', {
      opacity: 0,
      duration: 2,
      ease: 'power4.out',
      stagger: 0.2, // Stagger the fade-ins for each element
      delay: 0.5, // Delay before the animation starts to ensure smooth transition
    });
  }, []); // Empty dependency array means this will run only once, on mount

  return (
    <div>
      <Navbar />
      <div className='bg-green-50 w-full h-screen flex pt-16'>
        <div className='flex-auto flex flex-col items-center justify-center'>
          <h1 className="text-7xl font-semibold text-slate-600 fade-in">Contact Us</h1>
          <div className="mt-8 text-slate-600 bg-green-200 shadow-lg rounded-br-full rounded-tl-full rounded-tr-full px-8 py-4 text-2xl font-semibold hover:bg-green-300 transition duration-300 ease-in-out fade-in">
            Get in touch with our team!
          </div>
        </div>
        <div className='h-full w-1/2 flex flex-col justify-center items-end space-y-4 p-8'>
          {/* Team Member 1 */}
          <div className='shadow-lg bg-green-300 w-full p-12 rounded-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 fade-in'>
            <div className='text-xl font-medium text-slate-800'>Jai Gauns Dessai</div>
            <div className='text-xl font-medium text-slate-800'>jaistudymail13@gmail.com</div>
            <div className='flex space-x-4'>
              <a href='https://instagram.com' target='_blank' rel='noopener noreferrer'><FaInstagram className='text-4xl text-slate-800 hover:text-purple-600 transition duration-300 ease-in-out' /></a>
              <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer'><FaLinkedin className='text-4xl text-slate-800 hover:text-blue-600 transition duration-300 ease-in-out' /></a>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className='shadow-lg bg-green-300 w-full p-12 rounded-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 fade-in'>
            <div className='text-xl font-medium text-slate-800'>Sanish Pagui</div>
            <div className='text-xl font-medium text-slate-800'>sanishpagui@gmail.com</div>
            <div className='flex space-x-4'>
              <a href='https://instagram.com' target='_blank' rel='noopener noreferrer'><FaInstagram className='text-4xl text-slate-800 hover:text-purple-600 transition duration-300 ease-in-out' /></a>
              <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer'><FaLinkedin className='text-4xl text-slate-800 hover:text-blue-600 transition duration-300 ease-in-out' /></a>
            </div>
          </div>

          {/* Team Member 3 */}
          <div className='shadow-lg bg-green-300 w-full p-12 rounded-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 fade-in'>
            <div className='text-xl font-medium text-slate-800'>Konnad Alves</div>
            <div className='text-xl font-medium text-slate-800'>konnadkonnad@gmail.com</div>
            <div className='flex space-x-4'>
              <a href='https://instagram.com' target='_blank' rel='noopener noreferrer'><FaInstagram className='text-4xl text-slate-800 hover:text-purple-600 transition duration-300 ease-in-out' /></a>
              <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer'><FaLinkedin className='text-4xl text-slate-800 hover:text-blue-600 transition duration-300 ease-in-out' /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
