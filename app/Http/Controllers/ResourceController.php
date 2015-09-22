<?php namespace Bancame\Http\Controllers;

use JWT;
use Auth;
use Log;
use DB;
use Config;
use Storage;
use Collection;
use Response;
use Validator;
use Bancame\Http\Requests;
use Bancame\Http\Controllers\Controller;
use Bancame\Model\Call;
use Bancame\Model\Project;
use Bancame\Model\Resource;
use Bancame\Model\ResourceResourceType;

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
        collect($resources)->each(function($model) {
            $model->types;
            $model->organization;
        });
        return $resources;
	}

	public function show(Request $request, $id) {
        $resource = Resource::find($id);
        //$resource->type();
        $resource->types;
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
        $resource->type;
        $resource->call;

        return $resource;

	}

	public function store(Request $request) {
        $user = User::find($request['user']['sub']);

        $resource = new Resource;

        DB::transaction(function() use ($request, $resource, $user) {
            $tags = $request->input('tags');
            $tag_collection = collect($tags);
            $tags_flat = $tag_collection->implode('name', '; ');
            $tags_pretty = $tag_collection->implode('description', '; ');

            $organization = $request->input('organization_owner');
            
            Log::info($organization);

            $resource->description = $request->input('description');
            $resource->conditions = $request->input('conditions');
            $resource->cost = $request->input('cost');
            $resource->name = $request->input('name');
            $resource->call_id = $request->input('call_id');
            if(isset($organization)) {
                $resource->organization_id = $organization['id'];
            }
            $resource->image = $request->input('image');
            $resource->tags = $tags_flat;
            $resource->tags_pretty = $tags_pretty;
            $resource->user_id = $user->id;
            $resource->save();
            
            foreach($tags as $tag) {
                $rrt = new ResourceResourceType(array(
                    'resource_id' => $resource->id,
                    'resource_type_id' => $tag['id']
                ));
                $rrt->save();
            };
                 
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
