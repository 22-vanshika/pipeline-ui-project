from pydantic import BaseModel, Field


class PipelineAnalysisResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool


class ErrorResponse(BaseModel):
    detail: str
    error_code: str | None = None
