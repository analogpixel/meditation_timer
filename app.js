var noSleep = new NoSleep();
var session_length = 0;
var seconds_since_start = 0;
var second_timer_func;
var breath_time = 0;
$("#circle").hide();
var bell = new Audio('sounds/bell2.wav');
var tick = new Audio('sounds/tick.wav');
var elem = document.documentElement;

var gui = new Gui("myGui", [   
  {'name': 'Minutes', 'type': 'string', 'default': 20},
  {'name': 'Breath Time', 'type': 'string', 'default': 10},
  {'name': 'Show Breath', 'type': 'boolean', 'default': true},
  {'name': 'Start Chime', 'type': 'boolean', 'default': false},
  {'name': 'End Chime', 'type': 'boolean', 'default': false},
  {'name': 'Breath Tick', 'type': 'boolean', 'default': false},
]);

function chime() {
  bell.play();
}

function play_tick() {
  tick.play()
}

function end_session() {

  $("BODY").css("background", "#222");

  if ( gui.get("End Chime") ) {
    chime();
  }
  console.log("Session ended");
  window.clearTimeout(second_timer_func);
  toggleNav();
  seconds_since_start = 0;
  $("#circle").hide();
}

function second_updates() {
  seconds_since_start+=1;

  if (gui.get('Breath Tick')) {
    if (seconds_since_start % (Math.round(breath_time/2)) == 0) {
      play_tick();
    }
  }
  // $("#time_left").html((session_length * 60) - seconds_since_start);
  // console.log(seconds_since_start);
}

function start_session() {
  toggleNav();

  $("BODY").css("background", "black");
  // Breath Time
  var bt = gui.get("Breath Time");
  breath_time = parseInt(bt);
  $("#circle").css("animation-duration", bt + "s");
  $("#circle").removeClass("circle_animation").addClass("circle_animation"); // reset the animation to make ticks line up

  if ( gui.get("Show Breath") ) {
    $("#circle").show();
  }


  console.log("Session started");
  session_length = parseInt(gui.get('Minutes'));
  console.log("sessionlen:", session_length);

  if ( gui.get("Start Chime") ) {
    chime();
  }

  second_timer_func = setInterval( second_updates, 1000);
  setTimeout( end_session, session_length * 60 * 1000);
}

function toggleNav() {
  $("#mySidebar").toggleClass("toggled");
  $("#main").toggleClass("toggled");
}

function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}

document.addEventListener('click', function enableNoSleep() {
  document.removeEventListener('click', enableNoSleep, false);
  noSleep.enable();
}, false);

