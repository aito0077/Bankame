<?php
use Illuminate\Database\Seeder;
use Bancame\Model\Call;

class CallsTableSeeder extends Seeder {

    public function run() {
        DB::table('calls')->delete();

        $call = new Call();
        $call->name = 'Semana de la Economía Colaborativa 2016';
        $call->context = 'La Semana de la economía colaborativa se propone difundir la idea de un cambio transversal que horizontaliza las relaciones de poder y los medios de producción. Es una iniciativa para visibilizar estos nuevos modelos y apoyar y difundir el trabajo de quienes los impulsan, en conjunto con otras redes y organizaciones locales, nacionales y regionales.
Para llevarla adelante invitamos a las organizaciones y colectivos que trabajan bajo estos nuevos modelos, a visibilizar y compartir sus recursos para que esta se convierta en un verdadero festival descentralizado, con entusiasmo y abundancia.';
        $call->status= 'OPEN';
        $call->user_id = 2;

        $call->share_resources_start = '2015-08-19';
        $call->share_resources_end = '2015-08-24';
        $call->apply_project_start = '2015-08-25';
        $call->apply_project_end = '2015-09-02';
        $call->evaluation_start = '2015-09-03';
        $call->evaluation_end = '2015-09-20';

        $call->save();

    }

}

