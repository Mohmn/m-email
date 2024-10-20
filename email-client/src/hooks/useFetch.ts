import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

interface FetchResult<T> {
    data: T | null;
    loading: boolean;
    error: any;
}

export default function useFetch<T, A extends unknown[]>(
    apiCall: (...args: A) => Promise<T>,
    args: A
): FetchResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    const isMountedRef = useRef(true);

    const memoizedArgs = useMemo(() => args, [JSON.stringify(args)]);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await apiCall(...memoizedArgs);
            if (isMountedRef.current) {
                setData(result);
            }
        } catch (err) {
            if (isMountedRef.current) {
                setError(err);
            }
        } finally {
            if (isMountedRef.current) {
                setLoading(false);
            }
        }
    }, [apiCall, memoizedArgs]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    return { data, loading, error };
}
