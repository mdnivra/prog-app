<?php

use Illuminate\Database\Migrations\Migration;

class MakeNullColoumnsSocialAccounts extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		DB::statement("ALTER TABLE  social_accounts MODIFY COLUMN access_token_secret varchar(255) NULL DEFAULT NULL;");
		DB::statement("ALTER TABLE  social_accounts MODIFY COLUMN access_token varchar(255) NULL DEFAULT NULL;");
		DB::statement("ALTER TABLE  social_accounts MODIFY COLUMN country varchar(255) NULL DEFAULT NULL;");
		DB::statement("ALTER TABLE  social_accounts MODIFY COLUMN state varchar(255) NULL DEFAULT NULL;");
		DB::statement("ALTER TABLE  social_accounts MODIFY COLUMN object_id varchar(255) NULL DEFAULT NULL;");

	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		//
	}

}