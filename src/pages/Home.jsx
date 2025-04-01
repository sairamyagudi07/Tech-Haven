import Footer from "../components/Footer";
import Banner from "../components/Banner";
import FeaturedProducts from "../components/FeaturedProducts";
import BannerImage from "../assets/Bannerimage.png";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Banner
        imageUrl={BannerImage}
        title="Welcome To Tech Haven"
        subtitle="Find the best products at unbeatable prices"
        className="w-full object-cover md:h-[400px] sm:h-[300px] h-[200px]" // Ensures banner adapts well
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Responsive container */}
        <FeaturedProducts />
      </div>
      <Footer className="mt-8" /> {/* Adds spacing between sections */}
    </div>
  );
};

export default Home;
