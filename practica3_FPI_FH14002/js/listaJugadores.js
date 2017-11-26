var opciones;
var liga;
var equipos;
var jugador;
$(document).ready(function mostrarListaJugadores() {
  //Para cargar la lista de Ligas...
  $.ajax({
    headers: { 'X-Auth-Token': 'b1f07037b5c2461a81558d48cd16fcc1' },
    url: 'https://api.football-data.org/v1/competitions',
    dataType: 'json',
    type: 'GET',
  }).done(function (responseOne) {
    $.each(responseOne,function(lista){
      opciones=$('<option value='+responseOne[lista].id+'>'+responseOne[lista].caption+" ("+responseOne[lista].league+')'+'</option>');
      $("#ligas").append(opciones);
    });
  });
  //Para cargar la lista de Equipos...
  $("#ligas").change(function listaEquipos(){
    //Para que se pueda añadir a la lista de equipos
    $("#listaJugadores").html("");
    $("#equipos").html("");
    equipos = $("#ligas").val();
    $.ajax({
      headers: { 'X-Auth-Token': 'b1f07037b5c2461a81558d48cd16fcc1' },
      url: 'https://api.football-data.org/v1/competitions/'+equipos+"/teams",
      dataType: 'json',
      type: 'GET',
    }).done(function (responseTwo) {
      for (var i = 0; i < responseTwo.teams.length; i++) {
        liga =responseTwo.teams[i]._links.players.href;
        var opciones = $('<option value='+liga+' >'+responseTwo.teams[i].name+'</option>');
        $("#equipos").append(opciones);
      }
    });
  });
  $("#equipos").change(function CargarJugadores(){
    $("#listaJugadores").html("");
    jugador = $("#equipos").val();

    $.ajax({
      headers: { 'X-Auth-Token': 'b1f07037b5c2461a81558d48cd16fcc1' },
      url: jugador,
      dataType: 'json',
      type: 'GET',
    }).done(function(responseThree) {
      if (responseThree.players.length==0) {
        var noHayJugadores = $('<label class="alert alert-danger" role="alert" >No hay Jugadores registrados en este quipo</label>');
        $("#listaJugadores").append(noHayJugadores);
      }
      else {
        for (var i = 0; i < responseThree.players.length; i++) {
          var listaJugadores = $('<ul><li>Nombre: '
          +responseThree.players[i].name+'</li><li> Posicion: '
          +responseThree.players[i].position+'</li><li> Numero de jugador: '
          +responseThree.players[i].jerseyNumber+'</li><li> Fecha de nacimiento: '
          +responseThree.players[i].dateOfBirth+'</li><li>Nacionalidad: '
          +responseThree.players[i]. nationality+'</li></ul>');
          $("#listaJugadores").append(listaJugadores);
        }

      }

    });

  });
});
