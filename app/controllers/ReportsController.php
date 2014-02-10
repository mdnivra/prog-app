<?php

class ReportsController extends BaseController {
	public function __construct() {
   		$this->beforeFilter('csrf', array('on'=>'post'));
   		$this->beforeFilter('auth', array('only'=>array('/')));
	}

	public function getIndex() {
		$data = array(
			'component' => 'reportsLoader'
		);
		return View::make('reports.index')->with('data',$data);
	}

}