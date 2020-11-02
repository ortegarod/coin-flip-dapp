var abi = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "queries",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "players",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      },
      {
        "name": "latestBet",
        "type": "uint256"
      },
      {
        "name": "waiting",
        "type": "bool"
      },
      {
        "name": "wins",
        "type": "uint256"
      },
      {
        "name": "losses",
        "type": "uint256"
      },
      {
        "name": "betChoice",
        "type": "uint256"
      },
      {
        "name": "latestNumber",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "description",
        "type": "string"
      }
    ],
    "name": "LogNewProvableQuery",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "randomNumber",
        "type": "uint256"
      }
    ],
    "name": "generatedRandomNumber",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "queryId",
        "type": "bytes32"
      }
    ],
    "name": "oracleId",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "playerWallet",
        "type": "address"
      }
    ],
    "name": "wallet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "bet",
        "type": "uint256"
      }
    ],
    "name": "betAmount",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "wins",
        "type": "uint256"
      }
    ],
    "name": "wins",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "losses",
        "type": "uint256"
      }
    ],
    "name": "losses",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "a",
        "type": "address"
      }
    ],
    "name": "oracleResult",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "a",
        "type": "address"
      }
    ],
    "name": "getWins",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "a",
        "type": "address"
      }
    ],
    "name": "getLosses",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getContractBalance",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "userBalance",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "withdrawPlayerBalance",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "withdrawContractBalance",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_queryId",
        "type": "bytes32"
      },
      {
        "name": "_result",
        "type": "string"
      }
    ],
    "name": "__callback",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_myid",
        "type": "bytes32"
      },
      {
        "name": "_result",
        "type": "string"
      },
      {
        "name": "_proof",
        "type": "bytes"
      }
    ],
    "name": "__callback",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "amount",
        "type": "uint256"
      },
      {
        "name": "betChoice",
        "type": "uint256"
      }
    ],
    "name": "playerBet",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  }
]