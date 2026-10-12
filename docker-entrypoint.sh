#!/bin/bash
set -e

echo "Jalankan service libraries-utils (produksi, container)..."

exec bun main.ts
