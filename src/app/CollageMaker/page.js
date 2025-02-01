'use client'

import React, { useState, useRef } from 'react';
import { Navbar } from '../components/Navbar'
import { default as Card } from '../components/Card'
import { default as CardContent } from '../components/CardContent'
import { default as Button } from '../components/Button'
import { UploadCloud } from 'lucide-react';

const UltimateCollage = () => {
  const [images, setImages] = useState([]);
  const [splits, setSplits] = useState({ vertical: 50, horizontal: 50 });
  const [gap, setGap] = useState(8);
  const [isDragging, setIsDragging] = useState(null);
  const [imageStyles, setImageStyles] = useState({});
  const fileInputRef = useRef(null);
  const containerRef = useRef(null);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file)
    }));
    setImages([...images, ...newImages].slice(0, 4));
  };

  // Divider dragging
  const handleDividerStart = (e, type) => {
    e.preventDefault();
    setIsDragging({ type: type, isDiv: true });
  };

  const handleDividerDrag = (e) => {
    if (!isDragging?.isDiv || !containerRef.current) return;
    
    const container = containerRef.current.getBoundingClientRect();
    
    if (isDragging.type === 'vertical') {
      const x = e.clientX - container.left;
      const percentage = (x / container.width) * 100;
      setSplits(prev => ({
        ...prev,
        vertical: Math.min(Math.max(percentage, 20), 80)
      }));
    } else if (isDragging.type === 'horizontal') {
      const y = e.clientY - container.top;
      const percentage = (y / container.height) * 100;
      setSplits(prev => ({
        ...prev,
        horizontal: Math.min(Math.max(percentage, 20), 80)
      }));
    }
  };

  // Gap control
  const handleGapStart = (e) => {
    e.preventDefault();
    setIsDragging({ type: 'gap', startX: e.clientX, startGap: gap });
  };

  const handleGapDrag = (e) => {
    if (isDragging?.type !== 'gap') return;
    const diff = e.clientX - isDragging.startX;
    const newGap = Math.max(0, Math.min(40, isDragging.startGap + diff / 4));
    setGap(newGap);
  };

  // Image resizing
  const handleResizeStart = (e, imageId, corner) => {
    e.stopPropagation();
    const currentStyle = imageStyles[imageId] || { scale: 1, translateX: 0, translateY: 0 };
    setIsDragging({
      type: 'resize',
      imageId,
      corner,
      startPos: { x: e.clientX, y: e.clientY },
      startStyle: { ...currentStyle }
    });
  };

  const handleResizeDrag = (e) => {
    if (isDragging?.type !== 'resize') return;
    
    const deltaX = e.clientX - isDragging.startPos.x;
    const deltaY = e.clientY - isDragging.startPos.y;
    
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const direction = deltaX + deltaY > 0 ? 1 : -1;
    const newScale = Math.max(0.5, Math.min(2, isDragging.startStyle.scale + (direction * distance / 200)));

    let translateX = isDragging.startStyle.translateX;
    let translateY = isDragging.startStyle.translateY;
    
    if (isDragging.corner.includes('left')) {
      translateX = isDragging.startStyle.translateX + deltaX / 2;
    }
    if (isDragging.corner.includes('top')) {
      translateY = isDragging.startStyle.translateY + deltaY / 2;
    }

    setImageStyles(prev => ({
      ...prev,
      [isDragging.imageId]: {
        scale: newScale,
        translateX,
        translateY
      }
    }));
  };

  const handleDragEnd = () => {
    setIsDragging(null);
  };

  const handleMouseMove = (e) => {
    if (isDragging?.type === 'gap') handleGapDrag(e);
    else if (isDragging?.type === 'resize') handleResizeDrag(e);
    else if (isDragging?.isDiv) handleDividerDrag(e);
  };

  const corners = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
  const getCornerStyle = (corner) => {
    const base = "absolute w-3 h-3 bg-white border-2 border-blue-500 rounded-full cursor-nw-resize z-20";
    const positions = {
      'top-left': 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
      'top-right': 'top-0 right-0 translate-x-1/2 -translate-y-1/2',
      'bottom-left': 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
      'bottom-right': 'bottom-0 right-0 translate-x-1/2 translate-y-1/2'
    };
    return `${base} ${positions[corner]}`;
  };

  return (
    <div> <Navbar/>
    <div className="w-full max-w-2xl mx-auto pt-36 p-16">
      <Card>
        <CardContent className="p-4">
          <Button 
            onClick={() => fileInputRef.current.click()}
            className="mb-4 flex items-center gap-2"
          >
            <UploadCloud size={16} />
            Upload Images ({images.length}/4)
          </Button>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            multiple
            accept="image/*"
            className="hidden"
          />
          
          <div 
            ref={containerRef}
            className="relative bg-gray-100 rounded-lg overflow-hidden"
            style={{ height: '500px' }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
          >
            {images.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>Upload up to 4 images to create a collage</p>
              </div>
            ) : (
              <div className="relative h-full" style={{ padding: `${gap}px` }}>
                {/* Top left */}
                <div 
                  className="absolute top-0 left-0"
                  style={{
                    width: `${splits.vertical}%`,
                    height: `${splits.horizontal}%`,
                    padding: `${gap}px`
                  }}
                >
                  {images[0] && (
                    <div className="relative w-full h-full overflow-hidden rounded-lg">
                      <img
                        src={images[0].url}
                        alt="Collage item 1"
                        className="w-full h-full object-cover transition-transform"
                        style={{
                          transform: `scale(${imageStyles[images[0].id]?.scale || 1}) 
                                    translate(${imageStyles[images[0].id]?.translateX || 0}px, 
                                             ${imageStyles[images[0].id]?.translateY || 0}px)`
                        }}
                      />
                      {corners.map(corner => (
                        <div
                          key={corner}
                          className={getCornerStyle(corner)}
                          onMouseDown={(e) => handleResizeStart(e, images[0].id, corner)}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Top right */}
                <div 
                  className="absolute top-0 right-0"
                  style={{
                    width: `${100 - splits.vertical}%`,
                    height: `${splits.horizontal}%`,
                    padding: `${gap}px`
                  }}
                >
                  {images[1] && (
                    <div className="relative w-full h-full overflow-hidden rounded-lg">
                      <img
                        src={images[1].url}
                        alt="Collage item 2"
                        className="w-full h-full object-cover transition-transform"
                        style={{
                          transform: `scale(${imageStyles[images[1].id]?.scale || 1}) 
                                    translate(${imageStyles[images[1].id]?.translateX || 0}px, 
                                             ${imageStyles[images[1].id]?.translateY || 0}px)`
                        }}
                      />
                      {corners.map(corner => (
                        <div
                          key={corner}
                          className={getCornerStyle(corner)}
                          onMouseDown={(e) => handleResizeStart(e, images[1].id, corner)}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom left */}
                <div 
                  className="absolute bottom-0 left-0"
                  style={{
                    width: `${splits.vertical}%`,
                    height: `${100 - splits.horizontal}%`,
                    padding: `${gap}px`
                  }}
                >
                  {images[2] && (
                    <div className="relative w-full h-full overflow-hidden rounded-lg">
                      <img
                        src={images[2].url}
                        alt="Collage item 3"
                        className="w-full h-full object-cover transition-transform"
                        style={{
                          transform: `scale(${imageStyles[images[2].id]?.scale || 1}) 
                                    translate(${imageStyles[images[2].id]?.translateX || 0}px, 
                                             ${imageStyles[images[2].id]?.translateY || 0}px)`
                        }}
                      />
                      {corners.map(corner => (
                        <div
                          key={corner}
                          className={getCornerStyle(corner)}
                          onMouseDown={(e) => handleResizeStart(e, images[2].id, corner)}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom right */}
                <div 
                  className="absolute bottom-0 right-0"
                  style={{
                    width: `${100 - splits.vertical}%`,
                    height: `${100 - splits.horizontal}%`,
                    padding: `${gap}px`
                  }}
                >
                  {images[3] && (
                    <div className="relative w-full h-full overflow-hidden rounded-lg">
                      <img
                        src={images[3].url}
                        alt="Collage item 4"
                        className="w-full h-full object-cover transition-transform"
                        style={{
                          transform: `scale(${imageStyles[images[3].id]?.scale || 1}) 
                                    translate(${imageStyles[images[3].id]?.translateX || 0}px, 
                                             ${imageStyles[images[3].id]?.translateY || 0}px)`
                        }}
                      />
                      {corners.map(corner => (
                        <div
                          key={corner}
                          className={getCornerStyle(corner)}
                          onMouseDown={(e) => handleResizeStart(e, images[3].id, corner)}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Dividers */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize hover:bg-blue-400 hover:w-2 transition-all z-10"
                  style={{ 
                    left: `${splits.vertical}%`,
                    transform: 'translateX(-50%)',
                    opacity: isDragging?.type === 'vertical' ? 1 : 0.5
                  }}
                  onMouseDown={(e) => handleDividerStart(e, 'vertical')}
                />
                
                <div
                  className="absolute left-0 right-0 h-1 bg-white cursor-row-resize hover:bg-blue-400 hover:h-2 transition-all z-10"
                  style={{ 
                    top: `${splits.horizontal}%`,
                    transform: 'translateY(-50%)',
                    opacity: isDragging?.type === 'horizontal' ? 1 : 0.5
                  }}
                  onMouseDown={(e) => handleDividerStart(e, 'horizontal')}
                />

                {/* Gap control handle */}
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 
                           bg-white rounded-full shadow-lg cursor-move flex items-center justify-center
                           hover:bg-blue-50 active:bg-blue-100 z-30"
                  onMouseDown={handleGapStart}
                  style={{ 
                    cursor: isDragging?.type === 'gap' ? 'grabbing' : 'grab'
                  }}
                >
                  <div className="w-4 h-4 border-2 border-gray-400 rounded" />
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-4 text-sm text-gray-500 text-center">
            • Drag divider lines to adjust image spaces
            • Drag corner handles to resize individual images
            • Drag center handle to adjust gaps between images
          </div>
        </CardContent>
      </Card>
    </div>
    </div>
  );
};

export default UltimateCollage;