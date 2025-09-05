import Hero from "@/components/Hero";
import ProductList from "./products/page";
import WhyChooseUs from "@/components/WhyChooseUs";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <section>
        <Hero />
      </section>
      <section>
        <ProductList />
        <Link
          href={"/products"}
          className="bg-[#009688] block max-w-[200px] text-center mx-auto hover:bg-teal-600  text-white px-6 py-2 rounded-xl text-lg"
        >
          View More
        </Link>
      </section>
      <section>
        <WhyChooseUs />
      </section>
    </>
  );
};
export default Home;
