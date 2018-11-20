const { SHA256 } = require('crypto-js');

const difficulty = 5;
let nonce = 0;
let hash = "0";

const mineBlock = () => {
  while (hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
    nonce++;
    console.log(nonce);
    hash = calculateHash();
  }
  console.log(`Nonce: ${nonce}`);
  console.log(`Hash: ${hash}`);
  return(hash);
}

const calculateHash = () => {
  return SHA256("Blockchain" + nonce).toString();
}

mineBlock();
