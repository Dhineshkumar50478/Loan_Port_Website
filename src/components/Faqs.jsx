import React from "react";

const Faqs = () => {
  return (
    <section className="bg-white text-gray-800 py-16 px-6 md:px-16 lg:px-32">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-midnight-blue mb-6">Frequently Asked Questions</h2>
        <p className="text-lg text-gray-600 mb-8">
          Find answers to the most common questions about our loan process, eligibility, and repayment options.
        </p>
      </div>

      <div className="container mx-auto grid md:grid-cols-2 gap-12">
        {/* Question 1 */}
        <div>
          <h3 className="text-xl font-semibold text-midnight-blue">What types of loans do you offer?</h3>
          <p className="text-gray-600 mt-2">
            We provide personal, business, home, and vehicle loans with flexible repayment terms and competitive interest rates.
          </p>
        </div>

        {/* Question 2 */}
        <div>
          <h3 className="text-xl font-semibold text-midnight-blue">How do I apply for a loan?</h3>
          <p className="text-gray-600 mt-2">
            You can apply online by filling out our application form. Our team will review your details and get back to you within 24 hours.
          </p>
        </div>

        {/* Question 3 */}
        <div>
          <h3 className="text-xl font-semibold text-midnight-blue">What are the eligibility criteria?</h3>
          <p className="text-gray-600 mt-2">
            Eligibility depends on your income, credit score, and financial history. Specific requirements vary based on the type of loan.
          </p>
        </div>

        {/* Question 4 */}
        <div>
          <h3 className="text-xl font-semibold text-midnight-blue">What documents are required?</h3>
          <p className="text-gray-600 mt-2">
            Typically, we require identification proof, income proof, bank statements, and any additional documents specific to the loan type.
          </p>
        </div>

        {/* Question 5 */}
        <div>
          <h3 className="text-xl font-semibold text-midnight-blue">How long does loan approval take?</h3>
          <p className="text-gray-600 mt-2">
            Loan approvals usually take 24-48 hours after document submission, depending on the verification process.
          </p>
        </div>

        {/* Question 6 */}
        <div>
          <h3 className="text-xl font-semibold text-midnight-blue">Are there any hidden charges?</h3>
          <p className="text-gray-600 mt-2">
            No, we maintain complete transparency. All fees and charges are clearly mentioned in your loan agreement.
          </p>
        </div>

        {/* Question 7 */}
        <div>
          <h3 className="text-xl font-semibold text-midnight-blue">Can I repay my loan early?</h3>
          <p className="text-gray-600 mt-2">
            Yes! We allow early loan repayment with minimal or no prepayment charges, depending on the loan type.
          </p>
        </div>

        {/* Question 8 */}
        <div>
          <h3 className="text-xl font-semibold text-midnight-blue">How can I contact support?</h3>
          <p className="text-gray-600 mt-2">
            You can reach us via phone, email, or visit our nearest branch. Our customer support team is always ready to assist you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Faqs;