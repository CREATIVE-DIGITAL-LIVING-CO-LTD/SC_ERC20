import { ethers } from 'hardhat'

async function main() {
    const ANIV20 = await ethers.getContractFactory('ANIV20')
    const contract = await ANIV20.deploy(
        process.env.OWNER_ADDRESS as string,
        process.env.MAIN_ADDRESS as string,
        process.env.TEAM_ADDRESS as string,
        process.env.PARTNER_ADDRESS as string,
        process.env.MARKETING_ADDRESS as string
    )
    await contract.deployed()
    console.log('Token address:', contract.address)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
