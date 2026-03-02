import { motion } from "framer-motion";
import { useProjects } from "@/hooks/use-data";
import { ProjectVideoCard } from "@/components/ProjectVideoCard";
import { Loader2 } from "lucide-react";

export default function Projects() {
  const { data: projects, isLoading } = useProjects();

  return (
    <div className="w-full pt-12 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-16 md:mb-24"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
          Our <span className="text-primary italic">Projects</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          A showcase of our technical expertise. From complex AI models to seamless 
          full-stack applications, explore the solutions we've built.
        </p>
      </motion.div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground">Loading projects...</p>
        </div>
      ) : projects?.length === 0 ? (
        <div className="text-center py-32 glass-card rounded-3xl border-dashed">
          <p className="text-xl text-muted-foreground" style={{ fontFamily: 'var(--font-display)' }}>
            More projects coming soon.
          </p>
        </div>
      ) : (
        <motion.div 
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects?.map((project) => (
            <ProjectVideoCard key={project.id} project={project} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
