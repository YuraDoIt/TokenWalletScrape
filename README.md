Hi to run this project you should
- git clone <url>

Register on Moralis and get you Api key

Open project and add .env file with parameter without <br>
</br>
PORT=<Your value>
WALLET_HASH=<Your value>

MORALIS_API=<Your value>

GoTo terminal run from project directory command:
- npm install
- npm run start:dev

Open http://localhost

Every 1 minute it will parse all transaction and save it to src/files-result/token-ec20
If open http://localhost:<Port>/own-etherium it will save all etherium token to src/files-result/token-own