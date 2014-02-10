<?php

use Illuminate\Database\Migrations\Migration;

class CreateSocialAccountJobTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{	
		if (Schema::hasTable('users')){
    		Schema::drop('social_account_jobs');
		}
		Schema::create('social_account_jobs',function($table)
		{
			$table->increments('id');
			$table->integer('social_account_id');
			$table->longText('data');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('social_account_jobs');
	}

}