import requests
import time

API_URL = "http://localhost:5000/categories"

categories = ["food", "vegetable", "fruit"]

# Load categories items into database
loaded_items = 0
failed_items = 0

for category in categories:
    try:
        res = requests.post(API_URL, json={"category_name": category}, timeout=10)
        if res.ok:
            print(f"✅ {category}")
            loaded_items += 1
        else:
            print(f"❌ {category} ({res.json()['message']})")
            failed_items += 1
    except:
        continue
    time.sleep(0.5)

report = f"""\nTotal number of categories loaled successfully: {loaded_items} ✅
Total number of categories failed: {failed_items} ❌\n"""
print(report)
