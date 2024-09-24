#!/bin/bash

sh ./commands/sh/move_repository_root.sh
sh ./commands/sh/frontend.sh Emulator
sh ./commands/sh/backend.sh Emulator
sh ./commands/sh/functions.sh Emulator
