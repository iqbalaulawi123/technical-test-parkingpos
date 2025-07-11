#!/bin/bash

TARGET_DIR="$1"

if [ -z "$TARGET_DIR" ]; then
  echo "dir required"
  exit 1
fi

mkdir -p "$TARGET_DIR"

KEY_PATH="$TARGET_DIR/id_rsa"

ssh-keygen -t rsa -b 4096 -f "$KEY_PATH" -N ""

echo "SSH generated: $KEY_PATH in ${KEY_PATH}.pub"
