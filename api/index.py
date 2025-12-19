from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Dict, Any, List
import networkx as nx

# Models
class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any] = Field(default_factory=dict)

class Edge(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: str | None = None
    targetHandle: str | None = None

class Pipeline(BaseModel):
    nodes: List[Node] = Field(default_factory=list)
    edges: List[Edge] = Field(default_factory=list)

class PipelineAnalysisResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool

# App
app = FastAPI(title="Pipeline API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Helper
def is_valid_dag(pipeline: Pipeline) -> bool:
    graph = nx.DiGraph()
    for node in pipeline.nodes:
        graph.add_node(node.id)
    for edge in pipeline.edges:
        graph.add_edge(edge.source, edge.target)
    return nx.is_directed_acyclic_graph(graph)

# Routes
@app.get("/api/health")
async def health():
    return {"status": "healthy"}

@app.post("/api/pipelines/parse", response_model=PipelineAnalysisResponse)
async def parse_pipeline(pipeline: Pipeline):
    try:
        if not pipeline.nodes:
            return PipelineAnalysisResponse(num_nodes=0, num_edges=0, is_dag=True)
        
        node_ids = [node.id for node in pipeline.nodes]
        if len(node_ids) != len(set(node_ids)):
            raise HTTPException(status_code=400, detail="Duplicate node IDs")
        
        return PipelineAnalysisResponse(
            num_nodes=len(pipeline.nodes),
            num_edges=len(pipeline.edges),
            is_dag=is_valid_dag(pipeline)
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/pipelines/validate")
async def validate_pipeline(pipeline: Pipeline):
    issues = []
    node_ids = [node.id for node in pipeline.nodes]
    
    if len(node_ids) != len(set(node_ids)):
        issues.append("Duplicate node IDs")
    
    node_id_set = set(node_ids)
    for edge in pipeline.edges:
        if edge.source not in node_id_set:
            issues.append(f"Edge references non-existent source: {edge.source}")
        if edge.target not in node_id_set:
            issues.append(f"Edge references non-existent target: {edge.target}")
    
    if not is_valid_dag(pipeline):
        issues.append("Pipeline contains cycles")
    
    return {
        "valid": len(issues) == 0,
        "issues": issues,
        "node_count": len(pipeline.nodes),
        "edge_count": len(pipeline.edges)
    }
