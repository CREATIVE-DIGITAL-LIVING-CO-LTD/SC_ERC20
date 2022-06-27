// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract ANIV20 is ERC20, Ownable {

    // Total Supply 2000m
    // private seed + public sale = 32%
    uint256 private constant MAIN = 640 * 1000000 * 10 ** 18;
    // founder & team = 15%
    uint256 private constant TEAM = 300 * 1000000 * 10 ** 18;
    // advisors + partners = 23%
    uint256 private constant PARTNER = 460 * 1000000 * 10 ** 18;
    // marketing = 30%
    uint256 private constant MARKETING = 600 * 1000000 * 10 ** 18;

    string private _name = "Aniv";
    string private _symbol = "ANIV";

    address Owner;
    address MainAddress;
    address TeamAddress;
    address PartnerAddress;
    address MarketingAddress;

    constructor (address _Owner, address _MainAddress, address _TeamAddress, address _PartnerAddress, address _MarketingAddress) ERC20(_name, _symbol) {
        //set wallet address
        Owner = _Owner;
        MainAddress = _MainAddress;
        TeamAddress = _TeamAddress;
        PartnerAddress = _PartnerAddress;
        MarketingAddress = _MarketingAddress;

        // mint to main wallet ( private seed + public sale )
        _mint(MainAddress, MAIN);
        // mint to team wallet ( founder & team )
        _mint(TeamAddress, TEAM);
        // mint to partner wallet ( advisors + partners )
        _mint(PartnerAddress, PARTNER);
        // mint to marketing wallet ( marketing )
        _mint(MarketingAddress, MARKETING);

        //transfer to real owner
        transferOwnership(_Owner);
    }

    function burn(uint256 amount) public returns (bool) {
        _burn(_msgSender(), amount);
        return true;
    }

}
