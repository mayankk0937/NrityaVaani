# NatyaMudra - AI Dance Assistant

This is an AI-powered **Bharatanatyam Mudra Recognition** application. It uses a custom MobileNetV2 model and MediaPipe to identify hand gestures in real-time.

## Deployment

This project is configured to run as a **Docker Space** on Hugging Face.

- **Frontend**: React (Vite)
- **Backend**: FastAPI (Python)
- **Port**: 7860 (Hugging Face Default)

### Local Development

1. **Backend**:
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Credits
Developed with ❤️ for the Bharatanatyam community.
