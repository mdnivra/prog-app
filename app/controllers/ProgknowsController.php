<?php

class ProgknowsController extends BaseController {
	public function __construct() {
   		$this->beforeFilter('csrf', array('on'=>'post'));
   		$this->beforeFilter('auth', array('only'=>array('/')));
	}

	public function index()
	{
		return View::make('progknows.index');
	}

	public function home() {
		$data = array(
			'component' => 'settingsLoader'
		);
		return View::make('progknows.home')->with('data',$data);
	}

}