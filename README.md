# Nodal

A modern, node-based pipeline editor built with React Flow and FastAPI. This application allows users to visually construct pipelines, handle dynamic text operations, and validate graph structures via a Python backend.

## 🚀 Features

-   **Node Abstraction**: A scalable component architecture (`BaseNode`) that allows for rapid creation of new node types.
-   **Dynamic Nodes**:
    -   **Text Node**: Auto-resizing text areas and support for dynamic variable extraction (e.g., `{{variableName}}`), which automatically creates input handles.
    -   **Custom Nodes**: Includes 9+ node types across logic, data, and service categories.
-   **Modern UI/UX**:
    -   Glassmorphism design system using Tailwind CSS.
    -   Interactive animations and category-based color coding.
    -   Responsive sidebar and mobile-friendly layout.
-   **Backend Analysis**:
    -   Integration with a generic Python backend.
    -   **DAG Validation**: Server-side analysis using NetworkX to detect cycles and count graph elements.

## 🛠️ Tech Stack

### Frontend
-   **React** (Vite)
-   **React Flow**: Core diagramming library.
-   **Tailwind CSS**: Styling and design system.
-   **Zustand**: State management for the pipeline graph.
-   **Lucide React**: Iconography.

### Backend
-   **Python** (FastAPI)
-   **NetworkX**: Graph algorithms for DAG validation and cycle detection.

## 📦 Project Structure

```
├── frontend/
│   ├── src/features/pipeline/nodes/  # Node definitions and UI abstraction
│   ├── src/features/pipeline/submit  # Backend integration logic
│   └── src/styles/                  # Tailwind configuration and global styles
└── backend/
    ├── main.py                      # FastAPI entry point
    └── services/graph_analyzer.py   # NetworkX graph validation logic
```

## ✅ Assessment Completion

1.  **Node Abstraction**: Implemented `BaseNode.jsx` and added 5 custom nodes (Math, Condition, API Call, etc.).
2.  **Styling**: Applied a unified dark theme with consistent typography and visual hierarchy.
3.  **Text Logic**: Implemented dynamic resizing and regex-based variable handle creation.
4.  **Backend Integration**: Connected `/pipelines/parse` endpoint to validate nodes, edges, and DAG status.
