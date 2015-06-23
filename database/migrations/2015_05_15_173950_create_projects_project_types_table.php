<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectsProjectTypesTable extends Migration {

	public function up() {
		Schema::create('projects_project_types', function(Blueprint $table) {
            $table->integer('project_id')->unsigned();
            $table->foreign('project_id')->references('id')->on('projects');

            $table->integer('project_type_id')->unsigned();
            $table->foreign('project_type_id')->references('id')->on('project_types');

            $table->primary(['project_id', 'project_type_id']);  

			$table->timestamps();
		});
	}

	public function down() {
		Schema::drop('projects_project_types');
	}


}



