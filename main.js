var web3 = new Web3(Web3.givenProvider);
var contractInstance;



$(document).ready(function() {

    
    window.ethereum.enable().then(function(accounts){
        contractInstance = new web3.eth.Contract(abi, "0x9a9EDc135a41b131AE5031841BB5D9B4a853977e", {from: accounts[0]});
        console.log(contractInstance);
        $("#ethereum_account").text(web3.currentProvider.selectedAddress);
       
        web3.eth.getBalance(accounts[0]).then(function(result){
            $("#ethereum_balance").text(web3.utils.fromWei(result) + "ETH");
        })

        $("#contract_address").text(contractInstance.options.address);

        contractInstance.methods.getContractBalance().call()
        .then(function(result){
            console.log("contract has " + web3.utils.fromWei(result) + " ETH");
            $("#contract_balance").text(web3.utils.fromWei(result) + " ETH");
        }) 

        contractInstance.methods.userBalance().call()
        .then(function(result){
            console.log("user has " + web3.utils.fromWei(result) + " ETH");
            $("#user_balance").text(web3.utils.fromWei(result) + " ETH");
        }) 

        ethereum.on('accountsChanged', (accounts) => {
            // Handle the new accounts, or lack thereof.
            // "accounts" will always be an array, but it can be empty.
            location.reload();

          });


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

        var x = document.getElementById("betUI");
        x.style.display = "none";

        var y = document.getElementById("wait");
        y.style.display = "block";

        var z = document.getElementById("result");
        z.style.display = "none";
    }) 
    .on("receipt", function(receipt){
        console.log(receipt);
        var x = document.getElementById("wait");
        x.style.display = "none";
        var y = document.getElementById("wait2");
        y.style.display = "block";

        contractInstance.methods.getContractBalance().call()
        .then(function(result){
            console.log("contract has " + web3.utils.fromWei(result) + " ETH");
            $("#contract_balance").text(web3.utils.fromWei(result) + " ETH");
        })
        
        contractInstance.once('LogNewProvableQuery', {}, (function(error, event){
            console.log(event);
        }))

        contractInstance.once('generatedRandomNumber', {}, (function(error, event){
            console.log(event);
            $("#random_number").text(event.returnValues['randomNumber']);
            var x = document.getElementById("betUI");
            x.style.display = "block";
            var y = document.getElementById("wait2");
            y.style.display = "none";
            var z = document.getElementById("result");
            z.style.display = "block";
        }))
        contractInstance.once('oracleId', {}, (function(error, event){
            console.log(event);
        }))
        contractInstance.once('wallet', {}, (function(error, event){
            console.log(event);
        }))
        contractInstance.once('betAmount', {}, (function(error, event){
            console.log(event);
        }))

    })

        contractInstance.once('generatedRandomNumber', {}, (function(error, event){
            console.log(event);
            
            if (event.returnValues['randomNumber'] == 1) {
                $("#bet_result").text("YOU WON!");
                console.log("user won")
            } else
            $("#bet_result").text("YOU LOST!") &&
            console.log("user lost")

            contractInstance.methods.userBalance().call()
            .then(function(result){
                console.log("user has " + web3.utils.fromWei(result) + " ETH");
                $("#user_balance").text(web3.utils.fromWei(result) + " ETH");
            })
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