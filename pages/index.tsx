import type { NextPage } from "next";
import * as ethers from "ethers";
import { useEffect, useState } from "react";
import {
  connectWallet,
  getBalance,
  getChainId,
  getEthereum,
  getProvider,
  getSigner,
  getWalletAddress,
  
} from "../services/wallet-service";
import {
  getNetworkCurrency,
  getNetworkName,
  getNetworkTokens,
} from "../constants/network-id";
import { formatEther, formatUnits, parseEther } from "ethers/lib/utils";
import { Token } from "../types/token.type";
import Swapper from '../typechain/Swapper';
import { Swapper__factory } from "../typechain";
const Home: NextPage = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [tokenBalances, setTokenBalances] = useState<Record<string, string>>(
    {}
  );

  // const getTokenBalance = async (
  //   tokenAddress: string,
  //   ownerAddress: string
  // ) => {
  //   // const abi = ["function balanceOf(address owner) view returns (uint)"];
  //   // const contract = new ethers.Contract(tokenAddress, abi, getProvider()!);
  //   // return contract.balanceOf(ownerAddress);
  // };

  // const addTokenToWallet = async (token: Token) => {
  //   try {
  //     // wasAdded is a boolean. Like any RPC method, an error may be thrown.
  //     const wasAdded = await window.ethereum.request({
  //       method: "wallet_watchAsset",
  //       params: {
  //         type: "ERC20", // Initially only supports ERC20, but eventually more!
  //         options: {
  //           address: token.address, // The address that the token is at.
  //           symbol: token.symbol, // A ticker symbol or shorthand, up to 5 chars.
  //           decimals: token.decimals, // The number of decimals in the token
  //           image: token.imageUrl, // A string url of the token logo
  //         },
  //       },
  //     });

  //     if (wasAdded) {
  //       console.log("Thanks for your interest!");
  //     } else {
  //       console.log("Your loss!");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const loadAccountData = async () => {
    const addr = getWalletAddress();
    setAddress(addr);

    const chainId = await getChainId();
    setNetwork(chainId);

    const bal = await getBalance(addr);
    if (bal) setBalance(formatEther(bal));

  //   const tokenList = getNetworkTokens(chainId);

  //   const tokenBalList = await Promise.all(
  //     tokenList.map((token) =>
  //       getTokenBalance(token.address, addr).then((res) =>
  //         formatUnits(res, token.decimals)
  //       )
  //     )
  //   );

  //   tokenList.forEach((token, i) => {
  //     tokenBalances[token.symbol] = tokenBalList[i];
  //   });
  //   setTokenBalances({ ...tokenBalances });
   };

  const addressContract = "0x3A8e1e5669FeA47f03478E945946AadF6889fd5F";
  
  const getswapContractAtoC = async () => {
    const signer = getSigner();
    const swapContract = Swapper__factory.connect(addressContract,getProvider()).connect(signer);
    console.log(swapContract);
    swapContract.swapAforC(parseEther(amount));
    
    //await swapContract.swapAforC("120")
  }

  const getswapContractBtoC = async () => {
    const signer = getSigner();
    const swapContract = Swapper__factory.connect(addressContract,getProvider()).connect(signer);
    console.log(swapContract);
    swapContract.swapBforC(parseEther(amount));
    
    //await swapContract.swapAforC("120")
  }
  
  const getswapContractCtoA = async () => {
    const signer = getSigner();
    const swapContract = Swapper__factory.connect(addressContract,getProvider()).connect(signer);
    console.log(swapContract);
    swapContract.unswapCforA(parseEther(amount));
    
    //await swapContract.swapAforC("120")
  }
  
  const getswapContractCtoB = async () => {
    const signer = getSigner();
    const swapContract = Swapper__factory.connect(addressContract,getProvider()).connect(signer);
    console.log(swapContract);
    swapContract.unswapCforB(parseEther(amount));
    
    //await swapContract.swapAforC("120")
  }
 
  // const addressBear = "0xD350458385565E0620c3E7252126903f44117Af2";
  // const abi = [
  // "function approve(address spender, uint256 amount) returns (bool)"
  // ];
  
  // async function approve() {
  //   const contract = new ethers.Contract(addressBear, abi,  getSigner());   
  //   const tx = await contract.functions.approve(0x3A8e1e5669FeA47f03478E945946AadF6889fd5F,10000000000000000000000000);
  
  //   const receipt = await tx.wait();
  //   console.log("receipt", receipt);
  // }
  
  // approve();
 
  useEffect(() => {
    loadAccountData();
    
    const handleAccountChange = (addresses: string[]) => {
      setAddress(addresses[0]);
      loadAccountData();
    };

    const handleNetworkChange = (networkId: string) => {
      setNetwork(networkId);
      loadAccountData();
    };
    
    getEthereum()?.on("accountsChanged", handleAccountChange);
    
    getEthereum()?.on("chainChanged", handleNetworkChange);
  }, []);

  
  return (
    <div>
      {address ? (
        <div>
          <p>wallet address is {address}</p>
          <p>
             network is {getNetworkName(network)} ({network})
          </p>
          <p>
            balance is {balance} KUB
          </p>
          <div className=" flex flex-row">
          <div>
         
          <p className="py-5"> <p> A to C</p><h5>BEAR</h5>  <input className="border border-x-emerald-600 "  onChange={ (e) => setAmount(e.target.value)} /></p>
          <p className="py-5"><h5>PD </h5>  <input className="border border-x-emerald-600"  value={amount} /></p>
          <button
          type="button"
          className=" bg-red-300 border border-r-amber-400 rounded-lg px-16"
          onClick={()=>getswapContractAtoC()}
        >
          Exchange
        </button>  
          </div>

          <div>
         
         <p className="py-5"> <p> B to C</p><h5>ICE</h5>  <input className="border border-x-emerald-600 "  onChange={ (e) => setAmount(e.target.value)} /></p>
         <p className="py-5"><h5>PD </h5>  <input className="border border-x-emerald-600"  value={amount} /></p>
         <button
         type="button"
         className=" bg-red-300 border border-r-amber-400 rounded-lg px-16"
         onClick={()=>getswapContractBtoC()}
       >
         Exchange
       </button>  
         </div>
</div>
<div className=" flex flex-row">
        <div>
         <p className="py-5"> <p> C to A</p><h5>PD</h5>  <input className="border border-x-emerald-600 "  onChange={ (e) => setAmount(e.target.value)} /></p>
         <p className="py-5"><h5>BEAR </h5>  <input className="border border-x-emerald-600"  value={amount} /></p>
         <button
         type="button"
         className=" bg-red-300 border border-r-amber-400 rounded-lg px-16"
         onClick={()=>getswapContractCtoA()}
       >
         Exchange
       </button>  
         </div>

         <div>
         <p className="py-5"> <p> C to B</p><h5>PD</h5>  <input className="border border-x-emerald-600 "  onChange={ (e) => setAmount(e.target.value)} /></p>
         <p className="py-5"><h5>ICE </h5>  <input className="border border-x-emerald-600"  value={amount} /></p>
         <button
         type="button"
         className=" bg-red-300 border border-r-amber-400 rounded-lg px-16"
         onClick={()=>getswapContractCtoB()}
       >
         Exchange
       </button>  
         </div>
</div>
          {/* <div>
         
         <p className="py-5"> <p> B to C</p><h5>ICE</h5>  <input className="border border-x-emerald-600 "  onChange={ (e) => setAmount(e.target.value)} /></p>
         <p className="py-5"><h5>PD </h5>  <input className="border border-x-emerald-600"  value={amount} /></p>
         <button
         type="button"
         className=" bg-red-300 border border-r-amber-400 rounded-lg px-16"
         onClick={()=>getswapContractBtoC()}
       >
         Exchange
       </button>  
         </div> */}
          
        </div>
      ) : (
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={connectWallet}
        >
          Connect
        </button>
      )}
    </div>
  );
};

export default Home;