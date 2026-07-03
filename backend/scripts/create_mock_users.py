import requests
import time

API_URL = "http://localhost:5000/auth/register"

users = [
    {
        "first_name": "Ava",
        "last_name": "Turner",
        "mobile": "09000000001",
        "username": "ava.turner",
        "email": "ava.turner@example.com",
        "password": "TestPass001!",
    },
    {
        "first_name": "Liam",
        "last_name": "Brooks",
        "mobile": "09000000002",
        "username": "liam.brooks",
        "email": "liam.brooks@example.com",
        "password": "TestPass002!",
    },
    {
        "first_name": "Mia",
        "last_name": "Carter",
        "mobile": "09000000003",
        "username": "mia.carter",
        "email": "mia.carter@example.com",
        "password": "TestPass003!",
    },
    {
        "first_name": "Noah",
        "last_name": "Hayes",
        "mobile": "09000000004",
        "username": "noah.hayes",
        "email": "noah.hayes@example.com",
        "password": "TestPass004!",
    },
    {
        "first_name": "Emma",
        "last_name": "Reed",
        "mobile": "09000000005",
        "username": "emma.reed",
        "email": "emma.reed@example.com",
        "password": "TestPass005!",
    },
    {
        "first_name": "Lucas",
        "last_name": "Foster",
        "mobile": "09000000006",
        "username": "lucas.foster",
        "email": "lucas.foster@example.com",
        "password": "TestPass006!",
    },
    {
        "first_name": "Olivia",
        "last_name": "Bennett",
        "mobile": "09000000007",
        "username": "olivia.bennett",
        "email": "olivia.bennett@example.com",
        "password": "TestPass007!",
    },
    {
        "first_name": "Ethan",
        "last_name": "Morgan",
        "mobile": "09000000008",
        "username": "ethan.morgan",
        "email": "ethan.morgan@example.com",
        "password": "TestPass008!",
    },
    {
        "first_name": "Sophia",
        "last_name": "Gray",
        "mobile": "09000000009",
        "username": "sophia.gray",
        "email": "sophia.gray@example.com",
        "password": "TestPass009!",
    },
    {
        "first_name": "James",
        "last_name": "Perry",
        "mobile": "09000000010",
        "username": "james.perry",
        "email": "james.perry@example.com",
        "password": "TestPass010!",
    },
    {
        "first_name": "Isabella",
        "last_name": "Cole",
        "mobile": "09000000011",
        "username": "isabella.cole",
        "email": "isabella.cole@example.com",
        "password": "TestPass011!",
    },
    {
        "first_name": "Benjamin",
        "last_name": "Ward",
        "mobile": "09000000012",
        "username": "benjamin.ward",
        "email": "benjamin.ward@example.com",
        "password": "TestPass012!",
    },
    {
        "first_name": "Charlotte",
        "last_name": "Bell",
        "mobile": "09000000013",
        "username": "charlotte.bell",
        "email": "charlotte.bell@example.com",
        "password": "TestPass013!",
    },
    {
        "first_name": "Henry",
        "last_name": "Diaz",
        "mobile": "09000000014",
        "username": "henry.diaz",
        "email": "henry.diaz@example.com",
        "password": "TestPass014!",
    },
    {
        "first_name": "Amelia",
        "last_name": "Fisher",
        "mobile": "09000000015",
        "username": "amelia.fisher",
        "email": "amelia.fisher@example.com",
        "password": "TestPass015!",
    },
    {
        "first_name": "Alexander",
        "last_name": "Stone",
        "mobile": "09000000016",
        "username": "alexander.stone",
        "email": "alexander.stone@example.com",
        "password": "TestPass016!",
    },
    {
        "first_name": "Harper",
        "last_name": "Wells",
        "mobile": "09000000017",
        "username": "harper.wells",
        "email": "harper.wells@example.com",
        "password": "TestPass017!",
    },
    {
        "first_name": "Daniel",
        "last_name": "Price",
        "mobile": "09000000018",
        "username": "daniel.price",
        "email": "daniel.price@example.com",
        "password": "TestPass018!",
    },
    {
        "first_name": "Ella",
        "last_name": "Brooks",
        "mobile": "09000000019",
        "username": "ella.brooks",
        "email": "ella.brooks@example.com",
        "password": "TestPass019!",
    },
    {
        "first_name": "Michael",
        "last_name": "Hughes",
        "mobile": "09000000020",
        "username": "michael.hughes",
        "email": "michael.hughes@example.com",
        "password": "TestPass020!",
    },
]


for user in users:
    try:
        response = requests.post(API_URL, json=user)
        if response.status_code == 201:
            print("✅ User created!")
            print(response.json())
        else:
            print(f"❌ Failed to create admin user!")
            print(response.json())
        time.sleep(0.5)
    except:
        print("Oops! Error occured. Try again later.")
