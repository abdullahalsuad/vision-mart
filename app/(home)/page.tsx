import Hero from "@/components/home/Hero";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import LatestProducts from "@/components/home/LatestProducts";
import ReviewSlider from "@/components/home/ReviewSlider";

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
      <section>
        <ReviewSlider />
      </section>
    </>
  );
};
export default Home;
