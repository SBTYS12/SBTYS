import { motion } from "framer-motion";
import { useResumes } from "@/hooks/use-data";
import { Briefcase, Code, GraduationCap } from "lucide-react";

export default function About() {
  const { data: resumes, isLoading } = useResumes();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
  };

  return (
    <div className="w-full pt-12 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl mx-auto mb-20"
      >
        <h1 className="text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
          About <span className="text-primary italic">SBTYS</span>
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          We are a forward-thinking technology duo, combining AI expertise with full-stack web and mobile development. Founded by two passionate engineering students, Sinda Ben Samir and Tesnim Younes, we transform complex data and cutting-edge technologies into intelligent, scalable, and user-friendly software solutions. From predictive models and AI-powered systems to responsive web and mobile applications, we bridge the gap between raw data and actionable, real-world software.
        </p>
      </motion.div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-10 text-center" style={{ fontFamily: 'var(--font-display)' }}>
          The Team Behind the Code
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="h-96 rounded-3xl bg-muted/50 animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          >
            {resumes?.map((resume) => (
              <motion.div
                key={resume.id}
                variants={cardVariants}
                className="relative group p-8 md:p-10 rounded-[2.5rem] glass-card bg-card transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 border border-white/50"
              >
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
                  <GraduationCap className="w-24 h-24 text-primary" />
                </div>

                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl text-primary mb-6">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                  {resume.name} 
                  </h3>
                  <h5 className="text-xl font-semibold mb-4 text-muted-foreground" style={{ fontFamily: 'var(--font-display)' }}>
                    {resume.role}
                  </h5>
                  
                  <p className="text-muted-foreground leading-relaxed mb-8 min-h-[5rem]">
                    {resume.description}
                  </p>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-foreground">
                      <Code className="w-4 h-4 text-primary" />
                      Core Skills
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {resume.skills.map((skill, idx) => (
                        <span 
                          key={idx}
                          className="px-4 py-2 rounded-xl bg-background border border-border text-sm font-medium text-foreground shadow-sm transition-colors hover:border-primary/30 hover:bg-primary/5"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
