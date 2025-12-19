from fastapi import APIRouter, HTTPException, Depends
from models.pipeline import Pipeline
from models.response import PipelineAnalysisResponse
from services.graph_analyzer import GraphAnalyzer, IGraphAnalyzer

router = APIRouter(prefix="/api/pipelines", tags=["pipelines"])


def get_graph_analyzer() -> IGraphAnalyzer:
    return GraphAnalyzer()


@router.post("/parse", response_model=PipelineAnalysisResponse)
async def parse_pipeline(
    pipeline: Pipeline,
    analyzer: IGraphAnalyzer = Depends(get_graph_analyzer)
) -> PipelineAnalysisResponse:
    try:
        if not pipeline.nodes:
            return PipelineAnalysisResponse(num_nodes=0, num_edges=0, is_dag=True)

        node_ids = [node.id for node in pipeline.nodes]
        if len(node_ids) != len(set(node_ids)):
            raise HTTPException(status_code=400, detail="Duplicate node IDs detected.")

        return analyzer.analyze(pipeline)

    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=500, detail="Internal server error.")


@router.post("/validate")
async def validate_pipeline(
    pipeline: Pipeline,
    analyzer: IGraphAnalyzer = Depends(get_graph_analyzer)
) -> dict:
    issues = []

    node_ids = [node.id for node in pipeline.nodes]
    if len(node_ids) != len(set(node_ids)):
        issues.append("Duplicate node IDs detected")

    node_id_set = set(node_ids)
    for edge in pipeline.edges:
        if edge.source not in node_id_set:
            issues.append(f"Edge references non-existent source: {edge.source}")
        if edge.target not in node_id_set:
            issues.append(f"Edge references non-existent target: {edge.target}")

    if not analyzer.is_valid_dag(pipeline):
        issues.append("Pipeline contains cycles (not a valid DAG)")

    return {
        "valid": len(issues) == 0,
        "issues": issues,
        "node_count": len(pipeline.nodes),
        "edge_count": len(pipeline.edges)
    }
