import requests
import json
import time
import sys

API_URL = "http://localhost:5000/foods"

json_dataset = "foods.json"
food_items = []

with open(json_dataset, "r", encoding="utf-8") as fileObj:
    data = json.load(fileObj)

for key in data.keys():
    for obj in data[key]:
        food_items.append(obj)


# Login with admin credentials to have an access token
bearer_token_header = {}
login_payload = {"email": "testadmin@yahoo.com", "password": "123456789"}
try:
    login_response = requests.post(
        "http://localhost:5000/auth/login", json=login_payload
    )
    if login_response.status_code == 200:
        bearer_token_header["Authorization"] = (
            f"Bearer {login_response.json()['token']}"
        )
    else:
        print(
            "❌ Failed to login as admin. Make sure you run create_admin_user.py script fist."
        )
        sys.exit(1)
except Exception as e:
    print(f"Oops! Error occured. Try again later.\n{e}")
    sys.exit(1)

# Load food items into database
loaded_items = 0
failed_items = 0
for item in food_items:
    try:
        res = requests.post(API_URL, headers=bearer_token_header, json=item, timeout=10)
        if res.ok:
            print(f"✅ {item['food_name']}")
            loaded_items += 1
        else:
            print(f"❌ {item['food_name']} ({res.json()['message']})")
            failed_items += 1
        time.sleep(0.5)
    except Exception as e:
        print(f"❌ {item.get('food_name', 'Unknown')} ({e})")
        failed_items += 1

report = f"""\nTotal number of food items loaled successfully: {loaded_items} ✅
Total number of food items failed: {failed_items} ❌\n"""
print(report)
