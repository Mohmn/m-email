import { useEffect, useRef, RefObject } from 'react';

const useInfiniteScroll = (
    ref: RefObject<HTMLElement | null>,
    callBackFunc: () => void
) => {
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if (!ref.current || !callBackFunc) return;

        const element = ref.current;

        observerRef.current = new IntersectionObserver(
            entries => {
                console.log('entr', entries[0])
                if (entries[0].isIntersecting) {
                    callBackFunc()
                }
            },
            { threshold: 1 }
        );


        observerRef.current.observe(element);

        return () => {
            observerRef.current?.disconnect();
        };
    }, [callBackFunc, ref]);
};

export default useInfiniteScroll;
