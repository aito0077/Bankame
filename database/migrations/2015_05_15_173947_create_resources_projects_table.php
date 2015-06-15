<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateResourcesProjectsTable extends Migration {

	public function up() {
		Schema::create('resources_projects', function(Blueprint $table) {
            $table->integer('resource_id')->unsigned();
            $table->foreign('resource_id')->references('id')->on('resources');

            $table->integer('project_id')->unsigned();
            $table->foreign('project_id')->references('id')->on('projects');

            $table->primary(['resource_id', 'project_id']);  

            $table->boolean('assigned')->default(FALSE);
            $table->decimal('percentage')->default(0);

			$table->timestamps();
		});
	}

	public function down() {
		Schema::drop('resources_projects');
	}


}



