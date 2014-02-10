<?php

class LoginController extends Controller {

	public function postLogin(){
		if (Auth::attempt(array('email'=>Input::get('email'), 'password'=>Input::get('password')))) {
   				return Redirect::to('/home');
		} else {
   			return Redirect::to('/')->
   			with('message', 'Your username/password combination was incorrect')->
   			withInput();
		}
	}

	public function getLogout(){
		Auth::logout();
   		return Redirect::to('/')->with('message', 'Your are now logged out!');
	}






}