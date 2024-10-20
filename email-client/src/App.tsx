import React, { useCallback, useMemo, useRef, useState } from 'react';
import EmailListCard from './components/email-list-card';
import EmailCard from './components/email-card';
import FilterButton from './components/Filter-button';
import usePagination from './hooks/usePaginations';
import { callEmailListApi } from './api';
import useInfiniteScroll from './hooks/useInfiniteScroll';
import { useFilter, useFilterDispatch } from './contexts/filterContext';

function App() {
  const [emailClickedId, setEmailClickedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const memoizedApiCall = useCallback((page: number) => callEmailListApi(page), []);
  const { data, loading, loadMore } = usePagination(memoizedApiCall);
  const filter = useFilter();
  const filterDispatch = useFilterDispatch();

  useInfiniteScroll(scrollRef, loadMore);
  const gridClass = emailClickedId
    ? 'grid-cols-1 md:grid-cols-[2fr_3fr] '
    : 'grid-cols-1';

  const selectedEmail = useMemo(() => data.find(e => e.id === emailClickedId), [emailClickedId, data]);

  const handleUnreadFilter = () =>
    filterDispatch({ type: 'SET_UNREAD_STATE', payload: !filter.unreadStateActive });

  const handleReadFilter = () =>
    filterDispatch({ type: 'SET_READ_STATE', payload: !filter.readStateActive });

  const handleFavouriteFilter = () =>
    filterDispatch({ type: 'SET_FAVOURITE_STATE', payload: !filter.favouriteStateActive });

  const filteredData = useMemo(() => {
    if (filter.readStateActive) return data.filter(email => filter.read.includes(email.id));
    if (filter.unreadStateActive) return data.filter(email => !filter.read.includes(email.id));
    if (filter.favouriteStateActive) return data.filter(email => filter.favourites.includes(email.id));
    return data;
  }, [data, filter]);
  return (
    <>
      <div className='flex  items-center gap-5 text-center ml-6 mt-10'>
        <span className='text-lg'>Filter By:</span>
        <div className='flex gap-6'>
          <FilterButton onClick={handleUnreadFilter} filterActive={filter.unreadStateActive}>
            Unread
          </FilterButton>
          <FilterButton onClick={handleReadFilter} filterActive={filter.readStateActive}>
            Read
          </FilterButton>
          <FilterButton onClick={handleFavouriteFilter} filterActive={filter.favouriteStateActive}>
            Favourites
          </FilterButton>
        </div>
      </div>

      <div className={`h-screen grid ${gridClass} p-6 gap-5`}>
        <div className={`${emailClickedId ? 'hidden ' : ''} sm:block`}>
          {filteredData.map((email, index) => (
            <div key={email.id} ref={index === data.length - 2 ? scrollRef : null}>
              <EmailListCard
                email={email}
                onClick={(id) => {
                  setEmailClickedId(id);
                  filterDispatch({ type: 'ADD_READ', payload: id });
                }}
              />
            </div>
          ))}
        </div>
        {(emailClickedId && selectedEmail) ? (
          <div className='sticky top-0 z-10'>
            <EmailCard
              email={{
                id: selectedEmail.id,
                from: selectedEmail.from,
                date: selectedEmail.date,
              }}
              onClose={(id) => {
                setEmailClickedId(null)
              }}
            />
          </div>
        ) : null
        }
      </div>
    </>
  );
}

export default App;
