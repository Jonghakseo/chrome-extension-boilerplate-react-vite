#!/bin/bash

# Default values
DEV=false
FIREFOX=false

# Validate boolean values
validate_boolean() {
  if [[ "$1" != "true" && "$1" != "false" ]]; then
    echo "Invalid value for <$2>. Please use 'true' or 'false'."
    exit 1
  fi
}

# Validate if a key is in uppercase, contains only letters and underscores, and is not just underscores
validate_key() {
  if [[ "$1" != "${1^^}" || ! "$1" =~ ^[A-Z0-9_]+$ || "$1" =~ ^_+$ || ! "$1" =~ [A-Z] ]]; then
    echo "Invalid key: <$1>. All keys must be uppercase, contain only letters, numbers, and underscores, and cannot be just underscores."
    exit 1
  fi
}

# Parse arguments from cli
parse_arguments() {
  for arg in "$@"
  do
    key="${arg%%=*}"
    value="${arg#*=}"

    validate_key "$key"

    case $key in
      __DEV__)
        DEV="$value"
        validate_boolean "$DEV" "__DEV__"
        ;;
      __FIREFOX__)
        FIREFOX="$value"
        validate_boolean "$FIREFOX" "__FIREFOX__"
        ;;
      *)
        cli_values+=("$key=$value")
        ;;
    esac
  done
}

# Validate existing .env keys
validate_existing_keys() {
  existing_values=$(grep -v -E '^#' .env)

  while IFS= read -r line; do
    key="${line%%=*}"
    if [[ "$key" != "${key^^}" ]]; then
      echo "Invalid key in .env file: <$key>. All keys must be uppercase."
      exit 1
    fi
  done <<< "$existing_values"
}

# Check for conflicts between CLI and editable sections
check_for_conflicts() {
  # Extract keys from CLI arguments
  cli_keys=()
  for arg in "${cli_values[@]}"; do
    cli_key="${arg%%=*}"
    cli_keys+=("$cli_key")
  done

  # Extract keys from the editable section
  editable_keys=()
  while IFS= read -r line; do
    key="${line%%=*}"
    editable_keys+=("$key")
  done <<< "$(grep -A 1000 '# THOSE VALUES ARE EDITABLE' .env | grep -v '# THOSE VALUES ARE EDITABLE')"

  # Check for conflicts
  for cli_key in "${cli_keys[@]}"; do
    for editable_key in "${editable_keys[@]}"; do
      if [[ "$cli_key" == "$editable_key" ]]; then
        echo "Conflict: Key <$cli_key> exists in the editable section and is also specified in the CLI call."
        exit 1
      fi
    done
  done
}
# Check for duplicates in the second section
check_for_duplicates() {
  second_section=$(grep -A 1000 '# THOSE VALUES ARE EDITABLE' .env | grep -v '# THOSE VALUES ARE EDITABLE')
  duplicate_keys=$(echo "$second_section" | awk -F= '{print $1}' | sort | uniq -d)

  if [[ -n "$duplicate_keys" ]]; then
    echo "Duplicate keys found in the second section: <$duplicate_keys>."
    exit 1
  fi
}

# Write updated .env file
write_env_file() {
  temp_file=$(mktemp)
  if [[ ! -f "$temp_file" ]]; then
    echo "Failed to create temporary file."
    exit 1
  fi

  {
    echo "# THAT'S CLI VALUES DON'T EDIT IT THERE, BECAUSE IT WILL BE OVERWRITE BY CLI"
    echo "# DON'T REMOVE COMMENTS BECAUSE THEY ARE CRUCIAL FOR BASH SCRIPT"
    echo "__DEV__=$DEV"
    echo "__FIREFOX__=$FIREFOX"
    for value in "${cli_values[@]}"; do
      echo "$value"
    done
    echo ""
    echo "# THOSE VALUES ARE EDITABLE"
    # Copy existing editable values without duplicating
    grep -A 1000 "# THOSE VALUES ARE EDITABLE" .env | grep -v "# THOSE VALUES ARE EDITABLE"
  } > "$temp_file"

  # Remove all blank lines between editable section comment and first value
  sed -i '/# THOSE VALUES ARE EDITABLE/,/./{/./!d}' "$temp_file"

  # Remove all blank lines at the start of the file
  awk '/# THOSE VALUES ARE EDITABLE/ {print; in_section=1; next} in_section && NF {in_section=0} !in_section' "$temp_file"

  # Remove all blank lines at the end of the file
  sed -i ':a;N;$!ba;s/[[:space:]]*$//g' "$temp_file"

  mv "$temp_file" .env
}

# Main script execution
parse_arguments "$@"
validate_existing_keys
check_for_duplicates
check_for_conflicts
write_env_file > /dev/null 2>&1
