<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateResourcesTable extends Migration {

	public function up() {

		Schema::create('resources', function(Blueprint $table) {
			$table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');

            $table->integer('call_id')->unsigned();
            $table->foreign('call_id')->references('id')->on('calls');

            /*
            $table->integer('resource_type_id')->unsigned();
            $table->foreign('resource_type_id')->references('id')->on('resource_types');
            */

            $table->integer('organization_id')->unsigned()->nullable();
            $table->foreign('organization_id')->references('id')->on('users');

			$table->timestamps();

            $table->integer('cost')->default(0);


            $table->string('name');
            $table->string('description', 1000)->nullable();
            $table->string('tags', 500)->nullable();
            $table->string('tags_pretty', 500)->nullable();

            $table->string('conditions', 1000)->nullable();

            $table->mediumtext('image')->nullable();

            $table->boolean('canceled')->default(FALSE);


		});
	}

	public function down() {
		Schema::drop('resources');
	}

}


