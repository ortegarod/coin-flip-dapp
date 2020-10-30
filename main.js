var web3 = new Web3(Web3.givenProvider);
var contractInstance;



$(document).ready(function() {
    window.ethereum.enable().then(function(accounts){
        // contractInstance = web3.eth.contract(abi).at("0x30c6e523183391E685Af5fBdE4F2340E5224720E");

        contractInstance = new web3.eth.Contract(abi, "0x32faA7a3c1eaEF2Ce8eb14Dbbf3A6920af394535", {from: accounts[0]});
        console.log(contractInstance);
    });

    $("#betButton").click(bet)
    $("#userWithdrawBalance").click(withdraw)
    $("#userGetBalance").click(userGetBalance)
    $("#getContractBalance").click(getContractBalance)
    $("#withdrawContractBalance").click(withdrawContractBalance)


});

function bet(){

    var betAmount = $("#betAmount").val();

    var config = {
        value: web3.utils.toWei(betAmount)
    }

    contractInstance.methods.playerBet(web3.utils.toWei(betAmount)).send(config)
    .on("transactionHash", function(hash){ 
        console.log(hash);
    }) 
    .on("receipt", function(receipt){
        console.log(receipt);
        contractInstance.methods.userBalance().call()
        .then(function(result){
            console.log("user has " + web3.utils.fromWei(result) + " ETH");
            $("#user_balance").text(web3.utils.fromWei(result) + " ETH");
        }) 

        contractInstance.methods.getContractBalance().call()
        .then(function(result){
            console.log("contract has " + web3.utils.fromWei(result) + " ETH");
            $("#contract_balance").text(web3.utils.fromWei(result) + " ETH");
        }) 
    })

    contractInstance.once('Result', {}, (function(error, event){
        console.log(event);
        // console.log(event.returnValues['result']);
        // $("#bet_result").text(event.returnValues['result']);

        if (event.returnValues['result'] == 1) {
            $("#bet_result").text("WINNER");
            console.log("user won")
        } else
        $("#bet_result").text("LOSER") &&
        console.log("user lost")

    })

    )}

    

function withdraw(){

    contractInstance.methods.withdrawPlayerBalance().send()
    .on("transactionHash", function(hash){ 
        console.log(hash);
    }) 
    .on("confirmation", function(confirmationNr){
        console.log(confirmationNr); 
    })
    .on("receipt", function(receipt){
        console.log(receipt);
        contractInstance.methods.userBalance().call()
        .then(function(result){
            console.log("user has " + web3.utils.fromWei(result) + " ETH");
            $("#user_balance").text(result);
        }) 
    })
}

function userGetBalance(){
    contractInstance.methods.userBalance().call()
    .then(function(result){
        console.log("user has " + web3.utils.fromWei(result) + " ETH");
        $("#user_balance").text(web3.utils.fromWei(result) + " ETH");
    }) 
}


function getContractBalance(){
    contractInstance.methods.getContractBalance().call()
    .then(function(result){
        console.log("contract has " + web3.utils.fromWei(result) + " ETH");
        $("#contract_balance").text(web3.utils.fromWei(result) + " ETH");
    }) 
}

function withdrawContractBalance(){

    contractInstance.methods.withdrawContractBalance().send()
    .on("transactionHash", function(hash){ 
        console.log(hash);
    }) 
    .on("confirmation", function(confirmationNr){
        console.log(confirmationNr); 
    })
    .on("receipt", function(receipt){
        console.log(receipt);
        contractInstance.methods.getContractBalance().call()
        .then(function(result){
            console.log("contract has " + web3.utils.fromWei(result) + " ETH");
            $("#contract_balance").text(result);
        }) 
    })
}