import React, {useState, useEffect, useMemo} from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import './MainContent.css';

const teamColors = {
    "Aces" : "#C8102E",
    "Sky" : "#FDBB30",
    "Mercury" : "#1D1160",
    default: "#FF5C39"
};

const MainContent = ( { isOpen} ) => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [error, setError] = useState(null);
    const[showTable, setShowTable] = useState(false);


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

    const handleYearChange = (event) => {
        const year = event.target.value;
        setSelectedYear(year);
    };

    useEffect(() => {
        let updated = data;

        if (selectedTeam) {
            updated = updated.filter(item => item.team_name === selectedTeam);
        }

        if (selectedYear) {
            updated = updated.filter(item => item.season === parseInt(selectedYear));
        }

        setFilteredData(updated);

    }, [selectedTeam, selectedYear, data]);
    
 
    const sortedData = useMemo(() => {
        return filteredData
            .filter(item => item.team_name === selectedTeam)
            .sort((a,b) => a.season - b.season);
    } , [filteredData, selectedTeam]);
    
    const teamColor = teamColors[selectedTeam] || teamColors.default;


    return (
        <main className= {`main-content  ${isOpen ? 'shifted' : ''}`}>
            <h2 id="main-title"> WNBA THRU OUT THE YEARS </h2>
            <p className="subtext"> Find out about the Team Performances and Prime years </p>

            {/* FILTER DROPDOWN */}
            <div className="filter-group"> 
           <label htmlFor="teamFilter"> Filter by Team: </label>
           <select id="teamFilter" value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
                <option value=""> All Teams </option>
                {Array.from(new Set(data.map(d => d.team_name) || [])).map((team,index) => (
                    <option key={index} value={team}>{team}</option>
                ))}
           </select>

           <label> Filter by Year: </label>
           <select value={selectedYear} onChange={handleYearChange}>
            <option value=""> All Years</option>
            {Array.from(new Set(data.map(d => d.season))).sort().map((year,index) => (
                <option key={index} value={year}>{year}</option>
            ))}
           </select>
           </div>
           
           <button className="toggle-btn" onClick={() => setShowTable(!showTable)}>
     {showTable ? "Hide Table" : "Show Table"}
           </button>
           
           {showTable && (
           <div id="table-section" className="data-table">
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
           </div>
        )}

           {/* WIN AND LOSSES LINE CHART */}
           {selectedTeam && (

          <> 
           <h3 id="graph-section"> {selectedTeam} Performance Over Time </h3>
           <ResponsiveContainer width="90%" height={300}>
                    <LineChart data={sortedData}>
                        <CartesianGrid strokeDasharray="3  3"/>
                        <XAxis dataKey="season" tickFormatter={(tick) => `${tick}`} />
                        <YAxis label={{ value: "Wins/Losses", angle: -90, position:"insideLeft" }} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="wins" stroke={teamColor} name="Wins" />
                        <Line type="monotone" dataKey="losses" stroke="#999999" name="Losses" />
                    </LineChart>
           </ResponsiveContainer>
           </>
           )}

           {error ? <p className ="error"> {error}</p> : null}

        </main>

    );
};

export default MainContent;