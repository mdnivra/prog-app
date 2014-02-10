<?php

use Illuminate\Database\Migrations\Migration;

class SocialAccountAccessTokenTimestamp extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('social_accounts', function($table){
    		$table->dateTime('access_token_timestamp');
    		
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('social_accounts', function($table) {
            $table->dropColumn('access_token_timestamp');
    		
        });
	}

}