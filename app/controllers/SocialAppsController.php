<?php

class SocialAppsController extends BaseController {
	public function __construct() {
   		$this->beforeFilter('csrf', array('on'=>'post'));
   		$this->beforeFilter('auth', array('only'=>array('/')));
	}

	public function getIndex()
	{ 
		$data = array(
			'component' => 'socialappsLoader'
		);
		return View::make('socialapps.index')->with('data',$data);
	}

}