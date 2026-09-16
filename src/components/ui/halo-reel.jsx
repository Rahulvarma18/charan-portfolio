"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import {
    animate,
    motion,
    useMotionValue,
    useReducedMotion,
    useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

/* ── Halo Reel ───────────────────────────────────────────────────
 * Cards ride an ellipse. Card i sits at θ = i·step + rotation on an
 * ellipse of radii (rx, ry):
 *
 *   x = rx·cos θ      y = ry·sin θ      scale = min + (1−min)·(cos θ + 1)/2
 *
 * cos θ does all the work: it places the card, sizes it, and — through the
 * scale — stacks it. One number driving three properties is why a card that
 * looks nearer *is* nearer; the stacking can never disagree with the
 * perspective.
 *
 * One `rotation` motion value drives the whole ring. Every card derives its
 * transform from it through `useTransform`, so a spin never re-renders React
 * — the ring turns at 60 fps whether it is autoplaying, being dragged, or
 * settling onto a snap.
 * ─────────────────────────────────────────────────────────────── */

const TAU = Math.PI * 2;

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

export function HaloReel({
    items,
    cardWidth = 130,
    cardHeight = 180,
    minScale = 0.4,
    radiusXRatio = 0.45,
    centerXRatio = 0,
    radiusYRatio = 0.36,
    autoPlay = true,
    holdDuration = 1000,
    stepDuration = 700,
    pauseOnHover = true,
    draggable = true,
    spread = 1.2,
    maxCards = 64,
    dragSensitivity = 1,
    centerLabel,
    showCenterLabel = true,
    className,
    style,
    ...props
}) {
    const stageRef = React.useRef(null);
    const reduceMotion = useReducedMotion();

    const count = items.length;

    const rotation = useMotionValue(0);
    const draggingRef = React.useRef(false);
    const hoverRef = React.useRef(false);

    const [size, setSize] = React.useState({ w: 0, h: 0 });
    const [previewItem, setPreviewItem] = React.useState(null);
    React.useEffect(() => {
        const node = stageRef.current;
        if (!node) return;
        const measure = () =>
            setSize({ w: node.offsetWidth, h: node.offsetHeight });
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    const radiusX = size.w * radiusXRatio;
    const radiusY = size.h * radiusYRatio;

    // The ring is sized by the stage and *filled* by repeating the items — the
    // one way a wide ring and close cards can both be true. Neighbours sit
    // `radius × step` apart at the widest point of each axis, so the tighter
    // axis decides how many slots the ring needs; below that number a wider ring
    // just means bigger gaps.
    const slots = clamp(
        Math.ceil(
            TAU *
            Math.max(
                radiusX / (cardWidth * spread),
                radiusY / (cardHeight * spread),
            ),
        ),
        count,
        Math.max(count, maxCards),
    );
    const step = slots ? TAU / slots : 0;

    // Cards shrink continuously to fit whatever box they are given, instead of
    // stepping at a breakpoint — a ring that jumps at 768px reads as broken on
    // every width either side of it.
    const fit = size.w
        ? clamp(
            Math.min(
                size.w / (radiusX + cardWidth),
                size.h / (2 * radiusY + cardHeight),
            ),
            0.45,
            1,
        )
        : 1;
    const cardW = cardWidth * fit;
    const cardH = cardHeight * fit;

    // Autoplay. Each step schedules the next, so a paused tick costs a re-check
    // and nothing else — no interval keeps firing behind a held pointer.
    React.useEffect(() => {
        if (!autoPlay || reduceMotion || !count) return;

        let timer = 0;
        let controls;

        const tick = () => {
            timer = window.setTimeout(() => {
                if (draggingRef.current || (pauseOnHover && hoverRef.current) || previewItem) {
                    tick();
                    return;
                }
                controls = animate(rotation, rotation.get() - step, {
                    duration: stepDuration / 1000,
                    ease: [0.4, 0, 0.2, 1],
                    onComplete: tick,
                });
            }, holdDuration);
        };

        tick();
        return () => {
            window.clearTimeout(timer);
            controls?.stop();
        };
    }, [
        autoPlay,
        count,
        holdDuration,
        pauseOnHover,
        previewItem,
        reduceMotion,
        rotation,
        step,
        stepDuration,
    ]);

    /* ── drag ──────────────────────────────────────────────────── */

    const dragRef = React.useRef({ left: 0, top: 0, angle: 0 });
    const hasDraggedRef = React.useRef(false);

    const pointerAngle = (e) => {
        const { left, top } = dragRef.current;
        // Normalising by the radii un-squashes the ellipse, so a drag along its
        // flat side turns the ring by the same amount as one along its tall side.
        return Math.atan2(
            (e.clientY - top - size.h / 2) / (radiusY || 1),
            (e.clientX - left - size.w * centerXRatio) / (radiusX || 1),
        );
    };

    const onPointerDown = (e) => {
        if (!draggable || (e.pointerType === "mouse" && e.button !== 0)) return;
        const rect = e.currentTarget.getBoundingClientRect();
        dragRef.current = { left: rect.left, top: rect.top, angle: 0 };
        dragRef.current.angle = pointerAngle(e);
        draggingRef.current = true;
        hasDraggedRef.current = false;
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e) => {
        if (!draggingRef.current) return;
        const angle = pointerAngle(e);
        // Wrap into (−π, π] so crossing the seam behind the ring is one small
        // delta and not a full turn in the wrong direction.
        const delta =
            ((angle - dragRef.current.angle + Math.PI * 3) % TAU) - Math.PI;
        if (Math.abs(delta) > 0.005) {
            hasDraggedRef.current = true;
        }
        dragRef.current.angle = angle;
        rotation.set(rotation.get() + delta * dragSensitivity);
    };

    const endDrag = (e) => {
        if (!draggingRef.current) return;
        draggingRef.current = false;
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
            e.currentTarget.releasePointerCapture(e.pointerId);
        }
        // Settle onto the nearest card — the ring never rests between two.
        const snapped = Math.round(rotation.get() / step) * step;
        if (reduceMotion) {
            rotation.set(snapped);
            return;
        }
        animate(rotation, snapped, { duration: 0.5, ease: [0.16, 1, 0.3, 1] });
    };

    const spinBy = (direction) => {
        const target = Math.round(rotation.get() / step) * step - direction * step;
        if (reduceMotion) {
            rotation.set(target);
            return;
        }
        animate(rotation, target, {
            duration: stepDuration / 1000,
            ease: [0.4, 0, 0.2, 1],
        });
    };

    const onKeyDown = (e) => {
        const direction = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (!direction) return;
        e.preventDefault();
        spinBy(direction);
    };

    React.useEffect(() => {
        if (!previewItem) return;
        const onKey = (e) => {
            if (e.key === "Escape") setPreviewItem(null);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [previewItem]);

    if (!count) return null;

    return (
        <div
            ref={stageRef}
            role="region"
            aria-roledescription="carousel"
            aria-label={props["aria-label"] ?? "Image carousel"}
            tabIndex={0}
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            className={cn(
                "relative h-[100dvh] w-full touch-pan-y select-none overflow-hidden outline-none",
                draggable && "cursor-grab active:cursor-grabbing",
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                className,
            )}
            style={style}
            {...props}
        >
            {showCenterLabel && centerLabel ? (
                <div
                    className="pointer-events-none absolute inset-y-0 z-0 flex items-center justify-center px-4 text-center"
                    // Parked in whatever space the ring leaves rather than at a fixed
                    // spot, so it can never end up underneath the cards at any width.
                    style={{
                        left: size.w * centerXRatio + radiusX + cardW / 2,
                        right: 0,
                    }}
                >
                    {centerLabel}
                </div>
            ) : null}

            {Array.from({ length: slots }, (_, i) => (
                <WheelCard
                    key={i}
                    item={items[i % count]}
                    // The ring repeats `items` to stay dense. A screen reader should hear
                    // each image once, not once per lap, so only the first pass is real
                    // content and the copies are decoration.
                    decorative={i >= count}
                    index={i}
                    step={step}
                    rotation={rotation}
                    radiusX={radiusX}
                    radiusY={radiusY}
                    centerXRatio={centerXRatio}
                    minScale={minScale}
                    width={cardW}
                    height={cardH}
                    onHoverChange={(hovered) => {
                        hoverRef.current = hovered;
                    }}
                    onPreview={() => {
                        if (!hasDraggedRef.current) {
                            setPreviewItem(items[i % count]);
                        }
                    }}
                />
            ))}

            {previewItem ? (
                <VideoPreviewModal
                    item={previewItem}
                    onClose={() => setPreviewItem(null)}
                />
            ) : null}
        </div>
    );
}

/* ── fullscreen preview ─────────────────────────────────────────── */

function VideoPreviewModal({ item, onClose }) {
    React.useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = originalOverflow;
        };
    }, [onClose]);

    if (typeof document === "undefined") return null;

    return createPortal(
        <div
            role="dialog"
            aria-modal="true"
            aria-label={item.alt ?? item.title ?? "Video preview"}
            onClick={onClose}
            onPointerDown={(e) => e.stopPropagation()}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 animate-in fade-in duration-200"
        >
            <div
                className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 bg-zinc-900/60">
                    <div className="flex items-center gap-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-orange-500 animate-pulse" />
                        <div>
                            <h3 className="text-base font-semibold text-white tracking-tight">
                                {item.title ?? "Selected Work"}
                            </h3>
                            <p className="text-xs text-white/60">
                                {item.category ? `${item.category} • ` : ""}
                                {item.tool ?? "Reel Preview"}
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close preview"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 active:scale-95"
                    >
                        ✕
                    </button>
                </div>

                {/* Modal Video Player */}
                <div className="relative flex items-center justify-center bg-black aspect-video max-h-[70vh]">
                    <video
                        key={item.src}
                        src={item.src}
                        controls
                        autoPlay
                        playsInline
                        className="h-full w-full object-contain"
                    />
                </div>
            </div>
        </div>,
        document.body
    );
}

/* ── card ────────────────────────────────────────────────────── */

function WheelCard({
    item,
    index,
    step,
    rotation,
    radiusX,
    radiusY,
    centerXRatio,
    minScale,
    width,
    height,
    decorative,
    onHoverChange,
    onPreview,
}) {
    const [isHovered, setIsHovered] = React.useState(false);
    const isVideo = Boolean(item.src) && /\.(mp4|webm|mov)(\?.*)?$/i.test(item.src);

    const cos = useTransform(rotation, (r) => Math.cos(index * step + r));
    const sin = useTransform(rotation, (r) => Math.sin(index * step + r));

    const x = useTransform(cos, (c) => c * radiusX);
    const y = useTransform(sin, (s) => s * radiusY);
    const scale = useTransform(
        cos,
        (c) => minScale + (1 - minScale) * ((c + 1) / 2),
    );

    const baseZIndex = useTransform(scale, (s) => Math.round(s * 1000));

    return (
        <motion.div
            role={decorative ? undefined : "group"}
            aria-roledescription={decorative ? undefined : "slide"}
            aria-hidden={decorative || undefined}
            onPointerEnter={() => {
                onHoverChange(true);
                setIsHovered(true);
            }}
            onPointerLeave={() => {
                onHoverChange(false);
                setIsHovered(false);
            }}
            onClick={() => {
                if (isVideo) onPreview();
            }}
            style={{
                x,
                y,
                scale,
                zIndex: isHovered ? 9999 : baseZIndex,
                width,
                height,
                left: `${centerXRatio * 100}%`,
                top: "50%",
                marginLeft: -width / 2,
                marginTop: -height / 2,
            }}
            className={cn(
                "absolute overflow-hidden rounded-2xl shadow-xl transition-all duration-300 select-none",
                isVideo && "cursor-pointer",
                isHovered && "!z-[9999] ring-2 ring-orange-500/80 shadow-[0_0_35px_rgba(255,84,30,0.4)]",
            )}
        >
            {item.src && /\.(mp4|webm|mov)(\?.*)?$/i.test(item.src) ? (
                <video
                    src={item.src}
                    aria-label={decorative ? undefined : (item.alt ?? "")}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    draggable={false}
                    className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
                />
            ) : item.src ? (
                <img
                    src={item.src}
                    alt={decorative ? "" : (item.alt ?? "")}
                    draggable={false}
                    className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
                />
            ) : (
                <div
                    className="flex h-full w-full flex-col items-center justify-center gap-1 bg-card p-3 text-center text-card-foreground"
                    style={{
                        backgroundColor: item.bgColor,
                        color: item.textColor,
                    }}
                >
                    {item.title ? (
                        <span className="text-2xl font-black leading-none">
                            {item.title}
                        </span>
                    ) : null}
                    {item.subtitle ? (
                        <span className="text-[0.6rem] uppercase tracking-[0.2em] opacity-70">
                            {item.subtitle}
                        </span>
                    ) : null}
                </div>
            )}

            {isVideo ? (
                <div
                    className={cn(
                        "absolute inset-0 flex flex-col justify-between p-3.5 sm:p-4 bg-gradient-to-t from-black/90 via-black/45 to-black/35 opacity-0 transition-opacity duration-200 pointer-events-none",
                        isHovered && "opacity-100 pointer-events-auto",
                    )}
                >
                    {/* Top context badges */}
                    <div className="flex w-full items-center justify-between gap-1">
                        <span className="rounded-full bg-black/70 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-orange-400 backdrop-blur-md border border-white/10 truncate">
                            {item.category ?? "Selected Reel"}
                        </span>
                        {item.tool ? (
                            <span className="rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-medium text-white/90 backdrop-blur-md truncate">
                                {item.tool}
                            </span>
                        ) : null}
                    </div>

                    {/* Center action button with clear context and icon */}
                    <div className="flex w-full items-center justify-center my-auto py-2">
                        <button
                            type="button"
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={(e) => {
                                e.stopPropagation();
                                onPreview();
                            }}
                            className="group/btn flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider shadow-2xl transition-all duration-200 hover:scale-105 hover:bg-neutral-100 active:scale-95"
                            style={{ color: "#000000" }}
                        >
                            <svg
                                className="h-3 w-3 fill-black transition-transform group-hover/btn:scale-110"
                                viewBox="0 0 24 24"
                            >
                                <path d="M8 5v14l11-7z" />
                            </svg>
                            <span style={{ color: "#000000" }}>Watch Reel</span>
                        </button>
                    </div>

                    {/* Bottom project context */}
                    <div className="w-full text-left">
                        <p className="text-xs font-bold leading-tight text-white line-clamp-2 drop-shadow-md">
                            {item.title ?? (item.alt ? item.alt.replace(" — selected work reel", "") : "Project Reel")}
                        </p>
                    </div>
                </div>
            ) : null}
        </motion.div>
    );
}
export default HaloReel;