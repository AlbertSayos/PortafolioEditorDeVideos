// Función para actualizar el reproductor de video con los datos del video arrastrado
function updateVideoPlayer(videoId) {
    var player = document.getElementById('youtube-player');
    player.src = 'https://www.youtube.com/embed/' + videoId;
}

// Función para actualizar la línea de tiempo del video
function updateTimeline(durationSeconds) {
    // Obtener el elemento de progreso de la línea de tiempo
    var progress = document.getElementById('progress');
    
    // Calcular el ancho del progreso en relación con la duración del video
    var widthPercentage = (durationSeconds / player.getDuration()) * 100;
    progress.style.width = widthPercentage + '%';
}

// Función para mostrar las marcas de tiempo en la línea de tiempo
function showTimelineMarkers(durationSeconds) {
    // Limpiar las marcas de tiempo anteriores
    var minuteMarkersContainer = document.getElementById('minute-markers-container');
    minuteMarkersContainer.innerHTML = '';

    // Calcular la duración del video en minutos
    var durationMinutes = Math.floor(durationSeconds / 60);

    // Iterar sobre cada minuto y agregar marcadores y etiquetas de texto
    for (var minute = 1; minute <= durationMinutes; minute++) {
        // Calcular la posición del marcador de minuto
        var minutePercentage = (minute / durationMinutes) * 100;

        // Crear y agregar marcador de minuto
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

/*
// Mostrar la zona de contacto en dispositivos móviles
function toggleContacto() {
    var contacto = document.getElementById("contacto");
    if (contacto.classList.contains("visibleMovil")) {
        contacto.classList.remove("visibleMovil");
    } else {
        contacto.classList.add("visibleMovil");
    }
}

// Agregar un evento de clic para mostrar/ocultar la zona de contacto en móviles
document.addEventListener('click', function(event) {
    if (window.innerWidth <= 760) {
        toggleContacto();
    }
});
*/