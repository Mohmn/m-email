import React from "react";


export default function EmailAvatar(props: { alphabet: string }) {

    return (
        <>
            <div className="flex h-12 min-w-12 items-center justify-center rounded-full bg-accent">
                <p>{props.alphabet.toUpperCase()}</p>
            </div>
        </>
    )

}