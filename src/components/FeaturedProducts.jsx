import { Link } from "react-router-dom";
import Products from "../data/Products";

const FeaturedProducts = () => {
  const featured = Products.slice(0, 4); // Display only first 4 products

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {featured.map((product) => (
          <div key={product.id} className="bg-white shadow-lg p-4 rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-contain rounded-lg"
            />
            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
            <p className="text-gray-500">${product.price}</p>
            <Link
              to={`/product/${product.id}`}
              className="block mt-2 bg-yellow-500 text-white text-center py-2 rounded"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
