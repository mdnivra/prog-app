<?php
class CompetitiveAnalysisConfig extends Eloquent {
 
    protected $table = 'competitive_analysis_config';

    public static function insertConfig($data){
    	$error=0;
		foreach ($data as $key => $input) {
				$CompetitiveAnalysisConfig =new CompetitiveAnalysisConfig();
				
				$CompetitiveAnalysisConfig->user_id      =   Auth::user()->id;
				$key_array =array('network_type','object_id');
				foreach ($key_array as $key => $value) {
					if(isset($input[$value])){
						$CompetitiveAnalysisConfig->$value =   $input[$value];
					}
				}
				if ($CompetitiveAnalysisConfig->save()){
					
				}else{
					$error++;
				}
		}	

		if ($error ==0){
			return Response::json(array(
		        'error' => false,
		        'message' => 'Config has been inserted successfully'),
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
    public static function updateConfig($data){
    	$error=0;
		foreach ($data as $key => $input) {
			$CompetitiveAnalysisConfig =new CompetitiveAnalysisConfig();
			
			
			$CompetitiveAnalysisConfig =CompetitiveAnalysisConfig::where('id', $input['id'])->first();
			$key_array =array('network_type','object_id');
			foreach ($key_array as $key => $value) {
				if(isset($input[$value])){
					$CompetitiveAnalysisConfig->$value =   $input[$value];
				} 
			}

			if ($CompetitiveAnalysisConfig->save()){
					
				}else{
					$error++;
			}	
		}	
			if ($error ==0){
				return Response::json(array(
			        'error' => false,
			        'message' => 'Config has been stored successfully'),
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


