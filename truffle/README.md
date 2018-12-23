## Requirements

- truffle



#### Install truffle

``````
> npm i truffle -g
``````



#### Compile Solidity Code

If there is build directory under project directory, run this after deleting build directory.

``````
> truffle compile
``````



#### Migrate(deploy) Solidity Code on Local Ganache node

You should run ganache-cli node before deploying.

`````
> truffle migrate --reset
`````

