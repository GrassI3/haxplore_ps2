'use client'

import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { default as Button } from '../components/Button';
import Link from 'next/link';
import gsap from 'gsap';

const Collection = () => {
  const [userData, setUserData] = useState([]); // To hold the saved collages

  useEffect(() => {
    // Load saved collages from localStorage
    const savedCollages = JSON.parse(localStorage.getItem('collages')) || [];
    setUserData(savedCollages);

    // Animate collages after they are loaded
    gsap.from('.collage-item', {
      opacity: 0,
      y: 30, // Slide-up effect
      stagger: 0.2,
      duration: 1,
      ease: 'power4.out',
    });
  }, []);

  const handleDeleteCollage = (index) => {
    const updatedCollages = userData.filter((_, idx) => idx !== index);
    setUserData(updatedCollages);

    // Update the localStorage after deletion
    localStorage.setItem('collages', JSON.stringify(updatedCollages));

    alert('Collage deleted!');
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-4xl font-semibold pt-24">Collection Page</h1>

      <div className="grid grid-cols-4 gap-4 mt-8">
        {/* New Button to Create Collage */}
        <div className="flex flex-col items-center text-center justify-center border-2 border-black rounded-3xl mt-24 ml-24 h-[25vw]">
          <Link href="/CollageMaker"> {/* This is the link to the collage creation page */}
            <button className="w-full h-full flex flex-col items-center justify-center">
              <h1 className="text-6xl">+</h1>
              <h1 className="text-xl">New Collage</h1>
            </button>
          </Link>
        </div>

        {/* Display saved collages */}
        {userData.length > 0 ? (
          userData.map((collage, index) => (
            <div
              key={index}
              className="collage-item flex flex-col items-center text-center justify-center border-2 border-black rounded-3xl mt-24 ml-24 h-[25vw] opacity-0" // Adding opacity-0 initially for fade-in
            >
              <h1>Collage {index + 1}</h1>
              {/* Render the images or collage preview */}
              <div className="relative h-full">
                <Link
                  href={{
                    pathname: '/CollageMaker',
                    query: { collage: JSON.stringify(collage) } // Pass collage data as a query param
                  }}
                  passHref
                >
                  <div className="cursor-pointer">
                    {collage.images.slice(0, 4).map((image, idx) => (
                      <img
                        key={idx}
                        src={image.url}
                        alt={`Collage image ${idx + 1}`}
                        className="w-1/2 h-1/2 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </Link>
              </div>

              {/* Delete button */}
              <Button
                onClick={() => handleDeleteCollage(index)}
                className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white"
              >
                Delete Collage
              </Button>
            </div>
          ))
        ) : (
          <div className="text-center mt-4">No saved collages yet.</div>
        )}
      </div>
    </div>
  );
};

export default Collection;
