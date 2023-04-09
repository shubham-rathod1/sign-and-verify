import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [privateKey, setprivateKey] = useState("");

// 7dfc44d3aadf0b651ba530eefa7632e6e095cc7f7b211847e6cb09c579bcac8c 04c16fc38732192207f6e6f47e0e192aa198977149b959da07cf49eaaf2104c6c939ed07ff395173301b9637dc5bc9039ac8bcafc22843414d836c1aa0614a4ddb 414d836c1aa0614a4ddb
// 8d00b060cc6d941e877100db249280349e41ad4a2de26a660f0a6b80e0e3683a 044ceb7a2877f205f577b928a8683e7ca55eb5f26769374e1ba8973ba4e6dd7d874f726a548d0ba1247ddca83bb4f60319409d57c7922ba112c3e375e1fc07acba a112c3e375e1fc07acba
// b8968c66cbf445bf734be5ad85474df7bfee4a983e6df4c7a8776f2928751654 04464575099d330d8ec558f0c3944d2acfaa8ad2dda1c1ef7b8cbe6bfab22b07448ae11b3c0c8d387a00f0e49151c2b73d3a8f4be80c40fa200468337b26b07cf9 fa200468337b26b07cf9


  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        privateKey={privateKey}
        setprivateKey={setprivateKey}
      />
      <Transfer setBalance={setBalance} privateKey={privateKey} />
    </div>
  );
}

export default App;
