const Block = require('./block');
const express = require('express');
const bodyParser = require('body-parser');


class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 5;
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

console.log(JSON.stringify(PolyChain, null, 2));

// ================ //
//      SERVER      //
// ================ //

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/transactions/new', (req, res) => {
  const data = req.body;
  console.log(`Block data: ${data}`);
  PolyChain.addNewBlock(new Block(data));
  if (PolyChain.isChainValid()) {
    res.write(updateChain());
    res.write('\n\n$ Chain validity --- VALID');
    res.status(200).end();
  } else {
    res.send('\n\n$ Chain validity --- CORRUPTED');
  }
});

app.get('/chain', (req, res) => {
  // Check if the chain is valid
  let validity = PolyChain.isChainValid();
  if (validity) {
    res.write(updateChain());
    res.write('\n\n$ Chain validity --- VALID');
    res.status(200).end();
  } else {
    res.status(200).send('\n\n$ Chain validity --- CORRUPTED');
  }
});

function updateChain() {
  return(JSON.stringify(PolyChain, null, 2));
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Blockchain listening on port ${port}`);
});
