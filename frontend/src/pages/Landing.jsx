import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BackgroundLines } from '../../@ui/ui/background-lines'
import { AuroraBackground } from '../../@ui/ui/aurora-background'
import { Spotlight } from '../../@ui/ui/spotlight'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Landing = () => {
  useGSAP(()=>{
     gsap.fromTo('.heading',{
      opacity:0,
      y:5,
    duration:2,
     },{
      y:0,
      opacity:1,
      duration:2,
      ease:"back.inOut"
     })
  },[])
    const navigate = useNavigate();
    return (
        <div className="relative min-h-screen overflow-hidden">
            <Spotlight className="top-[7rem] left-[27rem]  h-screen" fill="blue" />
            <Spotlight className="top-[7rem] left-[35rem] h-screen" fill="pink" />
            <Spotlight className="top-[7rem] left-[35rem] h-screen" fill="purple" />
            <div className='relative z-20'>
                <div className='border shadow-lg pb-2 bg-white'>
                    <div className='flex justify-between items-center m-3 pt-2 px-10'>
                        <div className='text-3xl font-semibold text-zinc-800'>Memories</div>
                        <div className='flex justify-center items-center gap-20 font-medium text-[18px]'> 
                            <div>Features</div>
                            <div>Contact</div>
                            <div>Lists</div>
                            <div>Updates</div>
                        </div>
                        <div>
                            <button className='bg-primary rounded text-base px-6 py-2 text-white' onClick={() => navigate("/login")}>Login</button>
                        </div>
                    </div>
                </div>
                <div className='mt-32'>
                    <div className='text-6xl font-semibold text-gray-600 text-center heading'>Create, Capture and Store <br />
                        <span className='text-zinc-600 pt-3 block'>
                            <span className='text-primary'>Memories </span> 
                            in One Place
                        </span> 
                    </div>
                </div>
                <div className='flex justify-center items-center mt-10'>
                    <div className='text-center w-6/12 font-light text-lg'>
                        Capture life's moments and express your thoughts by storing your favorite images and journaling about your day, all in one convenient place.
                    </div>
                </div>
                <div className='flex justify-center items-center gap-10 m-14'>
                    <div><button className='bg-black text-white rounded px-6 py-2' onClick={() => navigate("/dashboard")}>Get Started</button></div>
                    <div><button className='bg-transparent border border-black rounded px-6 py-2 font-medium' onClick={() => navigate("/signup")}>Create Account</button></div>
                </div>
            </div>
        </div>
    )
}

export default Landing