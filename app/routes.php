<?php

Route::get('/', 'ProgknowsController@index');

Route::filter('auth', function()
{
   if (Auth::guest()) return Redirect::guest('/');
});
  
Route::group(array('before' => 'auth'), function()
{
    Route::get('/home', 'ProgknowsController@home');
	Route::resource('social_account', 'Api_SocialAccountController');
	Route::any('/social_app/search', 'Api_SocialAppController@search'); // route clashing with resource route. So, keeping this route above resource route 
	Route::resource('social_app', 'Api_SocialAppController');
	Route::resource('competitor', 'Api_CompetitiveAnalysisConfigController');
	Route::resource('social_user', 'Api_SocialUserController');
	Route::resource('social_user', 'Api_SocialUserController');
	Route::get('/reports', 'Api_ReportController@index');
	Route::get('/twitteroauth','TwitterOauthController@redirect');
	Route::any('/twittercallback','TwitterOauthController@callback');
	Route::any('/twitterusername','TwitterController@checkUsername');

	Route::controller('socialapps','SocialAppsController');
	Route::controller('competitorInsights','CompetitorInsightsController');
	Route::controller('analysis','ReportsController');

});


Route::get('/extend_tokens', 'Job_FacebookJobController@ExtendAccessToken');
Route::get('/facebook_insights', 'Job_FacebookJobController@FacebookPageInsights');
Route::get('/twitter_insights', 'Job_TwitterJobController@TwitterInsights');


Route::post('/login','LoginController@postLogin');
Route::get('/logout','LoginController@getLogout');

?>