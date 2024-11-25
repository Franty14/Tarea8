// Función para mostrar el mensaje del tipo de seguro seleccionado
function mostrarMensajeSeguro() {
    const selectSeguro = document.getElementById("seguro");
    const seguroSeleccionado = selectSeguro.value; 
    let mensaje = "";

    // Determina el mensaje según el seguro seleccionado
    switch (seguroSeleccionado) {
        case "10.45": // Protección Básica Obligatoria (PBO)
            mensaje = `
                Protección Básica Obligatoria (PBO): 
                Cubre daños al vehículo rentado y daños a vehículos terceros involucrados en un accidente de tránsito.
                Costo de alquiler diario: $ 5.45 por día.
            `;
            break;
        case "15.50": // Protección Extendida de Daños (PED)
            mensaje = `
                Protección Extendida de Daños (PED): 
                Cubre la Protección Básica Obligatoria (PBO) más daños a propiedades de terceros, incendio e inundaciones.
                Costo de alquiler diario: $ 9.50 por día.
            `;
            break;
        case "18.25": // Protección Gasto Médicos (PGM)
            mensaje = `
                Protección Gasto Médicos (PGM): 
                Cubre la Protección Extendida de Daños (PED) más gastos médicos para los ocupantes del vehículo.
                Costo de alquiler diario: $ 11.25 por día.
            `;
            break;
        default:
            mensaje = "Seleccione un tipo de seguro válido.";
            break;
    }

    
    alert(mensaje);
}


document.getElementById("lblSeguro").addEventListener("click", mostrarMensajeSeguro);










// Función para mostrar mensaje del seguro
function mostrarMensajeSeguro() {
    const seguro = document.getElementById("seguro").value;
    let mensaje = "";

    switch (seguro) {
        case "10.45":
            mensaje = `
                Protección Básica Obligatoria (PBO):
                Cubre daños al vehículo rentado y daños a vehículos terceros involucrados en un accidente de tránsito.
                Costo de alquiler diario: $ 5.45 por día.
            `;
            break;
        case "15.50":
            mensaje = `
                Protección Extendida de Daños (PED):
                Cubre la Protección Básica Obligatoria (PBO) más daños a propiedades de terceros, incendio e inundaciones.
                Costo de alquiler diario: $ 9.50 por día.
            `;
            break;
        case "18.25":
            mensaje = `
                Protección Gasto Médicos (PGM):
                Cubre la Protección Extendida de Daños (PED) más gastos médicos para los ocupantes del vehículo.
                Costo de alquiler diario: $ 11.25 por día.
            `;
            break;
        default:
            mensaje = "Seleccione un tipo de seguro válido.";
            break;
    }
    alert(mensaje);
}