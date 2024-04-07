# litewallet
A wallet transcations app made using MERN STACK. The app is fully written in Typescript. 

## LIVE URL: https://litewallet-client.vercel.app/

##### SERVER URL: https://litewallet.onrender.com/api/health-check

### SCREENSHOTS:  

### DEMO VIDEO: 

### CODE EXPLAINATION VIDEO: 

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
