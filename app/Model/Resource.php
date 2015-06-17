<?php namespace Bancame\Model;

use Illuminate\Database\Eloquent\Model;
use Bancame\Model\ResourcesProjects;

class Resource extends Model {

    public function user() {
        return $this->belongsTo('Bancame\User');
    }

    public function call() {
        return $this->belongsTo('Bancame\Model\Call');
    }

    public function organization() {
        return $this->belongsTo('Bancame\Model\Organization');
    }

    public function projects() {
        return $this->belongsToMany('Bancame\Model\ResourcesProjects', 'resources_projects', 'resource_id', 'project_id');
    }

    public function type() {
        return $this->belongsTo('Bancame\Model\ResourceType');
    }

}
