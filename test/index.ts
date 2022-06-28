import { expect } from 'chai'
import { ethers } from 'hardhat'

const { expectRevert } = require('@openzeppelin/test-helpers')
const MAIN = '640000000000000000000000000'
const TEAM = '300000000000000000000000000'
const PARTNER = '460000000000000000000000000'
const MARKETING = '600000000000000000000000000'
const TOTAL_SUPPLY = '2000000000000000000000000000' // total supply

describe('ANIV20 Test', function () {
    let mainAddress: any
    let teamAddress: any
    let partnerAddress: any
    let marketingAddress: any
    let other: any
    let contract: any

    beforeEach(async () => {
        ;[mainAddress, teamAddress, partnerAddress, marketingAddress, other] =
            await ethers.getSigners()
        const ANIV20 = await ethers.getContractFactory('ANIV20')
        contract = await ANIV20.deploy(
            mainAddress.address,
            teamAddress.address,
            partnerAddress.address,
            marketingAddress.address
        )
        await contract.deployed()
    })

    it('name, symbol, decimals, totalSupply, balanceOf', async () => {
        expect(await contract.name()).to.equal('Aniv')
        expect(await contract.symbol()).to.equal('ANIV')
        expect((await contract.decimals()).toString()).to.equal('18')
        expect((await contract.totalSupply()).toString()).to.equal(TOTAL_SUPPLY)
        expect(
            (await contract.balanceOf(mainAddress.address)).toString()
        ).to.equal(MAIN)
        expect(
            (await contract.balanceOf(teamAddress.address)).toString()
        ).to.equal(TEAM)
        expect(
            (await contract.balanceOf(partnerAddress.address)).toString()
        ).to.equal(PARTNER)
        expect(
            (await contract.balanceOf(marketingAddress.address)).toString()
        ).to.equal(MARKETING)
    })

    it('approve', async () => {
        await contract.connect(mainAddress).approve(other.address, 1000)
        expect(
            (
                await contract.allowance(mainAddress.address, other.address)
            ).toString()
        ).to.equal('1000')
    })

    it('transfer', async () => {
        await contract.connect(mainAddress).transfer(other.address, 1000)
        expect(
            (await contract.balanceOf(mainAddress.address)).toString()
        ).to.equal('639999999999999999999999000')
        expect((await contract.balanceOf(other.address)).toString()).to.equal(
            '1000'
        )
    })

    it('transfer:fail', async () => {
        await expectRevert(
            contract
                .connect(mainAddress)
                .transfer(other.address, '640000000000000000000000001'),
            'ERC20: transfer amount exceeds balance'
        )
        await expectRevert(
            contract.connect(other).transfer(mainAddress.address, 1),
            'ERC20: transfer amount exceeds balance'
        )
    })

    it('transferFrom', async () => {
        await contract.connect(mainAddress).approve(other.address, 1000)
        await contract
            .connect(other)
            .transferFrom(mainAddress.address, other.address, 1000)
        expect(
            (
                await contract.allowance(mainAddress.address, other.address)
            ).toString()
        ).to.equal('0')
        expect(
            (await contract.balanceOf(mainAddress.address)).toString()
        ).to.equal('639999999999999999999999000')
        expect((await contract.balanceOf(other.address)).toString()).to.equal(
            '1000'
        )
    })

    it('burn', async () => {
        await contract.connect(mainAddress).burn(1000)
        expect(
            (await contract.balanceOf(mainAddress.address)).toString()
        ).to.equal('639999999999999999999999000')
        expect((await contract.totalSupply()).toString()).to.equal(
            '1999999999999999999999999000'
        )
    })
})
