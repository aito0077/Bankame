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
        $call->start_date = '2015-09-10';
        $call->middle_date = '2015-09-18';
        $call->end_date = '2015-09-25';
        $call->image = 'ww-default-1';
        $call->publish = true;
        $call->share_phase = true;
        $call->apply_phase = false;

        $call->save();

        $call = new Call();
        $call->name = 'Arte Bis Bas Mes';
        $call->context = 'Transversal que horizontaliza las relaciones de poder y los medios de producción. Es una iniciativa para visibilizar estos nuevos modelos y apoyar y difundir el trabajo de quienes los impulsan, en conjunto con otras redes y organizaciones locales, nacionales y regionales.
Para llevarla adelante invitamos a las organizaciones y colectivos que trabajan bajo estos nuevos modelos, a visibilizar y compartir sus recursos para que esta se convierta en un verdadero festival descentralizado, con entusiasmo y abundancia.';
        $call->status= 'OPEN';
        $call->user_id = 2;
        $call->start_date = '2015-09-20';
        $call->middle_date = '2015-09-28';
        $call->end_date = '2015-10-15';
        $call->image = 'ww-default-2';
        $call->publish = true;
        $call->share_phase = true;
        $call->apply_phase = false;

        $call->save();

        $call = new Call();
        $call->name = 'Viaje Iterenante Teatro';
        $call->context = 'Colectivos que trabajan bajo estos nuevos modelos, a visibilizar y compartir sus recursos para que esta se convierta en un verdadero festival descentralizado, con entusiasmo y abundancia.';
        $call->status= 'OPEN';
        $call->user_id = 2;
        $call->start_date = '2015-09-01';
        $call->middle_date = '2015-09-10';
        $call->end_date = '2015-10-01';
        $call->image = 'ww-default-3';
        $call->publish = true;
        $call->share_phase = false;
        $call->apply_phase = true;

        $call->save();


    }

}

