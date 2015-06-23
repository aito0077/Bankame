<?php namespace Bancame\Http\Controllers;

use Bancame\Http\Requests;
use Bancame\Http\Controllers\Controller;
use Bancame\Model\ResourceType;

use Illuminate\Http\Request;
use Log;

class ResourceTypeController extends Controller {

	public function index() {
        $resourceTypes = ResourceType::all();
        return $resourceTypes;
	}

	public function filtersMap() {
        $filters = array();
        $resourceTypes = ResourceType::where('parent_id', '=', NULL)->get();

        $index = 0; 
        foreach($resourceTypes as $rt) {
            $sub_filters = ResourceType::where('parent_id', '=', $rt->id)->get();
            $rt->children = $sub_filters;
            $filters[$index] = $rt;
            $index++;
        }

        return $filters;
    }

	public function store() {
        $resourceType = ResourceType::create(Request::all());
        return $resourceType;
	}

	public function show($id) {
        $resourceType = ResourceType::find($id);
        return $resourceType;
	}


	public function update($id) {
        $resourceType = ResourceType::find($id);
        //Set updated
        $resourceType->save();
        return $resourceType;
	}

	public function destroy($id) {
        ResourceType::destroy($id);
	}

	public function create() {
		//
	}

	public function edit($id) {
		//
	}

}
