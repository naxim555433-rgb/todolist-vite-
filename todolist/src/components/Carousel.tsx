import { useState, useEffect } from 'react'

export interface CarouselImage {
  url: string
  alt?: string
}

interface CarouselProps {
  images: CarouselImage[]
  interval?: number
  height?: number | string
}

export default function Carousel({ images, interval = 1500, height = 200 }: CarouselProps) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length)
    }, interval)
    return () => clearInterval(timer)
  }, [images.length, interval])

  return (
    <div className="carousel" style={{ height }}>
      <div className="carousel-track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {images.map((img, i) => (
          <div className="carousel-slide" key={i}>
            <img src={img.url} alt={img.alt ?? `Slide ${i + 1}`} />
          </div>
        ))}
      </div>
      <div className="carousel-dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot ${i === current ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  )
}
