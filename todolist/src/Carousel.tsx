import { useState, useEffect } from 'react'

const images = [
  { url: '/carousel/photo1.jpg' },
  { url: '/carousel/photo2.jpg' },
  { url: '/carousel/photo3.jpg' },
]

export default function Carousel() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length)
    }, 1500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="carousel">
      <div className="carousel-track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {images.map((img, i) => (
          <div className="carousel-slide" key={i}>
            <img src={img.url} alt={`Slide ${i + 1}`} />
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
