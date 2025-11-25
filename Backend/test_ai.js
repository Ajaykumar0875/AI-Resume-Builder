import "dotenv/config";

async function testFetch() {
    const apiKey = process.env.GEMINI_API_KEY;
    const baseUrl = process.env.OPENAI_BASE_URL;
    // Hardcoded correct URL to test
    const url = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";
    
    console.log("Testing with fetch...");
    console.log("URL:", url);
    
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gemini-1.5-flash",
                messages: [{ role: "user", content: "Hello" }]
            })
        });

        console.log("Status:", response.status);
        console.log("Status Text:", response.statusText);
        
        const text = await response.text();
        console.log("Response Body:", text);
        
    } catch (error) {
        console.error("Fetch Error:", error);
    }
}

testFetch();
