import Head from "next/head";
import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import moon from "../styles/imgs/moon.jpg";
import {
  planetContractAbi,
  planetContractAddress,
  planetPerPrice,
} from "../components/contractInfo";
import { Loading } from "../components/loading";

export default function Home() {
  const [currentSigner, setCurrentSigner] = useState<
    undefined | ethers.providers.JsonRpcSigner
  >();
  const [currentAddress, setCurrentAddress] = useState<undefined | string>();
  const [loading, setLoading] = useState(false);
  const connectWallet = useCallback(async () => {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    setCurrentSigner(signer);
    setCurrentAddress(await signer.getAddress());
  }, []);

  const [openseaUrl, setOpenSeaUrl] = useState();
  const mint = useCallback(async () => {
    if (!currentSigner) {
      alert("please connect wallet!");
      return;
    }

    try {
      setLoading(true);
      const contract = new ethers.Contract(
        planetContractAddress,
        planetContractAbi,
        currentSigner
      );
      const count = 1;
      const transaction = await contract.mint(count, {
        value: planetPerPrice.mul(count),
      });
      const res = await transaction.wait(1);
      const mintedTokenId = res.events[0].args[2] as ethers.BigNumber;
      const openseaUrl = `https://testnets.opensea.io/assets/goerli/${planetContractAddress}/${mintedTokenId.toString()}`;
      setOpenSeaUrl(openseaUrl);
    } catch (e) {
      alert(e.message);
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [currentSigner]);

  useEffect(() => {
    connectWallet();
  }, [connectWallet]);
  return (
    <>
      <Head>
        <title>ChainIDE showcase planetNFT</title>
        <meta name="description" content="chainIDE planet template" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="isolate bg-white h-full overflow-y-auto">
        <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
          <svg
            className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
              fillOpacity=".3"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#9089FC" />
                <stop offset={1} stopColor="#FF80B5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="px-6 pt-6 lg:px-8">
          <div>
            <nav
              className="flex h-9 items-center justify-between"
              aria-label="Global"
            >
              <div className="flex min-w-0 flex-1 justify-end">
                {currentAddress ? (
                  currentAddress
                ) : (
                  <button
                    onClick={connectWallet}
                    className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                  >
                    connect
                  </button>
                )}
              </div>
            </nav>
          </div>
        </div>
        <main>
          <div className="relative px-6 lg:px-8">
            <div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
              <div>
                <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                  <div className="relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                    <span className="text-gray-600">
                      This is the showcase of chainIDE for nft developing.{" "}
                      <a
                        href="https://chainide.com"
                        target="_blank"
                        className="font-semibold text-indigo-600"
                        rel="noreferrer"
                      >
                        <span className="absolute inset-0" aria-hidden="true" />
                        Learn More About ChainIDE{" "}
                        <span aria-hidden="true">&rarr;</span>
                      </a>
                    </span>
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">
                    Planet NFT
                  </h1>
                  <p className="mt-6 text-lg leading-8 text-gray-600 text-center">
                    <Image
                      src={moon}
                      alt="moon"
                      width={300}
                      className="m-auto"
                    />
                    <br />
                    click button blow, to mint one planetNFT
                  </p>
                  <div className="mt-8 flex gap-x-4 sm:justify-center">
                    <button
                      onClick={mint}
                      disabled={loading}
                      className="inline-flex items-center gap-x-0.5 rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
                    >
                      {loading && <Loading />}
                      mint 1 NFT
                    </button>
                  </div>
                  <div className="mt-8 flex gap-x-4 sm:justify-center">
                    {openseaUrl && (
                      <p className="text-[#1e9427]">
                        mint success! view{" "}
                        <a href={openseaUrl} target="_blank" rel="noreferrer">
                          {openseaUrl}
                        </a>{" "}
                        to see details
                      </p>
                    )}
                  </div>
                </div>
                <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                  <svg
                    className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
                    viewBox="0 0 1155 678"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                      fillOpacity=".3"
                      d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                    />
                    <defs>
                      <linearGradient
                        id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                        x1="1155.49"
                        x2="-78.208"
                        y1=".177"
                        y2="474.645"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#9089FC" />
                        <stop offset={1} stopColor="#FF80B5" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
