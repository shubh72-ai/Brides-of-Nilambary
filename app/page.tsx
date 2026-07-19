import type { Metadata } from "next";
import { NilambaryExperience } from "./NilambaryExperience";

export const metadata: Metadata = {
  title: {
    absolute: "Brides of Nilambary | Luxury Bridal Artistry by Aiswarya",
  },
  description:
    "Luxury Indian and Maharashtrian bridal makeup, hairstyling, saree draping, jewellery styling, and wedding transformations by Brides of Nilambary.",
};

export default function Home() {
  return <NilambaryExperience />;
}
