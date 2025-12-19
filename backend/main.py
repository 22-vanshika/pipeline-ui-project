from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from routers import pipelines_router

app = FastAPI(
    title=settings.api_title,
    description="API for analyzing and validating pipeline graphs",
    version=settings.api_version,
    debug=settings.debug,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pipelines_router)


@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "version": settings.api_version,
        "debug": settings.debug,
    }


@app.get("/config")
async def get_config():
    return {
        "max_nodes": settings.max_nodes_per_pipeline,
        "max_edges": settings.max_edges_per_pipeline,
        "api_version": settings.api_version,
    }
