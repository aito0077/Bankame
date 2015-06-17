<?php namespace Bancame\Model;

use Illuminate\Database\Eloquent\Model;

class ProjectType extends Model {

//
    public function projects() {
        return $this->hasMany('Bancame\Model\Project');
    }

}
