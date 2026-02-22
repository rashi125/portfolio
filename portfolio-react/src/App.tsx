import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Github, Mail, Code2, Database, Globe, Layers, X, MessageCircle, Download,Linkedin } from 'lucide-react';
import resumeData from './resume.json';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => { scrollToBottom(); }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('http://127.0.0.1:8000/chat', { message: input });
      setMessages(prev => [...prev, { role: 'assistant', content: res.data.response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting to my brain (backend). Check if it's running!" }]);
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen min-w-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30">
      
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-6 max-w-7xl mx-auto border-b border-slate-800/50">
        <div className="text-xl font-bold flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">R</div>
          Rashi.dev
        </div>
        <div className="flex gap-8 text-sm font-medium text-slate-400">
          <a href="https://www.linkedin.com/in/rashi-sahu-701b71320/" className="hover:text-blue-500 transition-colors flex items-center gap-1">
            <Linkedin size={16}/> LinkedIn
          </a>
          {/* <a href="#skills" className="hover:text-blue-500 transition-colors"></a> */}
          <a href="https://github.com/rashi125" className="hover:text-blue-500 transition-colors">  <Github size={16}/>Github</a>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-full text-xs hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20">
            <Download size={14}/> Download Resume
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="about" className="max-w-7xl mx-auto px-10 py-24 flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 space-y-6">
          <span className="bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-blue-500/20">Available for hire</span>
          <h1 className="text-7xl font-bold tracking-tight leading-tight">
            Hi, I’m a <span className="text-blue-500">Fresh Graduate</span>. Let my AI agent tell you more.
          </h1>
          <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
            I'm a passionate full-stack developer building modern, scalable web solutions. Skip the traditional CV—chat with my digital twin to explore my projects and experience.
          </p>
          <div className="flex gap-4 pt-4">
            <button onClick={() => setIsChatOpen(true)} className="bg-blue-600 text-white px-8 py-4 rounded-2xl hover:bg-blue-700 transition-all flex items-center gap-2 shadow-xl shadow-blue-600/20 group">
              <MessageCircle size={20} className="group-hover:rotate-12 transition-transform"/> Chat with my Resume
            </button>
            <button className="px-8 py-4 border border-slate-800 rounded-2xl hover:bg-slate-900 transition-all">View Projects</button>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="relative">
             <div className="absolute -inset-4 bg-blue-600/20 blur-3xl rounded-full"></div>
             <img src="https://via.placeholder.com/400" alt="Profile" className="relative w-80 h-96 object-cover rounded-[40px] border-2 border-slate-800 shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"/>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="max-w-7xl mx-auto px-10 py-20 border-t border-slate-800/50">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-2">Technical Skills</h2>
          <p className="text-slate-500 text-sm">The tools and technologies I use to bring ideas to life.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {icon: <Globe/>, title: "Frontend", desc: "React, Next.js, Tailwind, TypeScript"},
            {icon: <Database/>, title: "Backend", desc: "FastAPI, Python, Node.js, PostgreSQL"},
            {icon: <Layers/>, title: "DevOps", desc: "Docker, AWS, Git, CI/CD"},
            {icon: <Code2/>, title: "Languages", desc: "C++, Python, Java, JavaScript"}
          ].map((skill, i) => (
            <div key={i} className="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl hover:border-blue-500/50 transition-all group">
              <div className="bg-slate-800 w-12 h-12 rounded-xl flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                {skill.icon}
              </div>
              <h3 className="font-bold mb-2">{skill.title}</h3>
              <p className="text-sm text-slate-500">{skill.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI CHAT WIDGET */}
      <div className="fixed bottom-8 right-8 z-50">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div initial={{opacity:0, scale:0.9, y:20}} animate={{opacity:1, scale:1, y:0}} exit={{opacity:0, scale:0.9, y:20}} className="w-[400px] h-[550px] bg-slate-900 border border-slate-800 rounded-[32px] shadow-2xl flex flex-col overflow-hidden mb-6">
              <div className="p-6 bg-slate-800/50 border-b border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                   <span className="font-bold text-sm tracking-wide">AI Assistant</span>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="text-slate-400 hover:text-white"><X size={20}/></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}>
                      {m.content}
                    </div>
                  </div>
                ))}
                {loading && <div className="text-xs text-blue-500 animate-pulse font-medium">Assistant is thinking...</div>}
                <div ref={chatEndRef} />
              </div>
              <div className="p-6 pt-0">
                <div className="flex gap-2 items-center bg-slate-800 rounded-2xl p-2 px-4 border border-slate-700 focus-within:border-blue-500 transition-all">
                  <input className="flex-1 bg-transparent border-none outline-none text-sm py-2" placeholder="Ask me something..." value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()}/>
                  <button onClick={handleSend} className="bg-blue-600 p-2 rounded-xl text-white hover:bg-blue-700 transition-colors"><Send size={18}/></button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button onClick={() => setIsChatOpen(!isChatOpen)} className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 active:scale-95 transition-all">
          <MessageCircle size={30}/>
        </button>
      </div>

      <footer className="max-w-7xl mx-auto px-10 py-12 border-t border-slate-800/50 flex justify-between items-center text-slate-500 text-sm">
        <p>© 2026 Rohit Portfolio. Built with React & Python.</p>
        <div className="flex gap-6">
           <a href="#"><Github size={20}/></a>
           <a href="#"><Mail size={20}/></a>
        </div>
      </footer>
    </div>
  );
}

export default App;