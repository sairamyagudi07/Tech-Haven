import Footer from "../components/Footer";
import Banner from "../components/Banner";
import FeaturedProducts from "../components/FeaturedProducts";
import BannerImage from "../assets/Bannerimage.png";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Banner
        imageUrl={BannerImage}
        title={"Welcome To Tech Haven"}
        subtitle={"Find the best products at unbeatable prices"}
      />
      <FeaturedProducts />
      <Footer />
    </div>
  );
};

export default Home;
