from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
print("Connection Successful")
db = client.videosite
collection = db.category

categories = ["oddlysatisfying", "woahdude", "damnthatsinteresting"]
for category in categories:
    category_entry = {"cName": category}
    collection.insert_one(category_entry)
