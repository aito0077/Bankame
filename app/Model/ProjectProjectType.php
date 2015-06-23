<?php namespace Bancame\Model;

use Illuminate\Database\Eloquent\Model;

class ProjectProjectType extends Model {

    protected $table = 'projects_project_types';

    public function project() {
        return $this->hasOne('Bancame\Model\Project');
    }

    public function projectType() {
        return $this->hasOne('Bancame\Model\ProjectType');
    }

}


