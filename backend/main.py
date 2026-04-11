from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="NrityaVaani AI API")

# Enable CORS for Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, set this to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Landmark(BaseModel):
    x: float
    y: float
    z: float

class PredictionRequest(BaseModel):
    landmarks: List[Landmark]
    handedness: str # "Left" or "Right"

@app.get("/")
def read_root():
    return {"status": "online", "message": "NrityaVaani AI API is running"}

@app.post("/predict")
def predict_mudra(request: PredictionRequest):
    # This is where the rule-based logic or ML model would live
    # For the demo, we'll implement a robust rule engine in classification.py
    from core.classification import classify_mudra
    
    result = classify_mudra(request.landmarks, request.handedness)
    return result

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
