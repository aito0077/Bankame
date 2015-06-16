<?php namespace Bancame;

use Hash;
use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class User extends Model implements AuthenticatableContract, CanResetPasswordContract {

	use Authenticatable, CanResetPassword;

	protected $table = 'users';

	protected $fillable = ['username', 'email', 'password'];

	protected $hidden = ['password', 'facebook', 'google', 'yahoo', 'twitter', 'canceled', 'suspend', 'active', 'created_at', 'updated_at' ];

    /*
	public function setPasswordAttribute($password) {
		$this->attributes['password'] = Hash::make($password);
	}
    */

    public function organizations() {
        return $this->belongsToMany('Bancame\Model\Organization', 'organizations_users');
    }

}
