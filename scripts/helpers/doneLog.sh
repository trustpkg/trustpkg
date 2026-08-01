#!/bin/bash

set -e

max_width=65

turquoise_color="\033[38;5;44m"
reset_color="\033[0m"

line=$(printf '%*s' "$max_width" '' | tr ' ' '-')
timestamp=$(date +"%Y-%m-%d %H:%M:%S")

echo -e "${turquoise_color}${line}${reset_color}"
echo -e "${turquoise_color}[$timestamp] [ DONE ] $1 ${reset_color}" | fold -w $max_width
echo -e "${turquoise_color}${line}${reset_color}"