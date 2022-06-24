import { ethers } from 'hardhat'

async function main() {
    const ANIV20 = await ethers.getContractFactory('ANIV20')
    const contract = await ANIV20.deploy(
        process.env.ADDRESS_OWNER as string,
        process.env.ADDRESS_2022 as string,
        process.env.ADDRESS_2023 as string,
        process.env.ADDRESS_2024 as string,
        process.env.ADDRESS_2025 as string
    )
    await contract.deployed()
    console.log('Token address:', contract.address)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
