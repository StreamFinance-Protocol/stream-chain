package types

func (b BridgeEvent) Equal(other BridgeEvent) bool {
	return b.Id == other.Id && b.Coin.Equal(other.Coin) &&
		b.Address == other.Address && b.BlockHeight == other.BlockHeight &&
		b.IsDeposit == other.IsDeposit
}
