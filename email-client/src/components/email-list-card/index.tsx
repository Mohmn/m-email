import React from 'react';
import EmailAvatar from '../email-avatar';
import { formatDate } from '../../utils';
import { useFilterDispatch } from '../../contexts/filterContext';


type Props = {
    email: {
        id: string,
        from: {
            email: string,
            name: string
        },
        date: number,
        subject: string,
        short_description: string

    }
    onClick?: (id: string) => void;
}


function FromPart(props: Props['email']['from']) {
    return (
        <div className="flex flex-row gap-2">
            <span className='text-gray-400'>
                From:
            </span>
            <span className="text-gray-500 ">
                {props.name} &lt;{props.email}&gt;
            </span>
        </div>
    )
}

function SubjectPart(props: { subject: string }) {
    return (
        <div className="flex flex-row gap-2">
            <span className='text-gray-400'>
                Subject:
            </span>
            <span className="text-gray-500">
                {props.subject}
            </span>
        </div>
    )
}

export function EmailListCard(props: Props) {
    const filterDispatch = useFilterDispatch();
    return (
        <article
            className="flex  bg-gray-100 p-4 rounded-lg shadow-md gap-4  border-2 hover:border-accent hover:bg-readBackground pl-2 pr-2 pt-3 pb-4 mt-6"
            onClick={() => { if (props.onClick) props.onClick(props.email.id) }}
        >

            <EmailAvatar alphabet={props.email.from.name[0]} />

            <div className="flex-1">
                <div className="flex flex-col ">
                    <FromPart {...props.email.from} />
                    <SubjectPart subject={props.email.subject} />
                </div>

                <p className="text-gray-600 mt-1 line-clamp-1">
                    {props.email.short_description}
                </p>

                <div className="flex  items-center mt-2 text-sm gap-3">
                    <span className="text-gray-400">{formatDate(props.email.date)}</span>
                    <button
                        className="text-red-500 hover:underline"
                        onClick={(e) => {
                            e.stopPropagation()
                            filterDispatch({ type: 'ADD_FAVOURITE', payload: props.email.id })
                        }}
                    >
                        Favorite
                    </button>
                </div>
            </div>
        </article >
    );
};

export default EmailListCard;
