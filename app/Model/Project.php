<?php namespace Bancame\Model;

use Illuminate\Database\Eloquent\Model;

class Project extends Model {

    public function user() {
        return $this->belongsTo('Bancame\User');
    }

    public function call() {
        return $this->belongsTo('Bancame\Model\Call');
    }

    public function organization() {
        return $this->belongsTo('Bancame\Model\Organization');
    }

    public function projectType() {
        return $this->belongsTo('Bancame\Model\ProjectType');
    }

    public function resources() {
        return $this->belongsToMany('Bancame\Model\Resource', 'resources_projects')->withPivot('assigned', 'percentage', 'votes');
    }


}
