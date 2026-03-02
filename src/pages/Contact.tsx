import { motion } from "framer-motion";
import { Mail, Linkedin, ExternalLink, Github } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const contacts = [
  {
    name: "Sinda Ben Samir",
    role: "Data & AI Engineer",
    email: "bensamirsinda@gmail.com",
    linkedin: "https://www.linkedin.com/in/sinda-ben-samir-69a138304/",
  },
  {
    name: "Tesnim Younes",
    role: "AI & Software Engineer",
    email: "tesnim.younes55@gmail.com",
    linkedin: "https://www.linkedin.com/in/tesnim-younes-7a2237304/",
  }
];

const sharedGithub = "https://github.com/SBTYS12";

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-6 text-display"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Contact Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-muted-foreground"
        >
          Reach out to us directly via email or LinkedIn, or explore our shared GitHub.
        </motion.p>
      </div>

      {/* Individual Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
        {contacts.map((contact, index) => (
          <motion.div
            key={contact.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            <Card className="bg-card/50 border-border/40 hover-elevate overflow-hidden">
              <CardHeader>
                <CardTitle style={{ fontFamily: 'var(--font-display)' }}>
                  {contact.name} - <span className="text-sm font-normal">{contact.role}</span>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {/* Email */}
                  <div className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                    <Mail size={18} />
                    <a href={`mailto:${contact.email}`} className="text-sm font-medium">
                      {contact.email}
                    </a>
                  </div>

                  {/* LinkedIn */}
                  <div className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin size={18} />
                    <a
                      href={contact.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium flex items-center gap-1"
                    >
                      LinkedIn Profile <ExternalLink size={14} />
                    </a>
                  </div>
                </div>

                {/* Send Email Button */}
                <Button className="w-full gap-2" asChild>
                  <a href={`mailto:${contact.email}`}>
                    <Mail size={16} /> Send Message
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Shared GitHub Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="max-w-md mx-auto"
      >
        <Card className="bg-card/50 border-border/40 hover-elevate overflow-hidden">
          <CardHeader>
            <CardTitle style={{ fontFamily: 'var(--font-display)' }}>
              GitHub Repository
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
              <Github size={18} />
              <a
                href={sharedGithub}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium flex items-center gap-1"
              >
                SBTYS GitHub <ExternalLink size={14} />
              </a>
            </div>
          </CardContent>
        </Card>
      </motion.div>

    </div>
  );
}