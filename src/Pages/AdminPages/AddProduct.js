import React, { useEffect, useState } from "react";
import {
    availabilityStatuses,
    color,
    categories,
    embellishmentsOptions,
    fabricTypes,
    patterns,
    productTypes,
    stitchingTypes,
} from "../../Common/option";
import { BlouseDetails } from "../../Components/AdminComponent/BlouseDetails";
import { SuitDetails } from "../../Components/AdminComponent/SuitDetails";
import SareeDetails from "../../Components/AdminComponent/SareeDetails";
import LehengaDetails from "../../Components/AdminComponent/LehengaDetails";
import summaryApi from "../../Common";
import uploadMedia from "../../Common/uploadMedia";
import { useNavigate, useParams } from "react-router-dom";

const ProductForm = () => {
    const { id, type } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(type === 'update');

    // Initial state with default values
    const [formData, setFormData] = useState({
        productId: "",
        productName: "",
        category: "Lehenga",
        description: "",
        productType: "Ready-made",
        color: "red",
        price: "",
        tailorPrice: "",
        readyMadePrice: "",
        discount: 0,
        quantityInStock: "",
        fabricType: "Cotton",
        stitchingType: "Machine Stitching",
        pattern: "Plain",
        embellishments: [],
        customizationAvailable: false,
        images: [],
        video: "",
        shippingCost: "",
        estimatedDeliveryTime: "",
        availabilityStatus: "Available",
        featuredProduct: false,
        seasonalTags: [],
        blouseDetails: {
            sleeveType: "Short Sleeve",
            blouseBackDesign: "Closed Back",
            necklineStyle: "",
            fitType: "Regular Fit",
            embellishments: [],
            padding: false,
            lining: false,
        },
        suitDetails: {
            sleeveType: "Short Sleeve",
            fitType: "Regular Fit",
            style: "Straight Cut",
            fabricType: "Cotton",
        },
        lehengaDetails: {
            lehengaType: "A-Line",
            lehengaWaist: "",
            lehengaDupattaIncluded: true,
            lehengaFabric: "Silk",
            embroidery: "Custom Embroidery based on requirements",
        },
        sareeDetails: {
            sareeLength: "",
            pleated: false,
            embroideryDetails: "Custom Embroidery based on requirements",
            sareeFabric: "Silk",
            blouseType: "Unstitched Blouse",
            borderStyle: "Plain",
            drapeStyle: "Nivi",
        },
        tags: [],
        dateAdded: new Date(),
        lastUpdated: new Date(),
        productStatus: "Active",
    });

    // Fetch product details for update mode
    useEffect(() => {
        const fetchProductData = async () => {
            if (type === 'update' && id) {
                try {
                    setIsLoading(true);
                    const response = await fetch(`${summaryApi.get_single_product.url}?productId=${id}`, {
                        method: summaryApi.get_single_product.method,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch product details');
                    }

                    const data = await response.json();

                    // Create a comprehensive update function
                    setFormData(prevData => {
                        // Deep merge function to handle nested objects
                        const deepMerge = (target, source) => {
                            const output = { ...target };
                            if (source) {
                                Object.keys(source).forEach(key => {
                                    if (source[key] instanceof Object && !Array.isArray(source[key])) {
                                        output[key] = deepMerge(output[key] || {}, source[key]);
                                    } else {
                                        output[key] = source[key];
                                    }
                                });
                            }
                            return output;
                        };

                        // Merge with default state, ensuring all fields are populated
                        return {
                            ...prevData,
                            ...deepMerge(prevData, data.product),
                            lastUpdated: new Date(),

                            // Explicitly handle array fields
                            embellishments: data.product.embellishments || [],
                            images: data.product.images || [],
                            seasonalTags: data.product.seasonalTags || [],
                            tags: data.product.tags || [],
                            productId: data.product._id,
                            // Handle nested objects with defaults
                            blouseDetails: deepMerge(prevData.blouseDetails, data.product.blouseDetails || {}),
                            suitDetails: deepMerge(prevData.suitDetails, data.product.suitDetails || {}),
                            lehengaDetails: deepMerge(prevData.lehengaDetails, data.product.lehengaDetails || {}),
                            sareeDetails: deepMerge(prevData.sareeDetails, data.product.sareeDetails || {})
                        };
                    });
                } catch (err) {
                    console.error('Error fetching product details:', err.message);
                    alert('Failed to load product details');
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchProductData();
    }, [type, id]);

    const handleInputChange = (e) => {
        const { name, value, type: inputType, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: inputType === 'checkbox' ? checked : value,
        }));
    };

    const handleMultiSelectChange = (e) => {
        const { name, options } = e.target;
        const selectedValues = Array.from(options)
            .filter(option => option.selected)
            .map(option => option.value);

        setFormData((prevData) => ({
            ...prevData,
            [name]: selectedValues,
        }));
    };
    const [loading, setLoading] = useState(false);

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        setLoading(true); // Start loading

        const uploadedImages = await Promise.all(
            files.map(async (file) => {
                try {
                    const result = await uploadMedia(file);
                    return { url: result.url };
                } catch (error) {
                    console.error("Error uploading image:", error);
                    return null;
                }
            })
        );

        setFormData((prevData) => ({
            ...prevData,
            images: [...prevData.images, ...uploadedImages.filter(Boolean)],
        }));

        setLoading(false); // Stop loading
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found in localStorage");
            return;
        }

        try {
            const apiEndpoint = type === 'update'
                ? summaryApi.update_product.url
                : summaryApi.add_product.url;

            const method = type === 'update'
                ? summaryApi.update_product.method
                : summaryApi.add_product.method;

            const payload = {
                ...formData,
                ...(type === 'update' && { id: id }) // Add id for update
            };

            const response = await fetch(apiEndpoint, {
                method: method,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`Failed to ${type === 'update' ? 'update' : 'add'} product`);
            }

            const responseData = await response.json();
            navigate("/view_product");
        } catch (error) {
            console.error("Error:", error);
            alert(`Failed to ${type === 'update' ? 'update' : 'add'} product`);
        }
    };

    // If loading, you might want to show a loading spinner
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto bg-slate-100 p-6 mb-10 shadow-md rounded-lg space-y-6"
        >
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"

                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"

                >
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}

                </select>
            </div>
            {formData.category === 'Blouse' && (
                <BlouseDetails
                    formData={formData}
                    setformdata={setFormData}
                />
            )}
            {formData.category === 'Suit' && (
                <SuitDetails
                    formData={formData}
                    setformdata={setFormData}
                />
            )}
            {formData.category === 'Saree' && (
                <SareeDetails
                    formData={formData}
                    setformdata={setFormData}
                />
            )}

            {(formData.category === 'Lehenga') && (
                <LehengaDetails
                    formData={formData}
                    setformdata={setFormData}
                />
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"

                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Type</label>
                <select
                    name="productType"
                    value={formData.productType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    {productTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Type
                </label>
                <select
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                    {color.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">tailor Price</label>
                <input
                    type="number"
                    name="tailorPrice"
                    value={formData.tailorPrice}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"

                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ready-made Price</label>
                <input
                    type="number"
                    name="readyMadePrice"
                    value={formData.readyMadePrice}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"

                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount</label>
                <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"

                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity in Stock</label>
                <input
                    type="number"
                    name="quantityInStock"
                    value={formData.quantityInStock}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"

                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fabric Type</label>
                <select
                    name="fabricType"
                    value={formData.fabricType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"

                >
                    {fabricTypes.map((fabric) => (
                        <option key={fabric} value={fabric}>
                            {fabric}
                        </option>
                    ))}
                </select>

            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stitching Type</label>
                <select
                    name="stitchingType"
                    value={formData.stitchingType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"

                >
                    {stitchingTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}

                </select>

            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pattern</label>
                <select
                    name="pattern"
                    value={formData.pattern}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    {patterns.map((pattern) => (
                        <option key={pattern} value={pattern}>
                            {pattern}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Embellishments</label>
                <select
                    multiple
                    name="embellishments"
                    value={formData.embellishments}
                    onChange={(e) => handleInputChange(e)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"

                >
                    {embellishmentsOptions.map((embellishment) => (
                        <option key={embellishment} value={embellishment}>
                            {embellishment}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customization Available</label>
                <input
                    type="checkbox"
                    name="customizationAvailable"
                    checked={formData.customizationAvailable}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            customizationAvailable: e.target.checked,
                        })
                    }
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
                <input
                    type="file"
                    name="images"
                    multiple
                    onChange={handleImageUpload}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {loading && (
                    <div className="flex justify-center items-center mt-4">
                       loading..... wait to image upload 
                    </div>
                )}

            </div>


            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Video</label>
                <input
                    type="text"
                    name="video"
                    value={formData.video}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"

                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Cost</label>
                <input
                    type="number"
                    name="shippingCost"
                    value={formData.shippingCost}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"

                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Delivery Time</label>
                <input
                    type="text"
                    name="estimatedDeliveryTime"
                    value={formData.estimatedDeliveryTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"

                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Availability Status</label>
                <select
                    name="availabilityStatus"
                    value={formData.availabilityStatus}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"

                >
                    {availabilityStatuses.map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Featured Product</label>
                <input
                    type="checkbox"
                    name="featuredProduct"
                    checked={formData.featuredProduct}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            featuredProduct: e.target.checked,
                        })
                    }
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Seasonal Tags</label>
                <input
                    type="text"
                    name="seasonalTags"
                    value={formData.seasonalTags}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"

                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
                >Submit</button>
            </div>
        </form>
    );
};

export default ProductForm;
