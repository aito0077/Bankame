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
            $table->mediumText('summary')->nullable();
            $table->longText('context')->nullable();

            $table->string('twitter_hashtag');
            $table->string('twitter_site');
            $table->string('facebook_site');
            $table->string('instagram_site');
            $table->string('website');
            $table->string('contact_email');

            $table->enum('status', ['DISABLED', 'OPEN', 'CLOSE'])->default('DISABLED');

            $table->mediumtext('image')->nullable();

            $table->date('start_date')->nullable();
            $table->date('middle_date')->nullable();
            $table->date('end_date')->nullable();

            $table->string('tags', 500)->nullable();
            $table->string('tags_pretty', 500)->nullable();

            $table->string('countries', 500)->nullable();
            $table->string('countries_pretty', 500)->nullable();

            $table->boolean('permanent')->default(false);
            $table->boolean('remark')->default(false);
            $table->boolean('publish')->default(false);
            $table->boolean('share_phase')->default(false);
            $table->boolean('apply_phase')->default(false);
		});
	}

	public function down() {
		Schema::drop('calls');
	}

}


