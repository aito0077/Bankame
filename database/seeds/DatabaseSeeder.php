<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Model::unguard();

		$this->call('UsersTableSeeder');
        $this->command->info('Users seeded!');

		$this->call('LanguagesTableSeeder');
        $this->command->info('Languages seeded!');

		$this->call('CountriesTableSeeder');
        $this->command->info('Countries seeded!');

	$this->call('CallsTableSeeder');
        $this->command->info('Calls seeded!');

	$this->call('ResourceTypesTableSeeder');
        $this->command->info('Resource Types seeded!');


	}

}
