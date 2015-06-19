<?php namespace Bancame\Http\Controllers;

use JWT;
use Auth;
use Log;
use DB;
use Config;
use Storage;
use Response;
use Validator;
use Bancame\Http\Requests;
use Bancame\Http\Controllers\Controller;
use Bancame\Model\Organization;
use Bancame\Model\OrganizationsUsers;
use Bancame\Model\Project;
use Bancame\Model\Resource;
use Bancame\User;

use Illuminate\Http\Request;

class OrganizationController extends Controller {

    public function __construct() {
        $this->middleware('auth', ['except' => ['index', 'show', 'search']]);
    }

	public function index() {
        $organizations = Organization::all();
        return $organizations;
	}

	public function show(Request $request, $id) {
        $organization = Organization::find($id);
        return $organization;
	}

	public function store(Request $request) {
        $user = User::find($request['user']['sub']);


        $organization = new Organization;
        DB::transaction(function() use ($request, $organization, $user) {

            $organization->name = $request->input('name');
            $organization->description = $request->input('description');
            $organization->user_id = $user->id;
            $organization->save();

            $organizationsUsers = new OrganizationsUsers;
            $organizationsUsers->user_id = $user->id;
            $organizationsUsers->organization_id = $organization->id;
            $organizationsUsers->administrator = true;
            $organizationsUsers->save();

                 
        });

        return $organization;
	}

	public function update(Request $request, $id) {
        $organization = Organization::find($id);

        DB::transaction(function() use ($request, $organization) {
            $organization->name = $request->input('name');
            $organization->description = $request->input('description');

            $organization->save();
        });
        return $organization;
	}

	public function destroy($id) {
        Organization::destroy($id);
	}

    //Actions

	public function create() {
		//
	}

	public function edit($id) {
		//
	}


}

