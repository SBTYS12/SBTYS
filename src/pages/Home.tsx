import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, BrainCircuit, Database, Code2 } from "lucide-react";

export default function Home() {
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 md:pt-32 md:pb-48 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-block py-1.5 px-4 rounded-full bg-primary/10 text-primary font-medium text-sm tracking-wide mb-6 border border-primary/20 shadow-sm">
               Web Development • AI • Data 
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground text-balance"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Engineering Intelligent Solutions <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                Digital Futures.
              </span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed text-balance"
            >
              We are AI & Software Engineers crafting intelligent systems, data-driven insights, and scalable web applications.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="pt-8">
              <Link 
                href="/projects" 
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-primary-foreground bg-primary rounded-full hover:bg-primary/90 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
              >
                View Our Projects
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-24 bg-card/30 border-y border-border/40 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>Our Expertise</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Driven by a passion for cutting-edge technology, we blend academic rigor with practical engineering.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: BrainCircuit,
                title: "Artificial Intelligence",
                desc: "Designing production-ready AI systems including machine learning models, NLP, AI agents, and Retrieval-Augmented Generation (RAG) solutions that learn, reason, and adapt to real-world challenges.",
              },
              {
                icon: Database,
                title: "Data Science",
                desc: "Extracting actionable insights from complex datasets to drive strategic decision-making.",
              },
              {
                icon: Code2,
                title: "Software Engineering",
                desc: "Architecting robust, scalable, and beautifully crafted full-stack applications.",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="p-8 rounded-3xl glass-card hover:bg-card/90 transition-colors group"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground" style={{ fontFamily: 'var(--font-display)' }}>{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Teaser Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1 space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                Meet the <span className="text-primary italic">Founders</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We are two engineering students in our final cycle, sharing a profound passion for building solutions that matter. 
                Combining our specializations in Data Science, AI, and Full Stack Development, we created SBTYS to bring intelligent ideas to life.
              </p>
              <Link 
                href="/about" 
                className="inline-block mt-4 text-primary font-medium hover:text-primary/80 transition-colors border-b-2 border-primary/20 hover:border-primary pb-1"
              >
                Discover our journey
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1 w-full"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-[3rem] transform rotate-3 scale-105 blur-sm" />
              <div className="bg-card border border-white/40 rounded-[3rem] shadow-xl overflow-hidden flex items-center justify-center p-12 text-center">
                <div className="space-y-4">
                  <div className="flex justify-center -space-x-4 mb-6">
                    <div className="w-32 h-32 rounded-full border-4 border-card bg-primary/20 flex items-center justify-center text-primary font-bold text-2xl shadow-sm">TY</div>
                    <div className="w-32 h-32 rounded-full border-4 border-card bg-primary/30 flex items-center justify-center text-primary font-bold text-2xl shadow-sm">SBS</div>
                  </div>
                  <h3 className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-display)' }}>Two Minds, One Vision</h3>
                  <p className="text-muted-foreground text-sm max-w-xs mx-auto">Engineering excellence meets creative problem solving.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
