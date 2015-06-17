<?php namespace Bancame\Http\Controllers;

use Bancame\Http\Requests;
use Bancame\Http\Controllers\Controller;
use Bancame\Model\ProjectType;

use Illuminate\Http\Request;

class ProjectTypeController extends Controller {

	public function index() {
        $projectTypes = ProjectType::all();
        return $projectTypes;
	}

	public function store() {
        $projectType = ProjectType::create(Request::all());
        return $projectType;
	}

	public function show($id) {
        $projectType = ProjectType::find($id);
        return $projectType;
	}


	public function update($id) {
        $projectType = ProjectType::find($id);
        //Set updated
        $projectType->save();
        return $projectType;
	}

	public function destroy($id) {
        ProjectType::destroy($id);
	}

	public function create() {
		//
	}

	public function edit($id) {
		//
	}

}
