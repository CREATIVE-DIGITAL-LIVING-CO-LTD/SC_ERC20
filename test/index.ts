import { expect } from 'chai'
import { ethers } from 'hardhat'

const { expectRevert } = require('@openzeppelin/test-helpers')
const YEAR_2022 = '600000000000000000000000000'
const YEAR_2023 = '500000000000000000000000000'
const YEAR_2024 = '500000000000000000000000000'
const YEAR_2025 = '400000000000000000000000000'
const TOTAL_SUPPLY = '2000000000000000000000000000' // total supply

describe('ANIV20 Test', function () {
    let owner: any
    let address2022: any
    let address2023: any
    let address2024: any
    let address2025: any
    let other: any
    let contract: any

    beforeEach(async () => {
        ;[owner, address2022, address2023, address2024, address2025, other] =
            await ethers.getSigners()
        const ANIV20 = await ethers.getContractFactory('ANIV20')
        contract = await ANIV20.deploy(
            owner.address,
            address2022.address,
            address2023.address,
            address2024.address,
            address2025.address
        )
        await contract.deployed()
    })
    it('name, symbol, decimals, totalSupply, balanceOf', async () => {
        expect(await contract.name()).to.equal('Aniv')
        expect(await contract.symbol()).to.equal('ANIV')
        expect((await contract.decimals()).toString()).to.equal('18')
        expect((await contract.totalSupply()).toString()).to.equal(TOTAL_SUPPLY)
        expect(
            (await contract.balanceOf(address2022.address)).toString()
        ).to.equal(YEAR_2022)
        expect(
            (await contract.balanceOf(address2023.address)).toString()
        ).to.equal(YEAR_2023)
        expect(
            (await contract.balanceOf(address2024.address)).toString()
        ).to.equal(YEAR_2024)
        expect(
            (await contract.balanceOf(address2025.address)).toString()
        ).to.equal(YEAR_2025)
    })
    it('approve', async () => {
        await contract.connect(address2022).approve(other.address, 1000)
        expect(
            (
                await contract.allowance(address2022.address, other.address)
            ).toString()
        ).to.equal('1000')
    })

    it('transfer', async () => {
        await contract.connect(address2022).transfer(other.address, 1000)
        expect(
            (await contract.balanceOf(address2022.address)).toString()
        ).to.equal('599999999999999999999999000')
        expect((await contract.balanceOf(other.address)).toString()).to.equal(
            '1000'
        )
    })

    it('transfer:fail', async () => {
        await expectRevert(
            contract
                .connect(address2022)
                .transfer(other.address, '600000000000000000000000001'),
            'ERC20: transfer amount exceeds balance'
        )
        await expectRevert(
            contract.connect(other).transfer(address2022.address, 1),
            'ERC20: transfer amount exceeds balance'
        )
    })

    it('transferFrom', async () => {
        await contract.connect(address2022).approve(other.address, 1000)
        await contract
            .connect(other)
            .transferFrom(address2022.address, other.address, 1000)
        expect(
            (
                await contract.allowance(address2022.address, other.address)
            ).toString()
        ).to.equal('0')
        expect(
            (await contract.balanceOf(address2022.address)).toString()
        ).to.equal('599999999999999999999999000')
        expect((await contract.balanceOf(other.address)).toString()).to.equal(
            '1000'
        )
    })
})
