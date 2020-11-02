var web3 = new Web3(Web3.givenProvider);
var contractInstance;

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts){
        contractInstance = new web3.eth.Contract(abi, "0xC7D411CC5d9f463beF26b3E5Cfd15d6b0B3a4288", {from: accounts[0]});
        console.log(contractInstance);
        var account = web3.currentProvider.selectedAddress
        $("#ethereum_account").text(account);
        var a = document.getElementById("withdraw");
        if (account == "0xbbeb9450b98b47874036c535ece5da2f7cc49e10") {
            a.style.display = "block";
            } else { a.style.display = "none";
        }
        var x = document.getElementById("betUI");
        x.style.display = "block";
        web3.eth.getBalance(accounts[0]).then(function(result){
            $("#ethereum_balance").text(web3.utils.fromWei(result) + " ETH");
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
        contractInstance.methods.getWins(account).call()
        .then(function(result){
            $("#wins").text(result);
        })
        contractInstance.methods.getLosses(account).call()
        .then(function(result){
            $("#losses").text(result);
        })
        ethereum.on('accountsChanged', (accounts) => {
            // Handle the new accounts, or lack thereof.
            // "accounts" will always be an array, but it can be empty.
            location.reload();
          });
    });
    $("#betButton").click(bet)
    $("#betButton2").click(bet2)
    $("#userWithdrawBalance").click(withdrawUserBalance)
    $("#withdrawContractBalance").click(withdrawContractBalance)
});

function bet(){
    var betAmount = $("#betAmount").val();
    var betChoice = $("#betButton").val();
    var config = {
        value: web3.utils.toWei(betAmount)
    }
    contractInstance.methods.playerBet(web3.utils.toWei(betAmount), betChoice).send(config)
    .on("transactionHash", function(hash){ 
        console.log(hash);
        var x = document.getElementById("betUI");
        x.style.display = "none";
        var y = document.getElementById("wait");
        y.style.display = "block";
        var z = document.getElementById("result");
        z.style.display = "none";
        var a = document.getElementById("oracle_result");
        a.style.display = "none";
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
            if (event.returnValues['randomNumber'] == betChoice) {
                $("#bet_result").text("YOU WON " + betAmount + " ETH!");
                console.log("user won")
            } else {
                $("#bet_result").text("YOU LOST " + betAmount + " ETH!") &&
                console.log("user lost")
            }
            contractInstance.methods.userBalance().call()
            .then(function(result){
                console.log("user has " + web3.utils.fromWei(result) + " ETH");
                $("#user_balance").text(web3.utils.fromWei(result) + " ETH");
            })
            var account = web3.currentProvider.selectedAddress
            contractInstance.methods.oracleResult(account).call()
            .then(function(result){
                if(result == 1) {
                    $("#oracle_result").text("RESULT: HEADS");
                } else {
                    $("#oracle_result").text("RESULT: TAILS");
                }
            })
            var x = document.getElementById("betUI");
            x.style.display = "block";
            var y = document.getElementById("wait2");
            y.style.display = "none";
            var z = document.getElementById("result");
            z.style.display = "block";
            var a = document.getElementById("oracle_result");
            a.style.display = "block";
            window.ethereum.enable().then(function(accounts){
                web3.eth.getBalance(accounts[0]).then(function(result){
                    $("#ethereum_balance").text(web3.utils.fromWei(result) + " ETH");
                })
            })
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
        contractInstance.once('wins', {}, (function(error, event){
            $("#wins").text(event.returnValues['wins']);
        }))
        contractInstance.once('losses', {}, (function(error, event){
            $("#losses").text(event.returnValues['losses']);
        }))
    })
}

function bet2(){
    var betAmount = $("#betAmount").val();
    var betChoice = $("#betButton2").val();
    var config = {
        value: web3.utils.toWei(betAmount)
    }
    contractInstance.methods.playerBet(web3.utils.toWei(betAmount), betChoice).send(config)
    .on("transactionHash", function(hash){ 
        console.log(hash);
        var x = document.getElementById("betUI");
        x.style.display = "none";
        var y = document.getElementById("wait");
        y.style.display = "block";
        var z = document.getElementById("result");
        z.style.display = "none";
        var a = document.getElementById("oracle_result");
        a.style.display = "none";
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
            if (event.returnValues['randomNumber'] == betChoice) {
                $("#bet_result").text("YOU WON " + betAmount + " ETH!");
                console.log("user won")
            } else {
                $("#bet_result").text("YOU LOST " + betAmount + " ETH!") &&
                console.log("user lost")
            }
            contractInstance.methods.userBalance().call()
            .then(function(result){
                console.log("user has " + web3.utils.fromWei(result) + " ETH");
                $("#user_balance").text(web3.utils.fromWei(result) + " ETH");
            })
            var account = web3.currentProvider.selectedAddress
            contractInstance.methods.oracleResult(account).call()
            .then(function(result){
                if(result == 1) {
                    $("#oracle_result").text("RESULT: HEADS");
                } else {
                    $("#oracle_result").text("RESULT: TAILS");
                }
            })
            var x = document.getElementById("betUI");
            x.style.display = "block";
            var y = document.getElementById("wait2");
            y.style.display = "none";
            var z = document.getElementById("result");
            z.style.display = "block";
            var a = document.getElementById("oracle_result");
            a.style.display = "block";
            window.ethereum.enable().then(function(accounts){
                web3.eth.getBalance(accounts[0]).then(function(result){
                    $("#ethereum_balance").text(web3.utils.fromWei(result) + " ETH");
                })
            })
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

        contractInstance.once('wins', {}, (function(error, event){
            $("#wins").text(event.returnValues['wins']);
        }))
        contractInstance.once('losses', {}, (function(error, event){
            $("#losses").text(event.returnValues['losses']);
        }))

    })
}  

function withdrawUserBalance(){
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
        window.ethereum.enable().then(function(accounts){
            web3.eth.getBalance(accounts[0]).then(function(result){
                $("#ethereum_balance").text(web3.utils.fromWei(result) + " ETH");
            })
        })
        contractInstance.once('wins', {}, (function(error, event){
            $("#wins").text(event.returnValues['wins']);
        }))
        contractInstance.once('losses', {}, (function(error, event){
            $("#losses").text(event.returnValues['losses']);
        }))
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
            $("#contract_balance").text(result + " ETH");
        })
        window.ethereum.enable().then(function(accounts){
            web3.eth.getBalance(accounts[0]).then(function(result){
                $("#ethereum_balance").text(web3.utils.fromWei(result) + " ETH");
            })
        }) 
    })
}