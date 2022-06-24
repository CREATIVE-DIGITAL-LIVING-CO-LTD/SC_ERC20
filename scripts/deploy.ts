import { ethers } from 'hardhat';

async function main() {
	const ANIV20 = await ethers.getContractFactory('ANIV20');
	/* Input
	address _Owner = ,
	address _Address2022 = ,
	address _Address2023 = ,
  address _Address2024 = ,
	address _Address2025 =
	 */
	const contract = await ANIV20.deploy('', '', '', '', '');
	await contract.deployed();
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
