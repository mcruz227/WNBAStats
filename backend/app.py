from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS 
import os
import pandas as pd

app = Flask(__name__, static_folder="build", static_url_path="")
CORS(app)


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")




@app.route('/api/data', methods=['GET'])
def get_data():
    csv_path = (os.path.join(os.path.dirname(__file__),'data', 'team_summary.csv'))

    df = pd.read_csv(csv_path)

    return jsonify(df.to_dict(orient='records'))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
