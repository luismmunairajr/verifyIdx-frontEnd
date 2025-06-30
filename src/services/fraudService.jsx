
export const fraudService = {
    async addFraud(fraudData) {
        const response = await fetch('http://localhost:3001/fraudlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fraudData),
        })
        return response.json();
    },

    async getFrauds() {
        const response = await fetch('http://localhost:3001/fraudlist')
        if (!response.ok) {
            throw new Error('Failed to fetch frauds');
        }
        return response.json();
    }
}