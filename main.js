var web3 = new Web3(Web3.givenProvider);
var contractInstance;

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts){
        // contractInstance = web3.eth.contract(abi).at("0x30c6e523183391E685Af5fBdE4F2340E5224720E");

        contractInstance = new web3.eth.Contract(abi, "0x1131aC6e7B328002Db1A7E0d009c2Fd53f74Bc6c", {from: accounts[0]});
        console.log(contractInstance);
    });

    $("#betButton").click(bet)

});

function bet(){

    var betAmount = $("#betAmount").val();

    var config = {
        value: web3.utils.toWei(betAmount)
    }


    // betAmount != msg.value

    contractInstance.methods.playerBet(web3.utils.toWei(betAmount)).send(config)

    .on("transactionHash", function(hash){ 
        console.log(hash);
    }) 
    .on("confirmation", function(confirmationNr){
        console.log(confirmationNr); 
    })
    .on("receipt", function(receipt){
        console.log(receipt);
    })
}