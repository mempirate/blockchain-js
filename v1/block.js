const { SHA256 } = require('crypto-js');

class Block {
  constructor(data, index, timestamp = String(new Date())) {
    this.data = data;
    this.index = index;
    this.timestamp = timestamp;

    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(JSON.stringify(this.data) + this.index + this.timestamp + this.previousHash + this.nonce).toString();
  }
}
