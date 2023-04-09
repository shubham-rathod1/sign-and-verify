const secp = require("ethereum-cryptography/secp256k1");
const {
  hexToBytes,
  utf8ToBytes,
  bytesToHex,
} = require("ethereum-cryptography/utils");

const { sha256 } = require("ethereum-cryptography/sha256");

const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "04c16fc38732192207f6e6f47e0e192aa198977149b959da07cf49eaaf2104c6c939ed07ff395173301b9637dc5bc9039ac8bcafc22843414d836c1aa0614a4ddb": 100,
  "044ceb7a2877f205f577b928a8683e7ca55eb5f26769374e1ba8973ba4e6dd7d874f726a548d0ba1247ddca83bb4f60319409d57c7922ba112c3e375e1fc07acba": 50,
  "04464575099d330d8ec558f0c3944d2acfaa8ad2dda1c1ef7b8cbe6bfab22b07448ae11b3c0c8d387a00f0e49151c2b73d3a8f4be80c40fa200468337b26b07cf9": 20,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signature } = req.body;

  const messageHash = bytesToHex(
    sha256(utf8ToBytes(JSON.stringify({ sender, amount, recipient })))
  );

  const isSigned = secp.verify(signature, messageHash, hexToBytes(sender));

  if (isSigned) {
    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  } else {
    res.status(401).send({ message: "invalid signature" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
