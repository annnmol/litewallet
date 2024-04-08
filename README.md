# litewallet
A wallet transcations app made using MERN STACK. The app is fully written in Typescript. 

## LIVE URL: https://litewallet-client.vercel.app/

##### SERVER URL: https://litewallet.onrender.com/api/health-check
!!!NOTE: This backend service goes spin down due to inactivity (Free Plans). Needs to manually up again!!! 

### SCREENSHOTS:  https://drive.google.com/drive/folders/1zTlQAbe0ixtCN7xklDrsTF15QC6yTWKP?usp=sharing

### DEMO VIDEO: https://drive.google.com/file/d/1cvJYgXI2i9GB6QcsJcR6EVj2bWZ2EuFX/view?usp=sharing

### CODE EXPLAINATION VIDEO: 


### LOCAL DEV SETUP
1. Clone the repo
2. cd server && yarn start && yarn dev
3. cd client && yarn start && yarn dev
4. change server .env file and Replace password <Password> in MONGO_DB_URI with this: Anmol%40123

### TECH STACK:
1. Client: REACT.JS, TYPESCRIPT
2. Server: NODE.JS, EXPRESS.JS, TYPESCRIPT
3. Databse: MONGO DB
4: UI Library: Shadcn, Tailwind css

### Screens:
1. Create Wallet Screen (Public)
2. Create Transcations / Dashboard Screen (Protected) 
3. View All Transcations -- [Pagination, Filters,Export ] --- (Protected)

### API ROUTES: 
refer to POSTMAN COLLECTION to test ( https://github.com/annnmol/litewallet/blob/dev/Litewallet%20api%20collection.postman_collection.json )

1. SETUP WALLET: /api/wallet/setup -- POST
2. GET WALLET: /api/wallet/:id --- GET
3. UPDATE WALLET:  /api/wallet/:id --- PUT
4. CREATE TRANSACTION: /api/transact/:walletId -- POST
5. GET FILTERED TRANSACTIONS: /api/transactions/:walletId?skip=0&limit=6&date=0&amount=-1 -- GET
6. EXPORT TRANSACTIONS:  /api/export/transactions/:walletId?date=-1 -- GET
