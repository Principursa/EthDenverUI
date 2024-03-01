export const ATokenVault = [
  {
    type: "constructor",
    inputs: [
      { name: "underlying", type: "address", internalType: "address" },
      { name: "referralCode", type: "uint16", internalType: "uint16" },
      {
        name: "poolAddressesProvider",
        type: "address",
        internalType: "contract IPoolAddressesProvider",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "AAVE_POOL",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "contract IPool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "ATOKEN",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "contract IAToken" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "META_ACCOUNT",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "contract MetaAccount" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "POOL_ADDRESSES_PROVIDER",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "contract IPoolAddressesProvider" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "REFERRAL_CODE",
    inputs: [],
    outputs: [{ name: "", type: "uint16", internalType: "uint16" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "UNDERLYING",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "contract IERC20Upgradeable" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "allowance",
    inputs: [
      { name: "owner", type: "address", internalType: "address" },
      { name: "spender", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "approve",
    inputs: [
      { name: "spender", type: "address", internalType: "address" },
      { name: "amount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "asset",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "balanceOf",
    inputs: [{ name: "account", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "claimRewards",
    inputs: [{ name: "to", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "convertToAssets",
    inputs: [{ name: "shares", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "assets", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "convertToShares",
    inputs: [{ name: "assets", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "shares", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "decimals",
    inputs: [],
    outputs: [{ name: "", type: "uint8", internalType: "uint8" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "decreaseAllowance",
    inputs: [
      { name: "spender", type: "address", internalType: "address" },
      { name: "subtractedValue", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "deposit",
    inputs: [
      { name: "assets", type: "uint256", internalType: "uint256" },
      { name: "receiver", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "depositATokens",
    inputs: [
      { name: "assets", type: "uint256", internalType: "uint256" },
      { name: "receiver", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "depositATokensWithSig",
    inputs: [
      { name: "assets", type: "uint256", internalType: "uint256" },
      { name: "receiver", type: "address", internalType: "address" },
      { name: "depositor", type: "address", internalType: "address" },
      {
        name: "sig",
        type: "tuple",
        internalType: "struct IATokenVault.EIP712Signature",
        components: [
          { name: "v", type: "uint8", internalType: "uint8" },
          { name: "r", type: "bytes32", internalType: "bytes32" },
          { name: "s", type: "bytes32", internalType: "bytes32" },
          { name: "deadline", type: "uint256", internalType: "uint256" },
        ],
      },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "depositWithSig",
    inputs: [
      { name: "assets", type: "uint256", internalType: "uint256" },
      { name: "receiver", type: "address", internalType: "address" },
      { name: "depositor", type: "address", internalType: "address" },
      {
        name: "sig",
        type: "tuple",
        internalType: "struct IATokenVault.EIP712Signature",
        components: [
          { name: "v", type: "uint8", internalType: "uint8" },
          { name: "r", type: "bytes32", internalType: "bytes32" },
          { name: "s", type: "bytes32", internalType: "bytes32" },
          { name: "deadline", type: "uint256", internalType: "uint256" },
        ],
      },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "doInitialDeposit",
    inputs: [{ name: "initialLockDeposit", type: "uint256", internalType: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "domainSeparator",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "emergencyRescue",
    inputs: [
      { name: "token", type: "address", internalType: "address" },
      { name: "to", type: "address", internalType: "address" },
      { name: "amount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getClaimableFees",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getFee",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getLastVaultBalance",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getSigNonce",
    inputs: [{ name: "signer", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "increaseAllowance",
    inputs: [
      { name: "spender", type: "address", internalType: "address" },
      { name: "addedValue", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "initialize",
    inputs: [
      { name: "owner", type: "address", internalType: "address" },
      { name: "initialFee", type: "uint256", internalType: "uint256" },
      { name: "shareName", type: "string", internalType: "string" },
      { name: "shareSymbol", type: "string", internalType: "string" },
      { name: "initialLockDeposit", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "lt",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "maxDeposit",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "maxMint",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "maxRedeem",
    inputs: [{ name: "owner", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "maxWithdraw",
    inputs: [{ name: "owner", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "mint",
    inputs: [
      { name: "shares", type: "uint256", internalType: "uint256" },
      { name: "receiver", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "mintWithATokens",
    inputs: [
      { name: "shares", type: "uint256", internalType: "uint256" },
      { name: "receiver", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "mintWithATokensWithSig",
    inputs: [
      { name: "shares", type: "uint256", internalType: "uint256" },
      { name: "receiver", type: "address", internalType: "address" },
      { name: "depositor", type: "address", internalType: "address" },
      {
        name: "sig",
        type: "tuple",
        internalType: "struct IATokenVault.EIP712Signature",
        components: [
          { name: "v", type: "uint8", internalType: "uint8" },
          { name: "r", type: "bytes32", internalType: "bytes32" },
          { name: "s", type: "bytes32", internalType: "bytes32" },
          { name: "deadline", type: "uint256", internalType: "uint256" },
        ],
      },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "mintWithSig",
    inputs: [
      { name: "shares", type: "uint256", internalType: "uint256" },
      { name: "receiver", type: "address", internalType: "address" },
      { name: "depositor", type: "address", internalType: "address" },
      {
        name: "sig",
        type: "tuple",
        internalType: "struct IATokenVault.EIP712Signature",
        components: [
          { name: "v", type: "uint8", internalType: "uint8" },
          { name: "r", type: "bytes32", internalType: "bytes32" },
          { name: "s", type: "bytes32", internalType: "bytes32" },
          { name: "deadline", type: "uint256", internalType: "uint256" },
        ],
      },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "name",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "previewDeposit",
    inputs: [{ name: "assets", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "previewMint",
    inputs: [{ name: "shares", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "previewRedeem",
    inputs: [{ name: "shares", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "previewWithdraw",
    inputs: [{ name: "assets", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "redeem",
    inputs: [
      { name: "shares", type: "uint256", internalType: "uint256" },
      { name: "receiver", type: "address", internalType: "address" },
      { name: "owner", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "redeemAsATokens",
    inputs: [
      { name: "shares", type: "uint256", internalType: "uint256" },
      { name: "receiver", type: "address", internalType: "address" },
      { name: "owner", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "redeemWithATokensWithSig",
    inputs: [
      { name: "shares", type: "uint256", internalType: "uint256" },
      { name: "receiver", type: "address", internalType: "address" },
      { name: "owner", type: "address", internalType: "address" },
      {
        name: "sig",
        type: "tuple",
        internalType: "struct IATokenVault.EIP712Signature",
        components: [
          { name: "v", type: "uint8", internalType: "uint8" },
          { name: "r", type: "bytes32", internalType: "bytes32" },
          { name: "s", type: "bytes32", internalType: "bytes32" },
          { name: "deadline", type: "uint256", internalType: "uint256" },
        ],
      },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "redeemWithSig",
    inputs: [
      { name: "shares", type: "uint256", internalType: "uint256" },
      { name: "receiver", type: "address", internalType: "address" },
      { name: "owner", type: "address", internalType: "address" },
      {
        name: "sig",
        type: "tuple",
        internalType: "struct IATokenVault.EIP712Signature",
        components: [
          { name: "v", type: "uint8", internalType: "uint8" },
          { name: "r", type: "bytes32", internalType: "bytes32" },
          { name: "s", type: "bytes32", internalType: "bytes32" },
          { name: "deadline", type: "uint256", internalType: "uint256" },
        ],
      },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setFee",
    inputs: [{ name: "newFee", type: "uint256", internalType: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setLT",
    inputs: [{ name: "newLT", type: "uint256", internalType: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setMetaAccount",
    inputs: [{ name: "metaAccount", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "symbol",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalAssets",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalSupply",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transfer",
    inputs: [
      { name: "to", type: "address", internalType: "address" },
      { name: "amount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferATokenToMetaAccount",
    inputs: [{ name: "amount", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferFrom",
    inputs: [
      { name: "from", type: "address", internalType: "address" },
      { name: "to", type: "address", internalType: "address" },
      { name: "amount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "withdraw",
    inputs: [
      { name: "assets", type: "uint256", internalType: "uint256" },
      { name: "receiver", type: "address", internalType: "address" },
      { name: "owner", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "withdrawATokens",
    inputs: [
      { name: "assets", type: "uint256", internalType: "uint256" },
      { name: "receiver", type: "address", internalType: "address" },
      { name: "owner", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "withdrawATokensWithSig",
    inputs: [
      { name: "assets", type: "uint256", internalType: "uint256" },
      { name: "receiver", type: "address", internalType: "address" },
      { name: "owner", type: "address", internalType: "address" },
      {
        name: "sig",
        type: "tuple",
        internalType: "struct IATokenVault.EIP712Signature",
        components: [
          { name: "v", type: "uint8", internalType: "uint8" },
          { name: "r", type: "bytes32", internalType: "bytes32" },
          { name: "s", type: "bytes32", internalType: "bytes32" },
          { name: "deadline", type: "uint256", internalType: "uint256" },
        ],
      },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "withdrawFees",
    inputs: [
      { name: "to", type: "address", internalType: "address" },
      { name: "amount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "withdrawWithSig",
    inputs: [
      { name: "assets", type: "uint256", internalType: "uint256" },
      { name: "receiver", type: "address", internalType: "address" },
      { name: "owner", type: "address", internalType: "address" },
      {
        name: "sig",
        type: "tuple",
        internalType: "struct IATokenVault.EIP712Signature",
        components: [
          { name: "v", type: "uint8", internalType: "uint8" },
          { name: "r", type: "bytes32", internalType: "bytes32" },
          { name: "s", type: "bytes32", internalType: "bytes32" },
          { name: "deadline", type: "uint256", internalType: "uint256" },
        ],
      },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "Approval",
    inputs: [
      { name: "owner", type: "address", indexed: true, internalType: "address" },
      { name: "spender", type: "address", indexed: true, internalType: "address" },
      { name: "value", type: "uint256", indexed: false, internalType: "uint256" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Deposit",
    inputs: [
      { name: "sender", type: "address", indexed: true, internalType: "address" },
      { name: "owner", type: "address", indexed: true, internalType: "address" },
      { name: "assets", type: "uint256", indexed: false, internalType: "uint256" },
      { name: "shares", type: "uint256", indexed: false, internalType: "uint256" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "EmergencyRescue",
    inputs: [
      { name: "token", type: "address", indexed: true, internalType: "address" },
      { name: "to", type: "address", indexed: true, internalType: "address" },
      { name: "amount", type: "uint256", indexed: false, internalType: "uint256" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "FeeUpdated",
    inputs: [
      { name: "oldFee", type: "uint256", indexed: true, internalType: "uint256" },
      { name: "newFee", type: "uint256", indexed: true, internalType: "uint256" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "FeesWithdrawn",
    inputs: [
      { name: "to", type: "address", indexed: true, internalType: "address" },
      { name: "amount", type: "uint256", indexed: true, internalType: "uint256" },
      { name: "newVaultBalance", type: "uint256", indexed: false, internalType: "uint256" },
      { name: "newTotalFeesAccrued", type: "uint256", indexed: false, internalType: "uint256" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Initialized",
    inputs: [{ name: "version", type: "uint8", indexed: false, internalType: "uint8" }],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      { name: "previousOwner", type: "address", indexed: true, internalType: "address" },
      { name: "newOwner", type: "address", indexed: true, internalType: "address" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RewardsClaimed",
    inputs: [
      { name: "to", type: "address", indexed: true, internalType: "address" },
      { name: "rewardsList", type: "address[]", indexed: false, internalType: "address[]" },
      { name: "claimedAmounts", type: "uint256[]", indexed: false, internalType: "uint256[]" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Transfer",
    inputs: [
      { name: "from", type: "address", indexed: true, internalType: "address" },
      { name: "to", type: "address", indexed: true, internalType: "address" },
      { name: "value", type: "uint256", indexed: false, internalType: "uint256" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Withdraw",
    inputs: [
      { name: "sender", type: "address", indexed: true, internalType: "address" },
      { name: "receiver", type: "address", indexed: true, internalType: "address" },
      { name: "owner", type: "address", indexed: true, internalType: "address" },
      { name: "assets", type: "uint256", indexed: false, internalType: "uint256" },
      { name: "shares", type: "uint256", indexed: false, internalType: "uint256" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "YieldAccrued",
    inputs: [
      { name: "accruedYield", type: "uint256", indexed: false, internalType: "uint256" },
      { name: "newFeesFromYield", type: "uint256", indexed: false, internalType: "uint256" },
      { name: "newVaultBalance", type: "uint256", indexed: false, internalType: "uint256" },
    ],
    anonymous: false,
  },
] as const;
