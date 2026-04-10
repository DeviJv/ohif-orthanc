#!/bin/bash

# Configuration
LOG_DIR="logs"
LOG_FILE="$LOG_DIR/all.log"

# Ensure log directory and file exist
mkdir -p "$LOG_DIR"
touch "$LOG_FILE"

show_help() {
    echo "Usage: ./logs.sh [view|clear|status]"
    echo ""
    echo "Commands:"
    echo "  view    - Tail the merged log file in real-time"
    echo "  clear   - Clear the log file content"
    echo "  status  - Check if the Docker Log Collector is running"
}

show_status() {
    docker ps | grep -q log-collector
    if [ $? -eq 0 ]; then
        echo "✅ Docker Log Collector is ACTIVE"
        echo "File: $LOG_FILE"
    else
        echo "❌ Docker Log Collector is NOT running. Run 'docker compose up -d' first."
    fi
}

clear_logs() {
    echo "Clearing $LOG_FILE..."
    > "$LOG_FILE"
    echo "Logs cleared."
}

view_logs() {
    echo "--- Showing log output (Ctrl+C to stop) ---"
    tail -f "$LOG_FILE"
}

case "$1" in
    status) show_status ;;
    clear) clear_logs ;;
    view) view_logs ;;
    *) show_help ;;
esac
