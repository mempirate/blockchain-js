const Block = require('./block');

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    const genesisDate = '04/07/1999';
    return new Block('Genesis Block', 0, genesisDate);
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  addNewBlock(newBlock) {
    newBlock.index = this.getLastBlock().index + 1;
    this.chain.push(newBlock);
  }
}

let blocksToAdd = 5;

const PolyChain = new Blockchain();

for (i = 0; i < blocksToAdd; i++) {
  PolyChain.addNewBlock(new Block({sender: 'Polycode', receiver: 'Youtube', message: `Block ${PolyChain.chain.length} has been added to the chain`}));
  console.log(PolyChain.chain[i]);
}

// DEMONSTRATING THE PROBLEM

PolyChain.chain[3].data = {sender: 'Polycode', receiver: 'Youtube', message: 'This block has been corrupted'};

PolyChain.chain.forEach((block) => {
  console.log(block);
});
