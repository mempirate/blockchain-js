const { SHA256 } = require('crypto-js');
const { difficulty } = require('./blockchain');


class Block {
  constructor(data, index, timestamp = String(new Date()), previousHash = '') {
    this.data = data;
    this.index = index;
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.nonce = 0;

    this.hash = this.calculateHash();
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log(`Block Mined: ${this.hash}`);
  }

  calculateHash() {
    return SHA256(JSON.stringify(this.data) + this.index + this.timestamp + this.previousHash + this.nonce).toString();
  }
}

module.exports = Block;
