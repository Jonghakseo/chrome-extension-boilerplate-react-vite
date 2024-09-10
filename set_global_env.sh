#!/bin/bash

# Default values
DEV=false
FIREFOX=false

# Function to validate boolean values
validate_boolean() {
  if [[ "$1" != "true" && "$1" != "false" ]]; then
    echo "Invalid value for $2. Please use 'true' or 'false'."
    exit 1
  fi
}

# Parse arguments
for arg in "$@"
do
  case $arg in
    __DEV__=*)
      DEV="${arg#*=}"
      validate_boolean "$DEV" "__DEV__"
      shift
      ;;
    __FIREFOX__=*)
      FIREFOX="${arg#*=}"
      validate_boolean "$FIREFOX" "__FIREFOX__"
      shift
      ;;
  esac
done

# Check if .env file exists, if not run pnpm copy_env
if [ ! -f .env ]; then
  pnpm copy_env
fi

# Create a temporary file to store updated values
temp_file=$(mktemp)

# Copy existing values except __DEV__ and __FIREFOX__ to the temporary file
grep -v "^__DEV__=" .env | grep -v "^__FIREFOX__=" > "$temp_file"

# Append the new or updated __DEV__ and __FIREFOX__ values
echo "__DEV__=$DEV" >> "$temp_file"
echo "__FIREFOX__=$FIREFOX" >> "$temp_file"

# Replace the original .env file with the updated one
mv "$temp_file" .env
