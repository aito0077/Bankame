<?php namespace Bancame\Model;

use Illuminate\Database\Eloquent\Model;

class Project extends Model {

    public function user() {
        return $this->belongsTo('Bancame\User');
    }

    public function call() {
        return $this->belongsTo('Bancame\Call');
    }

}
