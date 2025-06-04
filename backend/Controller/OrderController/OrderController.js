const Order = require('../../Models/OrderSchema');
const User = require('../../Models/User');

// Create Order
const createOrder = async (req, res) => {
    try {
        const {
            customer,
            orderType,
            cartItems,
            clothPic,
            color,
            designDetails,
            designPic,
            Link,
            orderDate,
            deliveryDate,
            paymentStatus,
            paymentType,
            totalPrice,
            specialInstructions,
            orderStatus,
            measurements,
        } = req.body;

        // Ensure customer exists
        const customerRecord = await User.findById(customer.id);
        if (!customerRecord) {
            return res.status(404).json({ success: false, message: 'Customer not found' });
        }

        // Create a new order object
        const newOrder = new Order({
            customer: {
                name: customer.name,
                email: customer.email,
                phone: customer.phone,
                address: {
                    street: customer.address.street,
                    city: customer.address.city,
                    state: customer.address.state,
                    pincode: customer.address.pincode,
                    country: customer.address.country || 'India',
                },
            },
            orderType: orderType || 'custom',
            cartItems,
            clothPic,
            color,
            designDetails,
            designPic,
            Link,
            orderDate: orderDate || new Date(),
            deliveryDate,
            paymentStatus: paymentStatus || 'pending',
            paymentType: paymentType || 'COD',
            totalPrice,
            specialInstructions,
            orderStatus: orderStatus || 'pending',
            measurements,
        });

        // Save the order
        await newOrder.save();

        // Send success response
        res.status(201).json({ success: true, message: 'Order placed successfully', order: newOrder });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error placing order', error: err.message });
    }
};

// Update Order
const updateOrder = async (req, res) => {
    const {
        orderId,
        customer,
        orderType,
        cartItems,
        clothPic,
        color,
        designDetails,
        designPic,
        Link,
        deliveryDate,
        paymentStatus,
        paymentType,
        totalPrice,
        specialInstructions,
        orderStatus,
        measurements,
    } = req.body;

    try {
        // Find the order by ID
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        // Update order details
        if (customer) {
            order.customer = {
                ...order.customer,
                name: customer.name || order.customer.name,
                email: customer.email || order.customer.email,
                phone: customer.phone || order.customer.phone,
                address: {
                    ...order.customer.address,
                    street: customer.address.street || order.customer.address.street,
                    city: customer.address.city || order.customer.address.city,
                    state: customer.address.state || order.customer.address.state,
                    pincode: customer.address.pincode || order.customer.address.pincode,
                    country: customer.address.country || order.customer.address.country,
                },
            };
        }

        if (orderType) order.orderType = orderType;
        if (cartItems) order.cartItems = cartItems;
        if (clothPic) order.clothPic = clothPic;
        if (color) order.color = color;
        if (designDetails) order.designDetails = designDetails;
        if (designPic) order.designPic = designPic;
        if (Link) order.Link = Link;
        if (deliveryDate) order.deliveryDate = deliveryDate;
        if (paymentStatus) order.paymentStatus = paymentStatus;
        if (paymentType) order.paymentType = paymentType;
        if (totalPrice) order.totalPrice = totalPrice;
        if (specialInstructions) order.specialInstructions = specialInstructions;
        if (orderStatus) order.orderStatus = orderStatus;
        if (measurements) order.measurements = measurements;

        // Save the updated order
        await order.save();

        // Send success response
        res.status(200).json({ success: true, message: 'Order updated successfully', order });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error updating order', error: err.message });
    }
};

// Cancel Order
const cancelOrder = async (req, res) => {
    const { orderId, customerId } = req.body;

    try {
        // Find the order by ID
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        // Check if the order belongs to the customer
        if (order.customerId.toString() !== customerId) {
            return res.status(403).json({ success: false, message: 'You can only cancel your own orders' });
        }

        // Prevent canceling completed or already cancelled orders
        if (order.orderStatus === 'completed' || order.orderStatus === 'cancelled') {
            return res.status(400).json({ success: false, message: 'Order cannot be cancelled. It is already completed or cancelled.' });
        }

        // Update the order status to 'cancelled'
        order.orderStatus = 'cancelled';
        await order.save();

        // Send success response
        res.status(200).json({ success: true, message: 'Order cancelled successfully', order });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error cancelling order', error: err.message });
    }
};

// Export controllers
module.exports = {
    createOrder,
    updateOrder,
    cancelOrder,
};
