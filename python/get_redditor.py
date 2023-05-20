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

reddit_usernames = ['Bitdream200k', 'himthecool21']

for reddit_u in reddit_usernames:
    redditor_username = reddit_u
    redditor = reddit.redditor(reddit_u)  # Replace 'USERNAME' with the desired Reddit username
    avatar_url = redditor.icon_img
    # Get top 5 subreddits where the user posts
    subreddit_count = {}
    # Get the user's most recent submissions
    submissions = redditor.submissions.new(limit=None)

    # Count occurrences of each subreddit
    for submission in submissions:
        subreddit = submission.subreddit.display_name
        subreddit_count[subreddit] = subreddit_count.get(subreddit, 0) + 1
    # Get the top 5 subreddits with the highest occurrence count
    top_5_subreddits = sorted(subreddit_count, key=subreddit_count.get, reverse=True)[:5]

    redditor = {"avatarurl": avatar_url,
                "redditUsername": reddit_u,
                "topSubreddits": top_5_subreddits}

    result = collection.insert_one(redditor)

print(f"Avatar URL: {avatar_url}")
print(f"Top 5 Subreddits: {top_5_subreddits}")

