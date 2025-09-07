import Hero from "@/components/home/Hero";
import ProductList from "./products/page";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Link from "next/link";
import LatestProducts from "@/components/home/LatestProducts";

const Home = () => {
  return (
    <>
      <section>
        <Hero />
      </section>
      <section>
        <LatestProducts/>
      </section>
      <section>
        <WhyChooseUs />
      </section>
    </>
  );
};
export default Home;
