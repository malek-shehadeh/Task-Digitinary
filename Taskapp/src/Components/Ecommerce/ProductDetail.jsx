import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductById,
  clearSelectedProduct,
} from "../../Reducers/productSlice";
import { addToCart } from "../../Reducers/cartSlice";
import { Button } from "../../ui/index";
import TaskContext from "../../Context/TaskContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showToast } = useContext(TaskContext);
  const {
    selectedProduct: product,
    loading,
    error,
  } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    showToast(` added to cart successfully!`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-8">
        Error loading product: {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-8">
        <h2 className="text-xl">Product not found</h2>
        <Button
          variant="primary"
          className="mt-4"
          onClick={() => navigate("/ecommerce-manager")}
        >
          Back to Products
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <div className="mb-4">
            <img
              src={product.images[selectedImage]}
              alt={product.title}
              className="w-full h-96 object-cover rounded-lg"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/600";
              }}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.title} - ${index + 1}`}
                className={`w-20 h-20 object-cover rounded cursor-pointer ${
                  selectedImage === index ? "border-2 border-blue-500" : ""
                }`}
                onClick={() => setSelectedImage(index)}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/100";
                }}
              />
            ))}
          </div>
        </div>

        <div className="md:w-1/2">
          <Button
            variant="outline"
            className="mb-4"
            onClick={() => navigate("/ecommerce-manager")}
          >
            ← Back to Products
          </Button>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="mb-6">
            <span className="text-2xl font-bold text-green-500">
              {product.price}JD
            </span>
            {product.category && (
              <span className="ml-4 text-sm text-gray-500">
                Category: {product.category.name}
              </span>
            )}
          </div>
          {isAuthenticated ? (
            <Button
              variant="teal"
              className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          ) : (
            <Button
              variant="outline"
              className="w-full md:w-auto"
              onClick={() => navigate("/ecommerce-manager/login")}
            >
              Login to Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
