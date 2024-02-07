"use client"

import { useState, useRef, useEffect, MutableRefObject } from 'react';
import { Pause, Play, SkipBack, SkipForward } from 'lucide-react';

const DEFAULT_WORK_DURATION = 45 * 60; // 45 minutes in seconds
const DEFAULT_BREAK_DURATION = 15 * 60; // 15 minutes in seconds

// Define a type that works for both the browser and Node.js environments
type TimeoutRef =  number | ReturnType<typeof setTimeout> | null;

const Pomodoro = ({ url }: {url: string}) => {
  const [duration, setDuration] = useState({ work: DEFAULT_WORK_DURATION, break: DEFAULT_BREAK_DURATION });
  const [timeLeft, setTimeLeft] = useState(duration.work);
  const [isWorking, setIsWorking] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [rounds, setRounds] = useState(0);
  const timerRef: MutableRefObject<TimeoutRef> = useRef<TimeoutRef>(null);

    useEffect(() => {
      // Initial reset to work duration
        resetTimer();
    }, []);

    useEffect(() => {
        // Handle timeLeft reaching zero
        if (timeLeft <= 0) {
            toggleWorkBreak();
            playAudio('done');
        }
        if (timeLeft >= 1 && timeLeft <= 5) {
          playAudio('tick')
        }
    }, [timeLeft]);

    // Define a type guard for the Timeout object specific to Node.js
    function isTimeout(value: TimeoutRef): value is NodeJS.Timeout {
      return typeof value === 'object' && value !== null;
    }

    const toggleWorkBreak = () => {
        setIsWorking(!isWorking);
        setTimeLeft(isWorking ? duration.break : duration.work);
        if (isWorking) setRounds(rounds + 1);
        setIsRunning(false);
        if (timerRef.current !== null) {
          if (typeof timerRef.current === 'number' || isTimeout(timerRef.current)) {
            clearInterval(timerRef.current as any);
          }
        }
    };

    const playAudio = (type: string) => {
        const audioUrl = type == 'tick' ? '/static_audio_tick.mp3' : '/alert-long-break.mp3';
        const audio = new Audio(audioUrl);
        audio.play();
    };

    const startTimer = () => {
        setIsRunning(true);
        if (timerRef.current !== null) {
          if (typeof timerRef.current === 'number' || isTimeout(timerRef.current)) {
            clearInterval(timerRef.current as any);
          }
        }
        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => Math.max(prev - 1, 0));
        }, 1000);
    };

    const pauseTimer = () => {
        setIsRunning(false);
        if (timerRef.current !== null) {
          if (typeof timerRef.current === 'number' || isTimeout(timerRef.current)) {
            clearInterval(timerRef.current as any);
          }
        }
    };

    const resetTimer = () => {
        setTimeLeft(isWorking ? duration.work : duration.break);
        if (timerRef.current !== null) {
          if (typeof timerRef.current === 'number' || isTimeout(timerRef.current)) {
            clearInterval(timerRef.current as any);
          }
        }
    };

    const changePomodoroCategory = (workTime:number, breakTime:number) : void => {
        setDuration({ work: workTime * 60, break: breakTime * 60 });
        setTimeLeft(workTime * 60);
        setIsWorking(true);
        setIsRunning(false);
        if (timerRef.current !== null) {
          if (typeof timerRef.current === 'number' || isTimeout(timerRef.current)) {
            clearInterval(timerRef.current as any);
          }
        }
    };
  
  const jumpRound = () => {
    setTimeLeft(0);
    playAudio('done')
    if (isWorking) {
      setRounds((rounds) => rounds++)
    }
  }

    return (
      <>
        <main className='relative pt-16 md:pt-16 h-full flex flex-col items-center justify-start bg-no-repeat bg-cover bg-center' style={{backgroundImage: `url(${url})`}}>

                <span className='flex rounded-md items-center w-full relative flex-col sm:flex-row justify-center gap-4 mb-4 mt-2'>
                  <h2 className='font-poppins absolute top-0 left-8 text-slate-800 font-semibold bg-white px-4 py-2 rounded-md shadow-lg text-xl'>Rounds: <span className='text-green-500 text-xl'>{rounds}</span></h2> 
                    <nav className='flex flex-row items-center justify-center gap-0'>
                      {duration.work == (45 * 60) ? (
                        <>
                        <button className='shadow-lg border-2 rounded-md rounded-tr-none rounded-br-none px-4 py-2 text-white bg-sky-700 border-sky-700'>45/15</button> 
                        </>
                        ) : (
                      <>
                      <button className='shadow-lg border-2 rounded-md rounded-tr-none rounded-br-none px-4 py-2 text-sky-700 drop-shadow-2xl bg-white border-sky-700' onClick={() => changePomodoroCategory(45,15)}>45/15</button>                     
                      </>
                      )}
                      {duration.work == (50 * 60) ? (
                        <button className='shadow-lg border-2 rounded-md rounded-tl-none rounded-bl-none px-4 py-2 text-white border-sky-700 bg-sky-700 '>50/10</button> 
                      ) : (
                        <button className='shadow-lg border-2 rounded-md rounded-tl-none rounded-bl-none px-4 py-2 text-sky-700 bg-white drop-shadow-2xl border-sky-700' onClick={() => changePomodoroCategory(50,10)}>50/10</button>
                      )}

                    </nav>
                </span>
                <section className='h-full flex flex-col items-center justify-center gap-8'>
                    <main className='flex flex-col items-center justify-center gap-6'>
                      
                          <p className='shadow-outline relative z-10 -mt-6 text-9xl bg-transparent text-stroke-black drop-shadow-md text-zinc-100 flex-col items-center justify-center w-80 rounded-full'>
                            <span className='relative z-10 flex flex-col items-center justify-center gap-0'>
                               {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}
                            </span>
                          </p>
                          <span className='flex items-center justify-center gap-2'>
                          {isRunning && <button className='px-6 py-2 rounded-md shadow-md bg-slate-700 text-white hover:drop-shadow-xl' onClick={() => {resetTimer(); startTimer()}}><SkipBack /></button>}  
                          <button onClick={isRunning ? pauseTimer : startTimer} className={isRunning ?' bg-green-500 text-white px-6 py-2 rounded-md shadow-md'  : ' bg-green-500 text-zinc-200 px-6 py-2 rounded-md shadow-md'}> 
                              {isRunning ? <Pause /> 
                               : <Play />}
                          </button>
                               {isRunning && <button className='px-6 py-2 rounded-md shadow-md  bg-sky-700 text-white hover:drop-shadow-xl' onClick={jumpRound}><SkipForward /></button>}
                          </span>
                         
                     
                      </main>
                </section>
        </main>
      
      </>
    )}

export default Pomodoro