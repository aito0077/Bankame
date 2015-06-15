<?php namespace Bancame\Model;

use Illuminate\Database\Eloquent\Model;

class BancameUser extends Model {

    public function call() {
        return $this->hasOne('Bancame\Model\Call');
    }

    public function scope() {
        return $this->hasOne('Bancame\Model\Scope');
    }

}
