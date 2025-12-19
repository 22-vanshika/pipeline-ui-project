from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List
import json


class Settings(BaseSettings):
    # Server
    host: str = "0.0.0.0"
    port: int = 8000
    debug: bool = False
    reload: bool = False

    # CORS
    cors_origins: str = '["http://localhost:5173"]'

    # API
    api_prefix: str = "/api"
    api_title: str = "VectorFlow Pipeline API"
    api_version: str = "1.0.0"

    # Pipeline limits
    max_nodes_per_pipeline: int = 100
    max_edges_per_pipeline: int = 200

    # Future integrations
    database_url: str | None = None
    redis_url: str | None = None
    openai_api_key: str | None = None

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

    @property
    def cors_origins_list(self) -> List[str]:
        try:
            return json.loads(self.cors_origins)
        except json.JSONDecodeError:
            return ["http://localhost:5173"]


settings = Settings()
