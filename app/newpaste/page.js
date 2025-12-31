"use client"

import React, { useState } from 'react'

const page = () => {
    const [data, setData] = useState({});
    const [url, setUrl] = useState("");
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    const submitPaste = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/pastes', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'x-test-now-ms': Date.now(),
            }
        });

        const resData = await res.json();
        if (resData.url) {
            setUrl(resData.url);
        } else {
            setError(resData.error);
        }
    }

    return (
        <main className='w-full flex flex-col items-center justify-start py-8 px-3 gap-5'>
            <h1 className='text-3xl font-bold py-3'>Create New Paste</h1>
            {
                error && (
                    <>
                        <h1 className='text-xl font-bold py-3 text-red-500'>{error}</h1>
                    </>
                )
            }
            <form className='flex flex-col border-2 border-neutral-200 w-full lg:max-w-[60%] p-4 gap-4' onSubmit={(e) => submitPaste(e)}>
                <label>Paste Text:</label>
                <textarea
                    name='content'
                    className='border-2 p-3 border-neutral-200 bg-neutral-100 w-full rounded-md'
                    placeholder='Enter you paste text here...'
                    onChange={handleChange}
                />
                <label>Active for Seconds:</label>
                <input
                    type='Number'
                    name='ttl_seconds'
                    placeholder='Active for seconds...'
                    onChange={handleChange}
                    className='border-2 p-3 border-neutral-200 bg-neutral-100 w-full rounded-md'
                />
                <label>Maximun times you want to see:</label>
                <input
                    type='Number'
                    name='max_views'
                    placeholder='Maximun times you want to view...'
                    onChange={handleChange}
                    className='border-2 p-3 border-neutral-200 bg-neutral-100 w-full rounded-md'
                />
                <button
                    type='submit'
                    className='px-6 rounded-full bg-blue-700 text-lg font-bold text-white py-6'
                >Create Paste</button>
            </form>

            {
                url && (
                    <div className='w-full lg:max-w-[60%] p-4 bg-green-100 border-2 border-green-400 rounded-md'>
                        <p className='font-medium'>Your paste has been created! Access it at: </p>
                        <p className='font-bold'>{url}</p>
                    </div>
                )
            }
            {
                data.content && (
                    <div className='w-full lg:max-w-[60%] p-4 bg-blue-100 border-2 border-blue-400 rounded-md'>
                        <p className='font-medium'>Preview:</p>
                        <p className='whitespace-pre-line'>{data.content}</p>
                    </div>
                )
            }
        </main>
    )
}

export default page