const mainnet_deployments = {
    tokens: {
        wftm: {
            address: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83"
        },
        clank: {
            address: "",
            abi: ""
        },
        boom: {
            address: "",
            abi: ""
        },
        thump: {
            address: "",
            abi: ""
        },
        clink: {
            address: "",
            abi: ""
        },
        snap: {
            address: "",
            abi: ""
        },
        yellowspark: {
            address: "",
            abi: ""
        },
        whitespark: {
            address: "",
            abi: ""
        },
        redspark: {
            address: "",
            abi: ""
        },
        bluespark: {
            address: "",
            abi: ""
        },
        enerlink: {
            address: "",
            abi: ""
        },
        clankmatic: {
            address: ""
        },
        clankboom: {
            address: ""
        },
        clankthump: {
            address: ""
        },
        clankclink: {
            address: ""
        },
        clanksnap: {
            address: ""
        },
        raidtoken: {
            address: "0x70f52878ca86c5f03d603CDDA414295EE410E8f3"
        },
        rdrstoken: {
            address: "0x02E13555A24e501533df5bd4A5247d080881B271"
        },
        rdrsfantom: {
            address: "0x029E1B62acccA96734d45e45CA9c4ed31b65c3fE"
        }
        
    },
    defi: {
        minichefv2: {
            address: "0x79996F106e4dDf4384eB2C8f7DdF09C832a8AF15",
            abi: ""
        },
        factory: {
            address: "",
            abi: ""
        }
    },
    characters: {
        nftContract: {
            address: "",
            abi: ''
        },
        minter: {
            address: "",
            abi: ''
        },
        vrf: {
            address: "",
            abi: ''
        },
        uriConstructor: {
            address: ""
        }
    },
    equipments: {
        nftContract: {
            address: "",
            abi: ''
        },
        minter: {
            address: "",
            abi: ''
        },
        vrf: {
            address: "",
            abi: ''
        },
        manager: {
            address: "",
            abi: ''
        }
    },
    dungeons: {
        dungeon: {
            address: "",
        },
        vrf: {
            address: ""
        },
        keeper: {
            registry: "",
            address: ""
            ///Register new upkeep in https://automation.chain.link
        }
    }
}

const testnet_deployments = {
    tokens: {
        wmatic: {
            address: ""
        },
        clank: {
            address: "",
            abi: ""
        },
        boom: {
            address: "",
            abi: ""
        },
        thump: {
            address: "",
            abi: ""
        },
        clink: {
            address: "",
            abi: ""
        },
        snap: {
            address: "",
            abi: ""
        },
        yellowspark: {
            address: "",
            abi: ""
        },
        whitespark: {
            address: "",
            abi: ""
        },
        redspark: {
            address: "",
            abi: ""
        },
        bluespark: {
            address: "",
            abi: ""
        },
        enerlink: {
            address: "",
            abi: ""
        },
        clankmatic: {
            address: ""
        },
        clankboom: {
            address: ""
        },
        clankthump: {
            address: ""
        },
        clankclink: {
            address: ""
        },
        clanksnap: {
            address: ""
        }
        
    },
    defi: {
        minichefv2: {
            address: "",
            abi: ""
        },
        factory: {
            address: "",
            abi: ""
        }
    },
    characters: {
        nftContract: {
            address: "",
            abi: ''
        },
        minter: {
            address: "",
            abi: ''
        },
        vrf: {
            address: "",
            abi: ''
        },
        uriConstructor: {
            address: ""
        }
    },
    equipments: {
        nftContract: {
            address: "",
            abi: ''
        },
        minter: {
            address: "",
            abi: ''
        },
        vrf: {
            address: "",
            abi: ''
        },
        manager: {
            address: "",
            abi: ''
        }
    },
    dungeons: {
        dungeon: {
            address: "",
        },
        vrf: {
            address: ""
        },
        keeper: {
            address: ""
            ///Register new upkeep in https://automation.chain.link
        }
    }
}



const subgraph_deployments = {
    core: {
        characters: '',
        equipments: ''
    }
}

module.exports = {
    contracts: mainnet_deployments,
    subgraphs: subgraph_deployments
}