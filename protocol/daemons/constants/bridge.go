package constants

const (
    // Signature of the Bridge log, i.e. keccak256("Bridge(uint256,uint256,address,bytes)").
    BridgeEventSignature = "0x44c030c7e1e9f91d70f7844a840850259bdd9d16a7423b8aae3cdc2cd497720e"

    // ABI of the Bridge Event.
    BridgeEventABI = `[
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "bytes",
                    "name": "toAddress",
                    "type": "bytes"
                }
            ],
            "name": "Bridge",
            "type": "event"
        }
    ]`
)
