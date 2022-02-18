# ExamMaker
Easily create multiple version of an exam

## How to deploy
### Backend
The backend uses GCP functions, workflows, and run
1) Enable Google Cloud Functions, Workflows, and Runs
```
gcloud services enable cloudfunctions.googleapis.com workflows.googleapis.com run.googleapis.com
```

2) Run `deploy.sh` to replace placeholders with GCP functions and workflow HTTP URL. This also deploys functions and workflows.
(Make sure GCP SDK is installed or run this on GCP Shell)
```
sh deploy.sh
```

### Frontend
The frontend uses Angular

1) Install nvm
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

2) Install node
```
nvm install 16
```

3) Install Firebase CLI
```
npm install -g firebase-tools
```

4) Log into firebase
```
firebase login --no-localhost
```

5) Install AngularCLI
```
npm install -g @angular/cli
```

6) Install AngularFire
```
cd ExamMaker/website/exam-site
ng add @angular/fire
```

7) Run angular deploy
```
ng deploy
```

### Add User
1) Go to https://console.firebase.google.com/
2) Select your project
3) Go to **Authentication**
4) Add **Email/Password** user