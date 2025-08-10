from fastapi import HTTPException

def validate_pipeline(pipeline):
    nodes, edges = pipeline.nodes, pipeline.edges
    
    # Only return defaults if there are no nodes (allow nodes without edges)
    if not nodes:
        return False, {"num_nodes": 0, "num_edges": 0, "is_dag": True}
    
    # Check for duplicates (unchanged)
    node_ids = [node.id for node in nodes]
    if len(node_ids) != len(set(node_ids)):
        raise HTTPException(status_code=400, detail="Invalid pipeline: Duplicate node IDs detected.")
    
    return True, None
