
// vehiculos.js
const vehiculos = {
    Compacto: ["Compacto1.png", "Compacto2.png", "Compacto3.png"],
    Mediano: ["Mediano1.png", "Mediano2.png", "Mediano3.png"],
    "Todo Terreno": ["TodoTerreno1.png", "TodoTerreno2.png", "TodoTerreno3.png"],
    Familiar: ["Familiar1.png", "Familiar2.png", "Familiar3.png"]
};

window.onload = function () {
    mostrarTodo(); // Ejecuta mostrarTodo una vez que el DOM esté cargado y la función definida
};

function mostrarTodo(opcionSeleccionada = 1) {
    const tipoVehiculoSelect = document.getElementById("tipoVehiculo");
    const tipoSeleccionado = tipoVehiculoSelect.options[tipoVehiculoSelect.selectedIndex].innerText.trim();
    const listaImagenes = vehiculos[tipoSeleccionado];

    const imgVista = document.getElementById("imgVista");
    imgVista.src = `images/${listaImagenes[opcionSeleccionada - 1]}`;

    document.getElementById("img1").src = `images/${listaImagenes[0]}`;
    document.getElementById("img2").src = `images/${listaImagenes[1]}`;
    document.getElementById("img3").src = `images/${listaImagenes[2]}`;
}
