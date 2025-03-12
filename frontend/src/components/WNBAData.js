import React, {useEffect, useState } from 'react';
import { fetchWNBAData } from '../utils/api';

function WNBAData(){
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getData() {
            console.log('Fetching data...');
            const result = await fetchWNBAData();
            console.log('Result:', result);
            if (result) {
                setData(result);
            }else {
                setError('Failed to load data');
    
            }
        }
        getData();
    }, []);

    if (error) return <div>Error: {error} </div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div>
            <h1>WNBA DATA</h1>
            <pre> {JSON.stringify(data, null,2)}</pre>
        </div>
    );

}

    export default WNBAData;