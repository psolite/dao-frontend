export type DaoVoting = {
    "version": "0.1.0",
    "name": "dao_voting",
    "instructions": [
      {
        "name": "createProposal",
        "accounts": [
          {
            "name": "proposal",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "user",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "proposalId",
            "type": "u64"
          },
          {
            "name": "point",
            "type": "u32"
          }
        ]
      },
      {
        "name": "vote",
        "accounts": [
          {
            "name": "proposal",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "voter",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "user",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "vote",
            "type": {
              "defined": "VoteOption"
            }
          }
        ]
      }
    ],
    "accounts": [
      {
        "name": "proposal",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "title",
              "type": "string"
            },
            {
              "name": "description",
              "type": "string"
            },
            {
              "name": "votesFor",
              "type": "u64"
            },
            {
              "name": "votesAgainst",
              "type": "u64"
            },
            {
              "name": "votesAbstain",
              "type": "u64"
            },
            {
              "name": "point",
              "type": "u32"
            }
          ]
        }
      },
      {
        "name": "voter",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "proposal",
              "type": "publicKey"
            },
            {
              "name": "user",
              "type": "publicKey"
            }
          ]
        }
      }
    ],
    "types": [
      {
        "name": "VoteOption",
        "type": {
          "kind": "enum",
          "variants": [
            {
              "name": "For"
            },
            {
              "name": "Against"
            },
            {
              "name": "Abstain"
            }
          ]
        }
      }
    ]
  };
  
  export const IDL: DaoVoting = {
    "version": "0.1.0",
    "name": "dao_voting",
    "instructions": [
      {
        "name": "createProposal",
        "accounts": [
          {
            "name": "proposal",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "user",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "proposalId",
            "type": "u64"
          },
          {
            "name": "point",
            "type": "u32"
          }
        ]
      },
      {
        "name": "vote",
        "accounts": [
          {
            "name": "proposal",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "voter",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "user",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "vote",
            "type": {
              "defined": "VoteOption"
            }
          }
        ]
      }
    ],
    "accounts": [
      {
        "name": "proposal",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "title",
              "type": "string"
            },
            {
              "name": "description",
              "type": "string"
            },
            {
              "name": "votesFor",
              "type": "u64"
            },
            {
              "name": "votesAgainst",
              "type": "u64"
            },
            {
              "name": "votesAbstain",
              "type": "u64"
            },
            {
              "name": "point",
              "type": "u32"
            }
          ]
        }
      },
      {
        "name": "voter",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "proposal",
              "type": "publicKey"
            },
            {
              "name": "user",
              "type": "publicKey"
            }
          ]
        }
      }
    ],
    "types": [
      {
        "name": "VoteOption",
        "type": {
          "kind": "enum",
          "variants": [
            {
              "name": "For"
            },
            {
              "name": "Against"
            },
            {
              "name": "Abstain"
            }
          ]
        }
      }
    ]
  };
  