import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()
app = FastAPI()

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

# Clients Initialization
client = OpenAI(
  base_url="https://openrouter.ai/api/v1",
  api_key=os.getenv("OPENROUTER_API_KEY"),
)

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

# Load Resume Data
try:
    with open("resume.json", "r") as f:
        resume_data = json.load(f)
except FileNotFoundError:
    print("❌ Error: resume.json file nahi mili! Make sure it is in the same folder as main.py")
    resume_data = {}

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat_with_resume(request: ChatRequest):
    try:
        # 1. AI se response mangwana
        response = client.chat.completions.create(
            model="arcee-ai/trinity-large-preview:free",
            messages=[
                {
                    "role": "system", 
                    "content": f"I am Rashi Sahu's AI assistant. Answer based on this data: {json.dumps(resume_data)}. If not found, suggest contacting Rohit."
                },
                {"role": "user", "content": request.message}
            ]
        )
        
        answer = response.choices[0].message.content

        # 2. Database (Supabase) mein save karna
        try:
            supabase.table("chat_logs").insert({
                "user_query": request.message,
                "bot_response": answer
            }).execute()
        except Exception as db_error:
            print(f"⚠️ Database Error: {db_error}")
            # Hum sirf error print karenge taaki agar DB fail ho toh bhi user ko AI answer mil jaye

        return {"response": answer}

    except Exception as e:
        print(f"❌ Server Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)