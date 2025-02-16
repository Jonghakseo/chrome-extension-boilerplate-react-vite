#!/bin/bash

# Check if .env does not exist and .example.env exists
if [ ! -f ".env" ] && [ -f ".example.env" ]; then
    # Copy .example.env to .env
    cp .example.env .env
    echo ".example.env has been copied to .env"
fi
