if (typeof web3 !== 'undefined')
    web3 = new Web3(web3.currentProvider);
else
    web3 = new Web3(new Web3.providers.WebsocketProvider('http://localhost:8545'));


var accounts;


web3.eth.getAccounts().then((acc) => {
    accounts = acc;
});



let abi = [
    {
        "constant": false,
        "inputs": [],
        "name": "appeal",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "confirmPayment",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "depositToSc",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "_developerAdress",
                "type": "address"
            },
            {
                "name": "_clientAdress",
                "type": "address"
            },
            {
                "name": "_price",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_vote",
                "type": "bool"
            }
        ],
        "name": "vote",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getBalance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
]
var depSC;


$(document).ready(() => {



    $("#btnDeploy").dblclick(() => {
        var _price = parseInt($("#price").val());

        if ($('#price').val() == '') {

            alert("Price is empty");
        };

        let pp1 = new web3.eth.Contract(abi);

        pp1.deploy({
            data: '0x608060405234801561001057600080fd5b5060405160608061041e8339810160409081528151602083015191909201516000805460018054600160a060020a03958616600160a060020a031990911617905560029290925560ff19929093166101000261010060a860020a0319909116178116825560038054909116905561039190819061008d90396000f30060806040526004361061006c5763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166312065fe08114610071578063120c32081461009857806335bfd639146100a25780634b9f5c98146100b757806362ef1f81146100c4575b600080fd5b34801561007d57600080fd5b506100866100cc565b60408051918252519081900360200190f35b6100a06100d1565b005b3480156100ae57600080fd5b506100a0610141565b6100a0600435151561019d565b6100a06102d5565b303190565b60015473ffffffffffffffffffffffffffffffffffffffff1633146100f557600080fd5b600254670de0b6b3a7640000023414151561010f57600080fd5b60035460ff161561011f57600080fd5b600080546001919060ff1916828002179055506003805460ff19166001179055565b6000600160005460ff16600381111561015657fe5b1461016057600080fd5b60015473ffffffffffffffffffffffffffffffffffffffff16331461018457600080fd5b506000805460ff191660031790554262093a8001600755565b600360005460ff1660038111156101b057fe5b146101ba57600080fd5b3360009081526009602052604090205460ff16156101d757600080fd5b336000908152600960205260409020805460ff19166001908117909155811515141561020b57600480546001019055610215565b6005805460010190555b60045460055401600314156102d2576005546002116102775760015460405173ffffffffffffffffffffffffffffffffffffffff90911690303180156108fc02916000818181858888f19350505050158015610275573d6000803e3d6000fd5b505b6004546002116102d2576000805460405173ffffffffffffffffffffffffffffffffffffffff6101009092049190911691303180156108fc02929091818181858888f193505050501580156102d0573d6000803e3d6000fd5b505b50565b60015473ffffffffffffffffffffffffffffffffffffffff1633146102f957600080fd5b3031151561030657600080fd5b6000805460405173ffffffffffffffffffffffffffffffffffffffff6101009092049190911691303180156108fc02929091818181858888f19350505050158015610355573d6000803e3d6000fd5b506000805460ff191660021790555600a165627a7a723058209d283b24a1f8cb5879623f8f40853901577bdc76a2213937ebca9ecae058e0e30029',
            arguments: ['0x2812D0689C1f9e1A651821b37AE66BC7cd402B69', accounts[0], _price]
        })
            .send({
                from: accounts[0],
                gas: 1500000,
                gasPrice: '30000000000'
            }, function (error, transactionHash) { "" })
            .on('error', function (error) {


            })
            .on('transactionHash', function (transactionHash) { })
            .on('receipt', function (receipt) {
                console.log(receipt.contractAddress) // contains the new contract address
                depSC = receipt.contractAddress;
                $("#address").html(depSC);
                $("#price1").html(_price);


            })
            .on('confirmation', function (confirmationNumber, receipt) { })
            .then(function (newContractInstance) {
                console.log(newContractInstance.options.address) // instance with the new contract address
                $("#price").prop("disabled", true);


            });


        $("#btnDeposit").click(() => {

            let pp = new web3.eth.Contract(abi, depSC);


            pp.methods.depositToSc().send({ from: accounts[0], value: _price * 1000000000000000000 }, (error, txHash) => {
                if (error)
                    console.log(error);
                else
                    console.log(txHash);
                    
                $("#paid").prop("disabled", false);
                $("#deposit").html("Yes");

            })

        });
        $("#btnPay").click(() => {

            let pp = new web3.eth.Contract(abi, depSC);
            pp.methods.confirmPayment().send({ from: accounts[0], }, (error, txHash) => {
                if (error)
                    console.log(error);
                else
                    console.log(txHash);
                $("#paid1").html("yes");


            })

        });

        $("#btnAppeal").click(() => {


            let pp = new web3.eth.Contract(abi, depSC);
            pp.methods.appeal().send({ from: accounts[0], }, (error, txHash) => {
                if (error)
                    console.log(error);
                else console.log(txHash);
                $("#voting").html("open");

            })
        });


        function vote(_naslov, _bool) {
            let pp = new web3.eth.Contract(abi, depSC);
            pp.methods.vote(_bool).send({ from: _naslov, }, (error, txHash) => {
                if (error)
                    console.log(error);
                else console.log(txHash);
                $("#votes_dev").append(" I");

            })
        }



        $("#btnVoteDev").click(() => {
            vote("0x96D17ebE2ee51d704FEa008fA30B2077599B0a01", true);
        })

        $("#btnVoteClient").click(() => {
            vote("0x96D17ebE2ee51d704FEa008fA30B2077599B0a01", false);
        })
        $("#btnVoteDev_1").click(() => {
            vote("0xB342dE7505fC397Bd1812d423f872101EdCB2A4f", true);
        });

        $("#btnVoteClient_1").click(() => {
            vote("0xB342dE7505fC397Bd1812d423f872101EdCB2A4f", false);
        })

        $("#btnVoteDev_2").click(() => {          
            vote("0xFF0af0A1b5C17CbDc613a79749cC4102D0Dd12B5", true);
        });

        $("#btnVoteClient_2").click(() => {
            vote("0xFF0af0A1b5C17CbDc613a79749cC4102D0Dd12B5", false);
        })






    });




});




