pragma solidity ^0.4.24;

contract ECTAsc {
        enum stat {waiting,deposited, confirmed,voting}
       
        stat status;
        address developerAdress;
        address clientAdress;
        uint price;
        bool sent; //to prevent double payments
        uint voteForDeveloper;
        uint voteForClient;
        uint numberOfVotes;
        uint closed;
        uint paid;
        
        
    /*struct Voter {
        string name;
        bool voted;
        address delegate;
    } */   
    

    
    function appeal() public {
        require( status == stat.deposited);
         require(msg.sender==clientAdress);
         status = stat.voting;
         uint start=now;
         closed=start + 1 weeks;
        
    }
    
    mapping(address=>bool) voted;
    
    function vote(bool _vote) public payable {
         require( status == stat.voting);
         require(voted[msg.sender]==false);
         
         
         voted[msg.sender]=true;
         
        
       
        if(_vote==true){
            voteForDeveloper++;
            
        }
       else{
           voteForClient++;
       } 
       
       if(voteForClient + voteForDeveloper == 3){
           
           if(voteForClient>=2){
                       address(clientAdress).transfer(address(this).balance);

             
           }
            if(voteForDeveloper>=2){
                address(developerAdress).transfer(address(this).balance);
                
            }
            
       }
        else return;
    }
    
    
    constructor(address _developerAdress, address _clientAdress, uint _price) public {
        developerAdress=_developerAdress;
        clientAdress=_clientAdress;
        price=_price;
        status = stat.waiting;
        sent=false;
    }
   
   //transfer eth from client to the smart contract
    function depositToSc() public payable{
                   require(msg.sender==clientAdress);
                   require(msg.value ==price* 1 ether);
                   require(sent==false);
                   status = stat.deposited;
                   sent=true; 
         
    }
    
   //check balance of the smart contract
    function getBalance() view public returns (uint) {
        return address(this).balance;
    }
   
   //when client confirm payment, eth is sent from smart contract to developer
    function confirmPayment()public payable {
        require(msg.sender==clientAdress);
        require(address(this).balance!=0);
       
        address(developerAdress).transfer(address(this).balance);
         status = stat.confirmed;

        
    }
    
        
    }
  


        
  
