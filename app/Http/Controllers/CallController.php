<?php namespace Bancame\Http\Controllers;

use JWT;
use Auth;
use Log;
use DB;
use Config;
use Storage;
use Response;
use Validator;
use Collection;
use Bancame\Http\Requests;
use Bancame\Http\Controllers\Controller;
use Bancame\Model\Call;
use Bancame\Model\Project;
use Bancame\Model\Resource;
use Bancame\User;

use Illuminate\Http\Request;

class CallController extends Controller {

    public function __construct() {
        $this->middleware('auth', ['except' => ['index', 'show', 'search', 'callByUser', 'raisingResources']]);
    }

	public function index() {
        $call = Call::where('status', '=', 'OPEN')->first();
         $call->stages = array(
            "share_resource" => array(
                "start_date" => $call->share_resources_start,
                "end_date" => $call->share_resources_end
            ),
            "apply_project" => array(
                "start_date" => $call->apply_project_start,
                "end_date" => $call->apply_project_end
            ),
            "evaluation" => array(
                "start_date" => $call->evaluation_start,
                "end_date" => $call->evaluation_end
            )
        );
       
        return array($call);
	}

	public function show(Request $request, $id) {
        $call = Call::find($id);
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

        $call->user;
        $call->stages = array(
            "share_resource" => array(
                "start_date" => $call->share_resources_start,
                "end_date" => $call->share_resources_end
            ),
            "apply_project" => array(
                "start_date" => $call->apply_project_start,
                "end_date" => $call->apply_project_end
            ),
            "evaluation" => array(
                "start_date" => $call->evaluation_start,
                "end_date" => $call->evaluation_end
            )
        );
        return $call;
	}

	public function store(Request $request) {
        $user = User::find($request['user']['sub']);


        $call = new Call;
        DB::transaction(function() use ($request, $call, $user) {

            $call->context = $request->input('context');
            $call->name = $request->input('name');
            $call->user_id = $user->id;
            $call->save();
                 
        });

        return $call;
	}

	public function update(Request $request, $id) {
        $call = Call::find($id);

        DB::transaction(function() use ($request, $call) {
            $call->context = $request->input('context');
            $call->name = $request->input('name');

            $call->save();
        });
        return $call;
	}

	public function destroy($id) {
        Call::destroy($id);
	}

    //Actions

	public function create() {
		//
	}

	public function edit($id) {
		//
	}

	public function callByUser(Request $request, $callId, $userId) {
        $call = Call::find($callId);

        $resources = Resource::where('user_id', '=', $userId)->where('call_id', '=', $callId)->get();
        $projects = Project::where('user_id', '=', $userId)->where('call_id', '=', $callId)->get();

        $allow_to_apply = count($resources) > 0;

        return array(
            'call' => $call,
            'user_id' => $userId,
            'user_resources' => $resources,
            'user_projects' => $projects,
            'allow_to_apply_projects' => $allow_to_apply

        );
	}

	public function raisingResources(Request $request, $callId) {
        $resources = collect(Resource::where('call_id', '=', $callId)->get());
        
        $raising_resources = $resources->filter(function($item) {
            return count($item->projects) > 1;
        });


        return $raising_resources;
	}



}
