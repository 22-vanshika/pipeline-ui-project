from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

# Import the new modules
from core.validation import validate_pipeline
from core.logic import analyze_pipeline

# --- Pydantic Models --- (unchanged)
class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]

class Edge(BaseModel):
    id: str
    source: str
    target: str
    
class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- API Endpoint ---
@app.post("/pipelines/parse")
async def parse_pipeline(pipeline: Pipeline):
    try:
        # print("Received nodes:", pipeline.nodes)  # For debugging
        valid, simple_result = validate_pipeline(pipeline)
        if not valid:
            return simple_result
        return analyze_pipeline(pipeline)
    except HTTPException as e:
        raise e  # Re-raise handled exceptions
    except Exception as e:
        # print(f"Server error: {str(e)}")  # Log unexpected errors
        raise HTTPException(status_code=500, detail="Internal server error occurred. Please try again.")
