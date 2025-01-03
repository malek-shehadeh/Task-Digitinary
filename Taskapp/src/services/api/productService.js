// // src/services/api/productService.js
// import api from "./axiosConfig";

// export const productService = {
//   getAllProducts: async () => {
//     const response = await api.get("/products");
//     return response.data;
//   },

//   getProductById: async (id) => {
//     const response = await api.get(`/products/${id}`);
//     return response.data;
//   },

//   createProduct: async (productData) => {
//     const response = await api.post("/products", productData);
//     return response.data;
//   },

//   updateProduct: async (id, productData) => {
//     const response = await api.put(`/products/${id}`, productData);
//     return response.data;
//   },

//   deleteProduct: async (id) => {
//     const response = await api.delete(`/products/${id}`);
//     return response.data;
//   },
// };
/////////////////////

// // src/services/api/productService.js
// import api from "./axiosConfig";

// // Helper function to clean image URLs
// const cleanImageUrls = (product) => {
//   if (!product) return product;

//   let cleanedImages = product.images;

//   // If images is a string that looks like an array, parse it
//   if (typeof product.images === "string" && product.images.startsWith("[")) {
//     try {
//       cleanedImages = JSON.parse(product.images);
//     } catch (e) {
//       console.error("Error parsing images:", e);
//       cleanedImages = [];
//     }
//   }

//   // If it's an array with a single string that looks like an array
//   if (
//     Array.isArray(cleanedImages) &&
//     cleanedImages.length === 1 &&
//     typeof cleanedImages[0] === "string" &&
//     cleanedImages[0].startsWith("[")
//   ) {
//     try {
//       cleanedImages = JSON.parse(cleanedImages[0]);
//     } catch (e) {
//       console.error("Error parsing nested images:", e);
//     }
//   }

//   // Clean each URL - remove extra quotes and clean any remaining JSON artifacts
//   cleanedImages = cleanedImages.map((url) => {
//     if (typeof url === "string") {
//       return url
//         .replace(/^"|"$/g, "") // Remove surrounding quotes
//         .replace(/\\/g, ""); // Remove escape characters
//     }
//     return url;
//   });

//   return {
//     ...product,
//     images: cleanedImages,
//   };
// };

// export const productService = {
//   getAllProducts: async () => {
//     const response = await api.get("/products");
//     // Clean images for all products
//     const cleanedProducts = response.data.map((product) =>
//       cleanImageUrls(product)
//     );
//     return cleanedProducts;
//   },

//   getProductById: async (id) => {
//     const response = await api.get(`/products/${id}`);
//     // Clean images for single product
//     return cleanImageUrls(response.data);
//   },

//   createProduct: async (productData) => {
//     // Ensure images are clean before sending
//     const cleanData = {
//       ...productData,
//       images: productData.images.map((url) => url.trim()),
//     };
//     const response = await api.post("/products", cleanData);
//     return cleanImageUrls(response.data);
//   },

//   updateProduct: async (id, productData) => {
//     // Ensure images are clean before sending
//     const cleanData = {
//       ...productData,
//       images: productData.images.map((url) => url.trim()),
//     };
//     const response = await api.put(`/products/${id}`, cleanData);
//     return cleanImageUrls(response.data);
//   },

//   deleteProduct: async (id) => {
//     const response = await api.delete(`/products/${id}`);
//     return response.data;
//   },
// };
/////////////////////////

// src/services/api/productService.js
import api from "./axiosConfig";

const cleanImageUrls = (product) => {
  if (!product) return product;

  let cleanedImages = product.images;

  // If images is a string containing array notation
  if (typeof cleanedImages === "string") {
    // Remove all array brackets and split by comma
    cleanedImages = cleanedImages
      .replace(/[\[\]]/g, "") // Remove all square brackets
      .split(",") // Split into array
      .map((url) => url.trim()); // Trim each URL
  }

  // If it's already an array, clean each element
  if (Array.isArray(cleanedImages)) {
    cleanedImages = cleanedImages.map((url) => {
      if (typeof url === "string") {
        return url
          .replace(/[\[\]"\\]/g, "") // Remove brackets, quotes, and backslashes
          .trim(); // Remove whitespace
      }
      return url;
    });
  }

  // Filter out empty strings and invalid URLs
  cleanedImages = cleanedImages.filter(
    (url) => url && typeof url === "string" && url.trim().length > 0
  );

  return {
    ...product,
    images: cleanedImages,
  };
};

// Prepare images before sending to API
const prepareImagesForApi = (images) => {
  if (!Array.isArray(images)) {
    images = [images];
  }

  return images
    .map((url) => {
      if (typeof url === "string") {
        return url
          .replace(/[\[\]"\\]/g, "") // Remove brackets, quotes, and backslashes
          .trim();
      }
      return url;
    })
    .filter((url) => url && url.trim().length > 0);
};

export const productService = {
  getAllProducts: async () => {
    const response = await api.get("/products");
    return response.data.map((product) => cleanImageUrls(product));
  },

  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return cleanImageUrls(response.data);
  },

  createProduct: async (productData) => {
    // Clean images before sending
    const cleanData = {
      ...productData,
      images: prepareImagesForApi(productData.images),
    };
    console.log("Sending clean data:", cleanData);
    const response = await api.post("/products", cleanData);
    return cleanImageUrls(response.data);
  },

  updateProduct: async (id, productData) => {
    // Clean images before sending
    const cleanData = {
      ...productData,
      images: prepareImagesForApi(productData.images),
    };
    const response = await api.put(`/products/${id}`, cleanData);
    return cleanImageUrls(response.data);
  },

  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};
