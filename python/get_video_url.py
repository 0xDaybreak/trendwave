import praw
from pymongo import MongoClient
from datetime import date

reddit = praw.Reddit(client_id='***REMOVED***',
                     client_secret='***REMOVED***',
                     user_agent='your_user_agent')

client = MongoClient("mongodb://localhost:27017")
print("Connection Successful")
db = client.videosite
collection = db.videoEntity

# Get the top posts from r/oddlysatisfying for today
submissions = reddit.subreddit('oddlysatisfying').top(time_filter='day', limit=30)

# get current date
today = str(date.today())

# Loop through the submissions and extract any videos with sound
for submission in submissions:
    # Check if the submission has a reddit video with sound
    if hasattr(submission, 'media') and submission.media is not None and submission.media.get(
            'reddit_video') is not None and not submission.media['reddit_video'].get('is_gif', False):
        # Get the URL of the reddit video
        video_url = submission.media['reddit_video']['fallback_url']
        post_url = submission.permalink

        # Check if the submission has a sound url
        sound_url = None
        sound_url = submission.media['reddit_video']['fallback_url']
        pos = sound_url.find("DASH")  # find the index of the first occurrence of "DASH"
        if pos != -1:
            pos = pos + 4
            sound_url = sound_url[:pos]+"_audio.mp4"
        hls_url = submission.media['reddit_video'].get('hls_url')
    # Do something with the video URL, such as download it or save it to a database
        video_entity = {"url": video_url,
                        "audio": sound_url,
                        "hls": hls_url,
                        "post": post_url,
                        "tags": ["test1", "test2"],
                        "likes": 0,
                        "date": today,
                        "subreddit": submission.subreddit.display_name.lower()}

        result = collection.insert_one(video_entity)
        print(f"Found video: {video_url}")
        print(f"Inserted obj in DB:{video_entity}")

client.close()
