import { useState } from 'react'

export const useGetdata = () => {
    const [json1, setuserContest] = useState(null);
    const [json2, setallContest] = useState(null);
    const [json3, setallProblems] = useState(null);
    const [error, setError] = useState(null)

    const getData = async (handle) => {
        try {
            const data1 = await fetch("https://codeforces.com/api/user.rating?handle=" + handle,);//  userallcontest
            const data2 = await fetch("https://codeforces.com/api/contest.list?gym=false");// allcontest
            const data3 = await fetch("https://codeforces.com/api/user.status?handle=" + handle);// all problems
            const j1 = await data1.json();
            const j2 = await data2.json();
            const j3 = await data3.json();
            setuserContest(j1);
            setallContest(j2);
            setallProblems(j3);
        }
        catch (err) {
            setError(err.message);
        }
    }
    return { getData, json1, json2, json3, error };
}