import requests
import json
import time

API_URL = "http://localhost:5000/foods"

json_dataset = "foods.json"
food_items = []

with open(json_dataset, "r", encoding="utf-8") as fileObj:
    data = json.load(fileObj)

for key in data.keys():
    for obj in data[key]:
        food_items.append(obj)

fileObj.close()

# Load food items into database
loaded_items = 0
failed_items = 0
for item in food_items:
    try:
        res = requests.post(API_URL, json=item, timeout=10)
        if res.ok:
            print(f"✅ {item["food_name"]}")
            loaded_items += 1
        else:
            print(f"❌ {item["food_name"]} ({res.json()['message']})")
            failed_items += 1
        time.sleep(0.5)
    except:
        continue

report = f"""\nTotal number of food items loaled successfully: {loaded_items} ✅
Total number of food items failed: {failed_items} ❌\n"""
print(report)
