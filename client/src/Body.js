
  import React,{useState} from "react";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

  function Body({state}){
  const{contract1,contract2,contract3} = state;
  

  const handleChange =async()=>{
  var reserveIn = Number(await contract3.reserve0());
  var reserveOut = Number(await contract3.reserve1());
  const amount1 = document.querySelector(".inputToken").value;

  var amountWithFee = (amount1*997)/1000;
  var amountOut= (amountWithFee * reserveOut)/(reserveIn + amountWithFee);
 document.querySelector(".outputToken").value = amountOut;

  }
  const transferToken = async(event) =>{
    event.preventDefault();
    setLoading(true);
    toast("tranfer begin");

    const amount1 = document.querySelector(".inputToken").value;

    // const approved1 = await contract1.approve(await contract3.getAddress(), parseInt(amount1*(10**2)));
    // await approved1.wait();
    // const approved2 = await contract2.approve(await contract3.getAddress(),parseInt(amount1*(10**2)));
    // await approved2.wait();
    // const addLiquidity = await contract3.addLiquidity(amount1*(10**2),amount1*(10**2));
    // await addLiquidity.wait();

     const approvedAgain = await contract1.approve(await contract3.getAddress(),amount1*(10**2));
     await approvedAgain.wait();

     const swapping = await contract3.swap(await contract1.getAddress(),amount1*(10**2));
     await swapping.wait();
     setLoading(false);
     toast(" Token Swapping done");

  }
  const [loading, setLoading] = useState(false);

  
  return (
    <div className="token-swap">
        <form onSubmit={transferToken}>
        <div className="input-container">
          <div className="h1"><label htmlFor="inputToken">RBNT:</label></div>
          <div className="h2"><input
            type="text"
            className="inputToken"
            placeholder="Enter RBNT token ..."
            onChange ={handleChange}
          /></div>
        </div>
  
        <div className="output-container">
          <div className="h3"><label htmlFor="outputToken">VRT:</label></div>
         <div className="h4"> <input
            type="text"
            className="outputToken"
            placeholder=" Token in VRT.... "
          /></div>
        </div>
  <br/>
        <button type="submit" >
        {loading ? <div className="loader-container">
      <div className="loader"></div>
      
    </div> : "Swap"}
        </button>
        

      
        </form>
        <ToastContainer/>
      </div>
  );

  };
export default Body;
