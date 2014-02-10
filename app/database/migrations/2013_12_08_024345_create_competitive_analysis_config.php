<?php

use Illuminate\Database\Migrations\Migration;

class CreateCompetitiveAnalysisConfig extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('competitive_analysis_config',function($table)
		{
			$table->increments('id');
			$table->integer('user_id');
			$table->text('network_type');
			$table->string('object_id');
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
		Schema::drop('competitive_analysis_config');
	}

}