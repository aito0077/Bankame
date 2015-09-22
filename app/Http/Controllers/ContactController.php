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
use Bancame\Model\Contact;

use Illuminate\Http\Request;

class ContactController extends Controller {

    public function __construct() {
        $this->middleware('auth', ['except' => ['index', 'show', 'search', 'store']]);
    }

	public function index() {
        $contacts = Contact::all();
        return $contacts;
	}

	public function show(Request $request, $id) {
        $contact = Contact::find($id);
        return $contact;
	}

	public function store(Request $request) {
        $contact = new Contact;
        DB::transaction(function() use ($request, $contact) {

            $contact->name = $request->input('name');
            $contact->email = $request->input('email');
            $contact->comment = $request->input('comment');
            $contact->save();
                 
        });

        return $contact;
	}

	public function update(Request $request, $id) {
        $contact = Contact::find($id);

        DB::transaction(function() use ($request, $contact) {
            $contact->name = $request->input('name');
            $contact->email = $request->input('email');
            $contact->comment = $request->input('comment');

            $contact->save();
        });
        return $contact;
	}

	public function destroy($id) {
        Contact::destroy($id);
	}

    //Actions

	public function create() {
		//
	}

	public function edit($id) {
		//
	}


}


