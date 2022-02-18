# Replace <your gcp project id> with your GCP project id
# and remove # to uncomment
# gcloud config set project <your gcp project id>

PROJECT_ID=`gcloud config get-value project`
LOCATION=us-central1

cd backend
find . -type d -path "*/functions/*" -exec sh -c 'cd "{}" && sh run.sh > /dev/null 2>&1' \;

export REPLACEMENT=https://us-central1-$PROJECT_ID.cloudfunctions.net
grep -rl "<FUNCTIONSURL>" . | xargs sed -i.bak1 -e "s|<FUNCTIONSURL>|"$REPLACEMENT"|g"
find . -name *.bak1 | xargs rm -drf

gcloud config set workflows/location us-central1
find . -type d -path "*/workflows/*" -exec sh -c 'cd "{}" && sh run.sh > /dev/null 2>&1' \;

export REPLACEMENT=https://workflowexecutions.googleapis.com/v1/projects/$PROJECT_ID/locations/$LOCATION/workflows
grep -rl "<WORKFLOWURL>" . | xargs sed -i.bak1 -e "s|<WORKFLOWURL>|"$REPLACEMENT"|g"
find . -name *.bak1 | xargs rm -drf

cd ..
cd website
export REPLACEMENT=`gcloud run services describe frontend --platform managed --region $LOCATION --format 'value(status.url)' --project $PROJECT_ID`
grep -rl "<ENDPOINTURL>" . | xargs sed -i.bak1 -e "s|<ENDPOINTURL>|"$REPLACEMENT"|g"
find . -name *.bak1 | xargs rm -drf
