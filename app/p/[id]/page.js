"use client";

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {
    const [content, setContent] = useState("");
    const [remainingViews, setRemainingViews] = useState(0);
    const [expireTime, setExpireTime] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    const { id } = useParams();
    useEffect(() => {
        async function getText() {
            try {
                const res = await fetch(`/api/pastes/${id}`, {
                    headers: {
                        'x-test-now-ms': Date.now(),
                    }
                });
                const data = await res.json();
                console.log("Fetched Paste Data: ", data);
                if (data.content) {
                    setContent(data.content);
                    setRemainingViews(data.remaining_views);
                    setExpireTime(data.expires_at);
                } else {
                    setError(data.error);
                }
                setIsLoading(false);

            } catch (error) {
                console.error("Error fetching paste: ", error.error);
                setError(error.error || "An error occurred while fetching the paste.");
            }

        }
        getText();
    }, [id]);
    return (
        <main className='w-full flex flex-col items-center justify-start py-8 px-3 gap-5'>
            {
                content && (
                    <>
                        <h1 className='font-bold text-3xl'>Your Paste</h1>
                        <div className='w-full lg:max-w-[60%] p-4 bg-blue-100 border-2 border-blue-400 rounded-md'>
                            <p className='whitespace-pre-line'>{content}</p>
                        </div>
                        <div className='w-full lg:max-w-[60%]'>
                            {remainingViews != 0 && <p>{`Remaining Views: ${remainingViews}`}</p>}
                            {expireTime && <p>{`Expires At: ${expireTime}`}</p>}
                        </div>
                    </>
                )
            }

            {isLoading && !error && (
                <>
                    <h1 className='text-xl font-bold py-3'>Loading...</h1>
                </>
            )
            }
            {!isLoading && error && (
                <>
                    <h1 className='text-xl font-bold py-3 text-red-500'>{error}</h1>
                </>
            )
            }

        </main>
    )
}

export default page