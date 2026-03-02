import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "../lib/data";
import { Play, ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectVideoCardProps {
  project: Project;
}

export function ProjectVideoCard({ project }: ProjectVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const hasVideo = !!project.videoUrl;
  const hasImages = !hasVideo && !!project.images && project.images.length > 0;

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      if (hasVideo) {
        setTimeout(() => {
          modalVideoRef.current?.play().catch(() => {});
        }, 400);
      }
    } else {
      document.body.style.overflow = "";
      modalVideoRef.current?.pause();
      setCurrentImage(0);
    }
    return () => { document.body.style.overflow = ""; };
  }, [isModalOpen]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && isVideoLoaded) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) videoRef.current.pause();
  };

  const closeModal = () => setIsModalOpen(false);

  const prevImage = () => {
    if (!project.images) return;
    setCurrentImage((i) => (i === 0 ? project.images!.length - 1 : i - 1));
  };

  const nextImage = () => {
    if (!project.images) return;
    setCurrentImage((i) => (i === project.images!.length - 1 ? 0 : i + 1));
  };

  const colors = {
    background: "#f5f0e8",
    cardBg: "#fdfcfa",
    headerBg: "#ede8de",
    foreground: "#4a3f35",
    muted: "#8a7c70",
    border: "#d6cfc4",
    accent: "#b5935a",
    accentLight: "rgba(181,147,90,0.12)",
    accentBorder: "rgba(181,147,90,0.45)",
    accentText: "#8a6830",
    shadow: "rgba(74,63,53,0.12)",
  };

  // Thumbnail: first image or video preview
  const cardThumbnail = project.thumbnailUrl || (hasImages ? project.images![0] : null);

  return (
    <>
      {/* ── Card ── */}
      <motion.div
        whileHover={{ y: -8 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative flex flex-col overflow-hidden rounded-3xl glass-card transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 bg-card"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          {/* Show first image as thumbnail for image projects */}
          {cardThumbnail && (
            <img
              src={cardThumbnail}
              alt={project.name}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                isHovered && hasVideo ? "opacity-0" : "opacity-100"
              }`}
            />
          )}

          {/* Video hover preview — only for video projects */}
          {hasVideo && (
            <video
              ref={videoRef}
              src={project.videoUrl}
              muted
              loop
              playsInline
              onLoadedData={() => setIsVideoLoaded(true)}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                isHovered ? "scale-105 opacity-100" : "scale-100 opacity-0"
              }`}
            />
          )}

          {!cardThumbnail && !hasVideo && (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-center">
              <Play className="text-primary/30 w-12 h-12" />
            </div>
          )}

          {/* Image count badge */}
          {hasImages && (
            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold"
              style={{ backgroundColor: "rgba(74,63,53,0.7)", color: "#fff" }}>
              {project.images!.length} photos
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-6 md:p-8 flex flex-col flex-grow">
          <h3
            className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {project.name}
          </h3>
          <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed mb-6 flex-grow">
            {project.description}
          </p>
          <div className="mt-auto">
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-primary font-semibold text-sm flex items-center gap-2"
            >
              View Details and Demo
              <motion.span className="inline-block" whileHover={{ x: 4 }}>→</motion.span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              style={{
                position: "fixed", inset: 0, zIndex: 9998,
                backgroundColor: "rgba(74,63,53,0.55)",
                backdropFilter: "blur(6px)",
              }}
            />

            {/* Modal */}
            <motion.div
              key="modal"
              initial={{ scale: 0.92, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 24 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              style={{
                position: "fixed", inset: 0, zIndex: 9999,
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "1.5rem", pointerEvents: "none",
              }}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  pointerEvents: "auto",
                  width: "100%",
                  maxWidth: "560px",
                  maxHeight: "85vh",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "20px",
                  overflow: "hidden",
                  backgroundColor: colors.cardBg,
                  border: `2px solid ${colors.border}`,
                  boxShadow: `0 0 0 1px ${colors.accentBorder}, 0 25px 60px ${colors.shadow}`,
                }}
              >
                {/* ── Header ── */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 20px",
                  backgroundColor: colors.headerBg,
                  borderBottom: `1px solid ${colors.border}`,
                  flexShrink: 0,
                }}>
                  <span style={{
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: colors.foreground,
                    fontFamily: "var(--font-display, serif)",
                  }}>
                    {project.name}
                  </span>
                  <button
                    onClick={closeModal}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center",
                      width: "36px", height: "36px", borderRadius: "50%",
                      border: `2px solid ${colors.accent}`,
                      backgroundColor: colors.accent,
                      color: "#ffffff", cursor: "pointer", flexShrink: 0,
                    }}
                    aria-label="Fermer"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* ── Scrollable body ── */}
                <div style={{
                  overflowY: "auto",
                  flex: 1,
                  backgroundColor: colors.background,
                  scrollbarWidth: "thin",
                  scrollbarColor: `${colors.accent} ${colors.background}`,
                }}>

                  {/* ── VIDEO mode ── */}
                  {hasVideo && (
                    <div style={{ width: "100%", backgroundColor: "#000", aspectRatio: "16/9" }}>
                      <video
                        ref={modalVideoRef}
                        src={project.videoUrl}
                        controls
                        loop
                        playsInline
                        style={{ width: "100%", height: "100%", display: "block" }}
                      />
                    </div>
                  )}

                  {/* ── IMAGES mode — horizontal scroll carousel ── */}
                  {hasImages && (
                    <div style={{ position: "relative", backgroundColor: "#1a1612" }}>
                      {/* Main image display */}
                      <div style={{ width: "100%", aspectRatio: "16/9", position: "relative", overflow: "hidden" }}>
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={currentImage}
                            src={project.images![currentImage]}
                            alt={`${project.name} screenshot ${currentImage + 1}`}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.25 }}
                            style={{
                              width: "100%", height: "100%",
                              objectFit: "contain", display: "block",
                            }}
                          />
                        </AnimatePresence>

                        {/* Prev / Next arrows */}
                        <button
                          onClick={prevImage}
                          style={{
                            position: "absolute", left: "10px", top: "50%",
                            transform: "translateY(-50%)",
                            width: "36px", height: "36px", borderRadius: "50%",
                            backgroundColor: "rgba(253,252,250,0.9)",
                            border: `1px solid ${colors.border}`,
                            color: colors.foreground,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: "pointer", zIndex: 10,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                          }}
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <button
                          onClick={nextImage}
                          style={{
                            position: "absolute", right: "10px", top: "50%",
                            transform: "translateY(-50%)",
                            width: "36px", height: "36px", borderRadius: "50%",
                            backgroundColor: "rgba(253,252,250,0.9)",
                            border: `1px solid ${colors.border}`,
                            color: colors.foreground,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: "pointer", zIndex: 10,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                          }}
                        >
                          <ChevronRight size={18} />
                        </button>

                        {/* Counter */}
                        <div style={{
                          position: "absolute", bottom: "10px", right: "14px",
                          fontSize: "0.75rem", fontWeight: 600,
                          backgroundColor: "rgba(74,63,53,0.7)",
                          color: "#fff", padding: "3px 10px", borderRadius: "999px",
                        }}>
                          {currentImage + 1} / {project.images!.length}
                        </div>
                      </div>

                      {/* Thumbnail strip — horizontally scrollable */}
                      <div
                        ref={scrollRef}
                        style={{
                          display: "flex",
                          gap: "8px",
                          padding: "10px 12px",
                          overflowX: "auto",
                          scrollbarWidth: "thin",
                          scrollbarColor: `${colors.accent} #1a1612`,
                          backgroundColor: "#1a1612",
                        }}
                      >
                        {project.images!.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImage(idx)}
                            style={{
                              flexShrink: 0,
                              width: "64px",
                              height: "42px",
                              borderRadius: "6px",
                              overflow: "hidden",
                              border: idx === currentImage
                                ? `2px solid ${colors.accent}`
                                : "2px solid transparent",
                              opacity: idx === currentImage ? 1 : 0.55,
                              transition: "all 0.2s",
                              cursor: "pointer",
                              padding: 0,
                            }}
                          >
                            <img
                              src={img}
                              alt={`thumb ${idx + 1}`}
                              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ── Text content ── */}
                  <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>

                    {/* Description */}
                    <div>
                      <p style={{
                        fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
                        textTransform: "uppercase", color: colors.muted, marginBottom: "8px",
                      }}>
                        Description
                      </p>
                      <p style={{ fontSize: "0.9rem", color: colors.foreground, lineHeight: 1.7 }}>
                        {project.description}
                      </p>
                    </div>

                    <div style={{ height: "1px", backgroundColor: colors.border }} />

                    {/* Technologies */}
                    <div>
                      <p style={{
                        fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
                        textTransform: "uppercase", color: colors.muted, marginBottom: "12px",
                      }}>
                        Technologies
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {project.technologies.map((tech: string, idx: number) => (
                          <span key={idx} style={{
                            fontSize: "0.75rem", fontWeight: 600,
                            padding: "5px 14px", borderRadius: "999px",
                            backgroundColor: colors.accentLight,
                            border: `1px solid ${colors.accentBorder}`,
                            color: colors.accentText,
                          }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{ height: "1px", backgroundColor: colors.border }} />

                    {/* Lien GitHub */}
                    <div>
                      <p style={{
                        fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
                        textTransform: "uppercase", color: colors.muted, marginBottom: "12px",
                      }}>
                        Link
                      </p>
                      <a
                        href="https://github.com/SBTYS12"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex", alignItems: "center", gap: "8px",
                          padding: "10px 22px", borderRadius: "12px",
                          backgroundColor: colors.accent, color: "#ffffff",
                          fontWeight: 600, fontSize: "0.9rem", textDecoration: "none",
                          boxShadow: `0 4px 15px ${colors.shadow}`,
                          transition: "transform 0.2s, opacity 0.2s",
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                          (e.currentTarget as HTMLElement).style.opacity = "0.9";
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                          (e.currentTarget as HTMLElement).style.opacity = "1";
                        }}
                      >
                        <ExternalLink size={16} />
                        View on GitHub
                      </a>
                    </div>

                    <div style={{ height: "8px" }} />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}