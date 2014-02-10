<?php

use Illuminate\Database\Migrations\Migration;

class FbPagesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
			Schema::create('fb_pages', function($table)
	      {
	        $table->increments('id');
			$table->integer('account_id');
			$table->string('page_title');
			$table->text('picture');
	        $table->string('token');

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
		Schema::drop('fb_pages');
	}

}

