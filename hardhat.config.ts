import * as dotenv from 'dotenv'

import { HardhatUserConfig } from 'hardhat/config'
import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-waffle'
import '@typechain/hardhat'
import 'hardhat-gas-reporter'
import 'solidity-coverage'

// eslint-disable-next-line node/no-path-concat
dotenv.config({ path: __dirname + '/.env' })

const config: HardhatUserConfig = {
    solidity: '0.8.0',
    networks: {
        polygon_testnet: {
            url: process.env.POLYGON_TESTNET_URL || '',
            accounts:
                process.env.PRIVATE_KEY !== undefined
                    ? [process.env.PRIVATE_KEY]
                    : [],
        },
        polygon_mainnet: {
            url: process.env.POLYGON_TESTNET_URL || '',
            accounts:
                process.env.PRIVATE_KEY !== undefined
                    ? [process.env.PRIVATE_KEY]
                    : [],
        },
    },
    gasReporter: {
        enabled: process.env.REPORT_GAS !== undefined,
        currency: 'THB',
        outputFile: 'gas-report.txt',
        noColors: true,
        coinmarketcap: process.env.COINMARKETCAP_API_KEY,
        token: 'MATIC',
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
    },
}

export default config
