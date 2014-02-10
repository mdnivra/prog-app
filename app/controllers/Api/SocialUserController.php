<?php

class Api_SocialUserController extends BaseController {

	
	public function index()
	{
		//
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		$SocialUser =new SocialUser();
		$SocialUser->user_id = Auth::user()->id;
		$SocialUser->network_id = Input::get("network_id");
		$SocialUser->network_type = Input::get("network_type");
		$SocialUser->fullname = Input::get("fullname");
		$SocialUser->access_token = Input::get("access_token");
		$SocialUser->email = Input::get("email");


		$checkSocialUser =SocialUser::where('network_id', Input::get("network_id"))
								->where('network_type', Input::get("network_type"))
								->where('email', Input::get("email"))->first();

		if ($checkSocialUser == null){
 
			if ($SocialUser->save()){
				return Response::json(array(
			        'error' => false,
			        'message' => 'Social Account Created'),
			        200
	        	); 
			}else{
				return Response::json(array(
			        'error' => true,
			        'message' => 'there is some server error'),
			        400
	        	);
			}
		}else{

			$checkSocialUser->fullname =Input::get("fullname");
			if ($checkSocialUser->save()){
				return Response::json(array(
			        'error' => false,
			        'message' => 'Social Account Updated'),
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
		
		return ;
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

}
	
