#!/bin/bash

# arguments doc
# 1 - folder_name
# 2 - post_name

mkdir src/posts/$1
mkdir public/images/$1

touch src/posts/$1/$2.md
touch public/images/$1/$2.jpg