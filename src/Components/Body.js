import React from 'react'
import { useState, useEffect } from "react";
import { useAuthContext } from '../Hooks/useAuthContext';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Header from "./Header"
 

ChartJS.register(ArcElement, Tooltip, Legend);

const Body = () => {
  const { user } = useAuthContext();
  const handle = user?.result[0]?.handle;
  const [maincontest, setmaincontest] = useState(null);
  const [totalcontest, settotalcontest] = useState(null);
  const [bestrank, setbestrank] = useState("Hello");
  const [highestrating, sethighestrating] = useState("Hello");
  const [highestupgrade, sethighestupgrade] = useState("Hello");
  const [highestdowngrade, sethighestdowngrade] = useState("Hello");
  const [contestproblems, setcontestproblems] = useState("Hello");
  const [highestratedproblem, sethighestratedproblem] = useState("Hello");
  const [favcontest, setfavcontest] = useState("Hello");
  const [mostproblemscontest, setmostproblemscontest] = useState("Hello");
  const [favtopic, setfavtopic] = useState("Hello");
  const [mostfavtopic, setmostfavtopic] = useState("Hello");
  const [maxattempts, setmaxattempts] = useState("Hello");
  const [singleattempt, setsingleattempt] = useState("Hello");
  const [worstrank, setworstrank] = useState("Hello");
  const [topic, settopic] = useState([]);


  //const [maxattemptsproblem, setmaxattemptsproblem] = useState("Hello");

  let t1 = null, t2 = null, t3 = null, t4 = null;
  let t5 = 0, t6 = 0, t7 = [], t8 = 0, t9 = [], t10 = 0, t11 = 0, t12 = 0, t13 = null, t14 = [];
  let mp1 = {}, mp2 = {}, mp3 = {}, mp4 = {};

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data1 = await fetch("https://codeforces.com/api/user.rating?handle=" + handle,);//  userallcontest
    const data2 = await fetch("https://codeforces.com/api/contest.list?gym=false");// allcontest
    const data3 = await fetch("https://codeforces.com/api/user.status?handle=" + handle);// all problems
    const json1 = await data1.json();
    const json2 = await data2.json();
    const json3 = await data3.json();
    console.log(json3?.result);
    let c = 0;

    let temp = [];
    for (let i in json1?.result) {
      for (let j in json2?.result) {
        const item1 = json1?.result[i];
        const item2 = json2?.result[j];
        if (item1?.contestId === item2?.id) {
          let ms = item2?.startTimeSeconds * 1000;
          const date = new Date(ms);
          const yr = date.getFullYear();
          if (yr === 2023) {
            temp.push(item1);
          }
        }

      }
    }

    for (let i in json3?.result) {
      for (let j in temp) {
        let item1 = json3?.result[i];
        let item2 = temp[j];
        if (item1?.author?.contestId == item2?.contestId && item1?.author?.participantType == "CONTESTANT" && item1?.verdict == "OK") {
          mp3[item1?.problem?.name] = 1;
          t5++;
          if (item1?.problem?.rating != undefined && item1?.problem?.rating > t6) {
            t6 = item1?.problem?.rating;
          }
          if (mp1[item2?.contestId] == undefined) {
            mp1[item2?.contestId] = 1;
          }
          else {
            mp1[item2?.contestId]++;
          }
          for (let k in item1?.problem?.tags) {
            let tag = item1?.problem?.tags[k];
            if (mp2[tag] == undefined) {
              mp2[tag] = 1;
            }
            else {
              mp2[tag]++;
            }
          }
        }
        if (item1?.author?.contestId == item2?.contestId && item1?.author?.participantType == "CONTESTANT" && item1?.verdict !== "OK") {
          if (mp4[item1?.problem?.name] == undefined) {
            mp4[item1?.problem?.name] = 1;
          }
          else {
            mp4[item1?.problem?.name]++;
          }
        }
      }
    }
    for (let i in temp) {
      let item = temp[i];
      if (t1 == null || item.rank < t1) {
        t1 = item.rank;
      }
      if (t13 == null || item.rank > t13) {
        t13 = item.rank;
      }
      if (t2 == null || Number(item?.newRating) - Number(item?.oldRating) > t2) {
        t2 = Number(item?.newRating) - Number(item?.oldRating);
      }
      if (t3 == null || Number(item?.oldRating) - Number(item?.newRating) > t3) {
        t3 = Number(item?.oldRating) - Number(item?.newRating);
      }
      if (t4 == null || Number(item?.newRating) > t4) {
        t4 = Number(item?.newRating);
      }
    }

    for (let key in mp1) {
      if (mp1[key] > t8) {
        t8 = mp1[key];
      }
    }

    for (let key in mp2) {
      if (mp2[key] > t10) {
        t10 = mp2[key];
      }
    }

    for (let key in mp1) {
      if (mp1[key] == t8) {
        t7.push(key);
      }
    }

    for (let key in mp2) {
      if (mp2[key] == t10) {
        t9.push(key);
      }
    }

    for (let key in mp4) {
      if (mp4[key] > t11 && mp3[key] == 1) {
        t11 = mp4[key];
      }
    }

  
    for (let key in mp3) {
      if (mp4[key] === undefined) {
        t12++;
      }
    }

    for (let key in mp2) {
      let ob = {
        tag: key,
        problems: mp2[key]
      }
      t14.push(ob);
    }


    setmaincontest(temp);
    setbestrank(t1);
    sethighestupgrade(t2);
    sethighestdowngrade(t3);
    sethighestrating(t4);
    setcontestproblems(t5);
    sethighestratedproblem(t6);
    setfavcontest(t7);
    setmostproblemscontest(t8);
    setfavtopic(t9);
    setmostfavtopic(t10);
    setmaxattempts(t11);
    setsingleattempt(t12);
    setworstrank(t13);
    settopic(t14);


  }

  return maincontest === null ? (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <div className="text-4xl font-bold">Rendering...</div>
    </div>
  ) : (
      <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-8 rounded-lg shadow-2xl transition-all duration-500">
        <Header/>
      <h1 className="text-5xl mb-6 font-extrabold text-center">Contest Info</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="pb-4 border-b border-gray-700">
            <h2 className="text-3xl mb-2 font-semibold">No. of Contests:</h2>
            <p className="text-2xl">{maincontest.length}</p>
          </div>
          <div className="pb-4 border-b border-gray-700">
            <h2 className="text-3xl mb-2 font-semibold">Best Rank:</h2>
            <p className="text-2xl">{bestrank}</p>
          </div>
          <div className="pb-4 border-b border-gray-700">
            <h2 className="text-3xl mb-2 font-semibold">Worst Rank:</h2>
            <p className="text-2xl">{worstrank}</p>
          </div>
          <div className="pb-4 border-b border-gray-700">
            <h2 className="text-3xl mb-2 font-semibold">Highest Rating Upgrade:</h2>
            <p className="text-2xl">+{highestupgrade}</p>
          </div>
          <div className="pb-4 border-b border-gray-700">
            <h2 className="text-3xl mb-2 font-semibold">Highest Rating Downgrade:</h2>
            <p className="text-2xl">-{highestdowngrade}</p>
          </div>
          <div className="pb-4 border-b border-gray-700">
            <h2 className="text-3xl mb-2 font-semibold">Highest Rating Achieved:</h2>
            <p className="text-2xl">{highestrating}</p>
          </div>
        </div>
        <div>
          <div className="pb-4 border-b border-gray-700">
            <h2 className="text-3xl mb-2 font-semibold">Total Problems Solved in Contest</h2>
            <p className="text-2xl">{contestproblems}</p>
          </div>
          <div className="pb-4 border-b border-gray-700">
            <h2 className="text-3xl mb-2 font-semibold">Problems Solved in Single Attempt:</h2>
            <p className="text-2xl">{singleattempt}</p>
          </div>
          <div className="pb-4 border-b border-gray-700">
            <h2 className="text-3xl mb-2 font-semibold">Maximum Attempts to Solve a Problem:</h2>
            <p className="text-2xl">{maxattempts + 1}</p>
          </div>
          <div className="pb-4 border-b border-gray-700">
            <h2 className="text-3xl mb-2 font-semibold">Highest Rated Problem Solved:</h2>
            <p className="text-2xl">{highestratedproblem}</p>
          </div>
          <div className="pb-4 border-b border-gray-700">
            <h2 className="text-3xl mb-2 font-semibold">Most Problems Solved in a Contest:</h2>
            <p className="text-2xl">{mostproblemscontest}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="w-1/3">
          <h2 className="text-3xl font-semibold mb-4">Topic-wise Breakdown</h2>
          <div className="flex flex-wrap gap-2">
            {topic.map((item, index) => (
              <div key={index} className="flex items-center mb-2">
                <div
                  className="w-6 h-6 rounded-full mr-2"
                />
                <span className="text-sm">{item.tag}:{item.problems}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-2/3">
          <div className="w-96 h-96">
            <Doughnut
              data={{
                labels: topic.map((item) => item.tag),
                datasets: [
                  {
                    data: topic.map((item) => item.problems),
                    backgroundColor: topic.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`),
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );

}



export default Body;