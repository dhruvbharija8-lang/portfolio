"use client";

import { getAboutData, getCurrentlyLearningData } from "@/lib/data";
import { motion } from "framer-motion";
import { FiTerminal, FiLock, FiDownload, FiZap, FiCode } from "react-icons/fi";
import { useSong } from "@/context/SongContext";
import { techStackData, toolkitData } from "@/lib/icons";

export default function AboutSection() {
    const about = getAboutData();
    const learning = getCurrentlyLearningData();
    const { currentSong } = useSong();

    return (
        <section id="about" className="w-full min-h-screen flex flex-col justify-center py-8 px-4 sm:px-6 md:px-8 lg:px-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-7xl mx-auto space-y-8 sm:space-y-10"
            >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold flex items-center gap-3">
                    About Me
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
                    {/* Left Column: Bio & Terminal - spans 2 cols on desktop */}
                    <div className="md:col-span-2 space-y-6 sm:space-y-8">
                        <div className="prose prose-sm sm:prose-base md:prose-lg dark:prose-invert text-muted-foreground leading-relaxed">
                            <p>{about?.bio || "Loading bio..."}</p>
                        </div>

                        {/* Terminal Component (Visual Balance) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: false }}
                            transition={{ delay: 0.1, duration: 0.3 }}
                            className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg sm:rounded-xl overflow-hidden shadow-xl font-mono text-xs sm:text-sm"
                        >
                            <div className="bg-white/5 px-3 sm:px-4 py-2 border-b border-white/10 flex items-center gap-2">
                                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
                                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500" />
                                <span className="ml-2 text-[10px] sm:text-xs text-muted-foreground">Dhruv@portfolio:~$</span>
                            </div>
                            <div className="p-2 sm:p-4 space-y-1 sm:space-y-2 text-muted-foreground">
                                <div>
                                    <span className="text-green-500">➜</span> <span className="text-blue-500">~</span> <span className="text-primary">neofetch</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-[80px_1fr] md:grid-cols-[100px_1fr] gap-2 sm:gap-4 pt-2">
                                    <div className="text-primary flex items-center justify-start sm:justify-center text-2xl sm:text-4xl">
                                        <FiTerminal />
                                    </div>
                                    <div className="space-y-0.5 sm:space-y-1 text-[10px] sm:text-xs">
                                        <p><span className="font-bold text-primary">OS</span>: Linux x86_64</p>
                                        <p><span className="font-bold text-primary">Host</span>: Dhruv&apos;s Portfolio</p>
                                        <p><span className="font-bold text-primary">Uptime</span>: Till the coffee runs out</p>
                                        <p><span className="font-bold text-primary">Shell</span>: zsh 5.9</p>
                                        <p><span className="font-bold text-primary">Song Playing</span>: <span suppressHydrationWarning>{currentSong.title}</span></p>
                                        <p><span className="font-bold text-primary">Artist</span>: <span suppressHydrationWarning>{currentSong.artist}</span></p>
                                    </div>
                                </div>
                                <div className="pt-2 animate-pulse">
                                    <span className="text-green-500">➜</span> <span className="text-blue-500">~</span> <span className="inline-block w-2 h-4 bg-primary align-middle ml-1" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Open to Work Section - Redesigned */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ delay: 0.2, duration: 0.3 }}
                            className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all"
                        >
                            <div className="flex flex-col gap-4 sm:gap-6 items-start md:items-center md:flex-row md:justify-between">
                                <div className="space-y-3 sm:space-y-4 flex-1">
                                    <div className="flex items-center gap-3">
                                        <span className="relative flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                        </span>
                                        <h3 className="font-bold text-lg sm:text-xl flex items-center gap-2">
                                            Hire Me As:
                                        </h3>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {["Backend Engineer", "ML Intern", "Researcher"].map((role) => (
                                            <span
                                                key={role}
                                                className="px-3 py-1 bg-white/10 text-foreground rounded-full text-xs sm:text-sm font-medium border border-white/10"
                                            >
                                                {role}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col items-stretch md:items-center gap-2 sm:gap-3 w-full md:w-auto">
                                    <a
                                        href="https://drive.google.com/file/d/1ZqJ-rv3XbIrpQYSn-pjcPFUmUZsz55MQ/view?usp=drive_link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-bold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/20 whitespace-nowrap text-sm sm:text-base"
                                    >
                                        <FiDownload /> Download Resume
                                    </a>
                                    <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5">
                                        <FiZap className="fill-current" />
                                        Rapid Learner
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Tech Stack & Toolkit */}
                    <div className="md:col-span-1 space-y-8 sm:space-y-10">
                        {/* Tech Stack */}
                        <div className="space-y-3 sm:space-y-4">
                            <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                                <FiCode className="text-primary" /> Tech Stack
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                                    {techStackData.map((stack, idx) => (
                                    <motion.div
                                        key={stack.category}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: false }}
                                        transition={{ delay: idx * 0.05, duration: 0.3 }}
                                        className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-3 hover:border-primary/30 transition-colors shadow-lg"
                                    >
                                        <h4 className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">{stack.category}</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {stack.items.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`text-lg transition-transform hover:scale-110 ${item.color}`}
                                                    title={item.name}
                                                >
                                                    <item.icon />
                                                </a>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Toolkit */}
                        <div className="space-y-3 sm:space-y-4">
                            <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                                <FiTerminal className="text-primary" /> Toolkit
                            </h3>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{ delay: 0.1, duration: 0.3 }}
                                className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 flex items-center justify-center shadow-xl"
                            >
                                <div className="flex gap-2 sm:gap-3 flex-wrap justify-center">
                                    {toolkitData.map((tool, idx) => (
                                        <motion.a
                                            key={tool.name}
                                            href={tool.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            initial={{ opacity: 0, scale: 0 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: false }}
                                            transition={{ delay: 0.2 + (idx * 0.05), duration: 0.3 }}
                                            className="group relative flex flex-col items-center gap-1"
                                        >
                                            <div className={`text-xl sm:text-2xl transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110 ${tool.color}`}>
                                                <tool.icon />
                                            </div>
                                            <span className="absolute -bottom-6 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-medium bg-foreground text-background px-2 py-0.5 rounded whitespace-nowrap pointer-events-none z-10">
                                                {tool.name}
                                            </span>
                                        </motion.a>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Currently Locked On */}
                        <div className="space-y-3 sm:space-y-4">
                            <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2 text-primary">
                                <FiLock /> Currently Locked On
                            </h3>
                            <div className="space-y-2">
                                {learning?.items.map((item: string, index: number) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: false }}
                                        transition={{ delay: 0.2 + (index * 0.05), duration: 0.3 }}
                                        className="backdrop-blur-md bg-white/5 border border-white/10 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium shadow-sm"
                                    >
                                        {item}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
