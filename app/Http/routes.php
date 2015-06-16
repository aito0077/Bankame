<?php


// OAuth, Login and Signup Routes.
Route::post('auth/twitter', 'AuthController@twitter');
Route::post('auth/facebook', 'AuthController@facebook');
Route::post('auth/google', 'AuthController@google');
Route::post('auth/login', 'AuthController@login');
Route::post('auth/signup', 'AuthController@signup');
Route::get('auth/unlink/{provider}', ['middleware' => 'auth', 'uses' => 'AuthController@unlink']);

// API Routes.
Route::resource('api/calls', 'CallController');
Route::post('api/calls/{id}', ['middleware' => 'auth', 'uses' => 'CallController@update']);

Route::get('api/resources/call/{callId}', ['uses' => 'ResourceController@allByCall']);
Route::get('api/calls/{callId}/user/{userId}', ['uses' => 'CallController@callByUser']);

Route::resource('api/resources', 'ResourceController');
Route::resource('api/projects', 'ProjectController');
Route::resource('api/organizations', 'OrganizationController');


Route::get('_getModules', ['uses' => 'HomeController@modules']);
Route::get('loggedin', ['uses' => 'HomeController@loggedin']);


Route::get('api/me', ['middleware' => 'auth', 'uses' => 'UserController@getUser']);
Route::put('api/me', ['middleware' => 'auth', 'uses' => 'UserController@updateUser']);
Route::resource('api/users', 'UserController');

Route::resource('api/parametric/languages', 'LanguageController');
Route::resource('api/parametric/resources', 'ResourceTypeController');
Route::resource('api/parametric/countries', 'CountryController');

// Initialize Angular.js Bancame Route.
Route::get('/', 'HomeController@index');

Route::post('api/upload', ['middleware' => 'auth', 'uses' => 'ProjectController@storeImage']);
