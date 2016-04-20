
// see:
// 
// https://github.com/SpiderStrategies/node-gmail-api
// https://developers.google.com/gmail/api/auth/web-server#create_a_client_id_and_client_secret
// https://developers.google.com/gmail/api/auth/scopes#gmail_scopes
// https://developers.google.com/gmail/api/overview#auth_and_the_gmail_api
// https://github.com/google/google-api-nodejs-client
// https://developers.google.com/gmail/api/guides/performance

var Gmail = require('node-gmail-api')
  , gmail = new Gmail('KEY')
  , s = gmail.messages('label:inbox', {max: 10, fields: ['id', 'internalDate', 'labelIds', 'payload']})

s.on('data', function (d) {
  console.log(d)
})
