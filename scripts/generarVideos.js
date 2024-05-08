// Función para generar un elemento yt-target
function createYtTarget(video) {
    var ytTargetDiv = document.createElement("div");
    ytTargetDiv.setAttribute("class", "yt-target"); // Cambiado de "id" a "class"
    ytTargetDiv.setAttribute("id", "yt-target-" + video.id); // Agregado ID único
    ytTargetDiv.setAttribute("draggable", "true"); // Agregado atributo draggable
    ytTargetDiv.setAttribute("ondragstart", "drag(event)"); // Agregado evento ondragstart

    var miniaturaDiv = document.createElement("div");
    miniaturaDiv.setAttribute("class", "miniatura"); // Cambiado de "id" a "class"
    var img = document.createElement("img");
    img.setAttribute("class", "thumbnail-img"); // Cambiado de "id" a "class"
    img.src = video.snippet.thumbnails.maxres;
    miniaturaDiv.appendChild(img);

    var infoDiv = document.createElement("div");
    infoDiv.setAttribute("class", "info"); // Cambiado de "id" a "class"
    var titleP = document.createElement("h3");
    titleP.setAttribute("class", "video-title"); // Cambiado de "id" a "class"
    titleP.innerText = video.snippet.title;
    var descriptionP = document.createElement("p");
    descriptionP.setAttribute("class", "video-description truncate-text"); // Cambiado de "id" a "class"
    //descriptionP.innerText = video.snippet.description;
    infoDiv.appendChild(titleP);
    infoDiv.appendChild(descriptionP);

    // Nuevo: Agregar atributos data- al div yt-target
    ytTargetDiv.setAttribute("data-video-id", video.id);
    ytTargetDiv.setAttribute("data-title", video.snippet.title);
    ytTargetDiv.setAttribute("data-description", video.snippet.description);
    ytTargetDiv.setAttribute("data-duration", video.contentDetails.duration);

    ytTargetDiv.appendChild(miniaturaDiv);
    ytTargetDiv.appendChild(infoDiv);

    return ytTargetDiv;
}

function createYtTarget2(video) {
    var ytTargetDiv = document.createElement("div");
    ytTargetDiv.setAttribute("class", "yt-target2"); // Cambiado de "id" a "class"
    ytTargetDiv.setAttribute("id", "yt-target2-" + video.id); // Agregado ID único
    ytTargetDiv.setAttribute("draggable", "true"); // Agregado atributo draggable
    ytTargetDiv.setAttribute("ondragstart", "drag(event)"); // Agregado evento ondragstart

    // Añadir atributos de datos al div yt-target
    ytTargetDiv.setAttribute("data-video-id", video.id);
    ytTargetDiv.setAttribute("data-title", video.snippet.title);
    ytTargetDiv.setAttribute("data-description", video.snippet.description);
    ytTargetDiv.setAttribute("data-duration", video.contentDetails.duration);

    return ytTargetDiv;
}

// Acceder a los datos de videoInfo
var videos = videoInfo.items;

// Obtener el contenedor de la lista de videos
var videoListContainer = document.querySelector(".video-list");
var videoActualContainer = document.getElementById("videoActual");

// Generar elementos yt-target y agregarlos al contenedor
var i = 0; // Sacamos la variable i fuera del bucle forEach
videos.forEach(function(video) {
    var ytTarget = createYtTarget(video);
    if (i == 0) {
        var ytTarget2 = createYtTarget2(video);
        videoActualContainer.appendChild(ytTarget2);
        i++;
    }
    videoListContainer.appendChild(ytTarget);
});
