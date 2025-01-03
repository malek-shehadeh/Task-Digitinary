// src/Components/Ecommerce/components/ProductCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Eye, Edit2, Trash2 } from "lucide-react";

// // Tooltip wrapper component
// const Tooltip = ({ text, children }) => (
//   <div className="relative group">
//     {children}
//     <div
//       className="absolute -bottom-10 left-1/2 transform -translate-x-1/2
//                     hidden group-hover:block bg-gray-800 text-white text-xs
//                     py-1 px-2 rounded whitespace-nowrap z-20"
//     >
//       {text}
//       {/* Tooltip arrow */}
//       <div
//         className="absolute -top-1 left-1/2 transform -translate-x-1/2
//                       border-4 border-transparent border-b-gray-800"
//       />
//     </div>
//   </div>
// );

const ProductCard = ({ product, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300";
          }}
        />
        {/* Action buttons overlay */}
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 rounded-lg p-1">
          <button
            onClick={() => navigate(`/ecommerce-manager/product/${product.id}`)}
            className="p-1.5 rounded-full hover:bg-blue-100 text-blue-600 transition-colors"
          >
            <Eye size={20} />
          </button>

          {isAuthenticated && (
            <>
              <button
                onClick={() => onEdit && onEdit(product)}
                className="p-1.5 rounded-full hover:bg-green-100 text-green-600 transition-colors"
              >
                <Edit2 size={20} />
              </button>

              <button
                onClick={() => onDelete && onDelete(product.id)}
                className="p-1.5 rounded-full hover:bg-red-100 text-red-600 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 truncate">{product.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </span>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            In Stock
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
