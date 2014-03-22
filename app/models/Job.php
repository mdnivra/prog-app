<?php
 
class Job extends Eloquent {
 
    protected $table = 'account_jobs'; 
 
 	public static function ExpriredAccessToken(){
 		$data =SocialAccount::where('network_type','facebook')
 										->where(function($query)
            {
                $query->where('access_token_timestamp', '<', 'DATE_SUB(NOW(), INTERVAL 1 HOUR)')
                      ->orWhere('access_token_timestamp', '0000-00-00 00:00:00');
            })->get(array('id', 'access_token'));
 		return $data;

 	}

    /**
    this will append table attribute to data
    ***/

   

    public static function getFbTwitterPages($network_type){

        $data = array();

        $data = Helper::appendTable(SocialAccount::where('network_type',$network_type)
            ->get(), 'social_accounts', $data);

        $data = Helper::appendTable(CompetitiveAnalysisConfig::where('network_type',
            $network_type)->get(), 'competitive_analysis_config', $data);
        
        return $data;
    }
 	
 	public static function GetFacebokPages(){
        return Job::getFbTwitterPages('facebook');
 	}

    public static function updateAccessToken($data){
    	SocialAccount::where('id', $data['id'])
    		->update(array('access_token' => $data['access_token'],'access_token_timestamp'=>'DATE_ADD(NOW(), INTERVAL 1 HOUR)'));

    }

    public static function getTwitterAccounts(){
          return Job::getFbTwitterPages('twitter');
   //  	$data =SocialAccount::where('network_type','twitter')
 		// 	->get(array('id', 'object_id', 'username'));
 		// return $data;
    }

    public static function getTwitterCompAccounts(){
        $data =CompetitiveAnalysisConfig::where('network_type','twitter')
            ->get(array('id', 'object_id'));
        return $data;

    }



}
 