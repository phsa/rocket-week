import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

import './Home.css';

import logo from '../vectors/tindev_logo.svg';
import like from '../vectors/like.svg';
import dislike from '../vectors/dislike.svg';

import DeveloperService from '../services/DeveloperService';

export default function Home({ match }) {
    const [developers, setDevelopers] = useState([])
    const developerService = new DeveloperService();

    useEffect(
        () => {
            async function loadDevelopers() {
                const response = await developerService.getDevelopers(match.params.id);

                setDevelopers(response.data);
            }

            loadDevelopers();
        },
        [match.params.id, developerService]
    );

    async function handleLike(id) {
        await developerService.handleLike(match.params.id, id);

        setDevelopers(developers.filter(user => user._id !== id));
    };

    async function handleDislike(id) {
        await developerService.handleDislike(match.params.id, id);

        setDevelopers(developers.filter(user => user._id !== id));
    };

    return (
        <div className="home-container">
            <Link to="/">
                <img src={logo} alt="Tindev" />
            </Link>
            {developers.length > 0 ? (
                <ul>
                    {developers.map(developer => (
                        <li key={developer._id}>
                            <img src={developer.avatar_address} alt={developer.name} />
                            <footer>
                                <strong>{developer.name}</strong>
                                <p>{developer.bio}</p>
                            </footer>

                            <div className="buttons">
                                <button type="button" onClick={() => handleDislike(developer._id)}>
                                    <img src={dislike} alt="dislike" />
                                </button>
                                <button type="button" onClick={() => handleLike(developer._id)}>
                                    <img src={like} alt="like" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                    <div className="empty">Acabou :(</div>
                )}
        </div>
    );
}