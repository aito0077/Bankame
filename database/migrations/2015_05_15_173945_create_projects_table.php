<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectsTable extends Migration {

	public function up() {

		Schema::create('projects', function(Blueprint $table) {
			$table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');

            $table->integer('call_id')->unsigned();
            $table->foreign('call_id')->references('id')->on('calls');

            $table->integer('project_type_id')->unsigned();
            $table->foreign('project_type_id')->references('id')->on('project_types');

            $table->integer('organization_id')->unsigned()->nullable();
            $table->foreign('organization_id')->references('id')->on('users');

			$table->timestamps();

            $table->string('name');
            $table->string('description', 500)->nullable();
            $table->string('stakeholders', 1000)->nullable();

            $table->mediumtext('image')->nullable();

            $table->boolean('canceled')->default(FALSE);

		});
	}

	public function down() {
		Schema::drop('projects');
	}

}


