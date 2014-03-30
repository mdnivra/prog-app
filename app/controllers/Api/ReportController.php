<?php

class Api_ReportController extends BaseController {

	public function index(){
		$inputs = Input::all();
		if($inputs['module_type']){
			$data = $this->getModuleData($inputs['module_type']);
			return Response::json(array('moduleData'=>$data));
		}else{
			return Response::json(array(
		        'error' => true,
		        'message' => 'Please provide modul type'),
		        400
        	);
		}
	}

	public function bootstrap() {
		$data = array(
			"reports" => json_decode(file_get_contents(public_path().'/configJson/reports.json'), true)
		);

		return Response::json($data);
	}

	private function getModuleData($widgetType){
		switch ($widgetType) {
		    case "FACEBOOK_COMPETITOR_ANALYSIS":
		    		$data = $this->facebookCompetitorAnalysis();
		        	return $data;
		        break;
		    case "TWITTER_COMPETITOR_ANALYSIS":
		        	$data = $this->twitterCompetitorAnalysis();
		        	return $data;
		        break;
		}

	}

	private function facebookCompetitorAnalysis(){

		$data = DB::table('social_account_jobs')
   			 ->join('social_accounts','social_accounts.id','=',
   			 	'social_account_jobs.social_account_id','left')
   			 ->where('social_accounts.user_id', '=', Auth::user()->id)
  			 ->where('social_accounts.network_type', '=', 'Facebook')
  			 ->get();
  		$output = array();

  		foreach ($data as $value) {
  			$value = (array) $value;
  			$output[] = array(
  				'object'=> array(
	  					'title'=> $value['title'],
	  					'username'=> $value['username'],
	  					'thumbnail' => $value['thumbnail']
	  				 ),
  				'data'=> json_decode($value['data'])
  			);
  		}

  		return $output;	 

	}

	private function twitterCompetitorAnalysis(){
		$data = DB::table('social_account_jobs')
   			 ->join('social_accounts','social_accounts.id','=',
   			 	'social_account_jobs.social_account_id','left')
   			 ->where('social_accounts.user_id', '=', Auth::user()->id)
  			 ->where('social_accounts.network_type', '=', 'Twitter')
  			 ->get();
  		$output = array();
  		
  		foreach ($data as $value) {
  			$value = (array) $value;
			$output[] = array(
  				'object'=> array(
	  					'title'=> $value['title'],
	  					'username'=> $value['username'],
	  					'thumbnail' => $value['thumbnail']
	  				 ),
  				'data'=> json_decode($value['data'])
  			);
  		}

  		return $output;
	}

}