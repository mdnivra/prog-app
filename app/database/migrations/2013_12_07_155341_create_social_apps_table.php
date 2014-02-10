<?php

use Illuminate\Database\Migrations\Migration;

class CreateSocialAppsTable extends Migration {

/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('social_apps',function($table)
		{
			$table->increments('id');
			$table->integer('user_id');
			$table->string('app_id');
			$table->string('app_secret');
			$table->text('network_type');
			$table->string('title');
			$table->string('thumbnail');
			$table->string('link');
			$table->string('ref_id');
			$table->string('access_token');
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
		Schema::drop('social_apps');
	}

}