import { useState } from 'react'
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (username) => {
        setIsLoading(true);
        setError(null);

        try {
            const userhandle = "https://codeforces.com/api/user.info?handles=" + username;
            const response = await fetch(userhandle);
            const json = await response.json();

            if (json.status == "OK") {
                // save the user to local storage
                localStorage.setItem('user', JSON.stringify(json))

                // update the auth context

                dispatch({ type: 'LOGIN', payload: json })

                // update loading state
                setIsLoading(false)
            }
            else {
                setIsLoading(false)
                setError(json.error)
            }
            
        }
        catch (err) {
            setIsLoading(false)
            setError(err.message);
        }
   }
    return { login, isLoading, error }
}