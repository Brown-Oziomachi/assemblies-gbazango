"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHeart, FaArrowLeft, FaChurch, FaCreditCard, FaUniversity, 
  FaMobileAlt, FaShieldAlt, FaCheckCircle, FaGift, FaHandHoldingHeart,
  FaUsers, FaBook, FaChild, FaHome, FaPray, FaDollarSign,
    FaLock, FaCopy, FaQrcode, FaTimes, FaPhone, FaInfoCircle
} from 'react-icons/fa';

const GiveOnlinePage = () => {
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('tithe');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    anonymous: false
  });

  const quickAmounts = [1000, 2000, 5000, 10000, 20000, 50000];

  const givingCategories = [
    {
      id: 'tithe',
      title: 'Tithe',
      icon: FaBook,
      description: 'Return the first 10% to God as an act of worship and obedience',
      verse: '"Bring the whole tithe into the storehouse..." - Malachi 3:10'
    },
    {
      id: 'offering',
      title: 'Offering',
      icon: FaGift,
      description: 'Give above and beyond your tithe as a freewill offering to God',
      verse: '"Each of you should give what you have decided..." - 2 Cor 9:7'
    },
    {
      id: 'building',
      title: 'Building Fund',
      icon: FaChurch,
      description: 'Support the expansion and maintenance of our church facilities',
      verse: '"Unless the LORD builds the house..." - Psalm 127:1'
    },
    {
      id: 'missions',
      title: 'Missions',
      icon: FaUsers,
      description: 'Help us reach the world with the Gospel of Jesus Christ',
      verse: '"Go and make disciples of all nations..." - Matthew 28:19'
    },
    {
      id: 'welfare',
      title: 'Welfare & Care',
      icon: FaHandHoldingHeart,
      description: 'Support members in need and community outreach programs',
      verse: '"Blessed are the merciful..." - Matthew 5:7'
    },
    {
      id: 'youth',
      title: 'Youth & Children',
      icon: FaChild,
      description: 'Invest in the next generation through youth and children programs',
      verse: '"Train up a child in the way he should go..." - Proverbs 22:6'
    }
  ];

  const bankDetails = {
    bankName: 'First Bank of Nigeria',
    accountName: 'Assemblies of God Church Gbazango',
    accountNumber: '2034567890',
    sortCode: '011'
  };

  const paypalEmail = 'giving@agchurchng.org';
  const paystackPublicKey = 'pk_test_xxxxxxxxxxxxx'; // Replace with actual key

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount('');
  };

  const getFinalAmount = () => {
    return customAmount || selectedAmount;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const handleSubmit = () => {
    const amount = getFinalAmount();
    
    if (!amount) {
      alert('Please select or enter an amount');
      return;
    }

    if (!formData.name || !formData.email) {
      alert('Please fill in your contact information');
      return;
    }

    // Here you would integrate with payment gateway
    const donationData = {
      amount,
      category: selectedCategory,
      paymentMethod,
      donor: formData,
      timestamp: new Date().toISOString()
    };

    console.log('Donation Data:', donationData);
    
    // Redirect to payment gateway or process payment
    if (paymentMethod === 'card') {
      // Initialize Paystack or Flutterwave
      alert('Redirecting to secure payment gateway...');
      // window.location.href = paymentGatewayUrl;
    } else if (paymentMethod === 'bank') {
      setShowBankDetails(true);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a
              href="/"
              className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold transition-colors"
            >
              <FaArrowLeft className="w-5 h-5" />
              Back to Home
            </a>
            <div className="flex items-center gap-3">
              <FaChurch className="w-8 h-8 text-amber-600" />
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-gray-900">Assemblies of God</p>
                <p className="text-xs text-amber-600">Gbazango District</p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-amber-600 to-amber-700 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center text-white"
          >
            <FaHeart className="w-20 h-20 mx-auto mb-6 text-white/80" />
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Give Online</h1>
            <p className="text-2xl md:text-3xl font-light mb-6 text-amber-100">
              Honor God with Your Generosity
            </p>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              "Give, and it will be given to you. A good measure, pressed down, shaken together 
              and running over, will be poured into your lap." - Luke 6:38
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Give Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FaPray,
                title: 'Worship God',
                description: 'Giving is an act of worship and obedience to God\'s Word'
              },
              {
                icon: FaChurch,
                title: 'Build His Kingdom',
                description: 'Your gifts enable ministry, outreach, and impact in our community'
              },
              {
                icon: FaHeart,
                title: 'Bless Others',
                description: 'Support missions, help those in need, and invest in future generations'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 bg-amber-50 rounded-xl border-2 border-amber-100 hover:border-amber-300 transition"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Giving Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Complete Your Giving</h2>
              <p className="text-amber-100">Secure and easy online giving</p>
            </div>

            <div className="p-8 space-y-8">
              {/* Select Category */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Select Giving Category</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {givingCategories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setSelectedCategory(category.id)}
                      className={`text-left p-4 rounded-xl border-2 transition ${
                        selectedCategory === category.id
                          ? 'border-amber-600 bg-amber-50'
                          : 'border-gray-200 hover:border-amber-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          selectedCategory === category.id ? 'bg-amber-600' : 'bg-gray-200'
                        }`}>
                          <category.icon className={`w-5 h-5 ${
                            selectedCategory === category.id ? 'text-white' : 'text-gray-600'
                          }`} />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">{category.title}</h4>
                          <p className="text-xs text-gray-600">{category.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Amount */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Select Amount</h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleAmountSelect(amount)}
                      className={`p-4 rounded-xl border-2 font-bold transition ${
                        selectedAmount === amount
                          ? 'border-amber-600 bg-amber-50 text-amber-600'
                          : 'border-gray-200 hover:border-amber-300 text-gray-700'
                      }`}
                    >
                      ₦{amount.toLocaleString()}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <FaDollarSign className="absolute left-4 top-4 text-gray-400" />
                  <input
                    type="number"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-600 focus:ring-2 focus:ring-amber-200"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { id: 'card', label: 'Card Payment', icon: FaCreditCard, desc: 'Visa, Mastercard, Verve' },
                    { id: 'bank', label: 'Bank Transfer', icon: FaUniversity, desc: 'Direct bank transfer' },
                    { id: 'mobile', label: 'Mobile Money', icon: FaMobileAlt, desc: 'USSD, Mobile wallet' }
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-4 rounded-xl border-2 transition ${
                        paymentMethod === method.id
                          ? 'border-amber-600 bg-amber-50'
                          : 'border-gray-200 hover:border-amber-300'
                      }`}
                    >
                      <method.icon className={`w-8 h-8 mx-auto mb-2 ${
                        paymentMethod === method.id ? 'text-amber-600' : 'text-gray-400'
                      }`} />
                      <p className="font-bold text-gray-900 text-sm">{method.label}</p>
                      <p className="text-xs text-gray-600 mt-1">{method.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Your Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:ring-2 focus:ring-amber-200"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:ring-2 focus:ring-amber-200"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:ring-2 focus:ring-amber-200"
                      placeholder="+234 800 000 0000"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.anonymous}
                        onChange={(e) => setFormData({...formData, anonymous: e.target.checked})}
                        className="w-5 h-5 text-amber-600 rounded focus:ring-2 focus:ring-amber-200"
                      />
                      <span className="text-sm font-medium text-gray-700">Give anonymously</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Security Note */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 flex items-start gap-3">
                <FaShieldAlt className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-blue-900 mb-1">Secure Transaction</p>
                  <p className="text-sm text-blue-800">
                    All transactions are encrypted and secure. Your financial information is never stored on our servers.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition flex items-center justify-center gap-3"
              >
                <FaHeart className="w-6 h-6" />
                Complete Gift of ₦{getFinalAmount() ? Number(getFinalAmount()).toLocaleString() : '0'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bank Details Modal */}
      <AnimatePresence>
        {showBankDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowBankDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
            >
              <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-6 rounded-t-2xl flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">Bank Transfer Details</h3>
                  <p className="text-amber-100">Use these details to complete your transfer</p>
                </div>
                <button
                  onClick={() => setShowBankDetails(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition"
                >
                  <FaTimes className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="bg-amber-50 rounded-xl p-4 border-2 border-amber-200">
                  <p className="text-sm text-gray-600 mb-1">Bank Name</p>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-gray-900">{bankDetails.bankName}</p>
                    <button onClick={() => copyToClipboard(bankDetails.bankName)} className="text-amber-600 hover:text-amber-700">
                      <FaCopy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-xl p-4 border-2 border-amber-200">
                  <p className="text-sm text-gray-600 mb-1">Account Name</p>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-gray-900">{bankDetails.accountName}</p>
                    <button onClick={() => copyToClipboard(bankDetails.accountName)} className="text-amber-600 hover:text-amber-700">
                      <FaCopy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-xl p-4 border-2 border-amber-200">
                  <p className="text-sm text-gray-600 mb-1">Account Number</p>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-gray-900 text-xl">{bankDetails.accountNumber}</p>
                    <button onClick={() => copyToClipboard(bankDetails.accountNumber)} className="text-amber-600 hover:text-amber-700">
                      <FaCopy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 flex items-start gap-3">
                  <FaInfoCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-900 font-semibold mb-1">Important</p>
                    <p className="text-sm text-blue-800">
                      Please email your payment confirmation to giving@agchurchng.org with your name and giving category.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Other Ways to Give */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Other Ways to Give</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
              <FaUniversity className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">In Person</h3>
              <p className="text-gray-600 mb-4">Drop your offering in the collection box during any service</p>
              <a href="/AG/visitors" className="text-amber-600 font-semibold hover:text-amber-700">
                Service Times →
              </a>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
              <FaMobileAlt className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Mobile App</h3>
              <p className="text-gray-600 mb-4">Download our church app for easy giving on the go</p>
              <a href="our-app" className="text-amber-600 font-semibold hover:text-amber-700">
                Download App →
              </a>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
              <FaPhone className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Contact Us</h3>
              <p className="text-gray-600 mb-4">Call us for assistance with your giving</p>
              <a href="tel:+2348034567890" className="text-amber-600 font-semibold hover:text-amber-700">
                +234 803 456 7890 →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'Is online giving secure?',
                a: 'Yes! We use industry-standard encryption and secure payment processors. Your financial information is never stored on our servers.'
              },
              {
                q: 'Will I receive a receipt?',
                a: 'Yes, you will receive an email receipt immediately after your donation. You can use this for tax purposes.'
              },
              {
                q: 'Can I set up recurring giving?',
                a: 'Yes! You can set up automatic monthly or weekly giving through our online platform or mobile app.'
              },
              {
                q: 'What if I made a mistake?',
                a: 'Please contact us at giving@agchurchng.org or call +234 803 456 7890 as soon as possible and we\'ll help resolve the issue.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border-2 border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2 flex items-start gap-3">
                  <FaCheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
                  {faq.q}
                </h3>
                <p className="text-gray-600 ml-8">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FaChurch className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <p className="text-sm mb-2">&copy; 2025 Assemblies of God Church - Gbazango District. All rights reserved.</p>
          <p className="text-amber-400 font-semibold">Thank you for your generosity!</p>
        </div>
      </footer>
    </div>
  );
};

export default GiveOnlinePage;