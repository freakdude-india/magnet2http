# streamify-magnet
An ultra simple and lightweight web app that can convert magnet links into downloadable http stream.
# USAGE-FEATURES
1) An extremely lightweight web app with node.js backend which can convert magnet link into direct download links.<br/>
2) Shows the list of files in case of multifile torrents~select the file to download.<br/>
3) Mordern web UI anyone can use.

# INSTALLATION-Locally

1) Clone the github repo using ```git clone https://github.com/freakdude-india/streamify-magnet```
2) Make sure you have node.js and npm latest version installed. If not then <a href="https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04">click here</a> to follow  installation guide.
3) The project should be cloned in ```sreamify-magnet``` directory, enter ```cd streamify-magnet``` to enter into that directory.
4) Enter ```sudo su``` and enter your password to get sudo  access, not necessary  if you are using ```sudo -i``` from beginning.
5) Then enter ```npm install``` to install required modules.
6) Enter ```node server.js``` to run server.
7) Web UI should be live on ```http://localhost:80/```

# SERVER DEPLOYMENT
1)Buy a vps with at least 1vcpu+2gb Ram+20gb ssd/deploy on aws,gcp,azure free trial.<br>
2)ssh into the vps and follow all steps mentioned in local installation.<br>
3)Open networking interface in vps control panel and edit firewall rules to allow all TCP requests through port 80 and 443.(Cause we will be deploying this on port 80 and https server will be live on port 443)<br>
4)Install pm2 by `npm install -g pm2` command.<br>
5)Execute `pm2 start server.js` and `pm2 start http-redirect.js`(last one is optional only for https force redirect, may cause deployment issues)<br>
6)Now your server is live and daemonized.<br>

# <b>SSL access</b>
Follow these steps to get free letsencrypt ssl.First add an `A` record in your domain registerer's DNS panel pointing to your vps IP.Google it if you don't know how to do it.<br>
1)`apt-get install certbot`<br>
2)`sudo certbot certonly --manual --preferred-challenges=dns -d yourdomain.com`--here replace `yourdomain.com` with your actual domain name.
3)now install nano text editor `apt-get install nano`.<br>
4)`nano server.js`
5)`const privateKey = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/privkey.pem', 'utf8');<br>
const certificate = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/cert.pem', 'utf8');<br>
const ca = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/chain.pem', 'utf8');`<br>
access this part in `server.js` and replace `yourdomain.com` with actual domain name. Enter `ctrl+x` then `y` and `Enter`.
6)Now again `pm2 start server.js` and `pm2 start http-redirect.js` and then `pm2 save` next `pm2 startup`.
Now the webapp should be on https.


# HELP
Report errors by creating issue here.<br/>
Want help to do these
1) Add a serach engine to search and add torrents.
2) Build a installable desktop package.
3) Build installabe android apk.<br/>
Email:gogomedia365@gmail.com to join the developement process.

# CREDITS
1) https://github.com/mafintosh/torrent-stream
2) https://github.com/mafintosh/peerflix





