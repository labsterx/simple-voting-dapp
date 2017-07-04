pragma solidity ^0.4.11;


contract Ballot {

    string[6] public names = ['Americano', 'Cappuccino', 'Espresso', 'Flat White', 'Latte', 'Mocha'];
    string public namesStr = 'Americano|Cappuccino|Espresso|Flat White|Latte|Mocha';

    struct Voter {
        uint weight;
        bool voted;
        address delegate;
        uint vote;
    }

    struct Proposal {
        string name;
        uint voteCount;
    }

    address public chairperson;

    mapping(address => Voter) public voters;

    Proposal[] public proposals;

    function Ballot() {
        chairperson = msg.sender;
        voters[chairperson].weight = 1;

        for (uint i = 0; i < names.length; i++) {
            proposals.push(Proposal({
                name: names[i],
                voteCount: 0
            }));
        }
    }

    function giveRightToVote(address voter) {
        require((msg.sender == chairperson) && !voters[voter].voted && (voters[voter].weight == 0));
        voters[voter].weight = 1;
    }

    function delegate(address to) {

        Voter sender = voters[msg.sender];
        require(!sender.voted);

        require(to != msg.sender);

        while (voters[to].delegate != address(0)) {
            to = voters[to].delegate;

            require(to != msg.sender);
        }

        sender.voted = true;
        sender.delegate = to;
        Voter delegate = voters[to];
        if (delegate.voted) {
            proposals[delegate.vote].voteCount += sender.weight;
        } else {
            delegate.weight += sender.weight;
        }
    }

    function vote(uint proposal) {
        Voter sender = voters[msg.sender];
        require(!sender.voted);
        sender.voted = true;
        sender.vote = proposal;

        proposals[proposal].voteCount += sender.weight;
    }

    function winningProposal() constant
            returns (uint winningProposal)
    {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal = p;
            }
        }
    }

    function winnerName() constant
            returns (string winnerName)
    {
        winnerName = proposals[winningProposal()].name;
    }
    
    function proposalNames() constant
            returns (string str)
    {
        str = namesStr;
    }
    
}