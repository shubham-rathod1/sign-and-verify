import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { bytesToHex as toHex } from "ethereum-cryptography/utils";

function Wallet({ privateKey, setprivateKey, balance, setBalance }) {
  // const privateKey = toHex(secp.utils.randomPrivateKey());
  // const publicKey = toHex(secp.getPublicKey(privateKey));
  // const addres = publicKey.slice(publicKey.length - 20, publicKey.length);
  // console.log(privateKey, publicKey, addres);

  async function onChange(evt) {
    const privateKey = evt.target.value;
    setprivateKey(privateKey);
    const publicKey = toHex(secp.getPublicKey(privateKey))

    if (privateKey) {
      const {
        data: { balance },
      } = await server.get(`balance/${publicKey}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet privateKey
        <input
          placeholder="Type an private key to sign the transaction and sent money"
          value={privateKey}
          onChange={onChange}
        ></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
