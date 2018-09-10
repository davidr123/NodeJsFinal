class Usuario{
    constructor(obj){
        this.user=obj.user;
        this.pass=obj.pass;
        this.puntaje=obj.puntaje;
        var arrRompecabezas=[];
        obj.rompecabeza.forEach( function(rompecbz){
            arrRompecabezas.push(new Rompecabeza(rompecbz.piezas, rompecbz.espacios));
        });
        this.rompecabeza=arrRompecabezas;
    }
}

class Rompecabeza{
    constructor(piezas,espacios){
        var arrPiezas=[];
        piezas.forEach( function(pieza){
            arrPiezas.push(new Piezas(pieza.id, pieza.posx,pieza.posy,pieza.url));
        });
        this.piezas=arrPiezas;
                       
        var arrEspacios=[];
        espacios.forEach( function(espacio){
            arrEspacios.push(new Espacios(espacio.id, espacio.posx,espacio.posy,espacio.url));
        });               
        this.espacios=arrEspacios;
    }
    
}
class Piezas {
    constructor(id, posx, posy, url){
        this.id = id;
        this.posx = posx;
        this.posy = posy;
        this.url = url;
    }
}
class Espacios {
    constructor(id, posx, posy, url){
        this.id = id;
        this.posx = posx;
        this.posy = posy;
        this.url = url;
    }
}


//en esta funcion estaba haciendo un foreach de los objetos del json y los estaba metiendo en un arreglo

var arregloUsuarios= [];

let currentlyDragging = null;
var contadorAciertos = 0;
var contadorErrores = 0;

    $.getJSON('ejemplo.json', function(data){
        
        $.each(data, function(i, resultado){
          arregloUsuarios.push(new Usuario(resultado))
        });
        console.log(arregloUsuarios[0].rompecabeza[0].piezas[0].width);
        $('#puntaje').html(arregloUsuarios[0].puntaje);
        $.each(arregloUsuarios[0].rompecabeza[0].piezas, function(i, pieza){
            //var newdiv = $(document.createElement('div'));
//            newdiv.css("background-image", "url('./img/peppa/" + pieza.id+ ".jpg')");
//            newdiv.css('left', pieza.posx+ "px");
//            newdiv.css('top', pieza.posy+"px");
//            newdiv.attr("id", ""+pieza.id);
            $('#elementos').append("<div id="+pieza.id+" style='background-image: url(&quot;./"+pieza.url+"&quot;); left: "+pieza.posx+"; top: "+pieza.posy+"'></div></div>");
            $("#"+pieza.id).on("touchstart", inicio);
            $("#"+pieza.id).on("touchend", soltar);
            $("#"+pieza.id).on("touchmove", mover);

         //   console.log("Start " + mover);

        });

        arregloUsuarios[0].rompecabeza[0].espacios.forEach( function(espacio){
//            var newdiv =  $( document.createElement('div'));
//            newdiv.css('backgroundColor',"transparent");
//            newdiv.css("border-style", "dotted");
//            newdiv.css('left', espacio.posx + "px");
//            newdiv.css('top', espacio.posy+ "px");
//            newdiv.attr("id", "tab"+espacio.id);
            $('#tablero').append("<div id='tab"+espacio.id+"' style='background-color: transparent; border-style: dotted;left: "+espacio.posx+"; top: "+espacio.posy+"'></div>");
        });
    });


function inicio(eve){
    
    currentlyDragging = eve.target;
    divEsp  = $(""+eve.target.id);
    
    currentlyDragging = eve.target;
    console.log("mira este es objeto que tiene el evento actual: "+currentlyDragging);
    divEsp =$(""+eve.target.id);
    console.log("Start:" + eve.target.id + " " + eve);
    
    var oX=(divEsp.css('left'));
    var oY=(divEsp.css('top'));
    console.log("Oy tiene: "+oY);
    console.log("Ox tiene: "+ oX);
    
}

function mover(eve){
    var touchLocation = eve.targetTouches[0];
     // $("#"+ e.target.id).css("left", touchLocation.clientX + 'px');
    var id = $("#"+ eve.target.id).attr("id");
    console.log("id del taget es: " + id);
     $("#"+ eve.target.id).css('left', touchLocation.clientX + 'px');
     $("#"+ eve.target.id).css('top', touchLocation.clientY + 'px');
}

function soltar(eve){
    
    console.log(arregloUsuarios);
    
    currentlyDragging = eve.target;
    var  divEsp = $("#"+eve.target.id);
    var tablEspacio  = $("#tab"+eve.target.id);
    console.log(divEsp);
    console.log("div actual en evento: "+divEsp.attr("id"));
    console.log("Movimientos: " + divEsp.css("backgroundColor"));
    console.log("Movimientos: " + tablEspacio.css("borderColor"));
    
    
    
    var arrastrar = (parseInt($("#elementos").width()) - parseInt(divEsp.css("left") + 20))*-1;
    console.log("mov: "  + divEsp.css("left"))
    console.log("mov: "  + divEsp.css("top"))
    console.log("arrastrar tiene: "+arrastrar)
    posxPieza = arrastrar;
    console.log("posxPieza tiene: "+posxPieza)
    posyPieza = parseInt(divEsp.css("top"));
    console.log("posyPieza tiene: "+posyPieza)
    posxEspacio = parseInt(tablEspacio.css("left")) + 30;
    console.log("posxEspacio tiene: "+posxEspacio)
    posyEspacio = parseInt(tablEspacio.css("top"));
    console.log("posyEspacio tiene: "+posyEspacio)
    
    



    posicionfinal = posxEspacio + parseInt($("#elementos").width());
    console.log("pos final"+ posicionfinal)
if (((posxEspacio -200) <= posxPieza) && ((posxEspacio + 10) >= posxPieza) && ((posyEspacio -10) <= posyPieza) && ((posyEspacio +10) >= posyPieza)){
    //alert("Bien hecho!Intentalo nuevamente y gana puntos!");                                                                                                                                 
      divEsp.css("left",posicionfinal + 'px');
      divEsp.css("top" ,posyEspacio + 'px');
      divEsp.off("touchstart", inicio, false);
      divEsp.off("touchend", soltar, false);
      
      divEsp.off("touchmove", mover, false);
      contadorAciertos++;
      if (contadorAciertos == 9){
        if((contadorAciertos+contadorErrores)<15){
           alert("GANASTE PUNTOS");
            arregloUsuarios[0].puntaje++;
            $('#puntaje').html(arregloUsuarios[0].puntaje);
            $.ajax({
                url: 'guardarjson.php',
                method: 'post',
                data: {
                    "enviodatos": arregloUsuarios
                },
                success: function (data) {
                    //alert(data);
                    //window.location.href="index.html";
                    //alert("au: "+usuarios.length);
                }
            });  
        }else{
            alert("Bien hecho!Intentalo nuevamente y gana puntos!");
            window.location.href="index.html";
        }
      }
    }else{
      console.log("pieza desubicada vuelve intentarlo");
      
      divEsp.css("left",arregloUsuarios[0].rompecabeza[0].piezas[eve.target.id-1].posx);
      divEsp.css("top",arregloUsuarios[0].rompecabeza[0].piezas[eve.target.id-1].posy);
      contadorErrores++;
      if (contadorErrores == 15){
        alert("PERDISTE");
        window.location.href="index.html";
      }
    }
    console.log("Juego Terminado " +eve);
}


