<?php namespace Bancame\Http\Controllers;

use Illuminate\Http\Request;
use Config;
use JWT;
use Log;
use Bancame\User;

class UserController extends Controller {

	public function index() {
        $users = User::all();
        return $users;
	}

	public function show($id) {
        $user = User::find($id);
        return $user;
	}

    protected function createToken($user) {
        $payload = [
            'sub' => $user->id,
            'iat' => time(),
            'exp' => time() + (2 * 7 * 24 * 60 * 60)
        ];
        return JWT::encode($payload, Config::get('app.token_secret'));
    }

    public function getUser(Request $request) {
        $user = User::find($request['user']['sub']);

        $organizations = $user->organizations;

        Log::info($organizations);



        return array(
            'user' => $user,
            'organizations' => $organizations,
            'has_organizations' => count($organizations) > 0
        );
    }

    public function updateUser(Request $request) {
        $user = User::find($request['user']['sub']);

        $user->username = $request->input('username');
        $user->email = $request->input('email');
        $user->save();

        $token = $this->createToken($user);

        return response()->json(['token' => $token]);
    }

}
