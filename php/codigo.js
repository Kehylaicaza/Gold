var hoja=5;
var paginas=4;
var id=5;
var cuentos=[];
var cuentosIm=[];

function Cuento(nombre){
    idCuento++;  
    this.nombre=nombre;
    var imagenes=[];     
};



$(document).ready(function(){
      cargar();
   $(".NuevaHoja").click(function(){
        var Thtml="<div class='item'>\
                      <div id='hojaBln"+hoja+"'>\
                        \
                      </div>\
                    </div>"        
        $(".carousel-inner").append(Thtml);
        $(".nav-dots").append("<li data-target='#carousel-example-generic' data-slide-to="+paginas+" class='nav-dot'><div class='hojas' id=n"+id+"></div></li>");
        paginas++;
       id++;
       hoja++;
            cargar();          
                       
                  
    });
    
    
    
     //Agregar imagenes al contenedor
    
    $(".messages").hide();
    //queremos que esta variable sea global
    var fileExtension = "";
    //función que observa los cambios del campo file y obtiene información
    $(':file').change(function()
    {
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
        showMessage("<span class='info'>Archivo para subir: "+fileName+", peso total: "+fileSize+" bytes.</span>");
    });

    //al enviar el formulario
    $('.AgregarImg').click(function(){
        //información del formulario
        var formData = new FormData($(".formulario")[0]);
        var message = ""; 
        //hacemos la petición ajax  
        $.ajax({
            url: 'php/upload.php',  
            type: 'POST',
            // Form data
            //datos del formulario
            data: formData,
            //necesario para subir archivos via ajax
            cache: false,
            contentType: false,
            processData: false,
            //mientras enviamos el archivo
            beforeSend: function(){
                message = $("<span class='before'>Subiendo la imagen, por favor espere...</span>");
                showMessage(message)        
            },
            //una vez finalizado correctamente
            success: function(data){
                message = $("<span class='success'>La imagen ha subido correctamente.</span>");
                showMessage(message);
                if(isImage(fileExtension))
                {
                    $(".showImages").append("<img id='draggable' src='imagenes/historias/"+data+"' />");
                     $( "[id^=draggable]" ).draggable();
                }
            },
            //si ha ocurrido un error
            error: function(){
                message = $("<span class='error'>Ha ocurrido un error.</span>");
                showMessage(message);
            }
        });
    });
    
    
 //link del tutorial para subir imagenes con jquery y Javascript
//https://www.uno-de-piera.com/subir-imagenes-con-php-y-jquery/
    

   
 
});
 
  



function showMessage(message){
    $(".messages").html("").show();
    $(".messages").html(message);
}

//comprobamos si el archivo a subir es una imagen
//para visualizarla una vez haya subido
function isImage(extension)
{
    switch(extension.toLowerCase()) 
    {
        case 'jpg': case 'gif': case 'png': case 'jpeg':
            return true;
        break;
        default:
            return false;
        break;
    }
 }



 /*$(function() {
    $( "[id^=draggable]" ).draggable();
      $( ".carousel-inner" ).droppable({
      drop: function( event, ui ) {
        $( this )
          .addClass( "ui-state-highlight" )
          .find( "p" )
           
            .html( "Dropped!" );
           agregar = $(ui.draggable).attr('src');
          alert(agregar);
//          var texto2="<img src='imagenes/foto.jpg'>";
          $("#hojaBl1").append("<img src="+agregar+">");
//          ui.draggable.css("width", "100%");
      }
    });
  });*/


/*$(function() {
    $( "[id^=draggable]" ).draggable();
      $( "[id^=n]" ).droppable({
         
      drop: function( event, ui ) {
        $( this )
          .addClass( "ui-state-highlight" )
          .find( "div p" )
           
            .html("dropped" );
          
           agregar = $(ui.draggable).attr('src');
          alert(agregar);
//          var texto2="<img src='imagenes/foto.jpg'>";
          $("#hojaBl1").append("<img src="+agregar+">");
          $("#hojaBl2").append("<img src="+agregar+">");
          $("#hojaBl3").append("<img src="+agregar+">");
          $("#1").append("<img src="+agregar+">");
//          ui.draggable.css("width", "100%");
          agregar= $( this ).attr("id");
          alert (agregar);
         $( this ).find("div");   
      }
    });
  });*/

function cargar(){
    $( "[id^=draggable]" ).draggable({ revert:true});
      $( "[id^=n]" ).droppable({
         
      drop: function( event, ui ) {
        $( this )
         /* .addClass( "ui-state-highlight" )
          .find( "div p" )
           
            .html("dropped" );*/
          
           agregar = $(ui.draggable).attr('src');
          alert(agregar);
          alert(agregar);
          idA= $( this ).attr("id");
          alert (idA);
          $("#hojaBl"+idA+"").append("<img src="+agregar+">");
           $("#"+idA+"").append("<img src="+agregar+">");
          agregar = $(ui.draggable).attr('src');
         $( this ).find("div");   
          cuentosIm.push(agregar);
          console.log(cuentosIm);
      }
    });
    
}


