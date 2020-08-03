pragma solidity >=0.4.21 <0.6.0;

/**
 * The Meme contract put meme hash on ether blockchain
 */
contract Meme {
    //state variable
    string memeHash;

    // constructor() public {
    //     memeHash = "";
    // }

    // Write function

    function set(string memory _memeHash) public {
        memeHash = _memeHash;
    }

    //Read function

    function get() public view returns (string memory) {
        return memeHash;
    }
}
