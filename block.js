const { SHA256 } = require('crypto-js');


class Block {
  constructor(data, index, timestamp = String(new Date()), previousHash = '') {
    this.data = data;
    this.index = index;
    this.timestamp = timestamp;
    this.previousHash = previousHash;

    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(JSON.stringify(this.data) + this.index + this.timestamp + this.previousHash).toString();
  }
}

module.exports = Block;
