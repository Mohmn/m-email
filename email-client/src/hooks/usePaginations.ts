import { useState, useEffect, useRef } from 'react';

interface PaginationResult<T> {
    data: T[];
    loading: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any;
    loadMore: () => void;
    resetPagination: () => void;
}

export default function usePagination<T>(apiCall: (page: number) => Promise<PaginatedApiResponse<T>>): PaginationResult<T> {
    const [page, setPage] = useState<number>(1);
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [error, setError] = useState<any>(null);
    const totalRes = useRef(0);

    useEffect(() => {
        if (page > 0) {
            console.log('api call', page);
            const fetchData = async () => {
                setLoading(true);
                try {
                    const response = await apiCall(page);
                    console.log('respp', response, data.length, page)
                    totalRes.current = response.totalCount;
                    setData(prevData => [...prevData, ...response.data]);
                } catch (err) {
                    setError(err);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }

    }, [apiCall, page]);

    const loadMore = () => {
        console.log('loading more', data.length, totalRes.current, page)
        if (data.length >= totalRes.current) return;
        if (loading) return
        setPage(prevPage => prevPage + 1);
    };

    const resetPagination = () => {
        setPage(1);
        setData([]);
        setError(null);
    };

    return { data, loading, error, loadMore, resetPagination };
}
