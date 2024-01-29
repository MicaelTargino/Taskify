"use client"

import { History, Pause, Play, Settings, SkipBack, SkipForward, TimerReset } from "lucide-react";
import {useState, useRef, useEffect} from "react";
import { cn } from "@/lib/utils";
import { useSearchParams } from 'next/navigation'
 


const Pomodoro = ({url}: {url:string}) => {
    const [workDuration, setWorkDuration] = useState<number>(45 * 60); // 25 minutes in seconds
    const [breakDuration, setBreakDuration] = useState<number>(15 * 60); // 5 minutes in seconds
    const [timeLeft, setTimeLeft] = useState<number>(workDuration);
    const [isWorking, setIsWorking] = useState<boolean>(true); // Flag to track work/break state
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [rounds, setRounds] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const timerRef = useRef<number | null>(null);
    const [modalViewable, setModalViewable] = useState(false);
    const [settingsModalViewable, setSettingsModalViewable] = useState(false);
    const [tickMute, setTickMute] = useState(false);
    const [alertMute, setAlertMute] = useState(false);

   
    const searchParams = useSearchParams();
    const imgurl = searchParams.get('imgurl');

    const handleTickMute = (mute: boolean) => {
        setTickMute(mute);
    } 

    const handleAlertMute = (mute: boolean) => {
        setAlertMute(mute);
    } 

    useEffect(() => {
        resetTimer();
    }, []);

    
    function playAudio(type: string) {
    let audio;
    switch (type) {
      case 'tick':
         if (tickMute) return false;
         audio = new Audio('/static_audio_tick.mp3');
        break;
      case 'done':
        if (alertMute) return false;
        audio = new Audio('/alert-long-break.mp3');
        break
    }
    audio?.play();
  }


  const finish = () => {
    playAudio('done');
    setWorkDuration(45 * 60);
    setBreakDuration(45 * 15);
    setTimeLeft(45 * 60);
    setIsWorking(true);
    setIsRunning(false);
    setRounds(0);
    setPercentage(0);
    setModalViewable(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }

  const addRound = async () => {
    const url = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'default';
    // const roundCat = workDuration == (45 * 60) ? 0 : 1
    // const res = url != 'default' ? await axios.post(url + `api/pomodoro/addPomodoroRound/${user?.id}/` + Math.floor(workDuration / 60), {}, {
    //   headers: {
    //     Authorization: Authorization
    //   }
    // }) : {data: 'seta a env pow'}
    // const data = res.data;
    // if (data.status_code == 200) {
    setRounds(rounds + 1)
    // } else {
    //   console.log('error in saving rounds')
    }
  

  const jumpRound = () => {
    playAudio('done');
    setTimeLeft(0);
    playAudio('done')
    if (isWorking) {
    //   addRound();
      setRounds(rounds)
    }
  }

  useEffect(() => {
    if (timeLeft > 0) {
      const percentage = isWorking ? Math.ceil(((workDuration - timeLeft) / workDuration) * 100) : Math.ceil(((breakDuration - timeLeft) / breakDuration) * 100);
      setPercentage(percentage);
    } else {
      playAudio('done');
      if (isWorking) {
        addRound()
        // setRounds(rounds + 1)
        setIsWorking(false);
        setTimeLeft(breakDuration);
      } else {
        setIsWorking(true);
        setTimeLeft(workDuration);
      }

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setIsRunning(false);
    }
  }, [timeLeft])

  const startTimer = () => {
    setIsRunning(true);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft >= 1) {
          // const percentage = isWorking ? (workDuration - timeLeft) / workDuration : (breakDuration - timeLeft) / breakDuration
          // console.log(workDuration - timeLeft)
          // setPercentage(percentage)
          // const percentage = isWorking ? Math.ceil(((workDuration - timeLeft) / workDuration) * 100) : Math.ceil(((breakDuration - timeLeft) / breakDuration) * 100);
          // setPercentage(percentage);
          if (prevTimeLeft <= 5 ) playAudio('tick');
          return prevTimeLeft - 1;
        } else {
          playAudio('done')
          if (isWorking) {
            addRound();
            // setRounds(rounds + 1)
            setIsWorking(false);
            setTimeLeft(breakDuration);
          } else {
            setIsWorking(true);
            setTimeLeft(workDuration);
          }

          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          setIsRunning(false);
          return prevTimeLeft;
        }
      });
    }, 1000);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const resetTimer = () => {
    // setIsWorking(true);
    if (isWorking == true) {
      setTimeLeft(workDuration);
    } else {
      setTimeLeft(breakDuration)
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    // startTimer();
  };

  function closeModal() {
    setModalViewable(false);
    setSettingsModalViewable(false);
    return true
  }

  function changePomodoroCategory(workTime: number, breakTime: number) {
    console.log(workTime, breakTime);
    setWorkDuration(workTime * 60);
    setBreakDuration(breakTime * 60);
    setTimeLeft(workTime * 60);
  }

    return (
        <main className='relative pt-16 md:pt-16 h-full flex flex-col items-center justify-start bg-no-repeat bg-cover bg-center' style={{backgroundImage: `url(${url})`}}>

                <span className='flex rounded-md items-center w-full relative flex-col sm:flex-row justify-center gap-4 mb-4 mt-2'>
                {!modalViewable && !settingsModalViewable && <h2 className='font-poppins absolute top-0 left-8 text-slate-800 font-semibold bg-white px-4 py-2 rounded-md shadow-lg text-xl'>Rounds: <span className='text-green-500 text-xl'>{rounds}</span></h2> }
                    {!modalViewable &&  <nav className='flex flex-row items-center justify-center gap-0'>
                      {workDuration == (45 * 60) ? (
                        <>
                        <button disabled={modalViewable} className='shadow-lg border-2 rounded-md rounded-tr-none rounded-br-none px-4 py-2 text-white bg-sky-700 border-sky-700'>45/15</button> 
                        </>
                        ) : (
                      <>
                      <button disabled={modalViewable} className='shadow-lg border-2 rounded-md rounded-tr-none rounded-br-none px-4 py-2 text-sky-700 drop-shadow-2xl bg-white border-sky-700' onClick={() => changePomodoroCategory(45,15)}>45/15</button>                     
                      </>
                      )}
                      {workDuration == (50 * 60) ? (
                        <button disabled={modalViewable} className='shadow-lg border-2 rounded-md rounded-tl-none rounded-bl-none px-4 py-2 text-white border-sky-700 bg-sky-700 '>50/10</button> 
                      ) : (
                        <button disabled={modalViewable} className='shadow-lg border-2 rounded-md rounded-tl-none rounded-bl-none px-4 py-2 text-sky-700 bg-white drop-shadow-2xl border-sky-700' onClick={() => changePomodoroCategory(50,10)}>50/10</button>
                      )}
                      {/* {(workDuration != (45 * 60) && workDuration != (50 * 60) || settingsModalViewable) ? (
                        <button  disabled={modalViewable} onClick={() => setSettingsModalViewable((old) => !old)} className=' ml-2 border-2 rounded-md px-4 py-2 text-slate-200 border-purple-500 bg-purple-500 hover:bg-transparent hover:text-purple-500'> <Settings size={21} /> </button> 
                      ) : (
                        <button disabled={modalViewable} onClick={() => setSettingsModalViewable((old) => !old)} className='ml-2 border-2 rounded-md px-4 py-2 text-purple-500 drop-shadow-2xl border-purple-500 hover:bg-purple-500 hover:text-slate-200'> <Settings size={21} /> </button>
                      )} */}
                    </nav>}
                </span>
                {!settingsModalViewable && (  
                <section className='h-full flex flex-col items-center justify-center gap-8'>
                    <main className='flex flex-col items-center justify-center gap-6'>
                          { !modalViewable && (
                            <>
                          <p className='shadow-outline relative z-10 -mt-6 text-9xl bg-transparent text-stroke-black drop-shadow-md text-zinc-100 flex-col items-center justify-center w-80 rounded-full'>
                            {/* {isWorking ? 'Work Time' : 'Break Time'}: */} 
                            <span className='relative z-10 flex flex-col items-center justify-center gap-0'>
                               {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}
                               <span style={{ width: 2 * percentage + 'px' }} className="h-4 bg-purple-500 rounded-md"></span>
                            </span>
                            {/* {(timeLeft != workDuration || rounds != 0 ) && <button className=' px-3 py-1 rounded-md shadow-md drop-shadow-2xl text-lg absolute bottom-6 left-[50%] -translate-x-[50%] text-slate-200 bg-green-500' onClick={finish}>Finish</button>} */}
                           </p>
                          <span className='flex items-center justify-center gap-2'>
                          {isRunning && <button className='px-6 py-2 rounded-md shadow-md bg-slate-700 text-white hover:drop-shadow-xl' onClick={() => {resetTimer(); startTimer()}}><SkipBack /></button>}  

                            <button onClick={isRunning ? pauseTimer : startTimer} className={isRunning ?'border-2 border-green-500 text-green-500 px-6 py-2 rounded-md shadow-md'  : ' bg-green-500 text-zinc-200 px-6 py-2 rounded-md shadow-md'}> 
                              {isRunning ? <Pause /> 
                               : <Play />}
                            </button>
                               {isRunning && <button className='px-6 py-2 rounded-md shadow-md  bg-sky-700 text-white hover:drop-shadow-xl' onClick={jumpRound}><SkipForward /></button>}
                          </span>
                          </>
                          ) }
                      </main>
                </section>
                )}
        </main>
    )}

export default Pomodoro