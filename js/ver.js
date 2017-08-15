var a = 0;
var v;
var controladorImagenes = 0;

$(document).ready(function () {
    var arrayCuentos = [];
    $.getJSON('../php/datos.json', function (data) {
        for (let objeto of data) {
            for (let cuento of objeto.cuentos) {
                let aux = new Cuento();
                aux.constru(cuento.titulo, cuento.descripcion, cuento.credito, cuento.imagenes, cuento.audios, cuento.preguntas);

                arrayCuentos.push(aux);

                exportar(arrayCuentos);

            }
        }


        //mostrar los cuentos
        $("#principal").empty();
        for (let value of arrayCuentos) {
            console.log("hola soy un cuento" + arrayCuentos);
            if (value.imagenes.length != null) {
                $("#principal").append('<li><a id=' + a.toString() + '><div class="col-lg-4"><img class="imagenesCuentos"  src=' + value.imagenes[0].src + '>' + value.titulo + '</div></a></li>');

                a++;
            }

        }

    });






    //Ver cuentos
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];



    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";

    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";

        }
    }


    //slider
    $('body').on('click', '#principal a', function () {
        controladorImagenes = 0;
        modal.style.display = "block";
        v = $(this).attr('id');
        mostrarCuento(v, arrayCuentos);
    })



    $("#anterior").click(function () {
        $(".col-lg-10").empty();
        $(".col-lg-10").append('<img   alt=" " class="img-responsive" src="' + arrayCuentos[v].imagenes[0].src + '  ">');
        controladorImagenes = 0;
        $("#au").append("<audio controls><source src='" + arrayCuentos[v].audios[0].src + "' type='audio/mpeg'></audio>");
    });


    $("#siguiente").click(function () {
        $("#au").empty();
     
        controladorImagenes = controladorImagenes + 1;
        alert(controladorImagenes);
        var cont = 0;

        if (controladorImagenes < arrayCuentos[v].imagenes.length) { //va a la imagen siguiente 
            console.log("nooooooo");
            $(".col-lg-10").empty(); //elimina todos los nodos que tenga
            $(".col-lg-10").append('<img   alt=" " class="img-responsive" src="' + arrayCuentos[v].imagenes[controladorImagenes].src + '  ">');
            console.log("por aqui paso");
            console.log(arrayCuentos[v].audios[0].src);
            $("#au").empty();
            $("#au").append("<audio controls><source src='" + arrayCuentos[v].audios[controladorImagenes].src + "' type='audio/mpeg'></audio>");

            cont++;
        } else {
            controladorImagenes = controladorImagenes - 1;
            $(".col-lg-10").empty(); //elimina todos los nodos que tenga
            $(".col-lg-10").append('<img   alt=" " class="img-responsive" src="../imagenes/historias/fin.png">');
            console.log(cont);
        }
        
           //preguntas
        if (controladorImagenes == 1) {
           
            $(".col-lg-10").empty(); //elimina todos los nodos que tenga
            $("#validacion").append('<div class="container"><h1>' + arrayCuentos[v].preguntas[0].pregunta + '</h1><div class="row"><div class="col-lg-3"><a id="1"><img   alt=" " class="img-responsive" src="' + arrayCuentos[v].preguntas[0].imagens[0].src + '  "></a></div><div class="col-lg-3"><a id="2"><img   alt=" " class="img-responsive" src="' + arrayCuentos[v].preguntas[0].imagens[1].src + '  "></a></div><div class="col-lg-3"><a id="3"><img   alt=" " class="img-responsive" src="' + arrayCuentos[v].preguntas[0].imagens[2].src + '  "></a></div></div></div>');

        }
        
           if (controladorImagenes == 4) {
               
            $(".col-lg-10").empty(); //elimina todos los nodos que tenga
            $("#validacion").append('<div class="container"><h1>' + arrayCuentos[v].preguntas[1].pregunta + '</h1><div class="row"><div class="col-lg-3"><a id="1"><img   alt=" " class="img-responsive" src="' + arrayCuentos[v].preguntas[1].imagens[0].src + '  "></a></div><div class="col-lg-3"><a id="2"><img   alt=" " class="img-responsive" src="' + arrayCuentos[v].preguntas[1].imagens[1].src + '  "></a></div><div class="col-lg-3"><a id="3"><img   alt=" " class="img-responsive" src="' + arrayCuentos[v].preguntas[1].imagens[2].src + '  "></a></div></div></div>');

        }
        
         $('body').on('click', '#validacion a', function () {
       iden = $(this).attr('id');
             if(iden == arrayCuentos[v].preguntas[0].respuesta ) {
                alert("c: Eres genial Respuesta Correcta");
                }
             else{
                 
                  alert(":c Pum pin pum pin");
                 }
    })

    });









});
//exportar Json para el usuario

function exportar(arrayCuentos) {


    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(arrayCuentos)); //preparo la data para ser adjuntada al link de exportación
    $('.exportar').attr('href', 'data:' + data);
    //var slug = string_to_slug(title); //convierto el titulo de la partirura a slug para que el archivo contenga ese nombre
    $('.exportar').attr('download', 'pix-data-cuentos.json'); // indico el nombre con el cual se descargará el archivo
    $('.exportar').trigger('click'); // El trigger() método activa el evento especificado y el comportamiento predeterminado de un evento 
}

function mostrarCuento(v, arrayCuentos) {

    $(".col-lg-10").empty(); //elimina todos los nodos que tenga
    $("#nombreCuento").text(arrayCuentos[v].titulo);
    $("#descripcion").text(arrayCuentos[v].descripcion);
    $("#creditos").text(arrayCuentos[v].creditos);


    if (arrayCuentos[v].imagenes[0].src != null) { //si la primera imagen no es igual a null

        $(".col-lg-10").append('<img   alt=" " class="img-responsive" src="' + arrayCuentos[v].imagenes[0].src + '  ">');
        $("#au").append("<audio controls><source src='" + arrayCuentos[v].audios[0].src + "' type='audio/mpeg'></audio>");


    }

}
