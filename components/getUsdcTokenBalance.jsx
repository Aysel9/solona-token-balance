import { useEffect ,useState } from 'react'
import axios from "axios"
import { useWallet } from "@solana/wallet-adapter-react";


const getUsdcTokenBalance = () => { 

// @state
const [usdbalance, setUsdbalance] = useState()
const [connected,  setConnected] = useState()
 
//@ import      
const {connecting, publicKey } = useWallet();
   


//@useEffect
   
useEffect(() => {   
    console.log(connecting)
    setConnected(connecting)    
 },[publicKey])
  
useEffect(() => {

    const getUSDCBalance = async () => {
      const walletAddress = publicKey 
      console.log('publicKey')
      console.log(publicKey)
      const tokenMintAddress = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
      const response = await axios({
        url: `https://api.mainnet-beta.solana.com`,
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: {
          jsonrpc: '2.0',
          id: 1,
          method: 'getTokenAccountsByOwner',
          params: [
            walletAddress,
            {
              mint: tokenMintAddress,
            },
            {
              encoding: 'jsonParsed',
            },
          ],
        },
      })

      if (
        Array.isArray(response?.data?.result?.value) &&
        response?.data?.result?.value?.length > 0 &&
        response?.data?.result?.value[0]?.account?.data?.parsed?.info
          ?.tokenAmount?.amount > 0 &&
          connected === true

      ) {
        Number(
          response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount.toFixed(
            5
          )
        )
        setUsdbalance(
          response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount.toFixed(
            5
          )
        )
        console.log(
          'USDC Balance:   ' +
            response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount.toFixed(
              5
            )
        )
      } else {
        setUsdbalance(0)
        console.log(
          'USDC Balance:   ' +
            response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount.toFixed(
              5
            )
        )
      }
    }
    getUSDCBalance()
},[publicKey,connected])


  return (
    <>
      <h1>{usdbalance}</h1>
    {/*  {connected ? "true" : "false"}*/}
    </>
  )
}

export default getUsdcTokenBalance