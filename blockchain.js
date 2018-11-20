const Block = require('./block');
const express = require('express');
const bodyParser = require('body-parser');

// ============== //
//   BLOCKCHAIN   //
// ============== //

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4;
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
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  isChainValid() {
    const chain = this.chain;
    for (let i = 0; i < chain.length; i++) {

      if (chain[i].hash !== chain[i].calculateHash()) {
        console.log(`❌  Block -- ${i} -- corrupted`);
        return false;
      }

      if (i > 0 && chain[i].previousHash !== chain[i - 1].hash) {
        console.log(`❌  Block -- ${i - 1} -- corrupted`);
        return false;
      }
    }
    return true;
  }
}


const PolyChain = new Blockchain();

const blocksToAdd = 4;

// Seeding blockchain
for (i = 0; i < blocksToAdd; i++) {
  PolyChain.addNewBlock(new Block({sender: 'Polycode', receiver: 'Youtube', message: `Block ${PolyChain.chain.length} has been added to the chain`}));
}



PolyChain.chain.forEach((block) => {
  console.log(block);
  console.log(block.calculateHash());
});

console.log(PolyChain.isChainValid());

PolyChain.chain[3].data = {sender: 'Polycode', receiver: 'Youtube', message: 'This block has been corrupted'};

PolyChain.chain.forEach((block) => {
  console.log(block);
  console.log(block.calculateHash());
});


console.log("Chain validity:");
console.log(PolyChain.isChainValid());

// ================ //
//      SERVER      //
// ================ //


// const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
//
// app.get('/', (req, res) => {
//   res.redirect('/chain');
// });
//
// app.get('/chain', (req, res) => {
//   let validity = PolyChain.isChainValid();
//   if (validity) {
//     res.write(updateChain());
//     res.write('\n\n$ Chain validity --- VALID');
//     res.end();
//   } else {
//     res.send('\n\n❌ Chain validity --- CORRUPTED');
//   }
// });
//
// app.post('/transactions/new', (req, res) => {
//   const data = req.body;
//
//   PolyChain.addNewBlock(new Block(data));
//   if (PolyChain.isChainValid()) {
//     res.write(updateChain());
//     res.write('\n\n$ Chain validity --- VALID');
//     res.end();
//   } else {
//     res.send('\n\n❌ Chain validity --- CORRUPTED');
//   }
// });
//
//
// function updateChain() {
//   return JSON.stringify(PolyChain, null, 2);
// }
//
// const port = 3000;
//
// app.listen(port, () => {
//   console.log(`Blockchain listening on port ${port}`);
// });
