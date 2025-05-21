// This is a simplified prediction model for demonstration purposes
// In a real application, this would use TensorFlow.js or another ML library

class PredictionModel {
  constructor() {
    // Initialize model
    console.log('Initializing diabetes prediction model');
  }

  // Simple prediction function based on risk factors
  // In a real app, this would use an actual trained ML model
  async predict(data) {
    const {
      pregnancies,
      glucose,
      bloodPressure,
      skinThickness,
      insulin,
      bmi,
      diabetesPedigree,
      age
    } = data;

    // Simple weighted factors (this is NOT an accurate medical model)
    // This is just for demonstration purposes
    let riskScore = 0;

    // Glucose factor (high importance)
    if (glucose > 140) riskScore += 0.35;
    else if (glucose > 125) riskScore += 0.25;
    else if (glucose > 100) riskScore += 0.15;
    else riskScore += 0.05;

    // BMI factor
    if (bmi > 35) riskScore += 0.2;
    else if (bmi > 30) riskScore += 0.15;
    else if (bmi > 25) riskScore += 0.1;
    else riskScore += 0.05;

    // Age factor
    if (age > 60) riskScore += 0.15;
    else if (age > 40) riskScore += 0.1;
    else if (age > 30) riskScore += 0.05;
    else riskScore += 0.02;

    // Blood pressure factor
    if (bloodPressure > 90) riskScore += 0.15;
    else if (bloodPressure > 80) riskScore += 0.1;
    else riskScore += 0.05;

    // Diabetes pedigree factor (family history)
    if (diabetesPedigree > 1.0) riskScore += 0.15;
    else if (diabetesPedigree > 0.5) riskScore += 0.1;
    else riskScore += 0.05;

    // Add some randomness to make it look more realistic
    const randomFactor = Math.random() * 0.1 - 0.05;
    
    // Ensure the final score is between 0 and 1
    return Math.min(0.95, Math.max(0.05, riskScore + randomFactor));
  }
}

export default new PredictionModel();