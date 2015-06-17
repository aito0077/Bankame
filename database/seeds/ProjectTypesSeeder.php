<?php
use Illuminate\Database\Seeder;
use Bancame\Model\ProjectType;

class ProjectTypesTableSeeder extends Seeder {

    public function run() {
        DB::table('project_types')->delete();

        $projectType = new ProjectType();
        $projectType->name ='ARTE';
        $projectType->description ='Arte';
        $projectType->save();

        $projectType = new ProjectType();
        $projectType->name ='ECO';
        $projectType->description ='Ecologia';
        $projectType->save();

        $projectType = new ProjectType();
        $projectType->name ='EDU';
        $projectType->description ='Formación';
        $projectType->save();

        $projectType = new ProjectType();
        $projectType->name ='DESA';
        $projectType->description ='Desarrollo';
        $projectType->save();

        $projectType = new ProjectType();
        $projectType->name ='IT';
        $projectType->description ='Tecnología';
        $projectType->save();




    }

}

