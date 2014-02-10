<?php  
require_once "facebook.php";

class FacebookGraph extends Facebook {
	private $AppId ;
	private $AppSecret; 
	/*
	@https://graph.facebook.com/oauth/access_token?client_id=_APP_ID_&client_secret=_APP_SECRET_&grant_type=fb_exchange_token&fb_exchange_token=_ACCESS_TOKEN_ON_STEP_4_

	*/
	public function __construct($config) {
		$this->AppId =$config['AppId'];
		$this->AppSecret =$config['AppSecret'];
	}

	public function ExtendAccessToken($token){
		$facebook = new Facebook(array('appId'  => $this->AppId,'secret' => $this->AppSecret,'cookie' => false));
		$facebook->setAccessToken($token);
		$facebook->setExtendedAccessToken();
		return str_replace('access_token=', '', $facebook->getAccessToken());
	}

	public function FqlQuery($fql){
		$facebook = new Facebook(array('appId'  => $this->AppId,'secret' => $this->AppSecret,'cookie' => false));
		$result = $facebook->api(array(
 			'method' => 'fql.query',
 			'query' =>$fql,
 			'access_token' => $this->AppId. '|' . $this->AppSecret
		));

		return $result;

	}
}
