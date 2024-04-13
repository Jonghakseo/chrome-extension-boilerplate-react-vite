import React, { useState, useEffect } from 'react';
import Accordion from '../accordion/Accordion';
import { getStorageContract } from '@root/utils/utils';
import { useEthereum } from '@root/src/shared/providers/EthereumContext';
import { useSecrets } from '@root/src/shared/providers/SecretsContext';

const Body: React.FC = () => {
  const { secrets, addSecret } = useSecrets();

  const { signer, connectToMetaMask, isConnected } = useEthereum();

  const retrieveSecrets = async () => {
    const contract = getStorageContract(signer);
    const tx = await contract?.getSecrets();
    console.log('TX:', tx);
    let secretsArray = [];

    if (tx) {
      tx.forEach(item => {
        const secret = {
          domain: item[0],
          value: item[1],
        };
        addSecret(secret);
        secretsArray.push(secret);
      });

      chrome.runtime.sendMessage(
        {
          action: 'addSecretsToMemory',
          secrets: secretsArray,
        },
        response => {
          if (response?.success) {
            console.log('Secrets added to memory in background script.');
          }
        },
      );
    }
  };

  useEffect(() => {
    chrome.runtime.sendMessage({ action: 'getSecretsFromMemory' }, response => {
      if (response?.secrets) {
        console.log(response);
        console.log('Secrets retrieved from memory:', response.secrets);
        response.secrets.forEach(secret => {
          addSecret(secret);
        });
      }
    });
  }, []);

  return (
    <div className="width-full flex justify-center pt-10">
      <div className="w-1/2 text-left">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold pb-6">Blocklock Password Manager</h1>
          <button
            className="text-background2 whitespace-nowrap flex items-center justify-between h-full bg-primary1 hover:bg-primary2 focus:ring-4 focus:ring-primary2 font-medium rounded text-sm px-5 py-2 focus:outline-none"
            onClick={() => {
              retrieveSecrets();
            }}>
            Retrieve Secrets
          </button>
        </div>

        <Accordion />
      </div>
    </div>
  );
};

export default Body;
