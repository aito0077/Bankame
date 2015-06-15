<?php namespace Bancame\Model;

use Illuminate\Database\Eloquent\Model;

class Organization extends Model {

    public function user() {
        return $this->belongsTo('Bancame\User');
    }


}
