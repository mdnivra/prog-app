<?php
 
class Job extends Eloquent {
 
    protected $table = 'social_account_jobs'; 
 
 	public static function ExpriredAccessToken(){
 		$data =SocialAccount::where('network_type','facebook')
 										->where(function($query)
            {
                $query->where('access_token_timestamp', '<', 'DATE_SUB(NOW(), INTERVAL 1 HOUR)')
                      ->orWhere('access_token_timestamp', '0000-00-00 00:00:00');
            })->get(array('id', 'access_token'));
 		return $data;

 	}
 	
 	public static function GetFacebokPages(){
 		$data =SocialAccount::where('network_type','facebook')
 			->get();
 		return $data;

 	}

    public static function updateAccessToken($data){
    	SocialAccount::where('id', $data['id'])
    		->update(array('access_token' => $data['access_token'],'access_token_timestamp'=>'DATE_ADD(NOW(), INTERVAL 1 HOUR)'));

    }

    public static function getTwitterAccounts(){
    	$data =SocialAccount::where('network_type','twitter')
 			->get(array('id', 'object_id', 'username'));
 		return $data;

    }



}
 