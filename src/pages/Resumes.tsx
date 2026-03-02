import { motion } from "framer-motion";
import { useResumes } from "@/hooks/use-data";
import { Download, ExternalLink, FileText, Loader2 } from "lucide-react";
import { Link } from "wouter";

export default function Resumes() {
  const { data: resumes, isLoading } = useResumes();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="w-full pt-12 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
          Curriculum <span className="text-primary italic">Vitae</span>
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Detailed backgrounds of our engineering journey, technical skills, and academic achievements.
        </p>
      </motion.div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        </div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {resumes?.map((resume) => (
            <motion.div
              key={resume.id}
              variants={itemVariants}
              className="flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 rounded-3xl glass-card bg-card hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border border-white/60 group"
            >
              <div className="flex items-start gap-6 mb-6 md:mb-0">
                <div className="hidden md:flex flex-shrink-0 w-16 h-16 rounded-2xl bg-primary/10 items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
                    {resume.role}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {resume.skills.slice(0, 4).map((skill, idx) => (
                      <span key={idx} className="text-xs font-medium px-3 py-1 bg-background rounded-full border border-border text-muted-foreground">
                        {skill}
                      </span>
                    ))}
                    {resume.skills.length > 4 && (
                      <span className="text-xs font-medium px-3 py-1 bg-transparent text-muted-foreground">
                        +{resume.skills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                <a
                  href={resume.resumeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 md:flex-none flex items-center justify-center px-6 py-3 rounded-xl bg-background border-2 border-border text-foreground font-medium hover:border-primary/50 hover:bg-primary/5 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View
                </a>
                <a 
                  href={resume.resumeUrl} 
                  download={`${resume.name.replace(" ", "_")}_CV.pdf`}
                  className="flex-1 md:flex-none flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
