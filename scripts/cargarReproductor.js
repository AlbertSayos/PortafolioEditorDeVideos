var player;
var firstVideo; // Declarar firstVideo en un ámbito más amplio

// Cargar la API de JavaScript de YouTube
function loadYouTubeAPI() {
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// Llamar cuando se cargue la API de YouTube
function onYouTubeIframeAPIReady() {
    updateYouTubePlayer();
}

// Función para actualizar el reproductor de YouTube y elementos relacionados
function updateYouTubePlayer() {
    // Obtener el primer video dentro del contenedor de video actual
    firstVideo = document.querySelector("#videoActual .yt-target2");

    // Crear un nuevo reproductor de YouTube con los datos del primer video
    if (firstVideo) {
        if (player) {
            player.destroy(); // Destruir el reproductor existente si hay uno
        }
        player = new YT.Player('youtube-player', {
            height: '350',
            width: '500',
            videoId: firstVideo.getAttribute("data-video-id"),
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }
}




// Función llamada cuando el reproductor de YouTube está listo
function onPlayerReady(event) {
    // Obtener la duración del video del primer video
    var durationISO = firstVideo.getAttribute("data-duration");
    var durationSeconds = parseDuration(durationISO);

    // Sincronizar la duración del video con la línea de tiempo
    updateTimelineMarks(durationSeconds);

    // Agregar evento de clic para cambiar la posición del video al hacer clic en la línea de tiempo
    var timeline = document.getElementById('timeline');
    timeline.addEventListener('click', function(e) {
        var rect = timeline.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var percentage = x / timeline.offsetWidth;
        player.seekTo(durationSeconds * percentage, true);
    });
}

// Función para actualizar las marcas de tiempo en la línea de tiempo
function updateTimelineMarks(durationSeconds) {
    // Limpiar las marcas de tiempo anteriores
    var minuteMarkersContainer = document.getElementById('minute-markers-container');
    minuteMarkersContainer.innerHTML = '';

    // Calcular la duración del video en minutos
    var durationMinutes = Math.floor(durationSeconds / 60);
    // Iterar sobre cada minuto y agregar marcadores y etiquetas de texto
    for (var minute = 1; minute <= durationMinutes; minute++) {
        // Calcular la posición del marcador de minuto
        var minutePercentage = (minute / durationMinutes) * 100;
        var minuteMarker = document.createElement('div');
        minuteMarker.className = 'minute-marker';
        minuteMarker.style.left = minutePercentage + '%';
        minuteMarkersContainer.appendChild(minuteMarker);

        // Agregar etiqueta de texto para el minuto
        var minuteLabel = document.createElement('div');
        minuteLabel.className = 'minute-label';
        minuteLabel.textContent = pad(minute, 2) + ':00';
        minuteLabel.style.left = 'calc(' + minutePercentage + '% - 20px)';
        minuteMarkersContainer.appendChild(minuteLabel);
    }
}

// Función llamada cuando el estado del reproductor de YouTube cambia
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        // El video se está reproduciendo, actualizar el progreso
        setInterval(function() {
            var currentTime = player.getCurrentTime();
            var duration = player.getDuration();
            var progressPercentage = (currentTime / duration) * 100;
            var progress = document.getElementById('progress');
            progress.style.width = progressPercentage + '%';
        }, 1000); // Actualizar cada segundo
    } else if (event.data == YT.PlayerState.PAUSED) {
        // El video está pausado
    } else if (event.data == YT.PlayerState.ENDED) {
        // El video ha terminado de reproducirse
    }
}

// Función para analizar la duración del video en formato ISO 8601 y devolver el número de segundos
function parseDuration(durationISO) {
    var match = durationISO.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    var hours = (parseInt(match[1]) || 0);
    var minutes = (parseInt(match[2]) || 0);
    var seconds = (parseInt(match[3]) || 0);
    return hours * 3600 + minutes * 60 + seconds;
}

// Función para agregar ceros a la izquierda si es necesario
function pad(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

// Llamar a la función para cargar la API de YouTube
loadYouTubeAPI();
