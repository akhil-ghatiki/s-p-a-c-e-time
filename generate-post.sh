#!/bin/bash

# arguments reference
# 1 - folder_name
# 2 - post_name

# gh repo view test-gh-cli2323

# if [ $? -eq 1 ]
# then
#     echo "Repo dosent exist in your account. Pushing this repo."
#     gh repo create test-gh-cli2323 --public -y
#     exit 1
# else
#     echo "Your repo is set.."
# fi

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

echo "Creating markdown directory...."
mkdir src/posts/$FOLDER_NAME

echo "Creating image direcoty...."
mkdir public/images/$FOLDER_NAME

echo "Creating markdown file...."
touch src/posts/$FOLDER_NAME/$FILE_NAME.md

echo "Creating image file...."
touch public/images/$FOLDER_NAME/$FILE_NAME.jpg

echo "Initializing your file with image, headers and date of creation..."
echo "![image](/images/$FOLDER_NAME/$FILE_NAME.jpg) \n" >> src/posts/$FOLDER_NAME/$FILE_NAME.md
echo "## [Replace with post header] \n" >> src/posts/$FOLDER_NAME/$FILE_NAME.md
echo "###### **$(date +"%b %d, %Y")** \n" >> src/posts/$FOLDER_NAME/$FILE_NAME.md

sed -i '' "s/\/\/\[IMPORT_PLACE_HOLDER\]/$IMPORT_SUBSTITUTION_STRING/" ./src/router/Routes.js
sed -i '' "s/\/\/\[ROUTE_PATH_PLACE_HOLDER\]/$ROUTE_PATH_SUBSTITUTION_STRING/" ./src/router/Routes.js
sed -i '' "s/{\/\*ROUTE_RENDER_PLACE_HOLDER\*\/}/$ROUTE_SUBSTITUTION_STRING/" ./src/router/Routes.js

echo "You are all set...\nThis world is waiting to know whats in geeky brain, write it in src/posts/$FOLDER_NAME/$FILE_NAME.md"
