<?php
use Illuminate\Database\Seeder;
use Bancame\Model\ResourceType;

class ResourceTypesTableSeeder extends Seeder {

    public function run() {
        DB::table('resource_types')->delete();

        $resourceType = new ResourceType();
        $resourceType->name ='Espacios, materiales y equipamientos';
        $resourceType->description ='Espacios, materiales y equipamientos';
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name ='Fabricación analógica y digital';
        $resourceType->description ='Fabricación analógica y digital';
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name ='Financiamiento y voluntariado';
        $resourceType->description ='Financiamiento y voluntariado';
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name ='Hacklabs';
        $resourceType->description ='Hacklabs';
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name ='Incluye couchworking';
        $resourceType->description ='Incluye couchworking';
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name ='Mapeo, contactos y gestión';
        $resourceType->description ='Mapeo, contactos y gestión';
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name ='Mapeos colaborativos';
        $resourceType->description ='Mapeos colaborativos';
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name ='Mercado online';
        $resourceType->description ='Mercado online';
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name ='Mercados solidarios';
        $resourceType->description ='Mercados solidarios';
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name ='Moneda alternativa';
        $resourceType->description ='Moneda alternativa';
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name ='Movilización ciudadana';
        $resourceType->description ='Movilización ciudadana';
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name ='Oficinas compartidas';
        $resourceType->description ='Oficinas compartidas';
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name ='Plataformas libres';
        $resourceType->description ='Plataformas libres';
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name ='Préstamos directos';
        $resourceType->description ='Préstamos directos';
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name ='Promoción';
        $resourceType->description ='Promoción';
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name ='Saberes';
        $resourceType->description ='Saberes';
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name ='Seguridad digital';
        $resourceType->description ='Seguridad digital';
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name ='Trabajo colaborativo';
        $resourceType->description ='Trabajo colaborativo';
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name ='Transmisiones en vivo';
        $resourceType->description ='Transmisiones en vivo';
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name ='Transporte';
        $resourceType->description ='Transporte';
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name ='Trueque';
        $resourceType->description ='Trueque';
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name ='Trueque';
        $resourceType->description ='Trueque';
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name ='Voluntariado';
        $resourceType->description ='Voluntariado';
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name ='Alojamiento';
        $resourceType->description ='Alojamiento';
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name ='Aprendizaje colaborativo';
        $resourceType->description ='Aprendizaje colaborativo';
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name ='Banco de conocimientos';
        $resourceType->description ='Banco de conocimientos';
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name ='Banco de horas';
        $resourceType->description ='Banco de horas';
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name ='Compraventa directa';
        $resourceType->description ='Compraventa directa';
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name ='Comunidad / Redes sociales';
        $resourceType->description ='Comunidad / Redes sociales';
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name ='Comunidades';
        $resourceType->description ='Comunidades';
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name ='Conectividad';
        $resourceType->description ='Conectividad';
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name ='Consultoria colaborativa';
        $resourceType->description ='Consultoria colaborativa';
        $resourceType->save();
        $resourceType = new ResourceType();
        $resourceType->name ='Crowdsourcing';
        $resourceType->description ='Crowdsourcing';
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name ='Desarrollo colaborativo de soft';
        $resourceType->description ='Desarrollo colaborativo de soft';
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name ='Donaciones';
        $resourceType->description ='Donaciones';
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name ='Financiamiento colectivo';
        $resourceType->description ='Financiamiento colectivo';
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name ='Materiales educativos';
        $resourceType->description ='Materiales educativos';
        $resourceType->save();

        $resourceType = new ResourceType();
        $resourceType->name ='Publicaciones y portales';
        $resourceType->description ='Publicaciones y portales';
        $resourceType->save();


    }

}

