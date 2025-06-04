const AddToCartSchema = require("../../Models/AddToCartSchema");

// Controller to get cart details for a user
const getAddToCart = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is available in `req.user`
    // Fetch cart for the logged-in user
    const cart = await AddToCartSchema.findOne({ userId }).populate('cartItems.productId', 'name price'); // Populate product details

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for this user' });
    }

    res.status(200).json({
      cartItems: cart.cartItems.map(item => ({
        productId: item?.productId?._id,
        ProductName:item?.productName,
        quantity: item?.quantity,
        price: item?.price,
        totalPrice: item?.totalPrice,
        discount: item?.discount,
        discountedPrice: item?.discountedPrice,
        image:item?.image,
        productType: item?.productType,
        category: item?.category
      })),
      totalCartValue: cart?.totalCartValue,
      discount: cart?.discount,
      finalTotal: cart?.finalTotal,
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getAddToCart };
