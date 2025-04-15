import pandas as pd

df = pd.read_csv("Users/monic/Documents/GitHub/WNBAStats/backend/data/updatedData.csv"
)

summary_df = df.groupby(["team_name", "season"]).agg(
    games_played=("team_winner", "count"), wins =("team_winner", "sum")

).reset_index()

summary_df["losses"] = summary_df["games_played"] - summary_df["wins"]
summary_df["win_pct"] = summary_df["wins"] - summary_df["games_played"]

print(summary_df.head())

summary_df.to_csv("team_summary.csv", index=False)
