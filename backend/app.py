from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load trained model
with open('diabetes_model.pkl', 'rb') as f:
    model = pickle.load(f)

# Load the scaler
with open('scaler.pkl', 'rb') as f:
    scaler = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    # Extract features
    features = [
        data.get('pregnancies', 0),
        data.get('glucose', 0),
        data.get('bloodPressure', 0),
        data.get('skinThickness', 0),
        data.get('insulin', 0),
        data.get('bmi', 0),
        data.get('diabetesPedigree', 0),
        data.get('age', 0)
    ]

    # Prepare input
    input_array = np.array(features).reshape(1, -1)
    input_scaled = scaler.transform(input_array)
    input_final = input_scaled.reshape(input_scaled.shape[0], input_scaled.shape[1], 1)

    # Predict
    prediction = model.predict(input_final)[0][0]
    result = "Diabetic" if prediction > 0.5 else "Non-Diabetic"

    # Custom message
    message = (
        "You may have diabetes. Please consult a healthcare provider for further evaluation."
        if result == "Diabetic" else
        "You are not likely diabetic based on the current input. Keep monitoring your health regularly."
    )

    return jsonify({
        'prediction': result,
        'message': message
    })

if __name__ == '__main__':
    app.run(debug=True)
