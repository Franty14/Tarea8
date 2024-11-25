// Función para cargar los países
async function cargarPaises() {
    const url = "https://restcountries.com/v3.1/all"; 
    const selectNacionalidad = document.getElementById("nacionalidad"); 

    try {
        
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            throw new Error(`Error en la solicitud: ${respuesta.status}`);
        }
        const paises = await respuesta.json();

        
        paises.sort((a, b) => a.name.common.localeCompare(b.name.common));

        
        const paisSeleccionado = localStorage.getItem("paisSeleccionado") || "CRI";

        
        paises.forEach(pais => {
            const opcion = document.createElement("option");
            opcion.value = pais.cca3; 
            opcion.textContent = pais.name.common; 
            if (pais.cca3 === paisSeleccionado) {
                opcion.selected = true;
            }
            selectNacionalidad.appendChild(opcion);
        });
    } catch (error) {
        console.error("Error al cargar los países:", error);
        alert("No se pudo cargar el listado de países. Intente nuevamente más tarde.");
    }
}


function guardarPaisSeleccionado() {
    const selectNacionalidad = document.getElementById("nacionalidad");
    const paisSeleccionado = selectNacionalidad.value;
    localStorage.setItem("paisSeleccionado", paisSeleccionado);
    alert(`País seleccionado (${paisSeleccionado}) guardado correctamente.`);
}


document.addEventListener("DOMContentLoaded", () => {
    cargarPaises(); 
    document.getElementById("nacionalidad").addEventListener("change", guardarPaisSeleccionado); // Escuchar cambios
});
