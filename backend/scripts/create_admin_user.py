import requests

API_URL = "http://localhost:5000/auth/register"

admin_payload = {
    "first_name": "Mohammad",
    "last_name": "Bazargan",
    "mobile": "09000000000",
    "username": "mammadbazargan",
    "email": "testadmin@yahoo.com",
    "password": "123456789",
    "role": "admin",
}

try:
    response = requests.post(API_URL, json=admin_payload)

    if response.status_code == 201:
        print("✅ Admin user created!")
        print(response.json())
    else:
        print(f"❌ Failed to create admin user!")
        print(response.json())
except:
    print("Oops! Error occured. Try again later.")
