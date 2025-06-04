
const User = require('../../Models/User');
const addToCart = require('../../Models/AddToCartSchema');
const Product = require('../../Models/productSchema');

exports.addToCart = async (req, res) => {
    try {
        const {productId, quantity, productType } = req.body;
        const userId = req.user.id;
        console.log("userId",req.body);
        let cart = await addToCart.findOne({ userId: userId });
        if (!cart) {
            cart = new addToCart({
                userId: userId,
                cartItems: [],
                totalCartValue: 0,
                discount: 0,
                finalTotal: 0,
            });
        }

        const product = await Product.findById({ _id: productId });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const price = productType === 'tailor' ? product.tailorPrice : product.readyMadePrice;
        const discountAmount = Math.round((price * product.discount) / 100);

        let cartItem = cart.cartItems.find(item => 
            item.productId.toString() === productId.toString() && item.productType === productType
        );

        if (!cartItem) {
            cartItem = {
                productId: product._id,
                quantity: parseInt(quantity, 10),
                price: parseInt(price, 10),
                totalPrice: 0,
                discount: parseInt(product.discount, 10),
                discountedPrice: 0,
                productType: productType,
                productName: product?.productName, 
                image: product?.images[0].url,
                category: product.category
            };
            cartItem.discountedPrice = cartItem.quantity * discountAmount;
            cartItem.totalPrice = cartItem.quantity * cartItem.price - cartItem.discountedPrice;
            cart.cartItems.push(cartItem);
        } else {
            cartItem.quantity += parseInt(quantity, 10);
            cartItem.discountedPrice = cartItem.quantity * discountAmount;
            cartItem.totalPrice = cartItem.quantity * cartItem.price - cartItem.discountedPrice;
        }

        // Correct the discount and price calculations

        // Update cart totals
        cart.totalCartValue = cart.cartItems.reduce((acc, item) => acc + item.quantity*item.price, 0);
        cart.finalTotal =cart.cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
        cart.discount = cart.totalCartValue - cart.finalTotal;

        await cart.save();

        return res.status(200).json({ success: true, cart });
    } catch (error) {
        console.error('Error adding to cart:', error);
        return res.status(500).json({ success: false, message: 'Error adding to cart', error: error.message });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const { productId, productType } = req.body;
        const userId = req.user.id;

        if (!productId || !productType) {
            return res.status(400).json({ success: false, message: 'Invalid product details' });
        }

        let cart = await addToCart.findOne({ userId: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Remove the product from the cart items
        cart.cartItems = cart.cartItems.filter(item => 
            item.productId && 
            item.productType && 
            (item.productId.toString() !== productId.toString() || item.productType !== productType)
        );

        // Safely calculate totalCartValue and finalTotal, making sure the values are numbers
        cart.totalCartValue = cart.cartItems.reduce((acc, item) => {
            const price = item.price || 0;  // Ensure price is a valid number
            const quantity = item.quantity || 0;  // Ensure quantity is a valid number
            return acc + (price * quantity);
        }, 0);

        cart.finalTotal = cart.cartItems.reduce((acc, item) => {
            const totalPrice = item.totalPrice || 0;  // Ensure totalPrice is valid
            return acc + totalPrice;
        }, 0);

        // Calculate the discount
        cart.discount = cart.totalCartValue - cart.finalTotal;

        // Save the cart after removing the product
        await cart.save();

        return res.status(200).json({ success: true, message: 'Product removed from cart', cart });
    } catch (error) {
        console.error('Error removing from cart:', error);
        return res.status(500).json({ success: false, message: 'Error removing from cart', error: error.message });
    }
};


exports.updateCartQuantity = async (req, res) => {
    try {
        const {  productId, quantity, productType ,action} = req.body;
        const userId=req.user.id;
        let cart = await addToCart.findOne({ userId: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const cartItem = cart.cartItems.find(item => 
            item.productId.toString() === productId.toString() && item.productType === productType
        );

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        const product = await Product.findById({ _id: productId });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const price = productType === 'tailor' ? product.tailorPrice : product.readyMadePrice;
        const discountAmount = Math.round((price * product.discount) / 100);
        if(action==="increase"){
            cartItem.quantity++;
        }else{
            cartItem.quantity--;
        }
        cartItem.discountedPrice = cartItem.quantity * discountAmount;
        cartItem.totalPrice = cartItem.quantity * cartItem.price - cartItem.discountedPrice;

        cart.totalCartValue = cart.cartItems.reduce((acc, item) => acc + item.quantity*item.price, 0);
        cart.finalTotal =cart.cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
        cart.discount = cart.totalCartValue - cart.finalTotal;
        await cart.save();

        return res.status(200).json({ success: true, cart });
    } catch (error) {
        console.error('Error updating cart quantity:', error);
        return res.status(500).json({ success: false, message: 'Error updating cart quantity', error: error.message });
    }
};
