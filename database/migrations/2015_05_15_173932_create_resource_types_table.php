<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateResourceTypesTable extends Migration {

	public function up() {
		Schema::create('resource_types', function(Blueprint $table) {
			$table->increments('id');

            $table->string('name');
            $table->mediumtext('description')->nullable();
            $table->boolean('disabled')->default(FALSE);

            $table->integer('parent_id')->unsigned()->nullable();
            $table->foreign('parent_id')->references('id')->on('resource_types');

			$table->timestamps();
		});
	}

	public function down() {
		Schema::drop('resource_types');
	}


}
