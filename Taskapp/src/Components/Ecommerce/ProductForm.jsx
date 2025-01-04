// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { addProduct, updateProduct } from "../../../src/Reducers/productSlice";
// import { FormField, Button } from "../../ui/index";

// const ProductForm = ({ product, onClose }) => {
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState({
//     title: "",
//     price: "",
//     description: "",
//     categoryId: 1,
//     images: [""],
//   });

//   // Load product data when editing
//   useEffect(() => {
//     if (product) {
//       setFormData({
//         title: product.title || "",
//         price: product.price || "",
//         description: product.description || "",
//         categoryId: product.category?.id || 1,
//         images: Array.isArray(product.images)
//           ? product.images
//           : [product.images],
//       });
//     }
//   }, [product]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === "price" ? parseFloat(value) || value : value,
//     }));
//   };

//   const handleImageChange = (index, value) => {
//     const newImages = [...formData.images];
//     newImages[index] = value;
//     setFormData((prev) => ({
//       ...prev,
//       images: newImages,
//     }));
//   };

//   const addImageField = () => {
//     setFormData((prev) => ({
//       ...prev,
//       images: [...prev.images, ""],
//     }));
//   };

//   const removeImageField = (index) => {
//     if (formData.images.length > 1) {
//       setFormData((prev) => ({
//         ...prev,
//         images: prev.images.filter((_, i) => i !== index),
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Clean up images array - remove empty strings and extract URLs
//       const cleanImages = formData.images
//         .filter((img) => img && img.trim() !== "")
//         .map((img) => img.trim());

//       const productData = {
//         ...formData,
//         images: cleanImages, // Send clean array of image URLs
//       };

//       if (product) {
//         // Update existing product
//         await dispatch(
//           updateProduct({
//             id: product.id,
//             data: productData,
//           })
//         ).unwrap();
//       } else {
//         // Create new product
//         console.log("productdata", productData); //error the image
//         await dispatch(addProduct(productData)).unwrap();
//       }

//       onClose();
//     } catch (error) {
//       console.error("Failed to save product:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <FormField
//         label="Title"
//         name="title"
//         value={formData.title}
//         onChange={handleChange}
//         required
//         placeholder="Enter product title"
//       />

//       <FormField
//         label="Price"
//         name="price"
//         type="number"
//         value={formData.price}
//         onChange={handleChange}
//         required
//         placeholder="Enter price"
//       />

//       <FormField
//         label="Description"
//         name="description"
//         as="textarea"
//         value={formData.description}
//         onChange={handleChange}
//         required
//         placeholder="Enter product description"
//       />

//       <div className="space-y-2">
//         <label className="block text-sm font-medium">Product Images</label>

//         {formData.images.map((url, index) => (
//           <div key={index} className="flex gap-2 mb-2">
//             <FormField
//               type="url"
//               value={url}
//               onChange={(e) => handleImageChange(index, e.target.value)}
//               placeholder="Enter image URL"
//             />
//             {formData.images.length > 1 && (
//               <Button
//                 type="button"
//                 variant="danger"
//                 onClick={() => removeImageField(index)}
//               >
//                 Remove
//               </Button>
//             )}
//             {url && (
//               <img
//                 src={url}
//                 alt={`Preview ${index + 1}`}
//                 className="w-12 h-12 object-cover rounded"
//                 onError={(e) => {
//                   e.target.src = "https://via.placeholder.com/100";
//                 }}
//               />
//             )}
//           </div>
//         ))}

//         <Button type="button" variant="outline" onClick={addImageField}>
//           Add Another Image
//         </Button>
//       </div>

//       <div className="flex justify-end space-x-2 mt-6">
//         <Button type="button" variant="outline" onClick={onClose}>
//           Cancel
//         </Button>
//         <Button
//           type="submit"
//           variant="primary"
//           disabled={
//             !formData.title ||
//             !formData.price ||
//             !formData.description ||
//             !formData.images.some((img) => img.trim())
//           }
//         >
//           {product ? "Update Product" : "Add Product"}
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default ProductForm;

//////////////
// src/Components/Ecommerce/components/ProductForm.jsx
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProduct, updateProduct } from "../../../src/Reducers/productSlice";
import { FormField, Button } from "../../ui/index";
import { useTaskContext } from "../../hooks/useTaskContext";

const ProductForm = ({ product, onClose }) => {
  const dispatch = useDispatch();
  const { showToast } = useTaskContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    categoryId: 1,
    images: [""],
  });

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        price: product.price || "",
        description: product.description || "",
        categoryId: product.category?.id || 1,
        images: Array.isArray(product.images)
          ? product.images
          : [product.images],
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || value : value,
    }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  const addImageField = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ""],
    }));
  };

  const removeImageField = (index) => {
    if (formData.images.length > 1) {
      setFormData((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      const cleanImages = formData.images
        .filter((img) => img && img.trim() !== "")
        .map((img) => img.trim());

      if (cleanImages.length === 0) {
        showToast?.("Please add at least one image URL", "error");
        return;
      }

      const productData = {
        ...formData,
        price: Number(formData.price),
        images: cleanImages,
      };

      if (product) {
        await dispatch(
          updateProduct({
            id: product.id,
            data: productData,
          })
        ).unwrap();
        showToast?.("Product updated successfully", "success");
      } else {
        await dispatch(addProduct(productData)).unwrap();
        showToast?.("Product added successfully", "success");
      }

      onClose();
    } catch (error) {
      console.error("Failed to save product:", error);
      showToast?.(error.message || "Failed to save product", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        placeholder="Enter product title"
        disabled={isSubmitting}
      />

      <FormField
        label="Price"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        required
        placeholder="Enter price"
        disabled={isSubmitting}
      />

      <FormField
        label="Description"
        name="description"
        as="textarea"
        value={formData.description}
        onChange={handleChange}
        required
        placeholder="Enter product description"
        disabled={isSubmitting}
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium">Product Images</label>

        {formData.images.map((url, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <FormField
              type="url"
              value={url}
              onChange={(e) => handleImageChange(index, e.target.value)}
              placeholder="Enter image URL"
              disabled={isSubmitting}
            />
            {formData.images.length > 1 && (
              <Button
                type="button"
                variant="danger"
                onClick={() => removeImageField(index)}
                disabled={isSubmitting}
              >
                Remove
              </Button>
            )}
            {url && (
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                className="w-12 h-12 object-cover rounded"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/100";
                }}
              />
            )}
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addImageField}
          disabled={isSubmitting}
        >
          Add Another Image
        </Button>
      </div>

      <div className="flex justify-end space-x-2 mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={
            isSubmitting ||
            !formData.title ||
            !formData.price ||
            !formData.description ||
            !formData.images.some((img) => img.trim())
          }
        >
          {isSubmitting
            ? product
              ? "Updating..."
              : "Adding..."
            : product
            ? "Update Product"
            : "Add Product"}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
