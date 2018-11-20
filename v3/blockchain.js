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
    newBlock.index = this.getLastBlock().index + 1;
    this.chain.push(newBlock);
  }

  isChainValid() {
    const chain = this.chain;
    for (let i = 0; i < chain.length; i++) {

      if (chain[i].hash !== chain[i].calculateHash()) {
        console.log(`\n\n❌  Block -- ${i} -- corrupted`);
        return false;
      }

      if (i > 0 && chain[i].previousHash !== chain[i - 1].hash) {
        console.log(`\n\n❌❌  Block -- ${i - 1} -- corrupted`);
        return false;
      }
    }
    console.log('\n\nChain Valid');
    return true;
  }
}

const blocksToAdd = 4;

const PolyChain = new Blockchain();

// PolyChain.addNewBlock(new Block({sender: 'Polycode', receiver: 'Youtube', message: `Block ${PolyChain.chain.length} has been added to the chain`}));

for (i = 0; i < blocksToAdd; i++) {
  PolyChain.addNewBlock(new Block({sender: 'Polycode', receiver: 'Youtube', message: `Block ${PolyChain.chain.length} has been added to the chain`}));
}

// DEMONSTRATING SOLUTION

// PolyChain.chain[3].data = {sender: 'Polycode', receiver: 'Youtube', message: 'This block has been corrupted'};

PolyChain.chain.forEach((block) => {
  console.log(block);
  console.log(block.calculateHash());
});

console.log(PolyChain.isChainValid());

// TO-DO
// fix chain validity
