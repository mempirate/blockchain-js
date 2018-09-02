const Block = require('./block');

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    const genesisDate = '04/07/1999';
    return new Block('Genesis Block', 0, genesisDate, '0');
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  addNewBlock(newBlock) {
    newBlock.previousHash = this.getLastBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    //newBlock.index = this.chain.length;
    this.chain.push(newBlock);
  }

  isChainValid() {
    const { chain } = this;
    for (let i = 0; i < chain.length; i++) {

      if (chain[i].hash !== chain[i].calculateHash()) {
        console.log(`Block -- ${i} -- corrupted`);
        return false;
      }

      if (i > 0 && chain[i].previousHash !== chain[i - 1].hash) {
        console.log(`Block -- ${i - 1} -- corrupted`);
        return false;
      }
    }
    return true;
    }
}

const PolyChain = new Blockchain();

// Test if the chain works
//PolyChain.addNewBlock(new Block({ amount: 50 }));
PolyChain.addNewBlock(new Block({ amount: 50 }, 1));
PolyChain.addNewBlock(new Block({ amount: 100 }, 2));


// let jsonChain = JSON.stringify(PolyChain, null, 2);

//PolyChain.chain[1].data = { amount: 5000 }
//PolyChain.chain[1].hash = PolyChain.chain[1].calculateHash();

// View the full chain
PolyChain.chain.forEach((block, i) => {
  console.log(`\nBlock ${i + 1}: \n======================`);
  console.log(block);
  console.log('\n')
});

// Check if the chain is valid
console.log(`Is Blockchain valid? ----> ${PolyChain.isChainValid()}`)
