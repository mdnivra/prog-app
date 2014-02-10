<?php
error_reporting(E_ALL);

require(app_path().'/lib/twitteroauth/config.php');
require_once(app_path().'/lib/twitterApi/twitterAPIExchange.php');


class Job_TwitterJobController extends BaseController {



	private function getHandlerInfo($screenname,$user_id,$settings){
		$url = 'https://api.twitter.com/1.1/users/show.json';
        $getfield = '?user_id='.$user_id.'&screen_name='.$screenname;
        $requestMethod = 'GET';
        $twitter = new TwitterAPIExchange($settings);
        $response =$twitter->setGetfield($getfield)
                     ->buildOauth($url, $requestMethod)
                     ->performRequest();

        $response = json_decode($response,true);

        //followers_count  folowers count
		//statuses_count    tweet count
		//profile_image_url   image
		//favourites_count favourite count
		//friends_count following count

		$arraytmp =explode('.',$response['profile_image_url'] );
        $this->moveToAsset($response['profile_image_url'],
           		'images/twitter-profiles/' .$user_id. '.' . $arraytmp[count($arraytmp)-1]);

        return json_encode(array(
			'followers_count' => $response['followers_count'],
			'tweet_count'     => $response['statuses_count'],
			'profile_image_url' => 'images/twitter-profiles/' .$user_id. '.' . $arraytmp[count($arraytmp)-1],   
			'favourites_count' => $response['favourites_count'],  
			'following_count' => $response['friends_count'] 
			)
        );
    }


    public function TwitterInsights(){
    	$settings = array(
		    'oauth_access_token' => OAUTH_ACCESS_TOKEN,
		    'oauth_access_token_secret' => OAUTH_ACCESS_TOKEN_SECRET,
		    'consumer_key' => CONSUMER_KEY,
		    'consumer_secret' => CONSUMER_SECRET
		);

    	$twitterAccounts =  Job::getTwitterAccounts();

    	foreach ($twitterAccounts as $twitterAccount) {
			$jobData = $this->GetHandlerInfo($twitterAccount['username'],
					$twitterAccount['object_id'],$settings);
			$socialAccountJob  =  SocialAccountJob::where('social_account_id'
								 ,$twitterAccount->id)->first();

			if (!$socialAccountJob){
				$socialAccountJob = new SocialAccountJob();
				$socialAccountJob->social_account_id = $twitterAccount->id;

			}
					
			$socialAccountJob->data  = $jobData;
			$socialAccountJob->save();
    	}
    }
	

}