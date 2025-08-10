import networkx as nx

def analyze_pipeline(pipeline):
    # Calculate locally to avoid undefined variables
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    
    G = nx.DiGraph()
    for node in pipeline.nodes:
        G.add_node(node.id)
    for edge in pipeline.edges:
        G.add_edge(edge.source, edge.target)
    
    is_dag = nx.is_directed_acyclic_graph(G)
    
    # Updated print with local variables
    # print(f"Returning: num_nodes={num_nodes}, num_edges={num_edges}, is_dag={is_dag}")

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag,
    }
