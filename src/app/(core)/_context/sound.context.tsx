"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
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
    setSuccessSound(new Audio("/sound/success.mp3"));
    setFinishSound(new Audio("/sound/finish.mp3"));
  }, []);

  useEffect(() => {
    const soundEffect = localStorage.getItem("sound_effect");
    if (soundEffect !== null) {
      setIsSoundEnabled(soundEffect === "true");
    } else {
      setIsSoundEnabled(true);
      localStorage.setItem("sound_effect", "true");
    }
  }, []);

  const handleSoundToggle = (checked: boolean) => {
    setIsSoundEnabled(checked);
    localStorage.setItem("sound_effect", checked.toString());
  };

  const playWordPronunciation = (word: string, lang: string = "en-US") => {
    if (isSoundEnabled) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = lang; // Ngôn ngữ phát âm (có thể thay đổi)
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <SoundContext.Provider
      value={{
        successSound,
        finishSound,
        isSoundEnabled,
        handleSoundToggle,
        playWordPronunciation,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSoundEffect = () => {
  const context = useContext(SoundContext);
  if (!context) throw new Error("useSound must be used within a SoundProvider");

  return context;
};
