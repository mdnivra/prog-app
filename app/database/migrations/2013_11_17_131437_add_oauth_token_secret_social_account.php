<?php

use Illuminate\Database\Migrations\Migration;

class AddOauthTokenSecretSocialAccount extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('social_accounts', function($table)
		{
    		$table->string('access_token_secret');
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
                $table->dropColumn('access_token_secret');
        });
	}

}