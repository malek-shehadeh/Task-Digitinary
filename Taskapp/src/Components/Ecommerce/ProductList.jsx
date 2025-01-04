// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProducts } from "../../../src/Reducers/productSlice";
// import { productService } from "../../services/api/productService";
// import ProductCard from "../Ecommerce/ProductCard";
// import ProductForm from "../Ecommerce/ProductForm";
// import { Button } from "../../ui/index";

// const ProductList = () => {
//   const dispatch = useDispatch();
//   const { products, loading, error } = useSelector((state) => state.products);
//   const { isAuthenticated } = useSelector((state) => state.auth);
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   const handleEdit = (product) => {
//     setEditingProduct(product);
//     setIsFormOpen(true);
//   };

//   const handleDelete = async (productId) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       try {
//         await productService.deleteProduct(productId);
//         dispatch(fetchProducts()); // Refresh the list after deletion
//       } catch (error) {
//         console.error("Failed to delete product:", error);
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[200px]">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center text-red-500 mt-8">
//         Error loading products: {error}
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">E-commerce Products</h1>
//         {isAuthenticated && (
//           <Button
//             variant="primary"
//             onClick={() => {
//               setEditingProduct(null);
//               setIsFormOpen(true);
//             }}
//           >
//             Add New Product
//           </Button>
//         )}
//       </div>

//       {isFormOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full">
//             <h2 className="text-xl font-bold mb-4">
//               {editingProduct ? "Edit Product" : "Add New Product"}
//             </h2>
//             <ProductForm
//               product={editingProduct}
//               onClose={() => {
//                 setIsFormOpen(false);
//                 setEditingProduct(null);
//               }}
//             />
//           </div>
//         </div>
//       )}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {products?.map((product) => (
//           <ProductCard
//             key={product.id}
//             product={product}
//             onEdit={handleEdit}
//             onDelete={handleDelete}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductList;
///////
// src/Components/Ecommerce/components/ProductList.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../../Reducers/productSlice";
import ProductCard from "../../Components/Ecommerce/ProductCard";
import ProductForm from "../../Components/Ecommerce/ProductForm";
import { Button } from "../../ui/index";
import { useTaskContext } from "../../hooks/useTaskContext";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { showToast } = useTaskContext();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await dispatch(deleteProduct(productId)).unwrap();
        showToast?.("Product deleted successfully", "success");
      } catch (error) {
        showToast?.(error.message || "Failed to delete product", "error");
      }
    }
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        {isAuthenticated && (
          <Button variant="primary" onClick={() => setIsFormOpen(true)}>
            Add New Product
          </Button>
        )}
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {selectedProduct ? "Edit Product" : "Add New Product"}
            </h2>
            <ProductForm product={selectedProduct} onClose={handleClose} />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
