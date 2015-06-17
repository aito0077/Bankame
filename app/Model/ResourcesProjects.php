<?php namespace Bancame\Model;

use Illuminate\Database\Eloquent\Model;

class ResourcesProjects extends Model {

    protected $table = 'resources_projects';

    public function resource() {
        return $this->hasOne('Bancame\Model\Resource');
    }

    public function project() {
        return $this->hasOne('Bancame\Model\Project');
    }

}
