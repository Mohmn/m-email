import React from 'react';
import EmailAvatar from '../email-avatar';
import { formatDate } from '../../utils';
import useFetch from '../../hooks/useFetch';
import { getEmailContent } from '../../api';
import { useFilterDispatch } from '../../contexts/filterContext';


type Props = {
    email: {
        id: string,
        from: {
            email: string,
            name: string
        },
        date: number,
    }

    onClose?: (id: string) => void
}




export function EmailCard(props: Props) {
    const filterDispatch = useFilterDispatch();
    const { data, error, loading } = useFetch(getEmailContent, [props.email.id])

    if (error) {
        return (
            <div className='flex flex-row items-center justify-center h-screen'>
                <p> something went wrong </p>
            </div>
        )
    }
    if (loading) {
        return (
            <div className='flex flex-row items-center justify-center h-screen text-accent'>
                loading ...
            </div>
        )
    }
    return (
        <div className="flex flex-row bg-background  rounded-lg shadow-md gap-6 border-gray border-4 pl-2 pr-2 pt-3 pb-4 mt-6">
            <EmailAvatar alphabet={props.email.from.name[0]} />
            <div>
                <div className='flex flex-col gap-4'>
                    <div className="flex flex-row justify-between">
                        <span className='text-gray-700 text-xl'>
                            {props.email.from.name}
                        </span>
                        <div className='flex gap-2'>
                            <button
                                className=' rounded-2xl text-white bg-accent text-s p-1 '
                                onClick={() => filterDispatch({ type: 'ADD_FAVOURITE', payload: props.email.id })}
                            >
                                mark as favourite
                            </button>
                            <div
                                className="relative w-4 h-4 flex items-center justify-center md:hidden"
                                onClick={() => {
                                    if (props.onClose) props.onClose(props.email.id)
                                }
                                }>
                                <span className="absolute inset-0 bg-black w-[2px] rotate-45"></span>
                                <span className="absolute inset-0 bg-black w-[2px] -rotate-45"></span>
                            </div>
                        </div>
                    </div>
                    <span className="text-gray-400 text-s">{formatDate(props.email.date)}</span>
                    <p className="text-gray-400 text-s" dangerouslySetInnerHTML={{ __html: data!.body as string }} >

                    </p>
                </div>
            </div>


        </div >
    );
};

export default EmailCard;
