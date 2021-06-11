#!/bin/bash

# arguments doc
# 1 - folder_name
# 2 - post_name
# b=$a:u lower case to upper case

FOLDER_NAME=$1
FILE_NAME=$2
FILE_NAME_UPPER_CASE=$1

route="<Route \
path={RoutesList.$FILE_NAME_UPPER_CASE} \
render={() => <App key="\"$FILE_NAME\"" \
contentFilePath={$FILE_NAME} gitIssue={13} \/>} \/> \
\{\/\*ROUTE_RENDER_PLACE_HOLDER\*\/\}"          

import="import $FILE_NAME from '../posts/$FOLDER_NAME/$FILE_NAME.md';"


routePath="$FILE_NAME_UPPER_CASE: '/$FILE_NAME'"

mkdir src/posts/$FOLDER_NAME
mkdir public/images/$FOLDER_NAME

touch src/posts/$FOLDER_NAME/$FILE_NAME.md
touch public/images/$FOLDER_NAME/$FILE_NAME.jpg

sed -i '' "s/{\/\*ROUTE_RENDER_PLACE_HOLDER\*\/}/$route/" ./src/router/Routes.js
