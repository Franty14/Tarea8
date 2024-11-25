
// Función para calcular los valores
async function calcular() {
    const fechaRetiro = document.querySelector("[name='fechaRetiro']").value;
    const fechaDevolucion = document.querySelector("[name='fechadevolucion']").value;
    const tipoVehiculo = document.getElementById("tipoVehiculo").value;
    const tipoSeguro = document.getElementById("seguro").value;
    const nacionalidad = document.getElementById("nacionalidad").value;

    const inputDias = document.querySelector("[name='dias']");
    const inputTarifaDiaria = document.querySelector("[name='td']");
    const inputTotalPagar = document.querySelector("[name='totalPagar']");

    // Validar fechas
    if (!fechaRetiro || !fechaDevolucion) {
        alert("Por favor, seleccione las fechas de retiro y devolución.");
        return;
    }

    const fechaInicio = new Date(fechaRetiro);
    const fechaFin = new Date(fechaDevolucion);
    const dias = Math.ceil((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24));

    if (dias < 3 || dias > 365) {
        alert("La cantidad de días debe estar entre 3 y 365.");
        inputDias.value = "";
        return;
    }

    inputDias.value = dias;

    // Calcular tarifa diaria
    let tarifaDiaria = parseFloat(tipoVehiculo) + parseFloat(tipoSeguro);

    if (dias > 30 && dias <= 120) {
        tarifaDiaria *= 0.85; // 15% de descuento
    } else if (dias > 120) {
        tarifaDiaria *= 0.75; // 25% de descuento
    }

    inputTarifaDiaria.value = tarifaDiaria.toFixed(2);

    // Obtener región del país
    let descuentoRegion = 0;
    try {
        const respuesta = await fetch(`https://restcountries.com/v3.1/alpha?codes=${nacionalidad}`);
        const data = await respuesta.json();
        const region = data[0].region;

        if (region === "Americas" || region === "Europe") {
            descuentoRegion = 0.10;
        } else if (region === "Africa") {
            descuentoRegion = 0.05;
        }
    } catch (error) {
        console.error("Error al obtener la región:", error);
        alert("No se pudo obtener la región del país para calcular el descuento.");
    }

    // Calcular total a pagar
    const subtotal = tarifaDiaria * dias;
    const descuento = subtotal * descuentoRegion;
    const totalPagar = subtotal - descuento;

    inputTotalPagar.value = totalPagar.toFixed(2);

    alert(`
        Detalles de la Cotización:
        - Días: ${dias}
        - Tarifa Diaria: $${tarifaDiaria.toFixed(2)}
        - Subtotal: $${subtotal.toFixed(2)}
        - Descuento por Región: $${descuento.toFixed(2)}
        - Total a Pagar: $${totalPagar.toFixed(2)}
    `);
}

// Asociar eventos
document.addEventListener("DOMContentLoaded", () => {
    const btnCalcular = document.querySelector(".botones[value='Calcular']");
    btnCalcular.addEventListener("click", calcular);
});


// Función para guardar la cotización en LocalStorage
function guardarCotizacion() {
    const dias = document.querySelector("[name='dias']").value;
    const tarifaDiaria = document.querySelector("[name='td']").value;
    const totalPagar = document.querySelector("[name='totalPagar']").value;
    const nacionalidad = document.getElementById("nacionalidad").value;
    const tipoVehiculo = document.getElementById("tipoVehiculo").selectedOptions[0].text;
    const tipoSeguro = document.getElementById("seguro").selectedOptions[0].text;

    // Validar que todos los datos estén completos
    if (!dias || !tarifaDiaria || !totalPagar) {
        alert("Debe calcular antes de guardar la cotización.");
        return;
    }

    // Crear un objeto con los datos de la cotización
    const cotizacion = {
        dias,
        tarifaDiaria,
        totalPagar,
        nacionalidad,
        tipoVehiculo,
        tipoSeguro,
        fecha: new Date().toLocaleString(), // Agregar fecha y hora actual
    };

    // Guardar en LocalStorage
    localStorage.setItem("ultimaCotizacion", JSON.stringify(cotizacion));
    alert("Cotización guardada correctamente.");
}

// Función para mostrar la última cotización al cargar la página
function mostrarUltimaCotizacion() {
    const cotizacion = JSON.parse(localStorage.getItem("ultimaCotizacion"));

    if (!cotizacion) {
        console.log("No hay cotización guardada.");
        return;
    }

    // Mostrar los datos en los campos correspondientes
    document.querySelector("[name='dias']").value = cotizacion.dias;
    document.querySelector("[name='td']").value = cotizacion.tarifaDiaria;
    document.querySelector("[name='totalPagar']").value = cotizacion.totalPagar;

    alert(`
        Última Cotización:
        - Días: ${cotizacion.dias}
        - Tarifa Diaria: $${cotizacion.tarifaDiaria}
        - Total a Pagar: $${cotizacion.totalPagar}
        - Nacionalidad: ${cotizacion.nacionalidad}
        - Tipo Vehículo: ${cotizacion.tipoVehiculo}
        - Tipo Seguro: ${cotizacion.tipoSeguro}
        - Fecha: ${cotizacion.fecha}
    `);
}

// Asociar eventos
document.addEventListener("DOMContentLoaded", () => {
    // Mostrar última cotización al cargar la página
    mostrarUltimaCotizacion();

    // Asociar el evento al botón "Guardar"
    const btnGuardar = document.querySelector(".botones[value='Guardar']");
    btnGuardar.addEventListener("click", guardarCotizacion);
});
