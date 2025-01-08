import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../../Reducers/productSlice";
import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";
import Alert from "../../ui/Alert";
import { Button } from "../../ui/index";
import { useTaskContext } from "../../hooks/useTaskContext";
import { PlusCircle } from "lucide-react";
import SearchBar from "../../ui/SearchBar";
import Pagination from "../../ui/Pagination";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { showToast } = useTaskContext();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // search and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

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
        Error loading products: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Products</h1>
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <SearchBar
                searchTerm={searchTerm}
                onSearch={setSearchTerm}
                onClear={() => setSearchTerm("")}
              />
              {isAuthenticated && (
                <Button
                  variant="primary"
                  onClick={() => setIsFormOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-600 text-white transform transition-transform hover:scale-105 whitespace-nowrap"
                >
                  <PlusCircle size={22} />
                  <span>Add New Product</span>
                </Button>
              )}
            </div>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            No products found matching your search.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEdit}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}

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
