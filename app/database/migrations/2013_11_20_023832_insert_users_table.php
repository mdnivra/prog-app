<?php

use Illuminate\Database\Migrations\Migration;

class InsertUsersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		DB::table('users')->insert(array(
			'email'=>'arvind0937@gmail.com',
			'username'=>'arvind0937@gmail.com',
			'password'=> '$2y$08$882tnNWKHGiSvVjN9b7xgOtAAVi6hgjvsmm91bIbUZoyjy0NuVkJq',
			'created_at'=>date('Y-m-d H:m:s'),
			'updated_at'=>date('Y-m-d H:m:s')
		));
		DB::table('users')->insert(array(
			'email'=>'manishgolcha@gmail.com',
			'username'=>'manishgolcha@gmail.com',
			'password'=>'$2y$08$882tnNWKHGiSvVjN9b7xgOtAAVi6hgjvsmm91bIbUZoyjy0NuVkJq',
			'created_at'=>date('Y-m-d H:m:s'),
			'updated_at'=>date('Y-m-d H:m:s')
		));
		DB::table('users')->insert(array(
			'email'=>'pankajbhatia@gmail.com',
			'username'=>'pankajbhatia@gmail.com',
			'password'=>'$2y$08$882tnNWKHGiSvVjN9b7xgOtAAVi6hgjvsmm91bIbUZoyjy0NuVkJq',
			'created_at'=>date('Y-m-d H:m:s'),
			'updated_at'=>date('Y-m-d H:m:s')
		));
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		DB::table('users')->where('email','=','arvind0937@gmail.com')->delete();
		DB::table('users')->where('email','=','manishgolcha@gmail.com')->delete();
		DB::table('users')->where('email','=','pankajbhatia@gmail.com')->delete();
		

	}

}