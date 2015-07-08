<?php namespace Bancame\Http\Controllers;

use Log;
use File;
use JWT;
use ExpiredException;
use Auth;
use Config;
use Bancame\User;
use Illuminate\Http\Request;

class HomeController extends Controller {

    public function index() {
        return File::get(public_path().'/index.html');
    }

	public function loggedin(Request $request) {
        $user = 0;
		$token = $request->input('_token') ?: $request->header('X-XSRF-TOKEN');
		if ( $token )  {
            $token = $request->header('Authorization');
            if(isset($token[1])) {
                $token = explode(' ', $request->header('Authorization'))[1];
                try {
                    $payload = (array) JWT::decode($token, Config::get('app.token_secret'), array('HS256'));
                    $user = User::find($payload['sub']);
                } catch(ExpiredException $e) {
                    Log::info('Expired Exception');
                    return 0;
                }
            }
        }
        return $user;
    }

	public function modules() {
        return array(
            array("name" => "call"), 
            array(  
                "name" => "system", 
                "angularDependencies" => array("ui.router","mean-factory-interceptor") 
            ),
            array(  
                "name" => "users", 
                "angularDependencies" => array("mean.system") 
            ),
            array("name" => "resource"), 
            array("name" => "project"),
            array("name" => "main")
        );

        return $projects;
	}

}
