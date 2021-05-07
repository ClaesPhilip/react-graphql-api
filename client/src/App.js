import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import './App.scss';

function App() {

  const GET_TEAM = gql`
  {
    getTeam {
      team
    }
  }
  `
  
  const { loading, error, data } = useQuery(GET_TEAM);
  const [newTeamMember, setNewTeamMember] = useState([""]);
  const [email, setEmail] = useState("");
  const [terms, setTerms] = useState(false);

  if(error) return (
    <h1>Something went wrong</h1>
  );
  if(loading) return(
    <h1>Loading...</h1>
  );

  const onSubmit = (e) => {
    e.preventDefault();
    let team = data.getTeam.team;
    if(terms === true && newTeamMember.length > 0) {
      team.push(newTeamMember);
      setNewTeamMember("");
      setEmail("");
    } else {
      alert("Something went wrong. Enter a name and agree to terms");
    }
  }

  const handleTerms = () => {
    console.log(terms);
  }

  return (
    <div className="App">
      <div className="sidebar">
        <h1>Join <br></br> the <br></br> team</h1>
        <ul>
          {data.getTeam.team.map((name, index) => (
              <li key={index}>{name}</li>
          ))}
        </ul>
      </div>
      <form className="form" onSubmit={onSubmit}>
        <h1>Register</h1>
        <h3>Team player - Be positive - Beat yesterday</h3>
        <p>
          Together we re-define the experience of online gaming through <br></br> 
          gamification and novel technical solutions.
        </p>
        <input
          type="text"
          className="name-input"
          placeholder="Name"
          value={newTeamMember}
          onChange={(e) => setNewTeamMember(e.target.value)}
          required
        />
        <input
          type="text"
          className="email-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>
          <input 
            style={{marginTop: "20px",}} 
            type="checkbox" 
            value={terms} 
            onClick={() => setTerms(terms => !terms)}
            onChange={handleTerms}
          />
          I agree to the terms
        </label> 
        <label>
          <input type="submit" value="I'm in, sign me up!" className="submit-btn"/> 
        </label>    
      </form>
    </div>
  );
}

export default App;
