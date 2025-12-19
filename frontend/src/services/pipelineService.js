import api from "./api";

function serializePipeline(nodes, edges) {
  return {
    nodes: nodes.map((node) => ({
      id: node.id,
      type: node.type,
      position: node.position,
      data: node.data,
    })),
    edges: edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      sourceHandle: edge.sourceHandle,
      targetHandle: edge.targetHandle,
    })),
  };
}

export async function analyzePipeline(nodes, edges) {
  const pipeline = serializePipeline(nodes, edges);
  const response = await api.post("/pipelines/parse", pipeline);
  return response.data;
}

export async function validatePipeline(nodes, edges) {
  const pipeline = serializePipeline(nodes, edges);
  const response = await api.post("/pipelines/validate", pipeline);
  return response.data;
}

export async function checkHealth() {
  const response = await api.get("/health");
  return response.data;
}
