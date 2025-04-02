export async function fetchWNBAData() {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/data');
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);

        }
        return await response.json();

    } catch (error) {
        console.error('Failed to fetch the wnba data:', error);
        return null;
    }
}