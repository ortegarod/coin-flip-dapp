// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

import "./Ownable.sol";
import "./provableAPI_0.5.sol";

contract CoinFlip is Ownable, usingProvable {

    event LogNewProvableQuery(string description);
    event generatedRandomNumber(uint256 randomNumber);
    event oracleId(bytes32 queryId);
    event wallet(address playerWallet);
    event betAmount(uint bet);
    event wins(uint wins);
    event losses(uint losses);


    uint256 constant NUM_RANDOM_BYTES_REQUESTED = 1;

    struct Player {
        uint balance;
        uint latestBet;
        bool waiting;
        uint wins;
        uint losses;
        uint betChoice;
        uint latestNumber;
    }
    
    mapping(address => Player) public players;
    mapping(bytes32 => address) public queries;

    function oracleResult(address a) public view returns (uint) {
        return players[a].latestNumber;
    }

    function getWins(address a) public view returns (uint) {
        return players[a].wins;
    }

    function getLosses(address a) public view returns (uint) {
        return players[a].losses;
    }

    // returns this contract's current balance
    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }

    // returns msg.senders (player) balance
    function userBalance() public view returns (uint balance) {
        return players[msg.sender].balance;
    }

    // withdraw Player winnings
    function withdrawPlayerBalance() public {
        require(players[msg.sender].balance > 0);
        uint amount = players[msg.sender].balance;
        msg.sender.transfer(amount);
        Player storage c = players[msg.sender];
        c.balance -= amount;
        c.wins = 0;
        c.losses = 0;
    }

    function withdrawContractBalance() public onlyOwner {
        require(address(this).balance > 0);
        uint amount = address(this).balance;
        msg.sender.transfer(amount);
    }

    function __callback(bytes32 _queryId, string memory _result) public {
        require(msg.sender == provable_cbAddress());
        
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(_result))) % 2;

        address playerWallet = queries[_queryId];
        Player storage c = players[playerWallet];
        c.waiting = false;
        c.latestNumber = randomNumber;
        uint bet = c.latestBet;
        if (randomNumber == c.betChoice) {
            c.balance += bet;
            c.wins += 1;
        } else {
            c.losses += 1;
        }


        emit wallet(playerWallet);
        emit betAmount(bet);
        emit generatedRandomNumber(randomNumber);
        emit wins(c.wins);
        emit losses(c.losses);

    }

    function playerBet(uint amount, uint betChoice)
        payable
        public
    {
        require(msg.value == amount);
        require(players[msg.sender].waiting == false);
        


        uint256 QUERY_EXECUTION_DELAY = 0; // NOTE: The datasource currently does not support delays > 0!
        uint256 GAS_FOR_CALLBACK = 200000;
        
        bytes32 queryId = provable_newRandomDSQuery(
            QUERY_EXECUTION_DELAY,
            NUM_RANDOM_BYTES_REQUESTED,
            GAS_FOR_CALLBACK
        );
        
        queries[queryId] = msg.sender;

        Player storage c = players[msg.sender];
            c.latestBet = amount;
            c.waiting = true;
            c.betChoice = betChoice;

        emit oracleId(queryId);
        emit LogNewProvableQuery("Provable query was sent, standing by for the answer...");
    }

}



