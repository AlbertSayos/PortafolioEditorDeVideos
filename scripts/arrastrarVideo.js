function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    processVideoDrop(data);
}

function processVideoDrop(data) {
    var draggedElement = document.getElementById(data);
    var videoId = draggedElement.getAttribute("data-video-id");
    var title = draggedElement.getAttribute("data-title");
    var description = draggedElement.getAttribute("data-description");
    var duration = draggedElement.getAttribute("data-duration");

    // Actualizar el contenido del elemento yt-target2 en el área de video actual
    var videoActualContainer = document.getElementById("videoActual");
    var ytTarget2 = videoActualContainer.querySelector(".yt-target2");
    ytTarget2.setAttribute("data-video-id", videoId);
    ytTarget2.setAttribute("data-title", title);
    ytTarget2.setAttribute("data-description", description);
    ytTarget2.setAttribute("data-duration", duration);

    updateYouTubePlayer();
}

// Agregar evento táctil a los elementos yt-target
document.addEventListener('DOMContentLoaded', function() {
    var ytTargets = document.querySelectorAll('.yt-target');
    ytTargets.forEach(function(target) {
        target.addEventListener('touchend', function(event) {
            processVideoDrop(target.id);
        });
    });
});