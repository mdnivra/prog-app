<?php
class SocialApp extends Eloquent {
 
    protected $table = 'social_apps';
    protected $hidden = array('app_secret','access_token');


    public static function insertApp($data){
    	$error=0;
		foreach ($data as $key => $input) {
				$SocialApp =new SocialApp();
				
				$SocialApp->user_id      =   Auth::user()->id;
				$key_array =array('app_id','app_secret','network_type','title','thumbnail','link','ref_id','access_token');
				foreach ($key_array as $key => $value) {
					if(isset($input[$value])){
						$SocialApp->$value =   $input[$value];
					}
				}
				if ($SocialApp->save()){
					
				}else{
					$error++;
				}
		}	

		if ($error ==0){
			return Response::json(array(
		        'error' => false,
		        'message' => 'Social App has been inserted successfully'),
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
    public static function searchApp($input){
    	$data =SocialApp::where('user_id', '=', Auth::user()->id)->
					Where(function($query) use($input)
					{	$allowed_coloumns =array('ref_id');
						foreach ($input as $key => $value) {
							if (in_array($key,$allowed_coloumns)){
								$query->where($key, "=",$value);
							}
						}
					})->get();
    	return $data;
    }
    public static function updateApp($data){
    	$error=0;
		foreach ($data as $key => $input) {
			$SocialApp =new SocialApp();
			
			
			$SocialApp =SocialApp::where('id', $input['id'])->first();
			$key_array =array('app_secret','network_type','title','thumbnail','link','ref_id','access_token');
			foreach ($key_array as $key => $value) {
				if(isset($input[$value])){
					$SocialApp->$value =   $input[$value];
				} 
			}

			if ($SocialApp->save()){
					
				}else{
					$error++;
			}	
		}	
			if ($error ==0){
				return Response::json(array(
			        'error' => false,
			        'message' => 'Social App has been stored successfully'),
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
   
 
}


