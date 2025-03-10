from flask import Flask, jsonify
import pandas as pd

app = Flask(__name__) 

@app.route("/")
def home():
    return "Wlcome to the wnba analystics api"

df = pd.read_csv("backend/data/wnba_cleaned.csv")


@app.route('/api/data', methods=['GET'])
def get_data():
    """retunr smal sample"""
    return jsonify(df.head(10).to_dict(orient='records'))

if __name__ == "__main__":
    app.run(debug=True)
