#!/bin/bash

# Usage: ./find_files_by_extension.sh /path/to/directory txt

DIR="$1"
EXT="$2"

if [ ! -d "$DIR" ]; then
  echo "dir notfound: $DIR"
  exit 1
fi

echo "search file .$EXT in $DIR ..."
find "$DIR" -type f -name "*.$EXT"
