'use client'

import React, { useState, useRef } from 'react';
import { Navbar } from '../components/Navbar';
import { default as Card } from '../components/Card';
import { default as CardContent } from '../components/CardContent';
import { default as Button } from '../components/Button';
import { UploadCloud } from 'lucide-react';

const collection = () => {
    const [images, setImages] = useState([]);
    const [splits, setSplits] = useState({ vertical: 50, horizontal: 50 });
    const [gap, setGap] = useState(8);
    const [isDragging, setIsDragging] = useState(null);
    const [imageStyles, setImageStyles] = useState({});
    const fileInputRef = useRef(null);
    const containerRef = useRef(null);

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        const newImages = files.map((file) => ({
            id: Math.random().toString(36).substr(2, 9),
            url: URL.createObjectURL(file),
        }));
        setImages([...images, ...newImages].slice(0, 4));
    };

    // ... rest of the code

    // Function to store data
    const storeData = () => {
        // Store the data in localStorage
        localStorage.setItem('collages', JSON.stringify(images));
    };

    return (
        <div>
            <Navbar />
            <div className="w-full max-w-2xl mx-auto -36 p-16">
                <Card>
                    <CardContent className="p-4">
                        {/* ... rest of the code */}
                        <Button onClick={storeData} className="mb-4 flex items-center gap-2">
                            Save Collages
                        </Button>
                        {/* ... rest of the code */}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default collection;
