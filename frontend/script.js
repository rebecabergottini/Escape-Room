async function checkCode() {
    const code = document.getElementById("codeInput").value;
    const responseMessage = document.getElementById("responseMessage");
    const hint = document.getElementById("hint");
    const gifContainer = document.getElementById("gifContainer");
    const gifContent = document.getElementById("gifContent");

    // Enviar la solicitud al backend para verificar el código
    const response = await fetch("http://127.0.0.1:8000/verify_code/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ code: code })
    });

    const result = await response.json();

    if (result.result === "success") {
        responseMessage.textContent = result.message;
        // Cambiar el fondo a blanco y ocultar el contenido principal
        document.body.style.backgroundColor = "white";
        mainContent.style.display = "none";  // Ocultar el contenido anterior

        // Mostrar el GIF y el párrafo de pista
        gifContainer.style.display = "block";
        hint.style.display = "block"; // Si quieres mostrar un mensaje adicional
        // Agregar el GIF dinámicamente

        gifContent.innerHTML = `<img src="${result.gif_url}" alt="GIF">`;        
    } else {
        responseMessage.textContent = result.message;
    }

}

document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
});