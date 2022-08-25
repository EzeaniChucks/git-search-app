import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
    const [githubUser, setGithubUser] = useState(mockUser);
    const [repos, setRepos] = useState(mockRepos);
    const [followers, setFollowers] = useState(mockFollowers);

    //request loading

    const [request, setRequest] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState({ show: false, msg: '' })

    useEffect(() => {
        if (localStorage.getItem('userProfile') === null) {
            return
        } else {
        setGithubUser(JSON.parse(localStorage.getItem('userProfile')))
        setFollowers(JSON.parse(localStorage.getItem('followers')));
            setRepos(JSON.parse(localStorage.getItem('repos'))); 
        }
    }, [])
    const searchGithubUser = async (user) => {
        toggleError()
        setIsLoading(true)
        //setloading
        const response = await axios(`${rootUrl}/users/${user}`)
            .catch(err => console.log(err))

        if (response) {
            setGithubUser(response.data);
            localStorage.setItem('userProfile', JSON.stringify(response.data))

            const { login, followers_url } = response.data;
            //repos
            //https://api.github.com/users/${user}/repos?per_page=100

            //followers
            //https://api.github.com/users/${users}/followers
            //The followers_url above can be used as a shortcut

            await Promise.allSettled([
                axios(`${rootUrl}/users/${login}/repos?per_page=100`),
                axios(`${rootUrl}/users/${login}/followers?per_page=100`)
            ]).then((results) => {
                const [repos, followers] = results;
                const status = 'fulfilled'
                if (repos.status === status) {
                    setRepos(repos.value.data)
                    localStorage.setItem('repos', JSON.stringify(repos.value.data))
                }
                if (followers.status === 'fulfilled') {
                    setFollowers(followers.value.data)
                    localStorage.setItem('followers', JSON.stringify(followers.value.data))
                }
            }).catch((err) => console.log(err))
        } else {
            toggleError(true, 'there is no user with that username')
        }
        checkRateRequest()
        setIsLoading(false)
    }

    const checkRateRequest = () => {
        axios(`${rootUrl}/rate_limit`)
            .then((resp) => {
                let { rate: { remaining } } = resp.data
                setRequest(remaining)
                if (remaining === 0) {
                    toggleError(true, 'You have exceeded your hourly rate limit')
                }
            })
            .catch((err) => console.log(err))
    }

    function toggleError(show = false, msg = '') {
        setError({ show, msg })
    }

    useEffect(
        checkRateRequest
        , []);

    return (
        <GithubContext.Provider value={{
            githubUser,
            repos,
            followers,
            request,
            error,
            searchGithubUser,
            isLoading
        }}>
            {children}
        </GithubContext.Provider>
    )
}

export { GithubProvider, GithubContext };