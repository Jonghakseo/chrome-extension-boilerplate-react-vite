#!/bin/bash
# Usage: ./update_version.sh <new_version>

find . -name 'package.json' -not -path '*/node_modules/*' -exec bash -c '
  # Parse the version from package.json
  current_version=$(grep -o "\"version\": \"[^\"]*" "$0" | cut -d"\"" -f4)

  # Update the version
  perl -i -pe"s/$current_version/'$1'/" "$0"
'  {} \;

echo "Updated versions to $1"
