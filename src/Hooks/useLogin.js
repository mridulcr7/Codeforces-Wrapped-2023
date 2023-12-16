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
        //console.log(response);
        const json = await response.json();
        // console.log(json);
        
        if (json.status == "OK") {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update the auth context
            console.log(json);

            dispatch({ type: 'LOGIN', payload: json })

            // update loading state
            setIsLoading(false)
        }
        else {
            setIsLoading(false)
            setError(json.error)
        }
    }

    return { login, isLoading, error }
}