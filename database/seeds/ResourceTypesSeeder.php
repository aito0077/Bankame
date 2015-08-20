<?php
use Illuminate\Database\Seeder;
use Bancame\Model\ResourceType;

class ResourceTypesTableSeeder extends Seeder {

    public function run() {
        DB::table('resource_types')->delete();

        $resourceType = new ResourceType();
        $resourceType->name = ResourceTypesTableSeeder::slugify('Espacios, materiales y equipamientos');
        $resourceType->description ='Espacios, materiales y equipamientos';
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name = ResourceTypesTableSeeder::slugify('Financiamiento y voluntariado');
        $resourceType->description ='Financiamiento y voluntariado';
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name = ResourceTypesTableSeeder::slugify('Mapeo, contactos y gestión');
        $resourceType->description ='Mapeo, contactos y gestión';
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name = ResourceTypesTableSeeder::slugify('Saberes');
        $resourceType->description ='Saberes';
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name = ResourceTypesTableSeeder::slugify('Moneda Oficial');
        $resourceType->description ='Moneda Oficial';
        $resourceType->parent_id = 2;
        $resourceType->save();
 
        $resourceType = new ResourceType();
        $resourceType->name = ResourceTypesTableSeeder::slugify('Fabricación analógica y digital');
        $resourceType->description ='Fabricación analógica y digital';
        $resourceType->parent_id = 1;
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name = ResourceTypesTableSeeder::slugify('Hacklabs');
        $resourceType->description ='Hacklabs';
        $resourceType->parent_id = 1;
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name = ResourceTypesTableSeeder::slugify('Incluye couchworking');
        $resourceType->description ='Incluye couchworking';
        $resourceType->parent_id = 4;
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name = ResourceTypesTableSeeder::slugify('Mapeos colaborativos');
        $resourceType->description ='Mapeos colaborativos';
        $resourceType->parent_id = 3;
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name = ResourceTypesTableSeeder::slugify('Mercado online');
        $resourceType->description ='Mercado online';
        $resourceType->parent_id = 4;
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name = ResourceTypesTableSeeder::slugify('Mercados solidarios');
        $resourceType->description ='Mercados solidarios';
        $resourceType->parent_id = 4;
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name = ResourceTypesTableSeeder::slugify('Moneda alternativa');
        $resourceType->description ='Moneda alternativa';
        $resourceType->parent_id = 4;
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name = ResourceTypesTableSeeder::slugify('Movilización ciudadana');
        $resourceType->description ='Movilización ciudadana';
        $resourceType->parent_id = 3;
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name = ResourceTypesTableSeeder::slugify('Oficinas compartidas');
        $resourceType->description ='Oficinas compartidas';
        $resourceType->parent_id = 4;
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name = ResourceTypesTableSeeder::slugify('Plataformas libres');
        $resourceType->description ='Plataformas libres';
        $resourceType->parent_id = 2;
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name = ResourceTypesTableSeeder::slugify('Préstamos directos');
        $resourceType->description ='Préstamos directos';
        $resourceType->parent_id = 4;
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name = ResourceTypesTableSeeder::slugify('Promoción');
        $resourceType->description ='Promoción';
        $resourceType->parent_id = 2;
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name = ResourceTypesTableSeeder::slugify('Seguridad digital');
        $resourceType->description ='Seguridad digital';
        $resourceType->parent_id = 4;
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name = ResourceTypesTableSeeder::slugify('Trabajo colaborativo');
        $resourceType->description ='Trabajo colaborativo';
        $resourceType->parent_id = 1;
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name = ResourceTypesTableSeeder::slugify('Transmisiones en vivo');
        $resourceType->description ='Transmisiones en vivo';
        $resourceType->parent_id = 4;
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name = ResourceTypesTableSeeder::slugify('Transporte');
        $resourceType->description ='Transporte';
        $resourceType->parent_id = 2;
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name = ResourceTypesTableSeeder::slugify('Trueque');
        $resourceType->description ='Trueque';
        $resourceType->parent_id = 4;
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name = ResourceTypesTableSeeder::slugify('Voluntariado');
        $resourceType->description ='Voluntariado';
        $resourceType->parent_id = 4;
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name = ResourceTypesTableSeeder::slugify('Alojamiento');
        $resourceType->description ='Alojamiento';
        $resourceType->parent_id = 4;
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name = ResourceTypesTableSeeder::slugify('Aprendizaje colaborativo');
        $resourceType->description ='Aprendizaje colaborativo';
        $resourceType->parent_id = 3;
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name = ResourceTypesTableSeeder::slugify('Banco de conocimientos');
        $resourceType->description ='Banco de conocimientos';
        $resourceType->parent_id = 2;
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name = ResourceTypesTableSeeder::slugify('Banco de horas');
        $resourceType->description ='Banco de horas';
        $resourceType->parent_id = 4;
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name = ResourceTypesTableSeeder::slugify('Compraventa directa');
        $resourceType->description ='Compraventa directa';
        $resourceType->parent_id = 1;
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name = ResourceTypesTableSeeder::slugify('Comunidad / Redes sociales');
        $resourceType->description ='Comunidad / Redes sociales';
        $resourceType->parent_id = 4;
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name = ResourceTypesTableSeeder::slugify('Comunidades');
        $resourceType->description ='Comunidades';
        $resourceType->parent_id = 2;
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name = ResourceTypesTableSeeder::slugify('Conectividad');
        $resourceType->description ='Conectividad';
        $resourceType->parent_id = 4;
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name = ResourceTypesTableSeeder::slugify('Consultoria colaborativa');
        $resourceType->description ='Consultoria colaborativa';
        $resourceType->parent_id = 1;
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name = ResourceTypesTableSeeder::slugify('Crowdsourcing');
        $resourceType->description ='Crowdsourcing';
        $resourceType->parent_id = 3;
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name = ResourceTypesTableSeeder::slugify('Desarrollo colaborativo de soft');
        $resourceType->description ='Desarrollo colaborativo de soft';
        $resourceType->parent_id = 4;
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name = ResourceTypesTableSeeder::slugify('Donaciones');
        $resourceType->description ='Donaciones';
        $resourceType->parent_id = 3;
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name = ResourceTypesTableSeeder::slugify('Financiamiento colectivo');
        $resourceType->description ='Financiamiento colectivo';
        $resourceType->parent_id = 2;
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name = ResourceTypesTableSeeder::slugify('Materiales educativos');
        $resourceType->description ='Materiales educativos';
        $resourceType->parent_id = 1;
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name = ResourceTypesTableSeeder::slugify('Publicaciones y portales');
        $resourceType->description ='Publicaciones y portales';
        $resourceType->parent_id = 4;
        $resourceType->save();


    }

    static public function slugify($text) { 
      $text = preg_replace('~[^\\pL\d]+~u', '-', $text);
      $text = trim($text, '-');
      $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
      $text = strtolower($text);
      $text = preg_replace('~[^-\w]+~', '', $text);
      if (empty($text)) {
        return 'n-a';
      }

      return $text;
    }
}

