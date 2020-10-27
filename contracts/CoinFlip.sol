// SPDX-License-Identifier: MIT
pragma solidity 0.7.0;

contract CoinFlip {

    struct Player {
        uint balance;
        address payable id;
    }
    
    mapping(address => Player) public players;

    function playerBet(uint amount) public payable {
        require(msg.value == amount);
        Player storage c = players[msg.sender];
        
        uint result = random();

        if (result == 1) {
            c.balance += amount;
        }
        
    }

    // pseudo-random function returns a 1 or 0 (simulates 50% odds)
    function random() public view returns (uint) {
        return block.timestamp % 2;
    }
    
    // returns this contract's current balance
    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }

}