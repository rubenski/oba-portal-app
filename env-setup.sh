curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt install nodejs
node --version

# Make global node directory
# Instructions taken from https://askubuntu.com/questions/21555/command-to-append-line-to-a-text-file-without-opening-an-editor
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo "PATH=~/.npm-global/bin:$PATH" >> ~/.profile
source ~/.profile


npm install -g @angular/cli
