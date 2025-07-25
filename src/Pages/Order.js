import React, { useContext, useEffect, useState, Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';
const Package = lazy(() => import('lucide-react').then(mod => ({ default: mod.Package })));
const Ruler = lazy(() => import('lucide-react').then(mod => ({ default: mod.Ruler })));
const User = lazy(() => import('lucide-react').then(mod => ({ default: mod.User })));
const CreditCard = lazy(() => import('lucide-react').then(mod => ({ default: mod.CreditCard })));
const ArrowLeft = lazy(() => import('lucide-react').then(mod => ({ default: mod.ArrowLeft })));
const ArrowRight = lazy(() => import('lucide-react').then(mod => ({ default: mod.ArrowRight })));
const ChevronRight = lazy(() => import('lucide-react').then(mod => ({ default: mod.ChevronRight })));
const ChevronDown = lazy(() => import('lucide-react').then(mod => ({ default: mod.ChevronDown })));
const Phone = lazy(() => import('lucide-react').then(mod => ({ default: mod.Phone })));


import { AppContext } from '../App';
import Measurement from '../Components/OrderComponent/Measurement';
import OrderType from '../Components/OrderComponent/OrderType';
import CustomerDetails from '../Components/OrderComponent/CustomerDetails';
import PaymentDetails from '../Components/OrderComponent/PaymentDetails';
import CommonContactCart from '../Components/CommonContactCart';

const Order = () => {
  const { id, type } = useParams();
  const [step, setStep] = useState(1);
  const [orderProduct, setOrderProduct] = useState(null);
  const [category, setCategory] = useState('');
  const [productType, setProductType] = useState('');
  const [orderData, setOrderData] = useState({
    customer: {
      name: '',
      email: '',
      phone: '',
      address: {
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India',
      },
    },
    orderType: type || 'custom',
    cartItems: [],
    clothPic: [],
    color: '',
    designDetails: '',
    designPic: [],
    Link: '',
    orderDate: new Date(),
    deliveryDate: null,
    paymentStatus: 'pending',
    paymentType: 'COD',
    totalPrice: 0,
    specialInstructions: '',
    orderStatus: 'pending',
    measurements: {
      blouse: { chest: 0, waist: 0, shoulder: 0, length: 0, sleeveLength: 0, neckDepthFront: 0, neckDepthBack: 0 },
      dress: { chest: 0, waist: 0, hip: 0, length: 0, sleeveLength: 0 },
      lehenga: { waist: 0, hip: 0, length: 0 },
    },
  });
  const { cartData, loading, fetchCartData } = useContext(AppContext);

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchCartData();
      } catch (err) {
        console.error(err);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (cartData?.cartItems && id && type) {
      const product = cartData.cartItems.find(item => item.productId === id && item.productType === type);
      if (product) {
        setOrderProduct(product);
        setCategory(product?.category);
        setProductType(product?.productType);
      }
    }
  }, [cartData, id, type]);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  // Step Navigation Configuration
  const stepConfig = [
    {
      icon: Package,
      label: 'Product Info',
      component: renderBasicInfo
    },
    {
      icon: Ruler,
      label: 'Order Type',
      component: () => <OrderType orderData={orderData} setOrderData={setOrderData} orderType={productType} />
    },
    {
      icon: Ruler,
      label: 'Measurements',
      component: () => <Measurement orderData={orderData} setOrderData={setOrderData} category={category} />
    },
    {
      icon: User,
      label: 'Customer Details',
      component: () => <CustomerDetails orderData={orderData} setOrderData={setOrderData} />
    },
    {
      icon: CreditCard,
      label: 'Payment',
      component: () => <PaymentDetails orderProduct={orderProduct} orderData={orderData} setOrderData={setOrderData} />
    }
  ];

  function renderBasicInfo() {
    if (type === 'custom') {
      return (
        <div className="bg-white  p-6 space-y-6  mx-auto">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Select Category</h3>

            {/* Contact Information */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-100">
              <div className="flex items-center justify-center space-x-3 mb-3">
                <Suspense fallback={<div>Loading...</div>}><Phone className="text-blue-600" size={24} /></Suspense>
                <h4 className="text-lg font-semibold text-gray-700">
                  Custom Order Enquiry
                </h4>
              </div>

              <div className="flex items-center justify-center space-x-2">
                <span className="text-gray-600 font-medium">Call Now:</span>
                <a
                  href="tel:+917709894512"
                  className="text-blue-600 font-bold text-lg hover:text-blue-700 transition-colors"
                >
                  +91 7709894512
                </a>
              </div>

              <a
                href="tel:+917709894512"
                className="mt-3 w-full inline-flex items-center justify-center 
                bg-blue-500 text-white px-4 py-2 rounded-lg 
                hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <Suspense fallback={<div>Loading...</div>}><Phone className="mr-2" size={20} /></Suspense>
                Call Now
              </a>
              <div className="flex flex-col items-start justify-center space-y-2 mb-3">
                <h4 className="text-lg font-semibold text-gray-700">
                  Key Information:
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>
                    The price will only be disclosed over a call .
                  </li>
                  <li>
                    We guarantee that the price offered will be the lowest possible.
                  </li>
                  <li>
                    (Hindi) Price sirf call par hi bataya jayega
                  </li>
                  <li>
                    (Hindi) Hum guarantee dete hain ki price sabse kam hoga.
                  </li>
                </ul>
              </div>

            </div>

            {/* Category Dropdown */}
            <div className="relative">
              <select
                className="
                  w-full 
                  appearance-none 
                  px-4 
                  py-3 
                  pr-10 
                  border-2 
                  border-blue-200 
                  rounded-lg 
                  text-gray-700 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-blue-500 
                  focus:border-transparent 
                  transition-all 
                  text-base 
                  font-medium
                "
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled selected>Select blouse, dress, lehenga...</option>
                <option value="Blouse">Blouse</option>
                <option value="Dress">Dress</option>
                <option value="Lehenga">Lehenga</option>
              </select>

              {/* Custom dropdown icon */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <Suspense fallback={<div>Loading...</div>}><ChevronDown size={24} /></Suspense>
              </div>

            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="bg-white shadow-md rounded-lg  p-6 space-y-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Product Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Product Name</p>
              <p className="font-semibold">{orderProduct?.ProductName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Category</p>
              <p className="font-semibold">{orderProduct?.category}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Discount</p>
              <p className="font-semibold text-green-600">{orderProduct?.discount}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Price</p>
              <p className="font-semibold">₹{orderProduct?.totalPrice}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">quantity</p>
              <p className="font-semibold">{orderProduct?.quantity}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">productType  </p>
              <p className="font-semibold">{orderProduct?.productType}</p>
            </div>
          </div>
          {orderProduct?.image && (
            <div className="flex justify-center mt-4">
              <img
                src={orderProduct.image[0]}
                alt="Product"
                className="w-48 h-48 object-cover rounded-lg shadow-md"
              />
            </div>
          )}
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <CommonContactCart></CommonContactCart>
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Step Navigation */}
        <div className="bg-blue-50 p-4 border-b border-blue-100">
          <div className="flex justify-between items-center">
            {stepConfig.map((stepItem, index) => (
              <div
                key={index}
                onClick={() => setStep(index + 1)} // Add onClick to navigate directly to the step
                className={`flex items-center space-x-2 cursor-pointer 
                  ${step === index + 1 ? 'text-blue-600 font-bold' : 'text-gray-500'}`}
              >
                <Suspense fallback={<div>Loading...</div>}><stepItem.icon className={`w-5 h-5 ${step === index + 1 ? 'text-blue-600' : 'text-gray-400'}`} /></Suspense>
                <span className="hidden md:block">{stepItem.label}</span>
                {index < stepConfig.length - 1 && <Suspense fallback={<div>Loading...</div>}><ChevronRight className="w-4 h-4 text-gray-300" /></Suspense>}
              </div>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="pb-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p>Loading...</p>
            </div>
          ) : (
            <>
              {stepConfig[step - 1].component()}

              <div className="mt-6 flex justify-between">
                {step > 1 && (
                  <button
                    onClick={handlePrevStep}
                    className="flex items-center space-x-2 px-4 py-2 ml-4
                    bg-gray-200 text-gray-700 rounded-lg 
                    hover:bg-gray-300 transition-colors"
                  >
                    <Suspense fallback={<div>Loading...</div>}><ArrowLeft className="w-5 h-5" /></Suspense>
                    <span>Previous</span>
                  </button>
                )}

                {step < stepConfig.length && (
                  <button
                    onClick={handleNextStep}
                    className="flex items-center space-x-2 px-4 py-2 mr-4
                    bg-blue-500 text-white rounded-lg 
                    hover:bg-blue-600 transition-colors ml-auto"
                  >
                    <span>Next</span>
                    <Suspense fallback={<div>Loading...</div>}><ArrowRight className="w-5 h-5" /></Suspense>
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
