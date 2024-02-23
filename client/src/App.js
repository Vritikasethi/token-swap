import React from 'react';
import Body from './Body.js';
import './App.css';
import abi1 from '../src/assets/ERC20.json';
import abi2 from '../src/assets/ERC20_A.json';
import abi3 from '../src/assets/POOL.json';
import {Contract,BrowserProvider} from "ethers";
import{useState, useEffect} from "react";



function App() {
  
  const[state,setState] =useState({
  provider: null,
  signer: null,
  contract1: null,
  contract2: null,
  contract3: null,
  });
  useEffect(() =>{
    const connectWallet = async () =>{
      const contractAddress1 = "0x5488a6Ba723C42e554a4a541B9F094457Ef9d2B4";
      const contractAddress1abi1 = abi1.abi;
      const contractAddress2 = "0x0fa9Cf66eB57932F44c93434330e7727E9664cfc";
      const contractAddress2abi2 = abi2.abi;
      const contractAddress3 = "0x3fde9eF362394D74BbfF04cf9e9106147CeB0A5D";
      const contractAddress3abi3 = abi3.abi;
      
      try{
      const { ethereum } = window;
      if(ethereum){
        const account = await ethereum.request({
          method:"eth_requestAccounts",

        });
        const provider = new BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const contract1 = new Contract(
          contractAddress1,
          contractAddress1abi1,
          signer
        );
        const contract2 = new Contract(
          contractAddress2,
          contractAddress2abi2,
          signer
        );
        const contract3 = new Contract(
          contractAddress3,
          contractAddress3abi3,
          signer
        );
        setState({provider, signer,contract1,contract2,contract3});
      }
      else{
        alert("metamask is not installed ");

      }

      }
      catch (error){
        console.log(error);

      }
    
  };
  connectWallet();


},[]);
  
  
  return (
    <React.Fragment>
      <div className="App">
      <Body state={state}/>
      
      </div>
      
    </React.Fragment>
    
  );
};

export default App;
