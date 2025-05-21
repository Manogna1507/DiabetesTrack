import React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, Heart, BarChart, Shield, FileCheck } from "lucide-react"

const Home = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-cyan-700 to-cyan-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* <h1 className="text-4xl md:text-5xl font-bold mb-4">Take Control of Your Diabetes Journey</h1> */}
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-snug">
                Take Control of Your Diabetes Journey
              </h1>

              <p className="text-lg mb-8">
                Track, manage, and understand your diabetes health metrics with
                our comprehensive platform.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/lab-report"
                  className="bg-white text-cyan-700 hover:bg-gray-100 py-3 px-6 rounded-md font-medium transition-colors flex items-center justify-center"
                >
                  Check Your Risk
                  <FileCheck className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/signup"
                  className="border border-white text-white hover:bg-white hover:text-cyan-700 py-3 px-6 rounded-md font-medium transition-colors flex items-center justify-center"
                >
                  Create Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden md:block"
            >
              <div className="overflow-hidden rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <img
                  src="https://kdahweb-static.kokilabenhospital.com/kdah-2019/shop/package/images/16225513280.jpg"
                  alt="Diabetes Awareness"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              What You Can Do Today
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Start building healthy habits and awareness without needing an
              account
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Heart className="h-12 w-12 text-cyan-600" />,
                title: "Daily Health Tips",
                description:
                  "Get easy, actionable tips for managing blood sugar, stress, and meals."
              },
              {
                icon: <BarChart className="h-12 w-12 text-cyan-600" />,
                title: "Glucose Basics",
                description:
                  "Learn what glucose levels mean and how to monitor them effectively."
              },
              {
                icon: <Shield className="h-12 w-12 text-cyan-600" />,
                title: "Preventive Habits",
                description:
                  "Discover simple lifestyle changes that help prevent type 2 diabetes."
              },
              {
                icon: <FileCheck className="h-12 w-12 text-cyan-600" />,
                title: "Track Your Routine",
                description:
                  "Use a printable tracker to log meals, sleep, and hydration manually."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Diabetes Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Understanding Diabetes
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Understanding the condition is the first step toward managing it
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-8 rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                What is Diabetes?
              </h3>
              <p className="text-gray-700 mb-4">
                Diabetes is a chronic disease that affects how your body turns
                food into energy. Most food is broken down into sugar (glucose),
                which enters the bloodstream.
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li>
                  The pancreas releases insulin to help blood sugar enter cells
                </li>
                <li>
                  If you have diabetes, either your body doesn’t make enough
                  insulin or can’t use it efficiently
                </li>
                <li>
                  High blood sugar levels over time can cause serious health
                  issues
                </li>
              </ul>
              <Link
                to="/lab-report"
                className="inline-flex items-center text-cyan-600 hover:text-cyan-700 font-medium"
              >
                Check your risk factors
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-8 rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Types of Diabetes
              </h3>
              <div className="space-y-6">
                {[
                  {
                    type: "Type 1 Diabetes",
                    desc:
                      "Often diagnosed in childhood, caused by an autoimmune response. Insulin therapy is required daily."
                  },
                  {
                    type: "Type 2 Diabetes",
                    desc:
                      "Linked to lifestyle and genetics. Can often be managed with diet, exercise, and oral medications."
                  },
                  {
                    type: "Gestational Diabetes",
                    desc:
                      "Occurs during pregnancy. Needs careful monitoring to avoid complications for mother and baby."
                  },
                  {
                    type: "Prediabetes",
                    desc:
                      "Blood sugar is higher than normal but not high enough for a diabetes diagnosis. It's reversible with lifestyle changes."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="text-xl font-medium text-cyan-700 mb-2">
                      {item.type}
                    </h4>
                    <p className="text-gray-700">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/*Diet plan*/}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Diabetes-Friendly Diets
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Fuel your body the right way for your type of diabetes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Type 1 Diabetes",
                image:
                  "https://cdn.pixabay.com/photo/2015/04/08/13/13/food-712665_960_720.jpg",
                tips: [
                  "Match insulin doses with carb intake",
                  "Avoid sugary drinks",
                  "Include protein-rich foods like tofu, eggs, legumes"
                ]
              },
              {
                title: "Type 2 Diabetes",
                image:
                  "https://cdn.pixabay.com/photo/2017/06/02/18/24/diet-2367029_960_720.jpg",
                tips: [
                  "Choose whole grains over refined carbs",
                  "Eat high-fiber vegetables (spinach, broccoli)",
                  "Limit red meat, fried foods, and trans fats"
                ]
              },
              {
                title: "Gestational Diabetes",
                image:
                  "https://cdn.pixabay.com/photo/2016/03/05/19/02/salad-1238249_960_720.jpg",
                tips: [
                  "Eat every 2-3 hours to maintain sugar levels",
                  "Include healthy fats like avocado, nuts",
                  "Avoid white rice, sweetened cereals, and pastries"
                ]
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {item.tips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
