import { styled } from "@mui/system";
import HeroSection from "../components/HeroSection";
import ProductsSection from "../components/ProductsSection";
import Testimonials from "../components/TestimonialsSection";

const SectionWrapper = styled("div")({
  marginTop: "40px",
  marginBottom: "40px",
});

function Landing() {
  return (
    <>
      <SectionWrapper>
        <HeroSection />
      </SectionWrapper>
      <SectionWrapper>
        <ProductsSection />
      </SectionWrapper>
      <SectionWrapper>
        <Testimonials />
      </SectionWrapper>
    </>
  );
}

export default Landing;
