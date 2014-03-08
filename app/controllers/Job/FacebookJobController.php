<?php
include(app_path().'/lib/Facebook/FacebookGraph.php');


class Job_FacebookJobController extends BaseController {

	private $appId = '221025274741720';
	private $appSecret = '6d601c90a36db1dc552a5dbd3f9f7921';
	private $appMetrics = array(
			'day' => array(
				'application_active_users',
				'application_active_users_locale',
				'application_active_users_locale',
				'application_active_users_country',
				'application_active_users_gender_age',
				'application_installation_adds_unique',
				'application_installation_removes_unique'
			),
			'lifetime' => array(
				'application_installed_users',
				'application_installed_users_locale',
				'application_installed_users_city',
				'application_installed_users_country',
				'application_installed_users_gender_age'
			)
    );

    private $pageMetrics = array(
    		'day' => array(
    			'page_engaged_users'
    		),
    		'week' => array(
    			'page_engaged_users'
    		),
    		'day_28' =>array(
    			'page_engaged_users'
    		)
    );
	

	public function __construct() {
	}


	public function Index(){
	}


	public function ExtendAccessToken(){
		$data=Job::ExpriredAccessToken();
		$graph = new FacebookGraph(array('AppId' =>$this->appId,
			'AppSecret' =>$this->appSecret));
		foreach ($data as $key => $value) {
			$Token=$graph->ExtendAccessToken($value['access_token']);
			if ($Token != $value['access_token']){
				$value['access_token']=$Token;
				Job::updateAccessToken($value);
			}
		}
		
		return Response::json(array(
			        'error' => true,
			        'message' => ''),
			        400
	        	);
	}

	public function FacebookPageInsights() {
		$facebookPages =  Job::GetFacebokPages();
		$period = 'lifetime';
		

		$this->saveBasicMetrics($facebookPages, 'fan_count,talking_about_count', 'lifetime');
		
		//$this->getMetrics($facebookPages, 'page_engaged_users', 'day');

		return Response::json(array(
			        'error' => true,
			        'message' => ''),
			        400
	    );
	}

	private function getMetrics($facebookPages, $metrics, $period){
		$pagesArray = array();
		foreach ($facebookPages as $facebookPage) {
			$pagesArray[] = $facebookPage->object_id;
		}
		$fql = "SELECT metric FROM insights  
			WHERE metric = $metrics";  

		$fql = "SELECT metric,value FROM insights
		 WHERE metric IN $metrics 
		 AND period=period('$period') AND object_id='$facebookPages[0]' 

		 AND end_time = end_time_date('$end_date')";

		$graph = new FacebookGraph(array('AppId' =>$this->appId,
			'AppSecret' =>$this->appSecret));
		$insights = $graph->FqlQuery($fql);
		dd($insights);
		foreach ($insights as $key => $data) {
			$insightsData = array();
			$object_id = $data['page_id'];
			$end_date = date('Y-m-d');

			foreach ($data as $metric => $value) {
				if($metric !== "page_id") {
					$insightsData[$metric] = $value;
				}
			}
			$config = array(
				'period' => $period,
				'id' => $facebookPages[$key]['id'],
				'end_date' => $end_date
			);
			$socialAccountJob  = new AccountJob();
			$socialAccountJob->account_id = $facebookPages[$key]['id'];
			$socialAccountJob->table = 'social_accounts';
			$socialAccountJob->data  = json_encode($insightsData, true);
			$socialAccountJob->save();
		}

	}
	private function saveBasicMetrics($facebookPages, $metrics, $period){
		$pagesArray = array();
		foreach ($facebookPages as $facebookPage) {
			$pagesArray[] = $facebookPage->object_id;
		}
		$fql = "SELECT ".$metrics.",page_id FROM page 
			WHERE page_id IN ('".implode("','",$pagesArray)."')";
		$graph = new FacebookGraph(array('AppId' =>$this->appId,
			'AppSecret' =>$this->appSecret));
		$insights = $graph->FqlQuery($fql);
		foreach ($insights as $key => $data) {
			$insightsData = array();
			$object_id = $data['page_id'];
			$end_date = date('Y-m-d');

			foreach ($data as $metric => $value) {
				if($metric !== "page_id") {
					$insightsData[$metric] = $value;
				}
			}
			$config = array(
				'period' => $period,
				'id' => $facebookPages[$key]['id'],
				'end_date' => $end_date
			);
			$socialAccountJob  = new AccountJob();
			$socialAccountJob->social_account_id = $facebookPages[$key]['id'];
			$socialAccountJob->data  = json_encode($insightsData, true);
			$socialAccountJob->save();
		}
	}

	

}