import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { CheckCircle, AlertTriangle, Info } from "lucide-react"
import axios from "axios"

const LabReport = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    pregnancies: "",
    glucose: "",
    bloodPressure: "",
    skinThickness: "",
    insulin: "",
    bmi: "",
    diabetesPedigree: "",
    age: ""
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  // Changed predictionResult to string | null as per backend response
  const [predictionResult, setPredictionResult] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [customMessage, setCustomMessage] = useState(null)

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value === "" ? "" : Number(value)
    })

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    let isValid = true

    // Validate each field
    Object.entries(formData).forEach(([key, value]) => {
      if (value === "") {
        newErrors[key] = "This field is required"
        isValid = false
      }
    })

    // Additional validations
    if (
      formData.glucose !== "" &&
      (formData.glucose < 0 || formData.glucose > 300)
    ) {
      newErrors.glucose = "Glucose should be between 0 and 300 mg/dL"
      isValid = false
    }

    if (
      formData.bloodPressure !== "" &&
      (formData.bloodPressure < 0 || formData.bloodPressure > 200)
    ) {
      newErrors.bloodPressure =
        "Blood pressure should be between 0 and 200 mm Hg"
      isValid = false
    }

    if (formData.bmi !== "" && (formData.bmi < 10 || formData.bmi > 50)) {
      newErrors.bmi = "BMI should be between 10 and 50"
      isValid = false
    }

    if (formData.age !== "" && (formData.age < 0 || formData.age > 120)) {
      newErrors.age = "Age should be between 0 and 120 years"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Added console logs for debugging
      console.log("Submitting form data:", formData)
      const response = await axios.post(
        "http://localhost:5000/predict",
        formData
      )
      console.log("Prediction response:", response.data)
      setPredictionResult(response.data.prediction)
      setCustomMessage(response.data.message)
      setShowResult(true)
      console.log("showResult set to true after successful prediction.")
    } catch (error) {
      console.error("Error submitting lab report:", error)
      alert("Failed to process your lab report. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    console.log("handleClose called. Current showResult:", showResult)
    setShowResult(false)
    console.log("showResult after setShowResult(false):", false)
    // Optional: Reset formData if you want the form to be empty after closing the modal
    // setFormData({
    //   pregnancies: '', glucose: '', bloodPressure: '', skinThickness: '',
    //   insulin: '', bmi: '', diabetesPedigree: '', age: ''
    // });
    navigate("/dashboard")
  }

  const renderInfoTooltip = text => (
    <div className="group relative">
      <div className="flex items-center ml-1">
        <Info className="h-4 w-4 text-gray-400" />
      </div>
      <div className="hidden group-hover:block absolute z-10 w-64 p-2 mt-2 text-sm text-gray-600 bg-white rounded-lg border border-gray-200 shadow-sm">
        {text}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold text-gray-900">Lab Report Form</h1>
          <p className="mt-2 text-gray-600">
            Enter your health metrics to get a diabetes risk assessment based on
            the PIMA Diabetes Dataset factors.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Pregnancies */}
              <div>
                <div className="flex items-center">
                  <label
                    htmlFor="pregnancies"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Number of Pregnancies
                  </label>
                  {renderInfoTooltip(
                    "The number of times pregnant. Enter 0 for males or if never pregnant."
                  )}
                </div>
                <input
                  type="number"
                  name="pregnancies"
                  id="pregnancies"
                  value={formData.pregnancies}
                  onChange={handleChange}
                  min="0"
                  max="20"
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.pregnancies ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500`}
                />
                {errors.pregnancies && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.pregnancies}
                  </p>
                )}
              </div>

              {/* Glucose */}
              <div>
                <div className="flex items-center">
                  <label
                    htmlFor="glucose"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Plasma Glucose Concentration
                  </label>
                  {renderInfoTooltip(
                    "2-hour plasma glucose concentration from an oral glucose tolerance test (mg/dL)."
                  )}
                </div>
                <input
                  type="number"
                  name="glucose"
                  id="glucose"
                  value={formData.glucose}
                  onChange={handleChange}
                  min="0"
                  max="300"
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.glucose ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500`}
                />
                {errors.glucose && (
                  <p className="mt-1 text-sm text-red-600">{errors.glucose}</p>
                )}
              </div>

              {/* Blood Pressure */}
              <div>
                <div className="flex items-center">
                  <label
                    htmlFor="bloodPressure"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Diastolic Blood Pressure
                  </label>
                  {renderInfoTooltip("Diastolic blood pressure (mm Hg).")}
                </div>
                <input
                  type="number"
                  name="bloodPressure"
                  id="bloodPressure"
                  value={formData.bloodPressure}
                  onChange={handleChange}
                  min="0"
                  max="200"
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.bloodPressure ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500`}
                />
                {errors.bloodPressure && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.bloodPressure}
                  </p>
                )}
              </div>

              {/* Skin Thickness */}
              <div>
                <div className="flex items-center">
                  <label
                    htmlFor="skinThickness"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Triceps Skin Fold Thickness
                  </label>
                  {renderInfoTooltip("Triceps skin fold thickness (mm).")}
                </div>
                <input
                  type="number"
                  name="skinThickness"
                  id="skinThickness"
                  value={formData.skinThickness}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.skinThickness ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500`}
                />
                {errors.skinThickness && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.skinThickness}
                  </p>
                )}
              </div>

              {/* Insulin */}
              <div>
                <div className="flex items-center">
                  <label
                    htmlFor="insulin"
                    className="block text-sm font-medium text-gray-700"
                  >
                    2-Hour Serum Insulin
                  </label>
                  {renderInfoTooltip("2-Hour serum insulin (mu U/ml).")}
                </div>
                <input
                  type="number"
                  name="insulin"
                  id="insulin"
                  value={formData.insulin}
                  onChange={handleChange}
                  min="0"
                  max="1000"
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.insulin ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500`}
                />
                {errors.insulin && (
                  <p className="mt-1 text-sm text-red-600">{errors.insulin}</p>
                )}
              </div>

              {/* BMI */}
              <div>
                <div className="flex items-center">
                  <label
                    htmlFor="bmi"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Body Mass Index (BMI)
                  </label>
                  {renderInfoTooltip(
                    "Body mass index (weight in kg/(height in m)^2)."
                  )}
                </div>
                <input
                  type="number"
                  name="bmi"
                  id="bmi"
                  value={formData.bmi}
                  onChange={handleChange}
                  min="10"
                  max="50"
                  step="0.1"
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.bmi ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500`}
                />
                {errors.bmi && (
                  <p className="mt-1 text-sm text-red-600">{errors.bmi}</p>
                )}
              </div>

              {/* Diabetes Pedigree Function */}
              <div>
                <div className="flex items-center">
                  <label
                    htmlFor="diabetesPedigree"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Diabetes Pedigree Function
                  </label>
                  {renderInfoTooltip(
                    "Diabetes pedigree function (a function which scores likelihood of diabetes based on family history)."
                  )}
                </div>
                <input
                  type="number"
                  name="diabetesPedigree"
                  id="diabetesPedigree"
                  value={formData.diabetesPedigree}
                  onChange={handleChange}
                  min="0.05"
                  max="2.5"
                  step="0.01"
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.diabetesPedigree
                      ? "border-red-300"
                      : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500`}
                />
                {errors.diabetesPedigree && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.diabetesPedigree}
                  </p>
                )}
              </div>

              {/* Age */}
              <div>
                <div className="flex items-center">
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Age
                  </label>
                  {renderInfoTooltip("Age in years.")}
                </div>
                <input
                  type="number"
                  name="age"
                  id="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="0"
                  max="120"
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.age ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500`}
                />
                {errors.age && (
                  <p className="mt-1 text-sm text-red-600">{errors.age}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Submit Lab Report"
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Results Modal */}
        {showResult && predictionResult !== null && (
          // Main modal wrapper with high z-index
          <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
              {/* Overlay with a slightly lower z-index */}
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-40"></div>

              {/* Modal content container with relative and high z-index to sit on top of the overlay */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 relative z-50"
              >
                <div>
                  {/* Icon rendering logic based on string predictionResult */}
                  <div
                    className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full ${
                      predictionResult === "Diabetic"
                        ? "bg-red-100"
                        : "bg-green-100"
                    }`}
                  >
                    <div
                      className={
                        predictionResult === "Diabetic"
                          ? "text-red-600"
                          : "text-green-600"
                      }
                    >
                      {predictionResult === "Diabetic" ? (
                        <AlertTriangle className="h-8 w-8" />
                      ) : (
                        <CheckCircle className="h-8 w-8" />
                      )}
                    </div>
                  </div>

                  <h2 style={{ textAlign: "center" }}>
                    <b>Prediction Result</b>
                  </h2>
                  <h3
                    style={{
                      textAlign: "center",
                      color: predictionResult === "Diabetic" ? "red" : "green"
                    }}
                  >
                    {predictionResult}
                  </h3>
                  <p>{customMessage}</p>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-cyan-600 text-base font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 sm:text-sm"
                  >
                    Return to Dashboard
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LabReport;
