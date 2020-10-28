var web3 = new Web3(Web3.givenProvider);
var contractInstance;

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts){
        // contractInstance = web3.eth.contract(abi).at("0x30c6e523183391E685Af5fBdE4F2340E5224720E");

        contractInstance = new web3.eth.Contract(abi, "0xc5f34B1320FBeA37489268250b107C2B9b803218", {from: accounts[0]});
        console.log(contractInstance);
    });

    $("#betButton").click(bet)
    $("#userWithdrawBalance").click(withdraw)
    $("#userGetBalance").click(userGetBalance)


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
    .on("confirmation", function(confirmationNr){
        console.log(confirmationNr); 
    })
    .on("receipt", function(receipt){
        console.log(receipt);
        contractInstance.methods.userBalance().call()
        .then(function(result){
            console.log(result);
            $("#user_balance").text(result);
        }) 
    })

    // will be fired once the receipt is mined
    .then(function(receipt){
        console.log("test1");
    })

    // will be fired after tx
    .then(result => console.log("test2"))
    .then(result => console.log("test3"));

    contractInstance.events.Result(function(error, event){
        console.log(event);
        console.log(event.returnValues['result']);
        $("#bet_result").text(event.returnValues['result']);

        if (event.returnValues['result'] == 1) {
            $("#bet_result").text("WINNER");
        } else $("#bet_result").text("LOSER");

    })



    }

    

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
            console.log(result);
            $("#user_balance").text(result);
        }) 
    })
}

function userGetBalance(){
    contractInstance.methods.userBalance().call()
    .then(function(result){
        console.log(result);
        $("#user_balance").text(result);
    }) 
    .then(function(receipt){
        console.log("test1");
    })
}

