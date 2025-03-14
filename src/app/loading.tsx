import { Container } from "@/components/layouts/container";
import { TextShimmerWave } from "@/components/ui/text-shimmer-wave";

export default function Loading() {
  return (
    <Container>
      <TextShimmerWave duration={0.5}>Loading...</TextShimmerWave>
    </Container>
  );
}
