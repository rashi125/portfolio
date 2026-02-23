import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Github,
  Mail,
  Code2,
  Database,
  Globe,
  Settings,
  X,
  MessageCircle,
  Download,
  Linkedin,
  ExternalLink,
  Award,
  Terminal,
  Bot
} from "lucide-react";

const projects = [
  {
    title: "Akshar Mitra",
    desc: "AI-Assisted Dyslexia Detection Platform. Integrated multimodal framework for early screening.",
    tech: ["React", "FastAPI", "MongoDB"],
    link: "https://github.com/rashi125/Akshar",
    deployed: "https://lnkd.in/eDMfgyYP",
    badge: "Hackathon Winner 🏆",
    isFeatured: true,
    highlight: "SCIE Publication"
  },
  {
    title: "Chicago Table Data",
    desc: "Real-time data fetching from Chicago API with server-side navigation and PrimeReact UI.",
    tech: ["PrimeReact", "REST API", "JavaScript"],
    link: "https://github.com/rashi125/PrimeReact-project", 
    deployed: "https://primereact-project-1.onrender.com/",
    badge: "API Integration"
  },
  {
    title: "Mental Health Platform",
    desc: "Modular UI components with Firebase auth and real-time database focus on user accessibility and ai chatbot integration",
    tech: ["React", "TypeScript", "Firebase", "Python"],
    link: "https://github.com/Shiva-005/The-Beacons-A-Clear-Path-in-Uncertain-times.git",
    badge: "Healthcare"
  },
  {
    title: "Job Search Platform",
    desc: "Developed job listing pages with complex state management, search, and sorting filters.",
    tech: ["React", "TypeScript", "Firebase", "Python"],
    link: "https://github.com/rashi125/job",
    badge: "Job Board"
  },
  {
    title: "Two Good Co Clone",
    desc: "High-performance GSAP clone focusing on smooth scrolling and creative UI interactions.",
    tech: ["GSAP", "Locomotive.js", "JavaScript"],
    link: "https://github.com/rashi125/TWO-GOOD-CO",
    deployed: "https://two-good-co-7bfk.onrender.com",
    badge: "Frontend Clone"
  },
  {
    title: "Bubble Game",
    desc: "Interactive browser-based logic game built to master DOM manipulation and timing logic.",
    tech: ["JavaScript", "HTML5", "CSS3"],
    link: "https://github.com/rashi125/Bubble-Game",
    deployed: "https://bubble-game-5ouz.onrender.com",
    badge: "JS Logic"
  }
];

// Typing Effect Component
const TypingText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("");
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayText}</span>;
};

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => { scrollToBottom(); }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    setLoading(true);
    try {
      const res = await axios.post("https://portfolio-backend-qk8x.onrender.com/chat", { message: input });
      setMessages((prev) => [...prev, { role: "assistant", content: res.data.response }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Backend error! Is main.py running?" }]);
    } finally { setLoading(false); }
  };

  // Animation Variants for Staggered Loading
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={containerVariants}
      className="min-h-screen min-w-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden"
    >
      {/* NAVBAR */}
      <motion.nav variants={itemVariants} className="flex justify-between items-center px-10 md:px-20 py-6 max-w-7xl mx-auto border-b border-slate-800/50">
        <div className="text-xl font-bold flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg">R</div>
          <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent italic tracking-tight">Rashi.dev</span>
        </div>
        <div className="flex items-center gap-6 md:gap-8 text-sm font-medium text-slate-400">
          <a href="https://www.linkedin.com/in/rashi-sahu-701b71320/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-all flex items-center gap-1.5 group">
            <Linkedin size={16} className="group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
          <a href="https://github.com/rashi125" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-all flex items-center gap-1.5 group">
            <Github size={16} className="group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Github</span>
          </a>
          <button onClick={() => window.open("/resume.pdf", "_blank")} className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-blue-700 transition-all flex items-center gap-2 active:scale-95">
            <Download size={14} /> Resume
          </button>
        </div>
      </motion.nav>

      {/* HERO SECTION */}
      <motion.section variants={itemVariants} id="about" className="max-w-7xl mx-auto px-10 py-24 flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <span className="bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-blue-500/20 uppercase">Available for hire</span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            <TypingText text="Hi, I’m" /> <span className="text-blue-500 italic"><TypingText text="Rashi Sahu" /></span>.
          </h1>
          <p className="text-lg text-slate-400 max-w-xl leading-relaxed mx-auto md:mx-0">
            <TypingText text="Full-stack developer and published researcher (CGPA: 8.58). I build scalable solutions and AI experiences." />
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
            <button onClick={() => setIsChatOpen(true)} className="bg-blue-600 text-white px-8 py-4 rounded-2xl hover:bg-blue-700 transition-all flex items-center gap-2 shadow-xl shadow-blue-600/20 group">
              <MessageCircle size={20} className="group-hover:rotate-12 transition-transform" /> Chat with AI
            </button>
            <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 border border-slate-800 rounded-2xl hover:bg-slate-900 transition-all">
              View Projects
            </button>
          </div>
        </div>
        <div className="flex-1 flex justify-center relative">
            <div className="absolute -inset-10 bg-blue-600/10 blur-[100px] rounded-full"></div>
            {/* <img src="/rashi-profile.jpg" alt="Rashi" className="relative w-72 h-80 object-cover rounded-[3rem] border-2 border-slate-800 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" /> */}
        </div>
      </motion.section>

      {/* SKILLS SECTION */}
      <motion.section variants={itemVariants} id="skills" className="max-w-7xl mx-auto px-10 py-20 border-t border-slate-800/50">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: <Globe />, title: "Frontend", desc: "React, GSAP, Locomotive, Tailwind" },
            { icon: <Settings />, title: "Backend", desc: "Node.js, FastAPI, Firebase, REST" },
            { icon: <Database />, title: "Database", desc: "MongoDB, MySQL, PostgreSQL" },
            { icon: <Code2 />, title: "Languages", desc: "Python, C++, JS, SQL, R" },
          ].map((skill, i) => (
            <div key={i} className="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl hover:border-blue-500/50 transition-all group">
              <div className="bg-slate-800 w-12 h-12 rounded-xl flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">{skill.icon}</div>
              <h3 className="font-bold mb-2 text-slate-100">{skill.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{skill.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* PROJECTS GRID */}
      <motion.section variants={itemVariants} id="projects" className="max-w-7xl mx-auto px-10 py-24 border-t border-slate-800/50">
        <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent italic">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <div key={i} className="group bg-slate-900/40 border border-slate-800 rounded-[2.5rem] overflow-hidden hover:border-blue-500/50 transition-all duration-300">
              {p.isFeatured && (
                <div className="h-52 bg-slate-800 relative overflow-hidden">
                  <img src="/akshar.jpeg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Akshar Mitra" />
                  <div className="absolute top-4 left-4 bg-blue-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">{p.badge}</div>
                </div>
              )}
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-white tracking-tight">{p.title}</h3>
                  <div className="flex gap-4">
                    {p.deployed && <a href={p.deployed} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-white transition-colors"><Terminal size={20} /></a>}
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors"><ExternalLink size={20} /></a>
                  </div>
                </div>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed line-clamp-2">{p.desc}</p>
                {p.highlight && <div className="flex items-center gap-2 text-[10px] text-blue-400 mb-4 font-bold tracking-widest uppercase"><Award size={14}/> {p.highlight}</div>}
                <div className="flex flex-wrap gap-2">
                  {p.tech.map((t, idx) => (
                    <span key={idx} className="text-[9px] px-2.5 py-1 bg-slate-800 rounded-lg text-slate-300 font-bold border border-slate-700/50 uppercase tracking-tighter">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* AI CHAT MASCOT (RASHI'S DIGITAL TWIN) */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="w-[350px] sm:w-[400px] h-[500px] bg-slate-900 border border-slate-800 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden mb-6">
              <div className="p-6 bg-slate-800/50 border-b border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-3"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div><span className="font-bold text-sm tracking-wide uppercase italic">Rashi AI Twin</span></div>
                <button onClick={() => setIsChatOpen(false)} className="text-slate-400 hover:text-white"><X size={20} /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide text-sm">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] p-4 rounded-2xl ${m.role === "user" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300 border border-slate-700"}`}>{m.content}</div>
                  </div>
                ))}
                {loading && <div className="text-xs text-blue-500 animate-pulse italic">Rashi is thinking...</div>}
                <div ref={chatEndRef} />
              </div>
              <div className="p-6 pt-0">
                <div className="flex gap-2 items-center bg-slate-800 rounded-2xl p-2 px-4 border border-slate-700 focus-within:border-blue-500">
                  <input className="flex-1 bg-transparent outline-none text-sm py-2" placeholder="Ask about my research..." value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleSend()} />
                  <button onClick={handleSend} className="bg-blue-600 p-2 rounded-xl text-white"><Send size={18} /></button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* MASCOT BUTTON */}
        <button onClick={() => setIsChatOpen(!isChatOpen)} className="group w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 active:scale-95 transition-all">
          <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <Bot size={35} />
          </motion.div>
        </button>
      </div>

      <footer className="max-w-7xl mx-auto px-10 py-12 border-t border-slate-800/50 text-center text-slate-500 text-[9px] tracking-[0.2em] uppercase">
        <p>© 2026 Rashi Sahu. Built with React, Python & Passion.</p>
      </footer>
    </motion.div>
  );
}

export default App;