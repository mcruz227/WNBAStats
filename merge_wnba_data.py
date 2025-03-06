import pandas as pd 
import os

folder_path = "/Users/monic/Documents/wnba_box_scores"

print (f"looking for csv files in: {folder_path}")
csv_files = [f for f in os.listdir(folder_path) if f.endswith(".csv")]

print(f"Found {len(csv_files)} CSV files: {csv_files}")

if not csv_files:
    print(" no csv files found.")
    exit()

#creates empty to list to put the data frames
df_list = [] 

for file in csv_files:
    file_path = os.path.join(folder_path, file)
    df = pd.read_csv(file_path)
    df["season"] = file.split("_")[-1].split(".")[0] 
    df_list.append(df)


    #combining all data frames into one

merged_df = pd.concat(df_list, ignore_index=True) 
merged_df.to_csv("wnba_box_scores_merge.csv", index=False)

print(f"Merged CSV file saved successfully!!!")