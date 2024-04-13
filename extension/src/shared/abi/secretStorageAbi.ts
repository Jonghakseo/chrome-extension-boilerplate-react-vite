export const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'string',
        name: 'domain',
        type: 'string',
      },
    ],
    name: 'SecretDeleted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'string',
        name: 'domain',
        type: 'string',
      },
    ],
    name: 'SecretStored',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'string',
        name: 'domain',
        type: 'string',
      },
    ],
    name: 'SecretUpdated',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_domain',
        type: 'string',
      },
    ],
    name: 'deleteSecret',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getSecrets',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'domain',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'secret',
            type: 'string',
          },
        ],
        internalType: 'struct SecretStore.Secret[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_domain',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_secret',
        type: 'string',
      },
    ],
    name: 'setSecret',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;
