import React, { useState, useEffect } from 'react';
import './App.css';

const VotingPage = ({ account, contract }) => {
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(0);
    const [voted, setVoted] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const getCandidates = async () => {
            try {
                const count = await contract.methods.candidatesCount().call();
                const candidatesArray = [];
                for (let i = 1; i <= count; i++) {
                    const candidate = await contract.methods.candidates(i).call();
                    candidatesArray.push(candidate);
                }
                setCandidates(candidatesArray);
            } catch (error) {
                console.error('Error fetching candidates:', error);
            }
        };

        const checkVoterStatus = async () => {
            try {
                const hasVoted = await contract.methods.voters(account).call();
                setHasVoted(hasVoted);
            } catch (error) {
                console.error('Error checking voter status:', error);
            }
        };

        const checkIfUserVoted = async () => {
            try {
                const userVoted = await contract.methods.voted(account).call();
                setVoted(userVoted);
            } catch (error) {
                console.error('Error checking if user voted:', error);
            }
        };

        getCandidates();
        checkVoterStatus();
        checkIfUserVoted();
    }, [contract, account]);

    const handleVote = async () => {
        setSubmitting(true);
        try {
            await contract.methods.vote(selectedCandidate).send({ from: window.ethereum.selectedAddress });;
            setVoted(true);
            setHasVoted(true);
        } catch (error) {
            console.error('Error voting:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="voting-container">
            <header className="voting-header">
                <h2>Vote for a Candidate</h2>
            </header>
            <div className="candidate-list">
                {candidates.map((candidate, index) => (
                    <div className="candidate-item" key={index}>
                        <input
                            className="candidate-radio"
                            type="radio"
                            id={`candidate${index}`}
                            name="candidate"
                            value={index + 1}
                            checked={selectedCandidate === index + 1}
                            onChange={() => setSelectedCandidate(index + 1)}
                        />
                        <label htmlFor={`candidate${index}`}>
                            {candidate.CfirstName} {candidate.ClastName}
                        </label>
                    </div>
                ))}
            </div>
            <button
                className="vote-button"
                onClick={handleVote}
                disabled={voted || submitting}
            >
                {submitting ? 'Submitting...' : 'Vote'}
            </button>
            {hasVoted && <h1 className="voted-message">You have already voted!</h1>}
            {!hasVoted && <h1 className="can-vote-message">You can vote!</h1>}
        </div>
    );

};

export default VotingPage;
