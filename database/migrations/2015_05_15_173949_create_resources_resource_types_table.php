<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateResourcesResourceTypesTable extends Migration {

	public function up() {
		Schema::create('resources_resource_types', function(Blueprint $table) {
            $table->integer('resource_id')->unsigned();
            $table->foreign('resource_id')->references('id')->on('resources');

            $table->integer('resource_type_id')->unsigned();
            $table->foreign('resource_type_id')->references('id')->on('resource_types');

            $table->primary(['resource_id', 'resource_type_id']);  

			$table->timestamps();
		});
	}

	public function down() {
		Schema::drop('resources_resource_types');
	}


}



