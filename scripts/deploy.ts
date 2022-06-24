import { ethers } from 'hardhat'

async function main() {
    const ANIV20 = await ethers.getContractFactory('ANIV20')
    const {
        ADDRESS_OWNER,
        ADDRESS_2022,
        ADDRESS_2023,
        ADDRESS_2024,
        ADDRESS_2025,
    } = process.env
    const contract = await ANIV20.deploy(
        ADDRESS_OWNER as string,
        ADDRESS_2023 as string,
        ADDRESS_2022 as string,
        ADDRESS_2024 as string,
        ADDRESS_2025 as string
    )
    await contract.deployed()
    console.log('Token address:', contract.address)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
