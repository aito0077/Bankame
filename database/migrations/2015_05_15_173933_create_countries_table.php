<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCountriesTable extends Migration {

	public function up() {
		Schema::create('countries', function(Blueprint $table) {
			$table->increments('id');

            $table->string('name');
            $table->mediumtext('description')->nullable();
            $table->boolean('disabled')->default(FALSE);


			$table->timestamps();
		});
	}

	public function down() {
		Schema::drop('countries');
	}


}



