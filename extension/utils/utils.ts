import { ethers } from 'ethers';
import { abi } from '@src/shared/abi/secretStorageAbi';

export function getStorageContract(signer: ethers.Signer) {
  const address = import.meta.env.VITE_STORAGE_CONTRACT_ADDRESS;
  return new ethers.Contract(address, abi, signer);
}

export function generateRandomPassword(length = 12) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&()}{[]/-=';
  let password = '';
  for (let i = 0, n = charset.length; i < length; ++i) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }
  return password;
}

export function getLocalStorageItem(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([key], function (result) {
      return resolve(result[key]);
    });
  });
}

export function setLocalStorageItem(key, value) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set({ [key]: value }, function () {
      chrome.runtime.lastError ? reject(Error(chrome.runtime.lastError.message)) : '';
      return resolve(true);
    });
  });
}

export function getSessionStorageItem(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.session.get([key], function (result) {
      return resolve(result[key]);
    });
  });
}

export function setSessionStorageItem(key, value) {
  return new Promise((resolve, reject) => {
    chrome.storage.session.set({ [key]: value }, function () {
      chrome.runtime.lastError ? reject(Error(chrome.runtime.lastError.message)) : '';
      return resolve(true);
    });
  });
}

export function deleteSessionStorageItem(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.session.remove(key, function () {
      chrome.runtime.lastError ? reject(Error(chrome.runtime.lastError.message)) : '';
      return resolve(true);
    });
  });
}

export async function clearLocalStorage(removeItems) {
  chrome.storage.sync.remove(removeItems, () => {
    return true;
  });
}

export async function clearSessionStorage(removeItems) {
  chrome.storage.session.remove(removeItems, () => {
    return true;
  });
}
