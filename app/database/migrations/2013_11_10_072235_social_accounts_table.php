<?php

use Illuminate\Database\Migrations\Migration;

class SocialAccountsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('social_accounts',function($table)
		{
			$table->increments('id');
			$table->integer('user_id');
			$table->string('object_id');
			$table->text('network_type');
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
		Schema::drop('social_accounts');
	}

}