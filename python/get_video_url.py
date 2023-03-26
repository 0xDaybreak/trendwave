import praw
from pymongo import MongoClient

reddit = praw.Reddit(client_id='***REMOVED***',
                     client_secret='***REMOVED***',
                     user_agent='your_user_agent')

submission = reddit.submission(
    url='https://www.reddit.com/r/oddlysatisfying/comments/122c5ba/a_tardigrade_entering_tun_state_as_the_water/')
video_url = submission.media['reddit_video']['fallback_url']

client = MongoClient("mongodb://localhost:27017")
print("Connection Successful")
db = client.video_site
collection = db.video

link = {"url": video_url}

result = collection.insert_one(link)
client.close()

print("wrote to db the following ObjectId " + str(result.inserted_id))
