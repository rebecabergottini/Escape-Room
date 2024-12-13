async function checkCode() {
    const code = document.getElementById("codeInput").value;
    const responseMessage = document.getElementById("responseMessage");
    const hint = document.getElementById("hint");
    const gifContainer = document.getElementById("gifContainer");
    const gifContent = document.getElementById("gifContent");

    const response = await fetch("https://escape-room-37to.onrender.com/verify_code/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ code: code })
    });

    const result = await response.json();

    if (result.result === "success") {
        responseMessage.textContent = result.message;

        document.body.style.backgroundColor = "white";
        mainContent.style.display = "none";

        gifContainer.style.display = "block";
        hint.style.display = "block"; 

        gifContent.innerHTML = `<img src="${result.gif_url}" alt="GIF">`;        
    } else {
        responseMessage.textContent = result.message;
    }

}

document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
});