from flask import Flask, jsonify
from flask_cors import CORS 
import pandas as pd

app = Flask(__name__) 
CORS(app)

@app.route("/")
def home():
    return "loaded page"

df = pd.read_csv("data/updatedData.csv")


@app.route('/api/data', methods=['GET'])
def get_data():
    """return small sample"""
    return jsonify(df.to_dict(orient='records'))

if __name__ == "__main__":
    app.run(debug=True)
