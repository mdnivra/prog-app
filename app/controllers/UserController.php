<?php

class UserController extends Controller {
	protected layout ="users.main";

	public function __construct() {
		$this->beforeFilter('csrf', array('on'=>'post'));
	   	$this->beforeFilter('auth', array('only'=>array('home')));
	}

	public postLogin(){
		  $this->layout->content = View::make('users.register');
	}









}