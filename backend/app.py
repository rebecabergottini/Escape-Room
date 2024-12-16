from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# CORS para permitir solicitudes desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://escape-room-1.onrender.com"],  # Permite solicitudes desde cualquier origen
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Permite cualquier cabecera
)

# El código secreto en el servidor (backend)
correct_code = "oro, incienso y mirra"

# Crear una clase para recibir los datos enviados desde el frontend
class CodeRequest(BaseModel):
    code: str

# Endpoint para verificar el código
@app.post("/verify_code/")
async def verify_code(request: CodeRequest):
    if request.code.lower().strip() == correct_code:
        return {
            "result": "success",
            "gif_url": "https://media1.tenor.com/m/Lel8LSLIzYEAAAAd/christmas-gifts-homer-simpson.gif",
            "hint": "Si la siguiente pista quieres encontrar, busca lo que Homer acaba de robar."
        }
    else:
        return {
            "result": "error",
            "message": "¡Código incorrecto! Inténtalo de nuevo..."
        }
