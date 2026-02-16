import React from 'react'

function StackTitle({title}) {
  return (
    <div>
      <div className='border-b pb-2'>
                <h1 className='font-semibold text-zinc-800 text-center'>
                    {title}
                </h1>
            </div>
    </div>
  )
}

export default StackTitle
