"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { Study } from "../types";

export function useStudyNotifier(studies: Study[], fetchStudies: () => void) {
    const playNotificationSound = () => {
        try {
            const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
            if (!AudioContextClass) return;
            
            const audioContext = new AudioContextClass();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.type = "sine";
            oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // higher pitch
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);

            oscillator.start();
            oscillator.stop(audioContext.currentTime + 2);
        } catch (e) {
            console.error("Failed to play notification sound:", e);
        }
    };

    useEffect(() => {
        let eventSource: EventSource | null = null;
        let reconnectTimeout: any = null;

        const connect = () => {
            console.log("SSE: Attempting to connect...");
            eventSource = new EventSource("/api/events");

            eventSource.onopen = () => {
                console.log("SSE: Connection established.");
            };

            eventSource.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    console.log("SSE: Event received:", data);
                    
                    fetchStudies();
                    playNotificationSound();
                    
                    toast.success("Study Baru Diterima", {
                        description: "Halaman diperbarui otomatis.",
                        duration: 5000,
                        id: "new-study-toast"
                    });
                } catch (error) {
                    console.error("SSE: Error parsing data:", error);
                }
            };

            eventSource.onerror = (error) => {
                console.error("SSE: Connection error:", error);
                if (eventSource) eventSource.close();
                
                // Try to reconnect after 3 seconds
                reconnectTimeout = setTimeout(() => {
                    connect();
                }, 3000);
            };
        };

        connect();

        return () => {
            if (eventSource) eventSource.close();
            if (reconnectTimeout) clearTimeout(reconnectTimeout);
        };
    }, [fetchStudies]);
}
