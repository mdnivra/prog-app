<?php

use Illuminate\Database\Migrations\Migration;

class SocialUsersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('social_users', function($table)
	      {
	        $table->increments('id');
			$table->integer('user_id');
			$table->integer('network_id');
			$table->string('network_type');
			$table->string('fullname');
	        $table->string('access_token');
 			$table->string('email');
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
		Schema::drop('social_users');
	}

}


