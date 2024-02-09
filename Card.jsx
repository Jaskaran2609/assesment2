import React, { useEffect, useState } from 'react';
import "./Card.css"
import Loader from './Loader';

const Card = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch("https://randomuser.me/api/?page=1&results=1&seed=abc");
            const dataFetched = await response.json();
            setData(dataFetched.results); // Assuming 'results' contains the data you want
            setLoading(false);
        } catch(error) {
            console.log("Something went wrong while fetching the data:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array means it will only run once after the initial render

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className='content'>
                    <div className="card">
                        <div className='image'>
                            <img src={data[0]?.picture.large} className="image" alt="user" />
                        </div>

                        <div className='details'>
                            <div id='field'></div>

                            <div id='field'>
                                <div> {data[0]?.name?.first} </div>
                                <div>{data[0]?.name?.last} </div>
                            </div>

                            <div id='field'>
                                <label htmlFor="gender"> Gender </label>
                                <div id='gender'> {data[0]?.gender} </div>
                            </div>

                            <div id='field'>
                                <label htmlFor="phone"> Phone </label>
                                <div id='phone'> {data[0]?.phone} </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Card;
