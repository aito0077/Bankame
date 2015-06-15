<?php namespace Bancame\Model;

use Illuminate\Database\Eloquent\Model;

class BancameUser extends Model {

    public function user() {
        return $this->hasOne('Bancame\User');
    }

    public function winwin() {
        return $this->hasOne('Bancame\Model\Winwin');
    }

}
