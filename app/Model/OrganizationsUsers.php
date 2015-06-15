<?php namespace Bancame\Model;

use Illuminate\Database\Eloquent\Model;

class OrganizationsUsers extends Model {

    public function user() {
        return $this->hasOne('Bancame\User');
    }

    public function organization() {
        return $this->hasOne('Bancame\Model\Organization');
    }

}
