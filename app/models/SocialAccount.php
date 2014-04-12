<?php
class SocialAccount extends Eloquent {
 
    protected $table = 'social_accounts';
  	// protected $hidden = array('access_token','access_token_secret');

    public static function insertAccount($data){
    	$error=0;

		foreach ($data as $key => $input) {
				$SocialAccount =new SocialAccount();
				
				$SocialAccount->user_id      =   Auth::user()->id;
				$key_array =array('object_id','network_type','username','title','thumbnail','country','state','access_token','access_token_secret');
				foreach ($key_array as $key => $value) {
					if(isset($input[$value])){
						$SocialAccount->$value =   $input[$value];
					}
				}
				if ($SocialAccount->save()){
					
				}else{
					$error++;
				}
		}	

		if ($error ==0){
			return Response::json(array(
		        'error' => false,
		        'message' => 'Social Accounts has been inserted successfully'),
		        200
        	);
		}else{
			return Response::json(array(
		        'error' => true,
		        'message' => 'there is some server error'),
		        400
        	);
		}

    }
    public static function updateAccount($data){
    	$error=0;
		foreach ($data as $key => $input) {
			$SocialAccount =new SocialAccount();
			
			
			$SocialAccount =SocialAccount::where('id', $input['id'])->first();
			$key_array =array('network_type','username','title','thumbnail','country','state','access_token','access_token_secret');
			foreach ($key_array as $key => $value) {
				if(isset($input[$value])){
					$SocialAccount->$value =   $input[$value];
				} 
			}

			if ($SocialAccount->save()){
					
				}else{
					$error++;
			}	
		}	
			if ($error ==0){
				return Response::json(array(
			        'error' => false,
			        'message' => 'Social Accounts has been stored successfully'),
			        200
	        	);
			}else{
				return Response::json(array(
			        'error' => true,
			        'message' => 'there is some server error'),
			        400
	        	);
			}

    }

    public static function groupByKey($data, $key, $list) {
    	$accounts = array();

    	foreach ($data as $value) {
    		$accounts[$value->$key][][$value->$list[0]] = $value->$list[1]; 	
    	}

    	return $accounts;
    }
   
 
}


///network_type','username','title','thumbnail','country','state','access_token','access_token_secret'

///[{'network_type':'fb','username':'erwr','title':'werwer','thumbnail':"ewrew",'country':'werew','state:'','access_token':'','access_token_secret':''}]
