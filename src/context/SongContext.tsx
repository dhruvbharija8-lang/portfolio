"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";

export type Song = {
    id: string;
    title: string;
    artist: string;
    src: string;
    theme: string;
    image: string;
    about: string;
    profile_image?: string;
};

const songs: Song[] = [
    {
        id: "udaarian",
        title: "starboy",
        artist: "The Weekend",
        src: "/songs/starboy.mp3",
        theme: "udaarian",
        image: "/album-art/starboy.jpg",
        about: "https://www.youtube.com/results?search_query=udaarian+satinder+sartaj",
        profile_image: "/prof-photo/dhruv.jpeg",
    },
    {
        id: "tu-aake-dekhle",
        title: "Tu Aake Dekhle",
        artist: "King",
        src: "/songs/aake.mp3",
        theme: "tu-aake-dekhle",
        image: "/album-art/aake.jpg",
        about: "https://www.youtube.com/results?search_query=tu+aake+dekhle+king",
        profile_image: "/prof-photo/p1.jpeg",
    },
    {
        id: "wdtbu",
        title: "Night Changes",
        artist: "One Direction",
        src: "/songs/night-changes.mp3",
        theme: "wdtbu",
        image: "/album-art/night-changes.jpg",
        about: "https://www.youtube.com/results?search_query=wdtbu+karma",
        profile_image: "/prof-photo/p2.jpeg",
    },

    {
        id: "duniya-makkar",
        title: "co2",
        artist: "Prateek Khulad",
        src: "/songs/co2.mp3",
        theme: "duniya-makkar",
        image: "/album-art/co2.jpg",
        about: "https://www.youtube.com/results?search_query=duniya+makkar+karma",
        profile_image: "/prof-photo/p3.jpeg",
    },
        {
        id: "1se23",
        title: "1-se-23",
        artist: "Karma",
        src: "/songs/1.mp3",
        theme: "1se23",
        image: "/album-art/2.jpg",
        about: "https://www.youtube.com/results?search_query=duniya+makkar+karma",
        profile_image: "/prof-photo/dhruv.jpeg",
    },

];

interface SongContextType {
    currentSong: Song;
    isPlaying: boolean;
    togglePlay: () => void;
    playNext: () => void;
    playPrev: () => void;
    isInitialized: boolean;
    currentTime: number;
    duration: number;
    isMuted: boolean;
    toggleMute: () => void;
    volume: number;
    setVolume: (volume: number) => void;
    seek: (time: number) => void;
    songs: Song[];
    playSong: (index: number) => void;
}

const SongContext = createContext<SongContextType | undefined>(undefined);

export function SongProvider({ children }: { children: React.ReactNode }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolumeState] = useState(1);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const currentSong = songs[currentIndex];

    useEffect(() => {
        setIsInitialized(true);

        // Load currentIndex from localStorage after hydration (client-side only)
        const saved = localStorage.getItem("currentSongIndex");
        if (saved !== null) {
            const index = parseInt(saved, 10);
            if (!isNaN(index) && index >= 0 && index < songs.length) {
                setCurrentIndex(index);
            }
        }

        // Cleanup function for the audio element when the component unmounts
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []); // Empty dependency array means this runs once on mount

    // This effect runs when currentIndex changes (including initial load from localStorage)
    useEffect(() => {
        // Save current song to localStorage
        localStorage.setItem("currentSongIndex", currentIndex.toString());

        // Initialize audioRef.current if it's null (first time this effect runs after initial mount)
        if (!audioRef.current) {
            audioRef.current = new Audio(songs[currentIndex].src);
            audioRef.current.loop = false;
            audioRef.current.addEventListener("ended", () => {
                playNext();
            });
            audioRef.current.addEventListener("timeupdate", () => {
                setCurrentTime(audioRef.current?.currentTime || 0);
            });
            audioRef.current.addEventListener("loadedmetadata", () => {
                setDuration(audioRef.current?.duration || 0);
            });
        }

        // Update theme when song changes
        const htmlElement = document.documentElement;
        htmlElement.classList.add("transition-theme");
        htmlElement.setAttribute("data-theme", songs[currentIndex].theme);
        
        // Remove transition class after animation completes
        setTimeout(() => {
            htmlElement.classList.remove("transition-theme");
        }, 600);

        // Update audio source if it changed
        if (audioRef.current && audioRef.current.src !== window.location.origin + songs[currentIndex].src) {
            const wasPlaying = isPlaying;
            audioRef.current.src = songs[currentIndex].src;
            audioRef.current.currentTime = 0; // Reset time on song change
            if (wasPlaying) {
                audioRef.current.play().catch(e => console.log("Playback failed", e));
            }
        }
    }, [currentIndex]); // Rerun when currentIndex changes

    // Handle Play/Pause
    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(e => {
                    console.log("Autoplay prevented", e);
                    setIsPlaying(false);
                });
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    // Handle Mute
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = isMuted;
        }
    }, [isMuted]);

    // Handle Volume
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const togglePlay = () => setIsPlaying(!isPlaying);

    const toggleMute = () => setIsMuted(!isMuted);

    const setVolume = (newVolume: number) => {
        const clampedVolume = Math.max(0, Math.min(1, newVolume));
        setVolumeState(clampedVolume);
        if (clampedVolume > 0 && isMuted) {
            setIsMuted(false);
        }
    };

    const seek = (time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const playNext = () => {
        setCurrentIndex((prev) => (prev + 1) % songs.length);
        setIsPlaying(true);
    };

    const playPrev = () => {
        if (audioRef.current && audioRef.current.currentTime > 5) {
            audioRef.current.currentTime = 0;
            setCurrentTime(0);
        } else {
            setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
        }
        setIsPlaying(true);
    };

    const playSong = (index: number) => {
        if (index >= 0 && index < songs.length) {
            setCurrentIndex(index);
            setIsPlaying(true);
        }
    };

    return (
        <SongContext.Provider value={{
            currentSong,
            isPlaying,
            togglePlay,
            playNext,
            playPrev,
            isInitialized,
            currentTime,
            duration,
            isMuted,
            toggleMute,
            volume,
            setVolume,
            seek,
            songs,
            playSong
        }}>
            {children}
        </SongContext.Provider>
    );
}

export function useSong() {
    const context = useContext(SongContext);
    if (context === undefined) {
        throw new Error("useSong must be used within a SongProvider");
    }
    return context;
}
