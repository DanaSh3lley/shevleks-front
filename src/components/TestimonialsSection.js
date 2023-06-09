import React from "react";
import { Container, styled } from "@mui/system";
import { Typography } from "@mui/material";
import { Star, StarFilled } from "@carbon/icons-react";

const MainContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
}));

const TestimonialsSection = styled("section")({
  background: "rgba(86, 178, 128, 0.1)",
  padding: "80px",
  textAlign: "center",
});

const TestimonialsContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "start",
  gap: "20px",
  marginTop: "24px",
  width: "100%",
  backgroundColor: "white",
  padding: "60px 32px 40px",
});

const TestimonialContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  maxWidth: "400px",
});

const TestimonialText = styled(Typography)({
  fontSize: "22px",
  lineHeight: "29px",
  fontStyle: "italic",
  color: "#1D293F;",
});

const StarContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  marginBottom: "24px",
  color: "#56B280",
});

function Testimonials() {
  return (
    <TestimonialsSection>
      <MainContainer maxWidth="xl">
        <Typography variant="h4" color="#1D293F" gutterBottom>
          Відгуки
        </Typography>
        <Typography variant="h6">
          Some quotes from our happy customers
        </Typography>
        <TestimonialsContainer>
          <TestimonialContainer>
            <StarContainer>
              {[1, 2, 3, 4, 5].map((index) => (
                <StarFilled size={32} key={index} />
              ))}
            </StarContainer>
            <TestimonialText>
              “Дякую за швидке обслуговування і приємну комунікацію. Миючі
              засоби високої якості і дійсно добре відмивають.”
            </TestimonialText>
          </TestimonialContainer>
          <TestimonialContainer>
            <StarContainer>
              {[1, 2, 3, 4, 5].map((index) => (
                <StarFilled size={32} key={index} />
              ))}
            </StarContainer>
            <TestimonialText>
              “Цілком задоволений товаром. Відправили швидко (2-3 дні). Замовляв
              антижир, наліт іржу цвіль і для прочищення труб. Мені
              сподобалось.”
            </TestimonialText>
          </TestimonialContainer>
          <TestimonialContainer>
            <StarContainer>
              {[1, 2, 3, 4].map((index) => (
                <StarFilled size={32} key={index} />
              ))}
              <Star size={32} key={5} />
            </StarContainer>
            <TestimonialText>
              “Купляла для своєї бабусі. Нормальні ціни і хороший товар.”
            </TestimonialText>
          </TestimonialContainer>
        </TestimonialsContainer>
      </MainContainer>
    </TestimonialsSection>
  );
}

export default Testimonials;
