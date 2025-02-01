'use client'

import React, { useState, useEffect } from 'react'
import { Navbar } from '../components/Navbar'
import Link from 'next/link'

export default function Page() {
  // Initialize state to hold user data
  const [userData, setUserData] = useState([])

  // Fetch saved collages from localStorage when the page loads
  useEffect(() => {
    const savedCollage = localStorage.getItem('newCollage')
    if (savedCollage) {
      setUserData((prevData) => [...prevData, savedCollage])
    }
  }, [])

  return (
    <div className="h-screen w-full overflow-x-hidden">
      <Navbar />
      
      <h1 className="text-4xl font-semibold pt-24">Collection Page</h1>

      <div className="grid grid-cols-4 gap-4 mt-8">
        {/* New Button to Create Collage */}
        <div className="flex flex-col items-center text-center justify-center border-2 border-black rounded-3xl mt-24 ml-24 h-[25vw]">
          <Link href="/collage">
            <button className="w-full h-full flex flex-col items-center justify-center">
              <h1 className="text-6xl">+</h1>
              <h1 className="text-xl">New Collage</h1>
            </button>
          </Link>
        </div>

        {/* Display saved collages */}
        {userData.map((collage, index) => (
          <div key={index} className="flex flex-col items-center text-center justify-center border-2 border-black rounded-3xl mt-24 ml-24 h-[25vw]">
            <h1>{collage}</h1> {/* Display the saved collage content */}
          </div>
        ))}
      </div>
    </div>
  )
}
