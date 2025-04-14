import pandas as pd
import os 

def load_data():
    file_path = "/Users/monic/Documents/GitHub/WNBAStats/backend/data/wnba_box_scores_merge.csv"
    # cleaned_path = "backend/data/wnba_cleaned.csv"
    updatedData = "/Users/monic/Documents/GitHub/WNBAStats/backend/data/updatedData.csv"



    if not os.path.exists(file_path):
        print(f"ERROR: {file_path} not found!")
        return

    print(f"found file: {file_path}")


    df = pd.read_csv(file_path)
    print("file load success")


    # df.dropna(inplace= True)



    columns_to_drop = ["fast_break_points", "points_in_paint", "turnover_points", "largest_lead",
                       "team_color", "team_alternate_color", "team_logo", "opponent_team_color",
       "opponent_team_alternate_color", "opponent_team_logo",
       "opponent_team_score"]
    print("dropping unnecessary columns..")
    
    df.drop(columns=columns_to_drop, inplace= True, errors="ignore")

    # cleaned_file_path = "data/wnba_cleaned.csv"
    df.to_csv(updatedData, index=False)

    print(f"cleaned data saved to {updatedData}")
    

    return df



if __name__ == "__main__":
    load_data()

