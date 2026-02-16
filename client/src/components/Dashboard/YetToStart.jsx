import React from 'react'
import TaskCard from './TaskCard'
function YetToStart({task}) {
  return (
    <div className='flex flex-col gap-2'>
      {task && task.map((item,i) =><TaskCard key={i} data={item}/>)}
     <TaskCard/>
     <TaskCard/>
     <TaskCard/>
     <TaskCard/>
    </div>
  )
}

export default YetToStart
//{/* {task && task.map((items , i)=> <TaskCard key={i} data={items}/>)} */}
    