// components/CreateCollagePage.js

'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function CreateCollagePage() {
  const [collage, setCollage] = useState("")
  const [mounted, setMounted] = useState(false) // Track if the component has mounted
  const router = useRouter()

  // Set mounted to true after the component is mounted on the client-side
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleCollageSubmit = () => {
    // Save the collage to localStorage or a global state
    localStorage.setItem('newCollage', collage)

    // Only navigate if the component is mounted on the client
    if (mounted) {
      router.push('/')
    }
  }

  // Return a loading state if not mounted yet
  if (!mounted) {
    return <div>Loading...</div>
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="text-center">
        <h2 className="text-3xl font-semibold mb-4">Create Your Collage</h2>
        <textarea
          className="border-2 p-4 w-80 h-40 mb-4"
          placeholder="Enter collage details or design here"
          value={collage}
          onChange={(e) => setCollage(e.target.value)}
        />
        <br />
        <button
          onClick={handleCollageSubmit}
          className="bg-cyan-500 text-white p-3 rounded"
        >
          Save Collage
        </button>
      </div>
    </div>
  )
}
