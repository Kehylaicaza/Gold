var hoja = 5;
var paginas = 4;
var id = 0;
var cuentos = [];
var cuentosIm = [];

var idCuento = 5;
//esto es para que aparezcan en la pagina Verhistorias como predeterminadas


/*function Cuento(nombre,descripcion,creditos){
    idCuento++;  
    this.nombre=nombre;
    this.descripcion=descripcion;
    this.creditos=creditos;
    var imagenes=[];     
};*/
class Cuento {
    constructor(titulo, descripcion, creditos, imagenes) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.creditos = creditos;
        this.imagenes = imagenes;

    }
}


function crearCuento() {
    idCuento++;
    title = $('input:text[name=fname]').val();
    des = $('input:text[name=fdescripcion]').val();
    cre = $('input:text[name=fcreditos]').val();

    var cuent = new Cuento(title, des, cre, cuentosIm);
    return cuent;
}




$(document).ready(function () {
    //  cuentosPorDefault();
    cargar();



    $(".NuevaHoja").click(function () {
        var Thtml = "<div class='item'>\
                      <div id='hojaBln" + hoja + "'>\
                        \
                      </div>\
                    </div>"
        $(".carousel-inner").append(Thtml);
        $(".nav-dots").append("<li data-target='#carousel-example-generic' data-slide-to=" + paginas + " class='nav-dot'><div class='hojas' id=n" + id + "></div></li>");
        paginas++;
        id++;
        hoja++;
        cargar();


    });
    $(".button2").click(function () {

        location.reload();

    });



    $(".hojas img").each(function () {
        AgrImg = ($(this).attr('src'));
        cuentosIm.push(AgrImg);
        console.log(cuentosIm);
    });


    $("#boton").click(function () {
        var cue = "";
        alert("presss");
        $(".hojas img").each(function () {
            AgrImg = ($(this).attr('src'));
            item = {};
            item["src"] = AgrImg;
            cuentosIm.push(item);


        });
        var objetoCuento = crearCuento();
        var cue = JSON.stringify(objetoCuento);
        console.log(cue);

        $.ajax({
            url: '../php/writeJson.php',
            method: 'post',
            data: {
                "identificador": cue
            },
            success: function (data) {
                alert(data);

            }
        });




    });
    //Agregar imagenes al contenedor

    $(".messages").hide();
    //queremos que esta variable sea global
    var fileExtension = "";
    //función que observa los cambios del campo file y obtiene información
    $(':file').change(function () {
        //obtenemos un array con los datos del archivo
        var file = $("#imagen")[0].files[0];
        //obtenemos el nombre del archivo
        var fileName = file.name;
        //obtenemos la extensión del archivo
        fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
        //obtenemos el tamaño del archivo
        var fileSize = file.size;
        //obtenemos el tipo de archivo image/png ejemplo
        var fileType = file.type;
        //mensaje con la información del archivo
        showMessage("<span class='info'>Archivo para subir: " + fileName + ", peso total: " + fileSize + " bytes.</span>");
    });

    //al enviar el formulario
    $('.AgregarImg').click(function () {
        //información del formulario
        var formData = new FormData($(".formulario")[0]);
        var message = "";
        //hacemos la petición ajax  
        $.ajax({
            url: '../php/upload.php',
            type: 'POST',
            // Form data
            //datos del formulario
            data: formData,
            //necesario para subir archivos via ajax
            cache: false,
            contentType: false,
            processData: false,
            //mientras enviamos el archivo
            beforeSend: function () {
                message = $("<span class='before'>Subiendo la imagen, por favor espere...</span>");
                showMessage(message)
            },
            //una vez finalizado correctamente
            success: function (data) {
                message = $("<span class='success'>La imagen ha subido correctamente.</span>");
                showMessage(message);
                if (isImage(fileExtension)) {
                    $(".showImages").append("<img id='draggable' src='../imagenes/historias/" + data + "' />");
                    cargar();
                }
            },
            //si ha ocurrido un error
            error: function () {
                message = $("<span class='error'>Ha ocurrido un error.</span>");
                showMessage(message);
            }
        });
    });


    //link del tutorial para subir imagenes con jquery y Javascript
    //https://www.uno-de-piera.com/subir-imagenes-con-php-y-jquery/




});








function showMessage(message) {
    $(".messages").html("").show();
    $(".messages").html(message);
}

//comprobamos si el archivo a subir es una imagen
//para visualizarla una vez haya subido
function isImage(extension) {
    switch (extension.toLowerCase()) {
        case 'jpg':
        case 'gif':
        case 'png':
        case 'jpeg':
            return true;
            break;
        default:
            return false;
            break;
    }
}




function cargar() {
    $("[id^=draggable]").draggable({
        revert: true
    });
    $("[id^=n]").droppable({
        drop: function (event, ui) {
            agregar = $(ui.draggable).attr('src');
            alert(agregar);
            idA = $(this).attr("id");
            alert(idA);
            $("#" + idA + "").empty(); // vaciar los contenedores en el caso que este lleno
            $("#hojaBl" + idA + "").empty(); // vaciar los contenedores en el caso que este lleno
            $("#hojaBl" + idA + "").append("<img src=" + agregar + ">"); //agrego la imagen al contenedor del slider          
            $("#" + idA + "").append("<img src=" + agregar + ">"); //agrego la imagen a la pagina en miniatura.

        }
    });

}


/*
//Cargar imagen
function archivo(evt) {
      var files = evt.target.files; // FileList object
       
        //Obtenemos la imagen del campo "file". 
      for (var i = 0, f; f = files[i]; i++) {         
           //Solo admitimos imágenes.
           if (!f.type.match('image.*')) {
                continue;
           }
       
           var reader = new FileReader();
           
           reader.onload = (function(theFile) {
               return function(e) {
               // Creamos la imagen.
                      document.getElementById("draggable").innerHTML = ['<img class="foto" src="', e.target.result,'" title="', escape(theFile.name), '"/>'].join('');
               };
           })(f);
 
           reader.readAsDataURL(f);
       }
}
             
      document.getElementById('files').addEventListener('change', archivo, false);
//La variable result contiene los datos de la imagen en codificación base64. 
*/
