<?php

class Api_SocialAppController extends BaseController {
	public function index()
	{	
		$data =SocialApp::where('user_id', '=', Auth::user()->id)->get();
		return $data;
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	
	public function search()
	{	
		return SocialApp::searchApp(Input::all());
	}
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

		$data =Input::all();
		if (!isset($data[0])){
			$tmp =$data;
			$data =array();
			$data[] =$tmp;
		}
		$response = SocialApp::insertApp($data);
		return $response;
	}
		//
	

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
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
	public function update($id =null)
	{	
		
		$data =Input::all();
		if (!isset($data[0])){
			$tmp =$data;
			$data =array();
			$data[] =$tmp;
		}
		$response = SocialApp::updateApp($data);
		return $response;
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		$SocialApp = SocialApp::find($id);
		if ($SocialApp){
			$SocialApp->delete();
			return Response::json(array(
		        'error' => false,
		        'message' => 'Social App has been deleted successfully'),
		        200
        	);
		}else{
			return Response::json(array(
		        'error' => true,
		        'message' => "id doesn't exist"),
		        400
        	);
		}
	}

}
	
