import { Link } from "react-router-dom";
import Products from "../data/Products";

const FeaturedProducts = () => {
  const featured = Products.slice(0, 4); // Display only first 4 products
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center md:text-left">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {featured.map((product) => (
          <div 
            key={product.id} 
            className="bg-white flex flex-col justify-between shadow-md hover:shadow-lg p-4 sm:p-5 rounded-lg transition-shadow duration-300"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 sm:h-40 md:h-48 object-contain rounded-lg"
              />
            </div>
            <h3 className="text-base sm:text-lg font-semibold mt-3 sm:mt-4 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base mt-1">
              ${product.price}
            </p>
            <Link
              to={`/product/${product.id}`}
              className="block mt-3 sm:mt-4 bg-yellow-500 hover:bg-yellow-600 text-white text-center py-2 px-4 rounded-lg text-sm sm:text-base transition-colors duration-200"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts