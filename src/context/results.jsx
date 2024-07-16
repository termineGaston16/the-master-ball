import { createContext, useEffect, useState } from "react";

export const ResultsContext = createContext();

export function ResultsProvider({ children }) {
    const [results, setResults] = useState(null);
    const [types, setTypes] = useState(null)
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [controller, setController] = useState(null);
    const [pages, setPages] = useState({ offset: 0, limit: 10 });

    return (
        <ResultsContext.Provider value={{ results, error, loading, controller, pages, types, setResults, setError, setLoading, setController, setPages, setTypes }}>
            {children}
        </ResultsContext.Provider>
    );
}
