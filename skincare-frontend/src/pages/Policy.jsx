import React from 'react';

const Policy = () => {
  return (
    <div className="w-full py-16 px-6 md:px-20 bg-[#fff5e1] min-h-[85vh]">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800" style={{ fontFamily: '"Italiana", sans-serif' }}>Company Policies</h1>

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Refund Policy */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-800" style={{ fontFamily: '"Italiana", sans-serif' }}>Refund Policy</h2>
          <div className="text-gray-700 leading-relaxed font-light space-y-4">
            <p>
              We want you to love every product you purchase from us. If you are not completely satisfied, you may request a return within 7 days of receiving your order.
            </p>
            
            <div>
              <p className="font-semibold mb-2">To be eligible for a refund:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>The product must be unused, unopened, and in its original packaging</li>
                <li>Proof of purchase is required</li>
              </ul>
            </div>

            <p>
              Once your return is received and inspected, we will notify you of the approval status. Approved refunds will be processed to your original payment method within 5–10 business days.
            </p>

            <p className="font-medium">
              Please note: Shipping charges are non-refundable.
            </p>
          </div>
        </div>

        {/* Privacy Policy */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-800" style={{ fontFamily: '"Italiana", sans-serif' }}>Privacy Policy</h2>
          <div className="text-gray-700 leading-relaxed font-light space-y-4">
            <p>
              Your privacy is important to us. We are committed to protecting your personal information and ensuring a safe shopping experience.
            </p>

            <div>
              <p className="font-semibold mb-2">We collect basic details such as:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Name</li>
                <li>Contact information</li>
                <li>Delivery address</li>
                <li>Payment details (securely processed)</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">This information is used to:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Process orders</li>
                <li>Improve your shopping experience</li>
                <li>Provide personalized recommendations</li>
              </ul>
            </div>

            <p>
              We do not sell or share your personal data with third parties, except when required for order fulfillment or legal purposes.
            </p>
          </div>
        </div>

        {/* Shipping Policy */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-800" style={{ fontFamily: '"Italiana", sans-serif' }}>Shipping Policy</h2>
          <div className="text-gray-700 leading-relaxed font-light space-y-4">
            <p>We aim to deliver your products quickly and safely across Sri Lanka.</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Orders are processed within 1–2 business days</li>
              <li>Delivery time: 2–5 business days</li>
              <li>Shipping charges may vary based on location</li>
            </ul>
            <p>Once your order is shipped, you will receive a confirmation with tracking details.</p>
            <p className="font-medium">Please ensure that your delivery information is accurate to avoid delays.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policy;