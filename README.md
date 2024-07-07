# Nextpay

Nextpay is a fintech platform , enabling users to manage their accounts, add balances, and perform peer-to-peer (P2P) transfers.

## Features

- User account creation and management
- Secure authentication using NextAuth
- Integration with a bank webhook server for transaction confirmation
- Account balance management
- Peer-to-peer (P2P) transfers between user accounts

## Tech Stack

- Next.js for the frontend and API routes
- NextAuth for authentication
- Prisma as the ORM
- Turborepo for monorepo management
- Express.js for the bank webhook server

## Project Structure

This project is set up as a Turborepo monorepo with the following structure:
```
nextpay/
├── apps/
│   ├── bank-webhook/             # Express Server
│   └── merchant-app/             # Yet to build ( dont run it )
│   └── user-app/                 # Nextjs Application
├── packages/
│   └── ...                       # UI packages / Config files / recoil 
│   └── db/              
│     └── schema.prisma           # Prisma schema
└── package.json
```

## Getting Started

### Prerequisites
Docker 

### Installation

```
docker build -t nextpay .
docker run -p 3000:3000 nextpay
```

## Usage

There are 2 test accounts, Try login into any of them

1. Number -   1111111111 
   Password - Alice

2. Number -   2222222222 
   Password - Bob


go to ``/transfer`` endpoint to add balance to the account  
and it will initiate the transfer 
then run the bank-webhook and manually post the transaction details to finally add the balance

for p2p transaction , go to ``/p2p`` add the number of the other test account and the amount to transfer , if the amount is sufficient , it will make a successful transaction 




## Webhook Server

The bank webhook server is built with Express.js and has the following endpoint:

- `POST /hdfcWebhook`: Endpoint for receiving transaction confirmations from HDFC bank


## Contributing

It is an Open source repository feel free to fix ui , bugs and errors . I have built github ci/cd pipelines to check the build and linting errors 
