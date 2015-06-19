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
use Bancame\Model\Call;
use Bancame\Model\Project;
use Bancame\Model\Resource;
use Bancame\User;

use Illuminate\Http\Request;

class ResourceController extends Controller {

    public function __construct() {
        $this->middleware('auth', ['except' => ['index', 'show', 'search', 'allByCall']]);
    }

	public function index() {
        $resources = Resource::all();
        return $resources;
	}

	public function allByCall($callId) {
        $resources = Resource::where('call_id', '=', $callId)->get();
        return $resources;
	}

	public function show(Request $request, $id) {
        $resource = Resource::find($id);
        $resource->type();
        $user = false;
		$token = $request->input('_token') ?: $request->header('X-XSRF-TOKEN');
		if ( $token )  {
            $token = $request->header('Authorization');
            if(isset($token[1])) {
                $token = explode(' ', $request->header('Authorization'))[1];
                $payload = (array) JWT::decode($token, Config::get('app.token_secret'), array('HS256'));
                $user = User::find($payload['sub']);
            }
        }

        $resource->user;

        $resource->organization;
        $resource->projects;
        $resource->call;

        return $resource;

	}

	public function store(Request $request) {
        $user = User::find($request['user']['sub']);

        $resource = new Resource;
        DB::transaction(function() use ($request, $resource, $user) {

            $resource->description = $request->input('description');
            $resource->conditions = $request->input('conditions');
            $resource->cost = $request->input('cost');
            $resource->name = $request->input('name');
            $resource->call_id = $request->input('call_id');
            $resource->image = $request->input('image');
            $resource->resource_type_id = $request->input('resource_type');
            $resource->user_id = $user->id;
            $resource->save();
                 
        });

        return $resource;
	}

	public function update(Request $request, $id) {
        $resource = Resource::find($id);

        DB::transaction(function() use ($request, $resource) {
            $resource->description = $request->input('description');
            $resource->name = $request->input('name');
            $resource->image = $request->input('image');

            $resource->save();
        });
        return $resource;
	}

	public function destroy($id) {
        Resource::destroy($id);
	}

    //Actions

	public function create() {
		//
	}

	public function edit($id) {
		//
	}


}
