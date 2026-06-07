import AfterSalesSection from "../_components/home/AfterSalesSection";
import BrandsSection from "../_components/home/BrandsSection";
import FeaturedProducts from "../_components/home/FeaturedProducts";
import Hero from "../_components/home/Hero";


export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandsSection />
      <FeaturedProducts />
      <AfterSalesSection />
    </>
  );
}
