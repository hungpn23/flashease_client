"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface SoundContextType {
  successSound: HTMLAudioElement | null;
  finishSound: HTMLAudioElement | null;
  isSoundEnabled: boolean;
  handleSoundToggle: (checked: boolean) => void;
  playWordPronunciation: (word: string) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  const [successSound, setSuccessSound] = useState<HTMLAudioElement | null>(
    null,
  );
  const [finishSound, setFinishSound] = useState<HTMLAudioElement | null>(null);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  useEffect(() => {
    const success = new Audio("/sound/success.mp3");
    const finish = new Audio("/sound/finish.mp3");
    setSuccessSound(success);
    setFinishSound(finish);

    return () => {
      success.pause();
      finish.pause();
    };
  }, []);

  useEffect(() => {
    const soundEffect = localStorage.getItem("sound_effect");
    const initialSoundEnabled =
      soundEffect !== null ? soundEffect === "true" : true;
    setIsSoundEnabled(initialSoundEnabled);
    if (soundEffect === null) {
      localStorage.setItem("sound_effect", "true");
    }
  }, []);

  const handleSoundToggle = useCallback((checked: boolean) => {
    setIsSoundEnabled(checked);
    localStorage.setItem("sound_effect", checked.toString());
  }, []);

  const playWordPronunciation = useCallback(
    (word: string, lang: string = "en-US") => {
      if (!isSoundEnabled) return;
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = lang;
      window.speechSynthesis.speak(utterance);
    },
    [isSoundEnabled],
  );

  // Memoize context value để tránh re-render không cần thiết
  const contextValue = useMemo(
    () => ({
      successSound,
      finishSound,
      isSoundEnabled,
      handleSoundToggle,
      playWordPronunciation,
    }),
    [
      successSound,
      finishSound,
      isSoundEnabled,
      handleSoundToggle,
      playWordPronunciation,
    ],
  );

  return (
    <SoundContext.Provider value={contextValue}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSoundEffect = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSoundEffect must be used within a SoundProvider");
  }
  return context;
};
