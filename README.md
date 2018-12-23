## Requirements

* Node.js
* NPM
* IPFS Local Node



#### Running IPFS local node

Initialize local IPFS configuration and add your first file. 

After executing IPFS daemon, check if ipfs node are running on port 5001(IPFS API) and 8080(IPFS gateway)

``````
> ipfs init local-node
> ipfs daemon &
``````



#### Run DApp

1. Run ganache-cli

   ``````
   > ganache-cli -d
   ``````

2. Compile and Migrate contracts on ganache node (Run it at truffle directory)

   `````
   > truffle compile
   > truffle migrate --reset
   `````

3. Run Client and Server

   