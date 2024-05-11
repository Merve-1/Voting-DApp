// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Voting {
    address public manager;

    struct Candidate {
        uint id;
        string CfirstName;
        string ClastName;
        string CidNumber;
        uint voteCount;
    }

    mapping(address => bool) public voters;

    mapping(uint => Candidate) public candidates;

    uint public candidatesCount;

    event votedEvent(uint indexed_candidateId);

    // User structure
    struct User {
        string firstName;
        string lastName;
        string idNumber;
        string email;
        string password;
        address add; // Address of the user
        bool isAdded; // Flag to track if user is added
    }

    mapping(address => User) public users;
    mapping(uint => address) public userIds; // Mapping to track user IDs

    uint public usersCount;

    constructor() {
        manager = msg.sender;
    }

    // Modifier to check if the caller is the manager
    modifier onlyAdmin() {
        require(msg.sender == manager, "Only admin can call this function");
        _;
    }

    // Function to add a candidate
    function addCandidate(
        string memory _CfirstName,
        string memory _ClastName,
        string memory _CidNumber
    ) public onlyAdmin {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(
            candidatesCount,
            _CfirstName,
            _ClastName,
            _CidNumber,
            0
        );
    }

    // Function to add a user
    function addUser(
        string memory _firstName,
        string memory _lastName,
        string memory _idNumber,
        string memory _email,
        string memory _password,
        address _userAddress // Address of the user
    ) public {
        // Check if the user is already added
        require(!users[_userAddress].isAdded, "User already added");

        usersCount++;
        users[_userAddress] = User(
            _firstName,
            _lastName,
            _idNumber,
            _email,
            _password,
            _userAddress,
            true // Mark user as added
        );
        userIds[usersCount] = _userAddress;
    }

    // Function to vote for a candidate
    function vote(uint _candidateId) public {
        require(!voters[msg.sender], "User has already voted");

        require(
            _candidateId > 0 && _candidateId <= candidatesCount,
            "Invalid candidate ID"
        );

        voters[msg.sender] = true;

        candidates[_candidateId].voteCount++;

        emit votedEvent(_candidateId);
    }

    // Function to check if a user is added
    function isUserAdded(address _userAddress) public view returns (bool) {
        return users[_userAddress].isAdded;
    }
}
