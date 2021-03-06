<?php namespace Bancame\Console\Commands;

use Log;
use Illuminate\Console\Command;

use Bancame\Model\Winwin;
use Bancame\Model\Group;
use Bancame\Model\UserDetail;
use Elasticsearch\Client;

class ESIndexAllCommand extends Command {

    protected $name = "winwins:es-index";

    protected $description = "Indexes all main entities to elasticsearch";

    public function handle() {
        $params = array();
        $params['hosts'] = array('http://10.0.2.2:9200');
        $es = new Client($params);

        $models = Winwin::all();
        foreach ($models as $model) {
            $es->index([
                'index' => 'winwins',
                'type' => 'winwins',
                'id' => $model->id,
                'body' => $model->toArray()
            ]);
        }
        Log::info('Bancame indexed');

        $models = Group::all();
        foreach ($models as $model) {
            $es->index([
                'index' => 'winwins',
                'type' => 'groups',
                'id' => $model->id,
                'body' => $model->toArray()
            ]);
        }
        Log::info('Groups indexed');

        $models = UserDetail::all();
        foreach ($models as $model) {
            $es->index([
                'index' => 'winwins',
                'type' => 'users',
                'id' => $model->id,
                'body' => $model->toArray()
            ]);
        }
        Log::info('Users indexed');


    }
}
