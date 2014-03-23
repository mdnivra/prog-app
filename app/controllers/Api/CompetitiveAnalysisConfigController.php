<?php

class Api_CompetitiveAnalysisConfigController extends BaseController {

	public function index()
	{

		if (Input::get('network_type')){
			$data =CompetitiveAnalysisConfig::where('user_id', '=', Auth::user()->id)
			->where('network_type', '=', Input::get('network_type'))->get();
   
		} else{
			$data =CompetitiveAnalysisConfig::where('user_id', '=', Auth::user()->id)
			->get();
   		}
		foreach ($data as $key => $value) {
            $accountjobdata = AccountJob::where('account_id', '=', $value->id)
        		->where('table', '=', 'competitive_analysis_config')
        		->orderBy('id', 'desc')
        		->first();

        	$data[$key]['data'] = $accountjobdata? $accountjobdata->data : array() ;	
        }

		return $data;

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

		$data =Input::all();
		$response = CompetitiveAnalysisConfig::insertConfig($data);
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
	public function update($id =null)
	{	
		
		$data =Input::all();
		$response = CompetitiveAnalysisConfig::updateConfig($data);
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
		$row = CompetitiveAnalysisConfig::find($id);
		if ($row){
			$row->delete();
			return Response::json(array(
		        'error' => false,
		        'message' => 'Competitor has been deleted successfully'),
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
	
