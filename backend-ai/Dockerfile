FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set working directory
WORKDIR /app

# BUILD_TYPE can be 'lite' (default) or 'full'
ARG BUILD_TYPE=lite
RUN echo "Building AI Engine in ${BUILD_TYPE} mode..."

# 1. Install Core Dependencies (Always)
COPY requirements-core.txt .
RUN pip install --no-cache-dir -r requirements-core.txt

# 2. Install AI Dependencies (Only if BUILD_TYPE=full)
COPY requirements-ai.txt .
RUN if [ "$BUILD_TYPE" = "full" ]; then \
        pip install --no-cache-dir -r requirements-ai.txt; \
    else \
        echo "Skipping heavy AI libraries for Lite build."; \
    fi

# Copy application code
COPY . .

# Expose the API port
EXPOSE 8000

# Start the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
