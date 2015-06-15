<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCallsScopesTable extends Migration {

	public function up() {
		Schema::create('calls_scopes', function(Blueprint $table) {
            $table->integer('call_id')->unsigned();
            $table->foreign('call_id')->references('id')->on('calls');

            $table->integer('scope_id')->unsigned();
            $table->foreign('scope_id')->references('id')->on('scopes');

            $table->primary(['call_id', 'scope_id']);  

			$table->timestamps();
		});
	}

	public function down() {
		Schema::drop('calls_scopes');
	}


}



