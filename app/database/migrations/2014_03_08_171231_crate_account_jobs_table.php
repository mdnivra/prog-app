<?php

use Illuminate\Database\Migrations\Migration;

class CrateAccountJobsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		if (Schema::hasTable('social_account_jobs')){
    		Schema::drop('social_account_jobs');
		}

		if (Schema::hasTable('account_jobs')){
    		Schema::drop('account_jobs');
		}
	
		Schema::create('account_jobs',function($table)
		{
			$table->increments('id');
			$table->integer('account_id');
			$table->string('table');
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
		Schema::drop('account_jobs');
	}

}