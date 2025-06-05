const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "mern_product");

  const url = `https://api.cloudinary.com/v1_1//image/upload`; // Replace YOUR_CLOUD_NAME

  const dataResponse = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!dataResponse.ok) {
    throw new Error('Failed to upload image');
  }

  return dataResponse.json();
};

export default uploadImage;