import pandas as pd

file_path = "/Users/monic/Documents/GitHub/WNBAStats/backend/data/wnba_box_scores_merge.csv"

df = pd.read_csv(file_path)

print(df["season"].unique())