import praw

reddit = praw.Reddit(client_id='***REMOVED***',
                     client_secret='***REMOVED***',
                     user_agent='your_user_agent')

submission = reddit.submission(url='https://www.reddit.com/r/oddlysatisfying/comments/122c5ba/a_tardigrade_entering_tun_state_as_the_water/')
video_url = submission.media['reddit_video']['fallback_url']

print(video_url)
