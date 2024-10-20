import React, { useReducer, ReactNode, createContext, useContext, useCallback, useEffect } from 'react';

type FilterObj = {
    read: string[];
    favourites: string[];
    readStateActive: boolean;
    favouriteStateActive: boolean;
    unreadStateActive: boolean;
};

type ActionType =
    | { type: 'ADD_READ'; payload: string }
    | { type: 'REMOVE_READ'; payload: string }
    | { type: 'ADD_FAVOURITE'; payload: string }
    | { type: 'REMOVE_FAVOURITE'; payload: string }
    | { type: 'SET_READ_STATE'; payload: boolean }
    | { type: 'SET_FAVOURITE_STATE'; payload: boolean }
    | { type: 'SET_UNREAD_STATE'; payload: boolean };


const initialState: FilterObj = JSON.parse(
    localStorage.getItem('filterState') ||
    JSON.stringify({
        read: [],
        favourites: [],
        readStateActive: false,
        favouriteStateActive: false,
        unreadStateActive: true,
    })
);

function filterReducer(state: FilterObj, action: ActionType): FilterObj {
    switch (action.type) {
        case 'ADD_READ': {
            const { payload } = action;
            if (state.read.includes(payload)) return state;
            return { ...state, read: [...state.read, payload] };
        }
        case 'REMOVE_READ': {
            const { payload } = action;
            return { ...state, read: state.read.filter(item => item !== payload) };
        }
        case 'ADD_FAVOURITE': {
            const { payload } = action;
            if (state.favourites.includes(payload)) return state;
            return { ...state, favourites: [...state.favourites, payload] };
        }
        case 'REMOVE_FAVOURITE': {
            const { payload } = action;
            return { ...state, favourites: state.favourites.filter(item => item !== payload) };
        }
        case 'SET_READ_STATE': {
            return { ...state, readStateActive: action.payload, favouriteStateActive: false, unreadStateActive: false };

        }
        case 'SET_FAVOURITE_STATE': {
            return { ...state, readStateActive: false, favouriteStateActive: action.payload, unreadStateActive: false };
        }
        case 'SET_UNREAD_STATE': {
            return { ...state, unreadStateActive: action.payload, readStateActive: false, favouriteStateActive: false };
        }
        default:
            throw new Error(`Unhandled action type: ${action}`);
    }
}

const FilterContext = createContext<FilterObj | undefined>(undefined);
const FilterDispatchContext = createContext<React.Dispatch<ActionType> | undefined>(undefined);

function debounce(func: (...args: any[]) => void, delay: number) {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
}
export function FilterProvider(props: { children: ReactNode }) {
    const [state, dispatch] = useReducer(filterReducer, initialState);

    const saveStateToLocalStorage = useCallback(
        debounce((state: FilterObj) => {
            localStorage.setItem('filterState', JSON.stringify(state));
        }, 300),
        []
    );
    useEffect(() => {
        saveStateToLocalStorage(state);
    }, [state, saveStateToLocalStorage]);

    return (
        <FilterContext.Provider value={state}>
            <FilterDispatchContext.Provider value={dispatch}>
                {props.children}
            </FilterDispatchContext.Provider>
        </FilterContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFilter() {
    const context = useContext(FilterContext);
    if (context === undefined) {
        throw new Error('useFilter must be used within a FilterProvider');
    }
    return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFilterDispatch() {
    const context = useContext(FilterDispatchContext);
    if (context === undefined) {
        throw new Error('useFilterDispatch must be used within a FilterProvider');
    }
    return context;
}

FilterContext.displayName = 'FilterContext';
