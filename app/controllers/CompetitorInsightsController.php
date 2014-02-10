<?php

class CompetitorInsightsController extends BaseController {
	public function __construct() {
   		$this->beforeFilter('csrf', array('on'=>'post'));
   		$this->beforeFilter('auth', array('only'=>array('/')));
	}

	public function getIndex()
	{ 
		$data = array(
			'component' => 'compInsightsLoader'
		);
		return View::make('compInsights.index')->with('data',$data);
	}

}