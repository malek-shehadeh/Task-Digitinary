import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Eye, Edit2, Trash2 } from "lucide-react";

const ProductCard = ({ product, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 relative">
      <div className="aspect-square relative overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300";
          }}
        />

        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center gap-3 opacity-0 hover:opacity-100">
          <button
            onClick={() => navigate(`/ecommerce-manager/product/${product.id}`)}
            className="p-2 bg-white rounded-full hover:bg-blue-50 text-blue-600 transform hover:scale-110 transition-all duration-300"
            title="View Details"
          >
            <Eye size={20} />
          </button>

          {isAuthenticated && (
            <>
              <button
                onClick={() => onEdit && onEdit(product)}
                className="p-2 bg-white rounded-full hover:bg-green-50 text-green-600 transform hover:scale-110 transition-all duration-300"
                title="Edit Product"
              >
                <Edit2 size={20} />
              </button>
              <button
                onClick={() => onDelete && onDelete(product.id)}
                className="p-2 bg-white rounded-full hover:bg-red-50 text-red-600 transform hover:scale-110 transition-all duration-300"
                title="Delete Product"
              >
                <Trash2 size={20} />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="absolute top-2 left-2 bg-white px-3 py-1 rounded-full shadow-md">
          <span className="text-lg font-bold text-blue-600">
            {product.price.toFixed(2)}JD
          </span>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">
            {product.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full">
            In Stock
          </span>
          <span className="text-gray-500 text-sm">
            Category: {product.category?.name || "General"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
