import { SoundProvider } from "./_context/sound.context";

export default function CoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SoundProvider>{children}</SoundProvider>;
}
