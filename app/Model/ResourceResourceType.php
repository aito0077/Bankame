<?php namespace Bancame\Model;

use Illuminate\Database\Eloquent\Model;

class ResourceResourceType extends Model {

    protected $table = 'resources_resource_types';
    protected $fillable = [ 'resource_id', 'resource_type_id'];

    public function resource() {
        return $this->hasOne('Bancame\Model\Resource');
    }

    public function resourceType() {
        return $this->hasOne('Bancame\Model\ResourceType');
    }

}

