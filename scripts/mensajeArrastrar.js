// Función para mostrar la ventana de diálogo en la posición del clic
function showDragInstruction(event) {
    var dragInstruction = document.getElementById("dragInstruction");
    dragInstruction.style.display = "block"; // Mostrar la ventana de diálogo
    dragInstruction.style.left = event.clientX + 'px'; // Establecer la posición izquierda
    dragInstruction.style.top = event.clientY + 'px'; // Establecer la posición superior
    setTimeout(function() {
        dragInstruction.style.display = "none"; // Ocultar la ventana de diálogo después de un tiempo
    }, 2000); // Tiempo en milisegundos (en este caso, 2 segundos)
}

// Agregar un evento de clic específico en elementos con la clase yt-target dentro de video-list
document.addEventListener('click', function(event) {
    // Verificar si el clic ocurrió en un elemento con la clase yt-target dentro de video-list
    var clickedElement = event.target;
    if ((clickedElement.classList.contains('miniatura') || clickedElement.classList.contains('info')) && (window.innerWidth > 760)) {
        showDragInstruction(event);
    }

});