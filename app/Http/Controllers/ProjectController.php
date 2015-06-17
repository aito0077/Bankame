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
use Bancame\Model\ResourcesProjects;
use Bancame\User;

use Illuminate\Http\Request;

class ProjectController extends Controller {

    public function __construct() {
        $this->middleware('auth', ['except' => ['index', 'show', 'search']]);
    }

	public function index() {
        $projects = Project::all();
        return $projects;
	}

	public function show(Request $request, $id) {
        $project = Project::find($id);
        $project->organization->resources;
        $project->projectType;
        $project->resources;
        $project->call;

        return $project;
	}

	public function store(Request $request) {
        $user = User::find($request['user']['sub']);

        $project = new Project;
        DB::transaction(function() use ($request, $project, $user) {

            $project->call_id = $request->input('call_id');
            $project->image = $request->input('image');
            $project->name = $request->input('name');
            $project->description = $request->input('description');
            $project->stakeholders = $request->input('stakeholders');
            $project->organization_id = $request->input('organization_id');
            $project->user_id = $user->id;
            $project->project_type_id = $request->input('project_type');

            $project->save();

            $resourceProject = new ResourcesProjects;
            $resourceProject->project_id = $project->id;
            $resourceProject->resource_id = $request->input('resource_id');

            $resourceProject->save();

                 
        });

        return $project;
	}

	public function update(Request $request, $id) {
        $project = Project::find($id);

        DB::transaction(function() use ($request, $project) {
            $project->description = $request->input('description');
            $project->name = $request->input('name');
            $project->image = $request->input('image');

            $project->save();
        });
        return $project;
	}

	public function destroy($id) {
        Project::destroy($id);
	}

    //Actions

	public function vote(Request $request, $id, $resourceId) {
        $resourceProject = ResourcesProjects::where('project_id', '=', $id)->where('resource_id', '=', $resourceId)->get(1);
        DB::transaction(function() use ($request, $resourceProject) {
            $resourceProject->votes = $resourceProject->votes + 1;
            $resourceProject->save();
        });
        return array(
            'votes' => $resourceProject->votes
        );
	}



	public function create() {
		//
	}

	public function edit($id) {
		//
	}

    public function storeImage(Request $request) {

        $user = User::find($request['user']['sub']);
        if(!$request->hasFile('file')) { 
            return Response::json(['error' => 'No File Sent']);
        }

        if(!$request->file('file')->isValid()) {
            return Response::json(['error' => 'File is not valid']);
        }

        $file = $request->file('file');

        /*
        $v = Validator::make(
            $request->all(),
            ['file' => 'required|mimes:jpeg,jpg,png|max:8000']
        );

        if($v->fails()) {
            return Response::json(['error' => $v->errors()]);
        }
        */



        /*
        $image = $media::create([
            'name' => $request->file('file')->getClientOriginalName(),
            'ext' => $request->file('file')->guessExtension(),
            'user_id' => $user->id,
            'type' => 'IMAGE'
        ]);
        
        */
        $filename = uniqid(). '.' . $request->file('file')->guessExtension();

        Storage::disk('s3-gallery')->put('/' . $filename, file_get_contents($file));
        Log::info('Uploaded to S3 file '.$filename);

        //Use this line to move the file to local storage & make any thumbnails you might want
        //$request->file('file')->move('/full/path/to/uploads', $filename);

        //If making thumbnails uncomment these to remove the local copy.
        /*
        if(Storage::disk('s3')->exists('uploads/' . $filename))
        Storage::disk()->delete('uploads/' . $filename);
        */

        return Response::json(['OK' => 1, 'filename' => $filename]);
    }



}
