export interface Quote {
    q: string;
    a: string;
}

export async function fetchRandomQuote(): Promise<Quote | null> {
    try {
        const response = await fetch("/api/quote");
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        const quote = data[0];

        // Manage cache in localStorage
        if (typeof window !== "undefined") {
            try {
                const cache = JSON.parse(localStorage.getItem("quote_cache") || "[]");
                const newCache = [quote, ...cache].slice(0, 3);
                localStorage.setItem("quote_cache", JSON.stringify(newCache));
            } catch (e) {
                console.error("Cache error:", e);
            }
        }

        return quote;
    } catch (error) {
        console.error("Error fetching quote:", error);

        // Fallback to cache if available
        if (typeof window !== "undefined") {
            try {
                const cache = JSON.parse(localStorage.getItem("quote_cache") || "[]");
                if (cache.length > 0) {
                    return cache[Math.floor(Math.random() * cache.length)];
                }
            } catch (e) {
                console.error("Cache fallback error:", e);
            }
        }
        return null;
    }
}
