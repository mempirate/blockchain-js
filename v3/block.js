const { SHA256 } = require('crypto-js');

class Block {
  constructor(data, index, timestamp = String(new Date()), previousHash = '') {
    this.data = data;
    this.index = index;
    this.timestamp = timestamp.slice(0, 24);
    this.previousHash = previousHash;

    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(JSON.stringify(this.data) + this.index + this.timestamp + this.previousHash).toString();
  }
}

module.exports = Block;

// bug that makes hashes not match is in here
// only difference with the version that works is that
// proof of work has not been implemented yet. The fuck???

// nonce and mineBlock function bug

// Can't really find bug so I'll implement PoW first
// and then show how chain validity is achieved...... :(
