package constants

import (
	"encoding/base64"
	"fmt"
	"log"

	cometbfted25519 "github.com/cometbft/cometbft/crypto/ed25519"
	"github.com/cosmos/cosmos-sdk/crypto"
	"github.com/cosmos/cosmos-sdk/crypto/hd"
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	cryptotypes "github.com/cosmos/cosmos-sdk/crypto/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

var (
	AlicePrivateKey = privateKeyFromMnenomic(AliceMnenomic)
	BobPrivateKey   = privateKeyFromMnenomic(BobMnenomic)
	CarlPrivateKey  = privateKeyFromMnenomic(CarlMnenomic)
	DavePrivateKey  = privateKeyFromMnenomic(DaveMnenomic)

	AlicePrivateKeyEddsa = loadPrivKeyFromBase64("65frslxv5ig0KSNKlJOHT2FKTkOzkb/66eDPsiBaNUtiIBHHzbn1n58YVTFAuvP/kVTZFhFPp/nLO+3sPsKtAw==")
	BobPrivateKeyEddsa   = loadPrivKeyFromBase64("QL39Lu2bfmgfea0SwI891fXqEqOsLWjdhtniTs9U0Wz4/xiKiCqpBj6IP3rIRr04nHoSCJ5T3m715HenPF8OnQ==")
	CarlPrivateKeyEddsa  = loadPrivKeyFromBase64("E079rll4qMCWBRrHUw3IkGQBZCQQ921HaQl8m0HloSvK0t+zVboTYjjWK14oL9jCPJn/nX4IBgIdjGZEeIF5jg==")
	DavePrivateKeyEddsa  = loadPrivKeyFromBase64("FaPbbz/gB/Id6GKYv9M/rwsUziScfbUiIObEWLeCpYrIbb2RF9n+GAATUju5aNspAkkvj+Bf/TlcGd8H6bX3oA==")

	AliceConsAddressEddsa, _ = sdk.ConsAddressFromBech32("klyravalcons1zf9csp5ygq95cqyxh48w3qkuckmpealrhxq0ye")
	BobConsAddressEddsa, _   = sdk.ConsAddressFromBech32("klyravalcons1s7wykslt83kayxuaktep9fw8qxe5n73up9h3xp")
	CarlConsAddressEddsa, _  = sdk.ConsAddressFromBech32("klyravalcons1vy0nrh7l4rtezrsakaadz4mngwlpdmhyretgwy")
	DaveConsAddressEddsa, _  = sdk.ConsAddressFromBech32("klyravalcons1stjspktkshgcsv8sneqk2vs2ws0nw2wrnjkt6l")

	AlicePubKey = AlicePrivateKey.PubKey()
	BobPubKey   = BobPrivateKey.PubKey()
	CarlPubKey  = CarlPrivateKey.PubKey()
	DavePubKey  = DavePrivateKey.PubKey()

	privateKeyMap = map[string]cryptotypes.PrivKey{
		AliceAccAddress.String(): AlicePrivateKey,
		BobAccAddress.String():   BobPrivateKey,
		CarlAccAddress.String():  CarlPrivateKey,
		DaveAccAddress.String():  DavePrivateKey,
	}

	privateConsMap = map[string]cometbfted25519.PrivKey{
		AliceConsAddressEddsa.String(): AlicePrivateKeyEddsa,
		BobConsAddressEddsa.String():   BobPrivateKeyEddsa,
		CarlConsAddressEddsa.String():  CarlPrivateKeyEddsa,
		DaveConsAddressEddsa.String():  DavePrivateKeyEddsa,
	}

	privateKeyValidatorMap = map[string]cryptotypes.PrivKey{
		AliceValidatorAddress.String(): AlicePrivateKey,
		BobValidatorAddress.String():   BobPrivateKey,
		CarlValidatorAddress.String():  CarlPrivateKey,
		DaveValidatorAddress.String():  DavePrivateKey,
	}

	eddsaPrivateKeyValidatorMap = map[string]cometbfted25519.PrivKey{
		AliceValidatorAddress.String(): AlicePrivateKeyEddsa,
		BobValidatorAddress.String():   BobPrivateKeyEddsa,
		CarlValidatorAddress.String():  CarlPrivateKeyEddsa,
		DaveValidatorAddress.String():  DavePrivateKeyEddsa,
	}

	valAddrToConsAddrMap = map[string]sdk.ConsAddress{
		AliceValidatorAddress.String(): AliceConsAddress,
		BobValidatorAddress.String():   BobConsAddress,
		CarlValidatorAddress.String():  CarlConsAddress,
		DaveValidatorAddress.String():  DaveConsAddress,
	}

	valAddrToConsAddrEddsaMap = map[string]sdk.ConsAddress{
		AliceValidatorAddress.String(): AliceConsAddressEddsa,
		BobValidatorAddress.String():   BobConsAddressEddsa,
		CarlValidatorAddress.String():  CarlConsAddressEddsa,
		DaveValidatorAddress.String():  DaveConsAddressEddsa,
	}
)

func loadPrivKeyFromBase64(encodedKey string) cometbfted25519.PrivKey {
	privKeyBytes, err := base64.StdEncoding.DecodeString(encodedKey)
	if err != nil {
		log.Fatalf("failed to decode private key: %v", err)
	}
	return cometbfted25519.PrivKey(privKeyBytes)
}

func privateKeyFromMnenomic(mnenomic string) cryptotypes.PrivKey {
	kb := keyring.NewInMemory(TestEncodingCfg.Codec)
	_, err := kb.NewAccount("uid", mnenomic, "", sdk.GetConfig().GetFullBIP44Path(), hd.Secp256k1)
	if err != nil {
		panic(err)
	}
	armoredPvKey, err := kb.ExportPrivKeyArmor("uid", "")
	if err != nil {
		panic(err)
	}
	privKey, _, err := crypto.UnarmorDecryptPrivKey(armoredPvKey, "")
	if err != nil {
		panic(err)
	}
	return privKey
}

func GetPublicKeyFromAddress(accAddress string) cryptotypes.PubKey {
	privKey, exists := privateKeyMap[accAddress]
	if !exists {
		panic(fmt.Errorf(
			"unable to look-up public key, acc %s does not match any well known account",
			accAddress))
	}
	return privKey.PubKey()
}

// GetPrivateKeyFromAddress returns the private key for the specified account address.
// Note that this panics if the account address is not one of the well known accounts.
func GetPrivateKeyFromAddress(accAddress string) cryptotypes.PrivKey {
	privKey, exists := privateKeyMap[accAddress]
	if !exists {
		panic(fmt.Errorf(
			"unable to look-up private key, acc %s does not match any well known account",
			accAddress))
	}
	return privKey
}

func GetPrivKeyFromConsAddress(consAddr sdk.ConsAddress) cometbfted25519.PrivKey {
	privKey, exists := privateConsMap[consAddr.String()]
	if !exists {
		panic(fmt.Errorf(
			"unable to look-up private key, cons %s does not match any well known account",
			consAddr))
	}
	return privKey
}

func GetPrivKeyFromValidatorAddress(validatorAddr sdk.ValAddress) cryptotypes.PrivKey {
	privKey, exists := privateKeyValidatorMap[validatorAddr.String()]
	if !exists {
		panic(fmt.Errorf(
			"unable to look-up private key, val address %s does not match any well known account",
			validatorAddr))
	}
	return privKey
}

func GetPrivKeyFromValidatorAddressString(validatorAddrString string) cryptotypes.PrivKey {
	privKey, exists := privateKeyValidatorMap[validatorAddrString]
	if !exists {
		panic(fmt.Errorf(
			"unable to look-up private key, val address string %s does not match any well known account",
			validatorAddrString))
	}
	return privKey
}

func GetEddsaPrivKeyFromValidatorAddressString(validatorAddrString string) cometbfted25519.PrivKey {
	privKey, exists := eddsaPrivateKeyValidatorMap[validatorAddrString]
	if !exists {
		panic(fmt.Errorf(
			"unable to look-up private key, cons address string %s does not match any well known account",
			validatorAddrString))
	}
	return privKey
}

func GetConsAddressFromValidatorAddress(validatorAddr sdk.ValAddress) sdk.ConsAddress {
	consAddr, exists := valAddrToConsAddrMap[validatorAddr.String()]
	if !exists {
		panic(fmt.Errorf("unable to look-up cons address, val %s does not match any well known account", validatorAddr))
	}
	return consAddr
}

func GetConsAddressFromStringValidatorAddress(validatorAddr string) sdk.ConsAddress {
	consAddr, exists := valAddrToConsAddrEddsaMap[validatorAddr]
	if !exists {
		panic(fmt.Errorf("unable to look-up cons address, val %s does not match any well known account", validatorAddr))
	}
	return consAddr
}
