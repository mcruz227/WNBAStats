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

    
  
    df = pd.read_csv('/Users/monic/Documents/GitHub/WNBAStats/backend/data/team_summary.csv')

    # df['team-name'] = df['team_name'].astype(str).str.strip().str.lower()
    # # df['team_winner'] = df['team_winner'].astype(str).str.strip().str.lower()
    # df['season'] = df['season'].astype(str)

    # # df['Win'] = (df['team_name'] == df['team_winner']).astype(int)
    # # df['Loss'] = (df['team_name'] == df['team_winner']).astype(int)

    # grouped = df.groupby(["team_name", "season"]).agg({
    #     "Win": "sum",
    #     "Loss": "sum"
    # }).reset_index()

    # grouped["win_pct"] = grouped["Win"] / (grouped["Win"] + grouped["Loss"])

    # grouped["status"] = grouped["win_pct"].apply(lambda x: "Prime" if x >= 0.5 else "Rebuilding")
   
    # grouped.columns = ["team_name", "season", "wins", "losses", "win_pct", "status"]
   
   
    return jsonify(df.to_dict(orient='records'))

if __name__ == "__main__":
    app.run(debug=True)
