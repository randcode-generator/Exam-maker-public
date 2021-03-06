const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const {GoogleAuth} = require('google-auth-library');
const app = express();
app.use(express.json());
app.use(cors());

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function workflowsCallPoll(executionId, res, name, token) {
  const promise1 = new Promise(async (resFun, _) => {
    let executionResp2;
    for (let i = 0; i < 9000; i++) {
      const resp2 = await fetch("<WORKFLOWURL>/" + name + "/executions/"+executionId, {
          method: "GET",
          headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
          }
      });
      executionResp2 = await resp2.json();
      await sleep(100);
      if(executionResp2.state == 'SUCCEEDED') {
        break;
      }
    }
    resFun(executionResp2);
  });
  
  promise1.then(executionResp2 => res.json(JSON.parse(executionResp2.result)));
}
async function workflowsCall(req, name) {
  let args = {"argument": JSON.stringify(req.body)};
  const auth = new GoogleAuth();
  const token = await auth.getAccessToken();
  const resp = await fetch("<WORKFLOWURL>/" + name + "/executions", {
    method: "POST",
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(args)
  });
  const executionResp = await resp.json();
  const executionId = executionResp.name.slice(-36);
  return {executionId, token};
}

async function functionsCall(req, name) {
  console.log(req.body);
  const resp = await fetch("<FUNCTIONSURL>/" + name, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(req.body)
  });
  const executionResp = await resp.json();
  return executionResp
}

app.post('/generateExam', async (req, res) => {
  let name = 'generateExam';
  let {executionId, token} = await workflowsCall(req, name);
  workflowsCallPoll(executionId, res, name, token);
});

app.post('/saveExam', async (req, res) => {
  await workflowsCall(req, 'saveExam');
  res.json({"status":"success"});
});

app.post('/retrieveResults', async (req, res) => {
  let name = 'retrieveResults';
  let {executionId, token} = await workflowsCall(req, name);
  workflowsCallPoll(executionId, res, name, token);
});

app.post('/retrieveExam', async (req, res) => {
  let name = 'retrieveExam';
  let {executionId, token} = await workflowsCall(req, name);
  workflowsCallPoll(executionId, res, name, token);
});

app.post('/submitExam', async (req, res) => {
  let name = 'submitExam';
  let {executionId, token} = await workflowsCall(req, name);
  workflowsCallPoll(executionId, res, name, token);
});

app.post('/retrieveExamTaken', async (req, res) => {
  let name = 'retrieveExamTaken';
  let {executionId, token} = await workflowsCall(req, name);
  workflowsCallPoll(executionId, res, name, token);
});

app.post('/listExams', async (req, res) => {
  let name = 'listExams';
  let {executionId, token} = await workflowsCall(req, name);
  workflowsCallPoll(executionId, res, name, token);
});

app.get('/listGroups', async (req, res) => {
  let executionResp = await functionsCall(req, "listGroups");
  res.json(executionResp);
});

app.post('/listQuestionsByGroup', async (req, res) => {
  let executionResp = await functionsCall(req, "listQuestionsByGroup");
  res.json(executionResp);
});

app.post('/addQuestion', async (req, res) => {
  let executionResp = await functionsCall(req, "addQuestion");
  res.json(executionResp);
});

app.post('/addGroup', async (req, res) => {
  let executionResp = await functionsCall(req, "addGroup");
  res.json(executionResp);
});

app.post('/deleteQuestion', async (req, res) => {
  let executionResp = await functionsCall(req, "deleteQuestion");
  res.json(executionResp);
});

app.post('/deleteGroup', async (req, res) => {
  let executionResp = await functionsCall(req, "deleteGroup");
  res.json(executionResp);
});

app.post('/deleteExamTaken', async (req, res) => {
  let executionResp = await functionsCall(req, "deleteExamTaken");
  res.json(executionResp);
});

app.post('/deleteExam', async (req, res) => {
  let executionResp = await functionsCall(req, "deleteExam");
  res.json(executionResp);
});

app.get('/', (req, res) => {
  res.send("THIS IS MAIN PAGE");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});

