interface VideoBackgroundProps {
  src: string
  className?: string
  opacity?: number
}

export default function VideoBackground({ src, className, opacity = 1 }: VideoBackgroundProps) {
  return (
    <video
      className={`bg-video ${className ?? ''}`}
      style={{ opacity }}
      autoPlay
      muted
      loop
      playsInline
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}
