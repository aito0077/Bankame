<?php
use Illuminate\Database\Seeder;
use Bancame\Model\Call;

class CallsTableSeeder extends Seeder {

    public function run() {
        DB::table('calls')->delete();

        $call = new Call();
        $call->name = 'Convocatoria Ejemplo';
        $call->context = 'Esta convocatoria se realiza en el contexto de un llamado a presentar proyectos que tengan que ver con el test del sitio.';
        $call->status= 'OPEN';
        $call->user_id = 2;

        $call->share_resources_start = '2015-06-10';
        $call->share_resources_end = '2015-06-16';
        $call->apply_project_start = '2015-06-17';
        $call->apply_project_end = '2015-06-20';
        $call->evaluation_start = '2015-06-25';
        $call->evaluation_end = '2015-06-29';

        $call->save();

    }

}

