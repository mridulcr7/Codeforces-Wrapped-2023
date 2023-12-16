import { useState } from 'react'
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (username) => {
        setIsLoading(true)
        setError(null)

        const userhandle = "https://codeforces.com/api/user.info?handles=" + username;
        const response = await fetch(userhandle);

        const json = await data.json();

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update the auth context
            console.log(json);

            dispatch({ type: 'LOGIN', payload: json })

            // update loading state
            setIsLoading(false)
        }
    }

    return { login, isLoading, error }
}