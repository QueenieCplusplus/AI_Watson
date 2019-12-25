var express = require('express');
var router = express.Router();
const request = require('request-promise');

const AssistantV1 = require('ibm-watson/assistant/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const assistant = new AssistantV1({
  version: '2018-02-28',
  authenticator: new IamAuthenticator({
    apikey: '   ', // change
  }),
  url: 'https://gateway.watsonplatform.net/assistant/api', // change
});


//local test

assistant.message({
 workspaceId: '   ', // change
 input: {'text': 'Hello'}
 })
 .then(res => {
   console.log(JSON.stringify(res.result, null, 2));
 })
 .catch(err => {
   console.log(err)
 });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// webhook 
router.post('/linebot', async function(req, res, next) {
	console.log(req.body)
	res.sendStatus(200);
	
	let words = req.body.events[0].message.text;
	let assistantResult = await askAssistant(words);
	console.log(assistantResult)
	//let lineMsg = assistantResult.lineMsg;
	
	//let lineMsg = toLineFormat()

	//callLineSendMsgAPI

});

router.post('/fbbot', function(req, res, next) {
	console.log(req.body)
	res.sendStatus(200);
	
	//let assistantResult = askAssistant(words)
	//let fbMsg = toFBFormat()
	
	//callFBSendMsgAPI
});

function askAssistant(words){
	return assistant.message({
		workspaceId: '  ',
		input: {'text': words}
		})
		.then(res => {
			//console.log(JSON.stringify(res.result, null, 2));
			return res.result
		})
		.catch(err => {
			console.log(err)
		});
}

function wqerw(){
	let endPoint = {
		'url': url,
		'method': 'POST',
		'headers': {
			'content-type': 'application/x-www-form-urlencoded'
		},
		'body': querystring.stringify({ 'jsonStr': JSON.stringify(params) })
	};
	  
	request.post(endPoint).then((body) => {
		console.log(body)
		let bodyJSON = JSON.parse(body);
		return bodyJSON;

	}).catch((error) => {
		console.log('call hoitai api error :' + error);
		return null;
	})
}

module.exports = router;
