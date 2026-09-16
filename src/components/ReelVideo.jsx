export default function ReelVideo({ src, className, alt }) {
    return (
        <video
            className={className}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label={alt}
        />
    );
}