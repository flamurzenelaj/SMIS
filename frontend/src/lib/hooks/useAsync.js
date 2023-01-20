import { useCallback, useEffect, useState } from "react";

export default function useAsync(callback, dependencies = []) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState()
    const [response, setResponse] = useState()

    const callbackMemoized = useCallback(() => {
        setLoading(true);
        setError(undefined);
        setResponse(undefined);
        callback()
            .then(setResponse)
            .catch(setError)
            .finally(() => setLoading(false));
    }, dependencies)

    useEffect(() => {
        callbackMemoized();

        return () => {
            callbackMemoized();
        }
    }, [callbackMemoized]);
    
    return { loading, error, response }
}