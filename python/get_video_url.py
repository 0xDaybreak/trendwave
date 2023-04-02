import praw
from pymongo import MongoClient

reddit = praw.Reddit(client_id='***REMOVED***',
                     client_secret='***REMOVED***',
                     user_agent='your_user_agent')

client = MongoClient("mongodb://localhost:27017")
print("Connection Successful")
db = client.video_site
collection = db.videoEntity

# Get the top posts from r/oddlysatisfying for today
submissions = reddit.subreddit('oddlysatisfying').top(time_filter='day', limit=10)

# Loop through the submissions and extract any videos
for submission in submissions:
    # Check if the submission has a reddit video
    if hasattr(submission, 'media') and submission.media is not None and submission.media.get(
            'reddit_video') is not None:
        # Get the URL of the reddit video
        video_url = submission.media['reddit_video']['fallback_url']

        # Do something with the video URL, such as download it or save it to a database
        video_entity = {"url": video_url,
                        "tags": [submission.subreddit.display_name, "test2"],
                        "likes": 0}
        result = collection.insert_one(video_entity)
        print(f"Found video: {video_url}")
        print(f"Inserted obj in DB:{video_entity}")

client.close()
