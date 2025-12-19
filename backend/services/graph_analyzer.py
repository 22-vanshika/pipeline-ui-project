from typing import Protocol
import networkx as nx
from models.pipeline import Pipeline
from models.response import PipelineAnalysisResponse


class IGraphAnalyzer(Protocol):
    """Interface for graph analysis."""
    def analyze(self, pipeline: Pipeline) -> PipelineAnalysisResponse: ...
    def is_valid_dag(self, pipeline: Pipeline) -> bool: ...


class GraphAnalyzer:
    """Graph analysis using NetworkX."""

    def _build_graph(self, pipeline: Pipeline) -> nx.DiGraph:
        graph = nx.DiGraph()
        for node in pipeline.nodes:
            graph.add_node(node.id, type=node.type, data=node.data)
        for edge in pipeline.edges:
            graph.add_edge(edge.source, edge.target)
        return graph

    def is_valid_dag(self, pipeline: Pipeline) -> bool:
        graph = self._build_graph(pipeline)
        return nx.is_directed_acyclic_graph(graph)

    def analyze(self, pipeline: Pipeline) -> PipelineAnalysisResponse:
        return PipelineAnalysisResponse(
            num_nodes=pipeline.node_count,
            num_edges=pipeline.edge_count,
            is_dag=self.is_valid_dag(pipeline)
        )

    def find_cycles(self, pipeline: Pipeline) -> list[list[str]]:
        graph = self._build_graph(pipeline)
        try:
            return list(nx.simple_cycles(graph))
        except nx.NetworkXNoCycle:
            return []

    def get_topological_order(self, pipeline: Pipeline) -> list[str] | None:
        graph = self._build_graph(pipeline)
        if not nx.is_directed_acyclic_graph(graph):
            return None
        return list(nx.topological_sort(graph))
