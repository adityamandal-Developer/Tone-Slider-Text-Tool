export const mistralResponse = async (body) => {
    try {
        const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.API_KEY}`
            },
            body: JSON.stringify(body)
        });
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.message)
        }
        return data
    } catch (error) {
        return { success: false, error: error.message }
    }
}