# crowd-funding

A crowdfunding dApp built with Solidity and React.

## Background

A crowdfunding dApp is a decentralized application built on a blockchain that allows individuals or organizations to raise funds for their projects, causes or ventures. It consists of a smart contract that holds the raised funds until the campaign's funding goal is met. Once the goal is achieved, the funds are released to the campaign's creator.

## Project features

- [x] User can start a fundraising.
- [x] Anyone can contribute.
- [x] End project if targeted contribution amount reached.
- [x] Expire project if targeted amount not fulfills between deadline.

## Live Project

The deployed project is live on the website: https://crowd-funding-world.vercel.app.

You can access it directly and start using it.

## Connecting to Goerli Network

To connect to the Goerli Network on the Ethereum blockchain, you will need to have the Metamask browser extension installed. Here are the steps to set up Metamask:

1. Install the Metamask extension on your browser.
2. Create a new wallet or import an existing one.
3. Click on the Metamask extension icon and select "Goerli Test Network".
4. Add some test ether to your wallet by visiting a faucet such as https://goerlifaucet.com.
5. Once you have test ether in your wallet, you can interact with the Crowd-Funding dApp on the Goerli Network.

## Developers

The project is structured into two directories:

### client

This directory contains the front-end code of the application.

### web3

This directory contains the smart contract and code related to the blockchain.

To install the app, you will need to have _Node.js_ and _npm_ installed on your machine.

1. Clone the repository: `git clone https://github.com/chrisstef/crowd-funding.git`
2. Navigate to the client directory: `cd client`
3. Install dependencies: `npm install`
4. Start the app: `npm run dev`

## Usage

Once the app is running, you can access it in your browser at `http://localhost:5173`.

## Contributing

Contributions to the crowdfunding project are welcome! To contribute, please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b <branch-name>`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin <branch-name>`
5. Create a new pull request
