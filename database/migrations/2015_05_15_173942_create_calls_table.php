<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCallsTable extends Migration {

	public function up() {

		Schema::create('calls', function(Blueprint $table) {
			$table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');

			$table->timestamps();

            $table->string('name');
            $table->string('context', 5000)->nullable();

            $table->enum('status', ['DISABLED', 'OPEN', 'CLOSE'])->default('DISABLED');

            $table->mediumtext('image')->nullable();

            $table->date('share_resources_start')->nullable();
            $table->date('share_resources_end')->nullable();
            $table->date('apply_project_start')->nullable();
            $table->date('apply_project_end')->nullable();
            $table->date('evaluation_start')->nullable();
            $table->date('evaluation_end')->nullable();
            $table->date('show_results_start')->nullable();
            $table->date('show_results_end')->nullable();


		});
	}

	public function down() {
		Schema::drop('calls');
	}

}


