<?php
use Illuminate\Database\Seeder;
use Bancame\Model\Country;

class CountriesTableSeeder extends Seeder {

    public function run() {
        DB::table('countries')->delete();

        $country = new Country();
        $country->name = 'AR';
        $country->description = 'Argentina';
        $country->save();

        $country = new Country();
        $country->name = 'BR';
        $country->description = 'Brasil';
        $country->save();

        $country = new Country();
        $country->name = 'BO';
        $country->description = 'Bolivia';
        $country->save();

        $country = new Country();
        $country->name = 'VZ';
        $country->description = 'Venezuela';
        $country->save();

        $country = new Country();
        $country->name = 'CL';
        $country->description = 'Colombia';
        $country->save();

        $country = new Country();
        $country->name = 'CH';
        $country->description = 'Chile';
        $country->save();

        $country = new Country();
        $country->name = 'MX';
        $country->description = 'Mexico';
        $country->save();

        $country = new Country();
        $country->name = 'PE';
        $country->description = 'Peru';
        $country->save();

        $country = new Country();
        $country->name = 'UR';
        $country->description = 'Uruguay';
        $country->save();

        $country = new Country();
        $country->name = 'PA';
        $country->description = 'Paraguay';
        $country->save();

    }

}

