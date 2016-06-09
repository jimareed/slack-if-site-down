require('shelljs/global');
var Slack = require('slack-node');

webhookUri = "__replace_url__";
 
slack = new Slack();
slack.setWebhook(webhookUri);

slack.webhook({
  channel: "#website-status",
  username: "incoming-webhook",
  text: "This is posted to #general and comes from a bot named webhookbot."
}, function(err, response) {
  console.log(response);
});

fs = require('fs');

cd('/opt/chordpro-editor');
rm('t.out');

if (exec('./node_modules/.bin/mocha tests | grep " passing\\| failing" > t.out').code !== 0) {
  echo('Error running test');
} else {
	fs.readFile('t.out', function(err,data) {
		if (err) {
			echo('Error reading t.out');
		} else {
			echo(data.toString());
		}
	});
}


cd('/opt/slack-if-site-down');
