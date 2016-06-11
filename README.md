# slack-if-site-down
Run tests to verify website is up and slack results

## setup

```
curl -sL https://rpm.nodesource.com/setup | bash -
yum install -y nodejs
npm install forever -g
cd /opt
git clone https://github.com/jimareed/<project>
cd <project>
npm install
forever start -o out.log server.js
forever stop server.js
```
