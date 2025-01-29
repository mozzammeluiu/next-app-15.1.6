import React from 'react'

function Ping() {
  return (
    <div className='relative'>
      <div className='absolute -left-4 top-1'>
        <span className='flex size-[11px]'>
          <span className='absolute top-0 inline-flex h-full bg-primary rounded-full opacity-75 animate-ping'>
            <span className='relative inline-flex rounded-full bg-primary size-[11px]'></span>
          </span>
        </span>
      </div>
    </div>
  )
}

export default Ping