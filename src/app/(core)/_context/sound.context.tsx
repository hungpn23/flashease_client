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

  // Khởi tạo audio objects một lần duy nhất
  useEffect(() => {
    const success = new Audio("/sound/success.mp3");
    const finish = new Audio("/sound/finish.mp3");
    setSuccessSound(success);
    setFinishSound(finish);

    // Cleanup để tránh memory leak
    return () => {
      success.pause();
      finish.pause();
    };
  }, []);

  // Đồng bộ trạng thái âm thanh với localStorage
  useEffect(() => {
    const soundEffect = localStorage.getItem("sound_effect");
    const initialSoundEnabled =
      soundEffect !== null ? soundEffect === "true" : true;
    setIsSoundEnabled(initialSoundEnabled);
    if (soundEffect === null) {
      localStorage.setItem("sound_effect", "true");
    }
  }, []);

  // Xử lý toggle âm thanh
  const handleSoundToggle = useCallback((checked: boolean) => {
    setIsSoundEnabled(checked);
    localStorage.setItem("sound_effect", checked.toString());
  }, []);

  // Phát âm thanh từ
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

// Custom hook để sử dụng context
export const useSoundEffect = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSoundEffect must be used within a SoundProvider");
  }
  return context;
};
