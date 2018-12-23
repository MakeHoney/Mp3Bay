## Requirements

- Configuration file
- ganache-cli



#### Make config.js

What configuration file looks like under /src

```javascript
export const config = {
  INFURA_API_KEY: 'your infura net api key (if you need)',
  LOCAL_PROVIDER: 'http://localhost:8545', // ganache-cil client
  AWS_HOST: 'your external host (if you need)'
}
```



#### Install ganache-cli

``````
> npm i ganache-cli -g
``````



#### Run ganache-cli

`````
> ganache-cli -d
`````

-g option guarantees that it generate deterministic addresses based on a pre-defined mnemonic.



#### Project Setup

```
> npm i
```



#### Start Project

```
> npm start
```

