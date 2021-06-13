#!/bin/bash

# arguments doc
# 1 - folder_name
# 2 - post_name
# b=$a:u lower case to upper case

FOLDER_NAME=$1
FILE_NAME=$2
FILE_NAME_UPPER_CASE=`echo $FILE_NAME | tr a-z A-Z`

IMPORT_PLACE_HOLDER="\/\/\[IMPORT_PLACE_HOLDER\]"
ROUTE_PATH_PLACE_HOLDER="\/\/\[ROUTE_PATH_PLACE_HOLDER\]"
ROUTE_PLACE_HOLDER="\{\/\*ROUTE_RENDER_PLACE_HOLDER\*\/\}"

IMPORT_STRING="import $FILE_NAME from \'..\/posts\/$FOLDER_NAME\/$FILE_NAME.md';"
ROUTE_PATH_STRING="$FILE_NAME_UPPER_CASE: \'\/$FILE_NAME\',"
ROUTE_STRING="<Route \
path={RoutesList.$FILE_NAME_UPPER_CASE} \
render={() => <App key="\"$FILE_NAME\"" \
contentFilePath={$FILE_NAME} gitIssue={13} \/>} \/>"

IMPORT_SUBSTITUTION_STRING="$IMPORT_STRING \n $IMPORT_PLACE_HOLDER"
ROUTE_PATH_SUBSTITUTION_STRING="$ROUTE_PATH_STRING \n $ROUTE_PATH_PLACE_HOLDER"
ROUTE_SUBSTITUTION_STRING="$ROUTE_STRING \n $ROUTE_PLACE_HOLDER"

routePath="$FILE_NAME_UPPER_CASE: '/$FILE_NAME'"

mkdir src/posts/$FOLDER_NAME
mkdir public/images/$FOLDER_NAME

touch src/posts/$FOLDER_NAME/$FILE_NAME.md
touch public/images/$FOLDER_NAME/$FILE_NAME.jpg

# sed -i '' "s/{\/\*ROUTE_RENDER_PLACE_HOLDER\*\/}/$ROUTE_SUBSTITUTION_STRING/" ./src/router/Routes.js
# sed -i '' "s/{\/\*ROUTE_RENDER_PLACE_HOLDER\*\/}/$ROUTE_SUBSTITUTION_STRING/" ./src/router/Routes.js
# sed -i '' "s/{\/\*ROUTE_RENDER_PLACE_HOLDER\*\/}/$ROUTE_SUBSTITUTION_STRING/" ./src/router/Routes.js

sed -i '' "s/\/\/\[IMPORT_PLACE_HOLDER\]/$IMPORT_SUBSTITUTION_STRING/" ./src/router/Routes.js
sed -i '' "s/\/\/\[ROUTE_PATH_PLACE_HOLDER\]/$ROUTE_PATH_SUBSTITUTION_STRING/" ./src/router/Routes.js
sed -i '' "s/{\/\*ROUTE_RENDER_PLACE_HOLDER\*\/}/$ROUTE_SUBSTITUTION_STRING/" ./src/router/Routes.js