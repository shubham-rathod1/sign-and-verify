import { useState } from "react";
import server from "./server";

import * as secp from "ethereum-cryptography/secp256k1";
import {
  bytesToHex as toHex,
  hexToBytes,
  utf8ToBytes,
} from "ethereum-cryptography/utils";
import { sha256 } from "ethereum-cryptography/sha256";

function Transfer({ privateKey, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
    const publicKey = toHex(secp.getPublicKey(privateKey));
    const body = {
      sender: publicKey,
      amount: parseInt(sendAmount),
      recipient,
    };
    const signature = await secp.sign(
      toHex(sha256(utf8ToBytes(JSON.stringify(body)))),
      privateKey
    );
    try {
      const {
        data: { balance },
      } = await server.post(`send`, { ...body, signature: toHex(signature) });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
