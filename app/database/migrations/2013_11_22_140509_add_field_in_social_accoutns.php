<?php

use Illuminate\Database\Migrations\Migration;

class AddFieldInSocialAccoutns extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('social_accounts', function($table){
    		$table->string('username');
    		$table->string('title');
    		$table->string('thumbnail');
    		$table->string('state');
    		$table->string('country');
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
            $table->dropColumn('username');
    		$table->dropColumn('title');
    		$table->dropColumn('thumbnail');
    		$table->dropColumn('state');
    		$table->dropColumn('country');
        });
	}

}