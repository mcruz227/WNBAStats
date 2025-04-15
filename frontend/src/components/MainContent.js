import React, {useState, useEffect, useMemo} from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import './MainContent.css';



const MainContent = ( { isOpen} ) => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState('');
    const [error, setError] = useState(null);


    useEffect(() => {
        fetch('http://localhost:5000/api/data')
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch data');
            return response.json();
        })
        .then(data =>  {
           console.log("fetched data:" ,data);
            setData(data);
            setFilteredData(data);
        })
        .catch(error => {
            console.error(" Error fetching data:", error);
            setError(error.message);
        });
    }, []);

    const handleFilterChange = (event) => {
        const team = event.target.value;
        setSelectedTeam(team);

        if (team === "") {
            setFilteredData(data);
        } else {
            setFilteredData(data.filter(item => item.team_name.toLowerCase() === team.toLowerCase()));
        }
    };
 
    const sortedData = useMemo(() => {
        return data
            .filter(item => item.team_name === selectedTeam)
            .sort((a,b) => a.season - b.season);
    } , [data, selectedTeam]);

    return (
        <main className= {`main-content  ${isOpen ? 'shifted' : ''}`}>
            <h2> WNBA THRU OUT THE YEARS </h2>
            <p> Find out about the Team Performances and Prime years </p>

            {/* FILTER DROPDOWN */}
           <label htmlFor="teamFilter"> Filter by Team: </label>
           <select id="teamFilter" value={selectedTeam} onChange={handleFilterChange}>
                <option value=""> All Teams </option>
                {Array.from(new Set(data?.map(team => team.team_name) || []))
                .map((team,index) => (
                    <option key={index} value={team}>{team}</option>
                ))}
           </select>

{/* DISPLAYING THE TABLE */}
           <table>
            <thead>
                <tr>
                    <th> Team Name</th>
                    <th> Season </th>
                    <th> Wins </th>
                    <th> Losses </th>
                </tr>
            </thead>

            <tbody>
                {filteredData.map((team, index)=> (
                    <tr key={index}>
                        <td>{team.team_name} </td>
                        <td> {team.season}</td>
                        <td> {team.wins}</td>
                        <td> {team.losses}</td>
                    </tr>
                ))}
            </tbody>
           </table>

           {/* WIN AND LOSSES LINE CHART */}
           {selectedTeam && (

          <> 
           <h3> {selectedTeam} Team Performance </h3>
           <ResponsiveContainer width="90%" height={300}>
                    <LineChart data={sortedData}>
                        <CartesianGrid strokeDasharray="3  3"/>
                        <XAxis dataKey="season" tickFormatter={(tick) => `${tick}`} />
                        <YAxis label={{ value: "Wins/Losses", angle: -90, position:"insideLeft" }} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="wins" stroke="green" name="Wins" />
                        <Line type="monotone" dataKey="losses" stroke="red" name="Losses" />
                    </LineChart>
           </ResponsiveContainer>
           </>
           )}

           {error ? <p className ="error"> {error}</p> : null}

        </main>

    );
};

export default MainContent;