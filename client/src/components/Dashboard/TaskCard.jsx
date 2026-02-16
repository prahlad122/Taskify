import React from 'react'

function TaskCard({items}) {
  return (
    <button className='bg-white rounded px-4 w-[100] py-2 hover:shadow transition-all duration-300'>
      <div className='flex items-center justify-between'> 
        <h1 className=''>Task Title</h1>
        <div className='text-sm text-green-500m bg-green-200 px-2 rounded-full'>
            <p>Low</p>
            </div>
      </div>
      <hr className='my-2'/>
      <p className='taxt-sm text-zinc-500 text-start'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, cupiditate?
      </p>
    </button>
  )
}

export default TaskCard;
