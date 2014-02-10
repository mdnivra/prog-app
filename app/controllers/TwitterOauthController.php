<?php
include(app_path().'/lib/twitteroauth/twitteroauth/twitteroauth.php');
include(app_path().'/lib/twitteroauth/config.php');


class TwitterOauthController extends Controller {

	/**
	 * Setup the layout used by the controller.
	 *
	 * @return void
	 */
	public function checkUsername(){
		if (Input::has('username'))
		{	$usernames =explode(',',Input::get('username'));
			$output =array();
			foreach ($usernames as $key => $value) {
				$response =$this->exceuteApi('users/show/'.$value);
				if (isset($response->error)){
					$output[$value] ="username does not exist";
				}else{
					$output[$value] =$response;
				}
			}
		    return Response::json($output);
		}else{
			return Response::json(array(
		        'error' => true,
		        'message' => 'Please provide username'),
		        400
        	);
		}
		
	}
	
	private function exceuteApi($method){
		$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET);
		$response= $connection->get($method);
		return $response;
	}
	public function callback(){
 		$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET,Session::get('oauth_token'), 
 			Session::get('oauth_token_secret')); 
   		$access_token = $connection->getAccessToken(Input::get('oauth_verifier'));
		$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, 
			$access_token['oauth_token'], $access_token['oauth_token_secret']);
		$content =$connection->get('account/verify_credentials');			
		
		$data =array('0'=>array(
		    						"user_id" => Auth::user()->id,
		    						"username"=>$content->screen_name,
		    						"title"=>$content->name,
		    						"thumbnail"=>str_replace('normal', 'bigger',$content->profile_image_url),
		    						"state"=>$content->location,
		    						"country"=>'',
		    						"object_id" => $content->id,
		    						"network_type"=>"twitter",
		    						"access_token"=>$access_token['oauth_token'],
		    						"access_token_secret"=>$access_token['oauth_token_secret']
							)
						);
		$checkSocialAccount =SocialAccount::where('object_id', $content->id)
                              ->where('network_type','twitter')->where('user_id',Auth::user()->id)->first();

        if ($checkSocialAccount == null){
        	SocialAccount::insertAccount($data);
        	$isNew =true;
        }
        else{
        	$data['0']['id'] =$checkSocialAccount->id;
        	SocialAccount::updateAccount($data);
        	$isNew =false;
        }

		
		$passData = $data[0];
		$passData['isNew'] =$isNew;
		unset($passData["access_token"]);
		unset($passData["access_token_secret"]);
		return View::make('twitter.callback')->with('data', json_encode($passData));

	}
	public function redirect() {
		Session::start();
		$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET);
 
		/* Get temporary credentials. */
		$request_token = $connection->getRequestToken(OAUTH_CALLBACK);
		/* Save temporary credentials to session. */
		Session::put('oauth_token', $request_token['oauth_token']);
		Session::put('oauth_token_secret', $request_token['oauth_token_secret']);
	
		$token = $request_token['oauth_token'];
		/* If last connection failed don't display authorization link. */
		switch ($connection->http_code) {
		  case 200:
		    /* Build authorize URL and redirect user to Twitter. */
		    $url = $connection->getAuthorizeURL($token);
		     return Redirect::to($url);
		    break;
		  default:
		    /* Show notification if something went wrong. */
		    echo 'Could not connect to Twitter. Refresh the page or try again later.';
		}

	}

}