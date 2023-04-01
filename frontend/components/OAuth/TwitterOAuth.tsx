import React from 'react';
import TwitterLogin from 'react-twitter-login';

const TwitterOAuth = () => {

    const handleTwitterResponse = (response:any) => {
        console.log(response);
    }

    return (
        <TwitterLogin
            authCallback={handleTwitterResponse}
            consumerKey="YOUR_CONSUMER_KEY"
            consumerSecret="YOUR_CONSUMER_SECRET"
            callbackUrl="http://localhost:3000"
            buttonTheme="dark"
        />
    );
}

export default TwitterOAuth;
