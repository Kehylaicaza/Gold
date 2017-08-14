var a = 0;
var arrayCuentos = [];
var v;
var controladorImagenes = 0;


$(document).ready(function () {


    $.getJSON("../php/datos.json", function (json) {
        jei = json;

        var titulo;
        var descripcion;
        var creditos;
        var imagenes = [];
        for (i in jei) {
            a++;
            if (i == "titulo") {
                titulo = jei[i];

            }
            if (i == "descripcion") {
                descripcion = jei[i]

            }
            if (i == "creditos") {
                creditos = jei[i]

            }
            if (i == "imagenes") {
                imagenes = jei[i]


            }
            if (a == 4) {
                var aux = new Cuento(titulo, descripcion, creditos, imagenes);

                a = 0;
                arrayCuentos.push(aux);

            }
        }
        //presentar todos los cuentos
        $("#principal").empty();
        for (let value of arrayCuentos) {
            if(value.imagenes.length != null){
            $("#principal").append('<li><a id=' + a.toString() + '><div class="col-lg-4"><img class="imagenesCuentos"  src=' + value.imagenes[0].src + '>' + value.titulo + '</div></a></li>');
            a++;
        }
}
        exportar(arrayCuentos);
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
        mostrarCuento(v);
    })
    
    

    $("#anterior").click(function () {
          $(".col-lg-10").empty();
             $(".col-lg-10").append('<img   alt=" " class="img-responsive" src="' + arrayCuentos[v].imagenes[0].src + '  ">');
        controladorImagenes =0;
    });


    $("#siguiente").click(function () {
        controladorImagenes = controladorImagenes + 1;

        if (controladorImagenes < arrayCuentos[v].imagenes.length) { //va a la imagen siguiente 

            $(".col-lg-10").empty(); //elimina todos los nodos que tenga
            $(".col-lg-10").append('<img   alt=" " class="img-responsive" src="' + arrayCuentos[v].imagenes[controladorImagenes].src + '  ">');

        } else {
            controladorImagenes = controladorImagenes - 1;
            $(".col-lg-10").empty(); //elimina todos los nodos que tenga
            $(".col-lg-10").append('<img   alt=" " class="img-responsive" src="../imagenes/historias/fin.jpg">');




        }
    });




    //exportar Json para el usuario




});

function exportar(jei) {
    console.log(jei);

    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify()); //preparo la data para ser adjuntada al link de exportación
    $('.exportar').attr('href', 'data:' + data);
    //var slug = string_to_slug(title); //convierto el titulo de la partirura a slug para que el archivo contenga ese nombre
    $('.exportar').attr('download', 'pix-data-cuentos.json'); // indico el nombre con el cual se descargará el archivo
    $('.exportar').trigger('click'); // El trigger() método activa el evento especificado y el comportamiento predeterminado de un evento 
}

function mostrarCuento(v) {
    $(".col-lg-10").empty(); //elimina todos los nodos que tenga
    $("#nombreCuento").text(arrayCuentos[v].titulo);
    $("#descripcion").text(arrayCuentos[v].descripcion);
    $("#creditos").text(arrayCuentos[v].creditos);


    if (arrayCuentos[v].imagenes[0].src != null) { //si la primera imagen no es igual a null

        $(".col-lg-10").append('<img   alt=" " class="img-responsive" src="' + arrayCuentos[v].imagenes[0].src + '  ">');


    }

}
