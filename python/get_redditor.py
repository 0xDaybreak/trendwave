import praw
from pymongo import MongoClient
from datetime import date

reddit = praw.Reddit(client_id='***REMOVED***',
                     client_secret='***REMOVED***',
                     user_agent='your_user_agent')

client = MongoClient("mongodb://localhost:27017")
print("Connection Successful")
db = client.videosite
collection = db.redditor

redditor = reddit.redditor('himthecool21')  # Replace 'USERNAME' with the desired Reddit username
avatar_url = redditor.icon_img

redditor = {"avatarurl": avatar_url}

result = collection.insert_one(redditor)

print(f"Avatar URL: {avatar_url}")