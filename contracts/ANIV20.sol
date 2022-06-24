// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract ANIV20 is ERC20, Ownable {

    uint256 private constant YEAR_2022 = 600 * 1000000 * 10 ** 18;
    uint256 private constant YEAR_2023 = 500 * 1000000 * 10 ** 18;
    uint256 private constant YEAR_2024 = 500 * 1000000 * 10 ** 18;
    uint256 private constant YEAR_2025 = 400 * 1000000 * 10 ** 18;

    string private _name = "Aniv";
    string private _symbol = "ANIV";

    address Owner;
    address Address2022;
    address Address2023;
    address Address2024;
    address Address2025;

    constructor (address _Owner, address _Address2022, address _Address2023, address _Address2024, address _Address2025) ERC20(_name, _symbol) {
        //set wallet address
        Owner = _Owner;
        Address2022 = _Address2022;
        Address2023 = _Address2023;
        Address2024 = _Address2024;
        Address2025 = _Address2025;

        _mint(Address2022, YEAR_2022);
        _mint(Address2023, YEAR_2023);
        _mint(Address2024, YEAR_2024);
        _mint(Address2025, YEAR_2025);
        //transfer to real owner
        transferOwnership(_Owner);
    }

}
