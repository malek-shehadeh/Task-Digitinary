import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../../Reducers/productSlice";
import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";
import Alert from "../../ui/Alert";
import { Button } from "../../ui/index";
import { useTaskContext } from "../../hooks/useTaskContext";
import { PlusCircle } from "lucide-react";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { showToast } = useTaskContext();

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (productId) => {
    setProductToDelete(productId);
    setIsAlertOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await dispatch(deleteProduct(productToDelete)).unwrap();
      showToast?.("Product deleted successfully", "success");
    } catch (error) {
      showToast?.(error.message || "Failed to delete product", "error");
    }
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 ">Products</h1>
            </div>
            {isAuthenticated && (
              <Button
                variant="primary"
                onClick={() => setIsFormOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transform transition-transform hover:scale-105"
              >
                <PlusCircle size={20} />
                <span>Add New Product</span>
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>

        {isFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  {selectedProduct ? "Edit Product" : "Add New Product"}
                </h2>
                <button
                  onClick={handleClose}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  ×
                </button>
              </div>
              <ProductForm product={selectedProduct} onClose={handleClose} />
            </div>
          </div>
        )}

        <Alert
          isOpen={isAlertOpen}
          onClose={() => {
            setIsAlertOpen(false);
            setProductToDelete(null);
          }}
          onConfirm={handleDeleteConfirm}
        />
      </div>
    </div>
  );
};

export default ProductList;
