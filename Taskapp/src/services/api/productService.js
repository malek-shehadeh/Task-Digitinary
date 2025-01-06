import api from "./axiosConfig";

const cleanImageUrls = (product) => {
  if (!product) return product;

  let cleanedImages = product.images;

  if (typeof cleanedImages === "string") {
    cleanedImages = cleanedImages
      .replace(/[\[\]]/g, "")
      .split(",")
      .map((url) => url.trim());
  }

  if (Array.isArray(cleanedImages)) {
    cleanedImages = cleanedImages.map((url) => {
      if (typeof url === "string") {
        return url.replace(/[\[\]"\\]/g, "").trim();
      }
      return url;
    });
  }

  cleanedImages = cleanedImages.filter(
    (url) => url && typeof url === "string" && url.trim().length > 0
  );

  return {
    ...product,
    images: cleanedImages,
  };
};

const prepareImagesForApi = (images) => {
  if (!Array.isArray(images)) {
    images = [images];
  }

  return images
    .map((url) => {
      if (typeof url === "string") {
        return url.replace(/[\[\]"\\]/g, "").trim();
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
    const cleanData = {
      ...productData,
      images: prepareImagesForApi(productData.images),
    };
    console.log("Sending clean data:", cleanData);
    const response = await api.post("/products", cleanData);
    return cleanImageUrls(response.data);
  },

  updateProduct: async (id, productData) => {
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
