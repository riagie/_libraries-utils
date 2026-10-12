# ====================================
# Makefile for libraries-utils
# ====================================

APP_NAME = libraries-utils
MAIN = main.ts
ENV_FILE = .env

ifeq ($(OS),Windows_NT)
	CLEAN_CMD := if exist bin rmdir /s /q bin
else
	CLEAN_CMD := rm -rf bin tmp
endif

.PHONY: help dev run build test clean tools format update all

help:
	@echo ""
	@echo "Commands:"
	@echo "  make dev       - Run server (development, hot reload)"
	@echo "  make run       - Run server (production)"
	@echo "  make build     - Build standalone binary ke bin/"
	@echo "  make test      - Jalankan test suite"
	@echo "  make clean     - Bersihkan artefak build"
	@echo "  make tools     - Install dependencies"
	@echo "  make format    - Format semua file"
	@echo "  make update    - Update dependencies ke versi terbaru"
	@echo "  make all       - One step: tools + format + test + build"
	@echo ""

dev:
	@echo "Running server (development) with hot reload..."
	@if not exist $(ENV_FILE) (echo .env not found!) & exit /b 1
	@bun --hot $(MAIN)

run:
	@echo "Running server (production)"
	@test -f $(ENV_FILE) || (echo ".env not found!" && exit 1)
	@bun $(MAIN)

build:
	@echo "[1/2] Building standalone binary..."
	@bun build --compile $(MAIN) --outfile bin/$(APP_NAME) --external dataloader
	@echo "[2/2] Build completed, binary available at ./bin/"

test:
	@bun test

clean:
	@echo "Cleaning build files..."
	@$(CLEAN_CMD)
	@echo "Clean completed"

tools:
	@echo "Installing dependencies..."
	@bun install

format:
	@echo "Formatting all files..."
	@bunx prettier --write .

update:
	@echo "Updating all dependencies..."
	@bun update

all: tools format test build
	@echo "All tasks completed"
