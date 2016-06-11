//
// config
//
webhookUri = "__replace_url__";
dir = "__replace_working_dir__";

//
// run mocha test then report result on slack
//
require('shelljs/global');
var Slack = require('slack-node');

slack = new Slack();
slack.setWebhook(webhookUri);

cd(dir);

exec('./node_modules/.bin/mocha tests | grep " passing\\| failing"', function(code, stdout, stderr) {
  message = "";
  if (code == 0) {
    message = "test results: " + stdout;
    if (message.indexOf("fail") != -1) {
      message = "<!channel>: " + message;
    }
  } else {
    message = "<!channel>: exit code:" + code + ", " + stderr;
  }

  slack.webhook({
    channel: "#website-status",
    username: "incoming-webhook",
    text: message
  }, function(err, response) {
    if (err) {
      console.log(response);
    }
  });

});
