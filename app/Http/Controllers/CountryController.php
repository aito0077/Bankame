<?php namespace Bancame\Http\Controllers;

use Bancame\Http\Requests;
use Bancame\Http\Controllers\Controller;
use Bancame\Model\Country;

use Illuminate\Http\Request;

class CountryController extends Controller {

	public function index() {
        $countries = Country::all();
        return $countries;
	}

	public function store() {
        $country = Country::create(Request::all());
        return $country;
	}

	public function show($id) {
        $country = Country::find($id);
        return $country;
	}


	public function update($id) {
        $country = Country::find($id);
        //Set updated
        $country->save();
        return $country;
	}

	public function destroy($id) {
        Country::destroy($id);
	}

	public function create() {
		//
	}

	public function edit($id) {
		//
	}

}
