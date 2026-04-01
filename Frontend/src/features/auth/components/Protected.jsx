import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'


const Protected = ({children}) => {
  const user = useSelector(state=>state.auth.user)
  const loading = useSelector(state=>state.auth.loading)

  if(loading){
    return (
      <div className="h-screen w-screen bg-gradient-to-br from-[#0B0F0E] to-[#060707] flex flex-col items-center justify-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#02C173]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#02C173]/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        {/* Loading content */}
        <div className="relative z-10 flex flex-col items-center gap-8">
          
          {/* Logo/Brand */}
          <h1 className="text-4xl font-black tracking-tight">
            <span className="text-[#02C173]">NEGOTIATE_</span>
            <span className="text-white">X</span>
          </h1>

          {/* Animated spinner */}
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#02C173] border-r-[#02C173] animate-spin"></div>
          </div>

          {/* Loading text */}
          <div className="text-center space-y-2">
            <p className="text-white text-lg font-semibold">Initializing Game</p>
            <p className="text-gray-400 text-sm">Connecting to your negotiation arena...</p>
          </div>

          {/* Animated dots */}
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-[#02C173] animate-bounce" style={{animationDelay: '0s'}}></div>
            <div className="w-2 h-2 rounded-full bg-[#02C173] animate-bounce" style={{animationDelay: '0.15s'}}></div>
            <div className="w-2 h-2 rounded-full bg-[#02C173] animate-bounce" style={{animationDelay: '0.3s'}}></div>
          </div>
        </div>
      </div>
    )
  }

  if(!user){
    return <Navigate to="/login" replace />
  }

  return children 
}

export default Protected