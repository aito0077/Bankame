<?php
use Illuminate\Database\Seeder;
use Bancame\Model\Call;

class CallsTableSeeder extends Seeder {

    public function run() {
        DB::table('calls')->delete();

        $call = new Call();
        $call->name = 'Semana de la Economía Colaborativa 2016';
        $call->context = 'Del 9 al 15 de mayo, ciudades de todo el mundo celebrarán la Semana de la economía colaborativa: siete días para celebrar, practicar y difundir la cultura del compartir.
En todo el mundo están surgiendo nuevas formas de hacer, pensar, diseñar, trabajar, comprar, vender, intercambiar, fabricar, viajar, enseñar, aprender y financiar entre pares. En las ciudades de América latina florecen los espacios de coworking y makerspaces, se testean las primeras plataformas para compartir viajes en auto y aparecen sistemas de bicicletas públicas y gratuitas. Los tradicionales mercados del productor al consumidor se difunden cada vez más gracias a internet, al igual que los huertos comunitarios.
La web intensifica la circulación de objetos usados entre pares, tanto a través de plataformas de compraventa como de regalos, donaciones, préstamos y alquileres. El crowdfunding se populariza cada vez más, tanto en proyectos artísticos como sociales, y las finanzas entre particulares permiten independizar las necesidades económicas de los bancos. Cada vez más gente olvida los hoteles y se hospeda en casas particulares. Los bienes y servicios que usamos cada día se asimilan al software y los contenidos digitales: lo importante no es poseerlos, sino acceder a ellos.
Todos los días, los grandes diarios de América latina reflejan alguno de estos cambios. Sin embargo, no hablan de economía colaborativa: no hay conciencia de que cada una de estas tendencias forma parte de un movimiento más grande. Por eso, la Semana de la economía colaborativa se propone difundir la idea de un cambio transversal que horizontaliza las relaciones de poder y los medios de producción. Es una iniciativa de Minka Banco de las redes para  visibilizar estos nuevos modelos y apoyar y difundir el trabajo de quienes los impulsan, en conjunto con otras redes y organizaciones locales, nacionales y regionales.
Para eso, se están preparando actividades gratuitas, descentralizadas y autogestionadas en más de veinte ciudades, de México a la Patagonia. Mercados de intercambio, jornadas de fabricación digital, días de coworking abierto, debates sobre finanzas colaborativas, talleres sobre economía creativa, gratiferias, encuentros de consultoría colaborativa, proyectos conjuntos, viajes compartidos y fiestas de crowdfunding son algunas de las propuestas de la agenda.
Desde el sur impulsamos este movimiento global en busca de mayor participación, sustentabilidad, horizontalidad, transparencia y humanidad.';
        $call->status= 'OPEN';
        $call->user_id = 2;
        $call->start_date = '2016-04-01';
        $call->middle_date = '2016-05-01';
        $call->end_date = '2016-05-09';
        $call->image = 'call_1.png';
        $call->countries = 'argentina, bolivia, venezuela, brasil';
        $call->tags = 'mapeos-colaborativos, comunidades';
        $call->publish = true;
        $call->twitter_hashtag = "semanacolaborativa";
        $call->remark = true;
        $call->share_phase = true;
        $call->apply_phase = false;
        $call->website = "http://minka.me/semana-2014";
        $call->save();


        $call = new Call();
        $call->name = '3er. encuentro internacional Facción';
        $call->context = '¡Multiplica otras voces!
Ya somos 19 países conectando experiencias de comunicación para la 3ª edición del Encuentro Latinoamericano de Mediactivismo, organizado por Facción. Somos hackers de un nuevo orden social, comunicadorxs en red, narradorxs de una crisis mundial de valores y protagonistas de un escenario contemporáneo de colaboración y disputa simbólica.
Para esta edición, más de 200 medialibristas convocan a periodistxs, bloguerxs, militantxs y desarrolladorxs para sumarse al evento que se desarrollará en Montevideo,  Uruguay, el país capital de la utopía Latinoamericana, del  23 al 26 de septiembre de 2015.
Facción es una plataforma que articula -desde América Latina y el Caribe- redes independientes de medioactivismo. Por medio de procesos participativos, horizontales y abiertos, incentiva la comunicación libre, abierta y compartida por una trasformación social y cultural.
El primer encuentro presencial fue realizado en Brasil en 2013, cuando se inició un amplio proceso de democratización de la comunicación por medio de las conexiones entre las redes, con debates de coyuntura, nuevos medios de comunicación, economía y disputas simbólicas. Facción creció. En 2014, Bolivia fue la sede para el segundo encuentro que reunió a más de 60 medios libres y desde aquel entonces, la participación de nuevos agentes se triplicó.
¿Qué esperamos para 2015?
Construyamos Facción entre todxs! En los últimos años Uruguay ha protagonizado grandes cambios políticos. Allí esperamos sumar la fuerza de la soberanía popular y las experiencias de quiebre con los modelos hegemónicos de comunicación que todavía imperan en nuestros países. Los ejes de trabajo se han construido colectivamente a partir de discusiones y demandas específicas que queremos continuar durante el encuentro.';
        $call->status= 'OPEN';
        $call->user_id = 2;
        $call->start_date = '2015-09-14';
        $call->middle_date = '2015-09-21';
        $call->end_date = '2015-09-25';
        $call->image = 'call_2.jpg';
        $call->publish = true;
        $call->share_phase = false;
        $call->countries = 'bolivia';
        $call->apply_phase = true;
        $call->website = "http://faccionlatina.org";
        $call->save();

        $call = new Call();
        $call->name = 'Encuentro de activismo y nuevos feminismos';
        $call->context = 'ELLA – Encuentro Latinoamericano de Mujeres llega en 2016 con su 3ª edición. Realizado por primera vez en Belo Horizonte/Brasil en 2014, el evento reunió cerca de 300 mujeres de 15 países de Iberoamérica y tuvo como principal objetivo ser un espacio para la convergencia entre militantes, movimientos, agentes sociales y/o culturales y todos lxs interesadxs en la constitución de una plataforma común de debates sobre temas ligados a cuestiones de género en América Latina.

En la 3er. edición de ELLA dialogaremos el concepto de género como un tema amplio, cultural y de múltiple significado que induce a luchar por la necesaria igualdad de derechos, enfrentándose a los distintos modos de opresión, y con el consecuente comportamiento y empoderamiento de la mujer a partir de sus posicionamientos, deseos y placeres, como principal sentido del debate.
La vivencia comprende, la participación durante los cuatro días de evento desde un enfoque propositivo, diverso y plural que permita intercambios y construcciones inclusivas y colaborativas.';
        $call->status= 'OPEN';
        $call->user_id = 2;
        $call->start_date = '2016-01-14';
        $call->middle_date = '2016-04-21';
        $call->end_date = '2016-06-15';
        $call->image = 'call_3.jpg';
        $call->publish = true;
        $call->countries = 'brasil';
        $call->share_phase = true;
        $call->apply_phase = false;
        $call->website = "http://www.ellas.cc";
        $call->save();

        $call = new Call();
        $call->name = '4to. encuentro internacional Facción';
        $call->context = 'Facción es una plataforma que articula  – desde  Latinoamérica – redes independientes de mediactivismo a partir de  procesos participativos, horizontales y abiertos, con el objetivo de incentivar la comunicación libre, abierta y compartida por una transformación social y cultural.
El 4to. encuentro de la red latina de comunicación alternativa tendrá lugar en Ecuador del 3 al 10 de octubre de 2016.Colabora con este espacio dedicado a reunir activistas, artistas, radialistas, bloguerxs, cineastas, comunicadores y comunicadoras en general, gestores culturales, desarrolladores de tecnología libre, sociedad civil articulada y movimientos sociales de más de 15 nacionalidades distintas.';
        $call->status= 'OPEN';
        $call->user_id = 2;
        $call->start_date = '2016-06-19';
        $call->middle_date = '2016-07-11';
        $call->end_date = '2016-09-15';
        $call->image = 'call_4.jpg';
        $call->publish = true;
        $call->countries = 'ecuador';
        $call->share_phase = true;
        $call->apply_phase = false;
        $call->website = "http://faccionlatina.org";
        $call->save();

        $call = new Call();
        $call->name = 'Feria de la Música';
        $call->context = 'A Feira da Música de Fortaleza foi criada com o objetivo de agregar e fortalecer os atores da cadeia produtiva da música no Brasil, dinamizando negócios na área da economia criativa e propondo uma gestão pautada em estratégias nacionais de escoamento da produção.
Em sua primeira edição, no ano de 2002, a Feira abrangia uma área total de 5.000 m² de ocupação de espaço físico, com participação expressiva e se inserindo no calendário cultural do estado do Ceará. Nela, já contávamos com um grande número de atividades, como shows, painéis, exposições e conferências. No ano seguinte, o evento aumentou suas proporções e chegou a uma área total de 8.000 m², realizando 175 atividades – entre shows, palestras, encontros, oficinas, lançamentos de CDs e livros – além de ter a participação de agentes de oito estados do Nordeste envolvidos na programação.
A cada nova edição, o evento cresceu. Parte das oficinas e dos workshops se transformou em rodadas de negócios, momentos em que os participantes podiam trocar experiências, fazer contatos para viabilizar oportunidades além da Feira e divulgar seus trabalhos de forma mais ampla.';
        $call->status= 'OPEN';
        $call->user_id = 2;
        $call->start_date = '2016-09-01';
        $call->countries = 'brasil';
        $call->middle_date = '2016-10-10';
        $call->end_date = '2016-10-25';
        $call->image = 'call_5.png';
        $call->publish = true;
        $call->share_phase = true;
        $call->apply_phase = false;
        $call->website = "http://www.feiradamusica2015.com/portal/index";
        $call->save();


        $call = new Call();
        $call->name = 'Emergencia';
        $call->context = 'Emergencia es un punto de conexión entre redes de cultura y activismo de todo el mundo. El nombre se concibe a partir de los dos sentidos de la palabra: el de la urgencia, de la necesidad de llevar a cabo una acción inmediata frente a la crisis sistémica; y el aumento emergente de un nuevo contexto social, político, económico y cultural a partir de la sociedad en red y de la era de la información.
Este encuentro funcionará como territorio físico donde temporalmente convivirán los más diversos pensamientos, ciencias, creencias y causas que actualmente se encuentran discutiendo políticas en red y avanzando en la construcción conjunta de estructuras políticas contrahegemónicas en el contexto iberoamericano y africano. Pretende servir de estímulo para la movilización, participación y confluencia de múltiples grupos de activistas, teóricos, científicos, artistas, políticos y agentes culturales con el objetivo de construir un espacio común que construya de forma colectiva el nuevo mapa de la conciencia política global.';
        $call->status= 'OPEN';
        $call->user_id = 2;
        $call->start_date = '2015-10-01';
        $call->middle_date = '2015-11-10';
        $call->end_date = '2015-12-05';
        $call->image = 'call_6.png';
        $call->countries = 'argentina,venezuela';
        $call->publish = true;
        $call->share_phase = false;
        $call->apply_phase = true;
        $call->save();

        $call = new Call();
        $call->name = 'Laboratorio creativo';
        $call->context = 'Desde este lunes 14 y hasta el próximo domingo 20 el chavismo comunal se encuentra!  comunerxs, militantes,  creativos(as) y comunicadores(as) de 21 organizaciones todo el país estarán en el Laboratorio Creativo, con el fin de diseñar una campaña comunicacional sobre el Poder Comunal y la importancia de ganar la Asamblea Nacional para garantizar el avance hacia el Estado Comunal; proyecto que garantizará la superación del rentismo y la profundización de la democracia.
Con los mensajes que se generarán, el Poder Comunal se propone mostrarle al país cuáles son las concreciones de lo hecho en Revolución, los asideros políticos y culturales que permitirán construir lo que viene y posicionar una agenda legislativa necesaria para continuar el legado de Chávez: el Comuna o Nada; irrumpiendo desde lo comunicacional con propuestas movilizadoras y atractivas que le hagan sentido al pueblo.
La esfera de lo cultural-comunicacional es la principal arena de lucha por las ideas, la conciencia y el sentido común,  sobre la que  descansa el sistema hegemónico imperial y capitalista, por eso es necesario cruzar miradas sobre las estrategias más sólidas, creativas y contundentes para posicionar narrativas sobre el proyecto comunal y resignificar la lucha por el parlamento, como un espacio que garantiza el avance hacia el Estado Comunal. 
Este encuentro es convocado y organizado por Códigos Libres; en coproducción con Tiuna El Fuerte, Comando Creativo, Facción, y varias comunas y organizaciones sociales del país.';
        $call->status= 'OPEN';
        $call->user_id = 2;
        $call->start_date = '2015-09-01';
        $call->middle_date = '2015-09-10';
        $call->end_date = '2015-09-25';
        $call->image = 'call_7.jpg';
        $call->publish = true;
        $call->remark = true;
        $call->countries = 'venezuela';
        $call->share_phase = false;
        $call->apply_phase = true;
        $call->save();

        $call = new Call();
        $call->name = 'Congreso Culturas en movimiento';
        $call->context = 'Del 29 al 31 de octubre, en la ciudad de Sucre (Bolivia) se realizará el Congreso «Culturas en Movimiento». Por ello te invitamos a participar y ser parte de este encuentro histórico impulsado desde las narrativas de Cultura Viva Comunitaria y Cultura de Red articuladas por Telartes y por actores culturales de la sociedad civil, donde nos reuniremos más de 300 representantes de organizaciones, centros culturales, artistas, cultores, gestores, académicas/os, activistas, mediactivistas, autoridades y decisores políticos, interesadas/os e implicadas/os con la gestión de las diferentes expresiones culturales de Bolivia.';
        $call->status= 'OPEN';
        $call->user_id = 2;
        $call->start_date = '2015-08-01';
        $call->middle_date = '2015-09-25';
        $call->end_date = '2015-10-20';
        $call->image = 'call_8.png';
        $call->remark = true;
        $call->publish = true;
        $call->countries = 'bolivia';
        $call->share_phase = false;
        $call->apply_phase = true;
        $call->website = "https://www.facebook.com/telArtes.Bolivia/timeline ";
        $call->save();

    }

}

