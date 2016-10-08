//
// config
//
webhookUri = "__replace_url__";    // refer to slack api page for details
dir = "__replace_working_dir__";   // directory where your system tests are run
interval = 12*60*60*1000;  // 12 hours

//
// run mocha test then report result on slack
//
require('shelljs/global');
var Slack = require('slack-node');

slack = new Slack();
slack.setWebhook(webhookUri);

cd(dir);

setInterval(function() {

  exec('./node_modules/.bin/mocha tests | grep " passing\\| failing"', function(code, stdout, stderr) {
    message = dir + ":";
    if (code == 0) {
      message += stdout;
      if (message.indexOf("fail") != -1) {
        message = "<!channel>: " + message;
      }
    } else {
      message = "<!channel>:" + message + " exit code:" + code + ", " + stderr;
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

}, interval);
