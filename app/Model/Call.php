<?php namespace Bancame\Model;

use Illuminate\Database\Eloquent\Model;

class Call extends Model {

    public function user() {
        return $this->belongsTo('Bancame\User');
    }

    public function projects() {
        return $this->hasMany('Bancame\Model\Project');
    }

    public function resources() {
        return $this->hasMany('Bancame\Model\Resource');
    }

}
