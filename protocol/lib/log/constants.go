package log

const (
	SourceModuleKey = "source_module"
	Error           = "error"
)

// Tag keys
// Do not have anything generic in here. For example, `Status` is too vague
// and can be clarified as `OrderStatus` or `DaemonHealthStatus`.
const (
	Address             = "address"
	Module              = "module"
	TxMode              = "tx_mode"
	Operation           = "operation"
	OperationsQueue     = "operations_queue"
	Callback            = "callback"
	BlockHeight         = "block_height"
	Msg                 = "msg"
	ProposerConsAddress = "proposer_cons_address"
	Handler             = "handler"
	Tx                  = "tx"
	Order               = "order"
	OrderId             = "order_id"
	OrderHash           = "order_hash"
	OrderStatus         = "order_status"
	Subaccount          = "subaccount"
	PerpetualId         = "perpetual_id"
	MevMatches          = "mev_matches"
	StackTrace          = "stack_trace"
	Proposer            = "proposer"
	PrunableBlockHeight = "prunable_block_height"
	StatusCode          = "status_code"
	Reason              = "reason"
	RemovalStatus       = "removal_status"
	TotalFilled         = "total_filled"
	RequestId           = "request_id"

	OrderSizeOptimisticallyFilledFromMatchingQuantums = "order_size_optimistically_filled_from_matching_quantums"
	NewLocalValidatorOperationsQueue                  = "new_local_validator_operations_queue"
	LocalValidatorOperationsQueue                     = "local_validator_operations_queue"
)

// Tag values
const (
	CheckTx   = "check_tx"
	RecheckTx = "recheck_tx"
	DeliverTx = "deliver_tx"
)
