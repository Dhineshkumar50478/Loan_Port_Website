import React from "react";
import {
  FaBolt,
  FaSlidersH,
  FaShieldAlt,
  FaHandsHelping,
  FaClipboardCheck,
  FaSearchDollar,
  FaFileAlt,
  FaCheckCircle,
  FaLightbulb,
  FaUserShield,
  FaHeart,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const About = () => {
  
  const firstEligibility = () => {
    console.log("Toast is fine");
    toast("Go Home and Check Loan Eligibility First", {
      icon: "👈",
    });
  };

  return (
    <>
      <section className="bg-white text-gray-800 py-16 px-6 md:px-16 lg:px-32">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-600 mb-6">
            About LoanPort
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Established in{" "}
            <span className="text-yellow-500 font-semibold">2025</span>,{" "}
            <span className="text-blue-600 font-semibold">LoanPort</span> is
            committed to providing
            <span className="text-yellow-500">
              {" "}
              simple, transparent, and accessible financial solutions
            </span>
            . Whether you're looking for a home, education, vehicle, personal,
            or gold loan, we're here to make your journey hassle-free.
          </p>
        </div>

        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* How We Work Section */}
          <div>
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">
              How We Work
            </h3>
            <ul className="mt-4 text-gray-600 space-y-4">
              <li className="flex items-start gap-3">
                <span className="bg-blue-100 p-2 rounded-full text-blue-600">
                  <FaClipboardCheck size={20} />
                </span>
                <span>
                  <span className="text-yellow-500 font-semibold">
                    Check Eligibility
                  </span>{" "}
                  – Answer a few simple questions to find out if you're
                  eligible.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-blue-100 p-2 rounded-full text-blue-600">
                  <FaSearchDollar size={20} />
                </span>
                <span>
                  <span className="text-yellow-500 font-semibold">
                    Compare Loan Options
                  </span>{" "}
                  – Browse and choose from multiple tailored loan products.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-blue-100 p-2 rounded-full text-blue-600">
                  <FaFileAlt size={20} />
                </span>
                <span>
                  <span className="text-yellow-500 font-semibold">
                    Submit Documents
                  </span>{" "}
                  – Upload the necessary documents securely online.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-blue-100 p-2 rounded-full text-blue-600">
                  <FaCheckCircle size={20} />
                </span>
                <span>
                  <span className="text-yellow-500 font-semibold">
                    Get Approved
                  </span>{" "}
                  – Receive instant approval and get your loan disbursed
                  quickly.
                </span>
              </li>
            </ul>
          </div>

          {/* Why Choose Us Section */}
          <div>
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">
              Why Choose LoanPort?
            </h3>
            <ul className="text-gray-600 space-y-4">
              <li className="flex items-start gap-3">
                <span className="bg-blue-100 p-2 rounded-full text-blue-600">
                  <FaBolt size={20} />
                </span>
                <span>
                  <span className="text-yellow-500 font-semibold">
                    Quick Approvals
                  </span>{" "}
                  – Lightning-fast decisions with minimal paperwork.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-blue-100 p-2 rounded-full text-blue-600">
                  <FaSlidersH size={20} />
                </span>
                <span>
                  <span className="text-yellow-500 font-semibold">
                    Custom Loan Options
                  </span>{" "}
                  – Tailored plans to suit every need.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-blue-100 p-2 rounded-full text-blue-600">
                  <FaShieldAlt size={20} />
                </span>
                <span>
                  <span className="text-yellow-500 font-semibold">
                    Secure & Transparent
                  </span>{" "}
                  – No hidden costs or surprises.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-blue-100 p-2 rounded-full text-blue-600">
                  <FaHandsHelping size={20} />
                </span>
                <span>
                  <span className="text-yellow-500 font-semibold">
                    Expert Assistance
                  </span>{" "}
                  – Reliable advice from experienced professionals.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Values Section */}
        <div className="container mx-auto mt-12 text-center">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">
            Our Core Values
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-gray-600">
            <div className="p-4 border border-yellow-500 rounded-lg flex flex-col items-center gap-2">
              <span className="bg-blue-100 p-2 rounded-full text-blue-600">
                <FaLightbulb size={20} />
              </span>
              <h4 className="text-lg font-semibold text-blue-600">
                Innovation
              </h4>
              <p>
                We use modern tools and AI to create a seamless loan experience.
              </p>
            </div>
            <div className="p-4 border border-yellow-500 rounded-lg flex flex-col items-center gap-2">
              <span className="bg-blue-100 p-2 rounded-full text-blue-600">
                <FaUserShield size={20} />
              </span>
              <h4 className="text-lg font-semibold text-blue-600">
                Trust & Integrity
              </h4>
              <p>Transparency and honesty are at the core of our services.</p>
            </div>
            <div className="p-4 border border-yellow-500 rounded-lg flex flex-col items-center gap-2">
              <span className="bg-blue-100 p-2 rounded-full text-blue-600">
                <FaHeart size={20} />
              </span>
              <h4 className="text-lg font-semibold text-blue-600">
                Customer Focus
              </h4>
              <p>Your satisfaction and success are our top priorities.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="container mx-auto text-center mt-12">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">
            Let's Build Your Financial Future
          </h3>
          <p className="text-gray-600 mb-6">
            With <span className="text-yellow-500 font-semibold">LoanPort</span>
            , you're not just taking a loan — you're stepping into a world of{" "}
            <span className="text-yellow-500">opportunities and support</span>.
            Apply now and experience lending like never before.
          </p>
          <button
            className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition duration-300"
            onClick={() => {
              firstEligibility();
            }}
          >
            Apply Now
          </button>
        </div>
        <Toaster/>
      </section>
    </>
  );
};

export default About;
