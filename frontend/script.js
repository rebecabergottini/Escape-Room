async function checkCode() {
    const code = document.getElementById("codeInput").value;  // Obtiene el código ingresado por el usuario
    const responseMessage = document.getElementById("responseMessage");  // Elemento donde se mostrará el mensaje de respuesta
    const hint = document.getElementById("hint");  // Elemento donde se mostrará la pista
    const gifContainer = document.getElementById("gifContainer");  // Contenedor del GIF
    const gifContent = document.getElementById("gifContent");  // Contenedor donde se pondrá el contenido del GIF

    // Enviar la solicitud al backend para verificar el código 
    const response = await fetch("https://escape-room-37to.onrender.com/verify_code/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ code: code }) // Envia el código como un JSON al backend
    });

    const result = await response.json();  // Convierte la respuesta en formato JSON

    if (result.result === "success") {
        // Si la respuesta es exitosa, muestra el mensaje y el GIF
        responseMessage.textContent = result.message;

        document.body.style.backgroundColor = "white";  // Cambia el color de fondo
        mainContent.style.display = "none";  // Oculta el contenido principal

        gifContainer.style.display = "block";  // Muestra el contenedor del GIF
        hint.style.display = "block";  // Muestra la pista
        hint.textContent = result.hint;  // Muestra la pista

        gifContent.innerHTML = `<img src="${result.gif_url}" alt="GIF">`;  // Muestra el GIF
    } else {
        // Si la respuesta es un error, muestra el mensaje de error
        responseMessage.textContent = result.message;
    }
}

document.addEventListener("contextmenu", function(e) {
    e.preventDefault();  // Desactiva el menú contextual (botón derecho del ratón)
});