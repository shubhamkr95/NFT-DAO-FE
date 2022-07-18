import React from 'react'

export const Create = () => {
  return (
    <>
          <div className='mx-auto mt-5 block p-6 m-2 max-w-2xl rounded-lg border shadow-md hover:bg-gray-100' style={{borderColor:"#2d2d2d"}}>
        
        
        <p className="font-normal text-gray-700 dark:text-gray-400">You need to be an author of the space in order to submit a proposal.</p>
      
        
          </div>
          <div>
            <form>
                
                  <label for="email" className="block mt-10 mx-auto max-w-2xl text-sm font-normal text-gray-400 ">Title</label>
                  <input type="email" id="email" aria-describedby="helper-text-explanation" className=" border mx-auto max-w-2xl border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Any Title"/>
                  
                  
                  <label for="message" className=" mt-10 block  mb-2 text-sm font-medium text-gray-900 dark:text-gray-400 mx-auto max-w-2xl ">Your message</label>
                  <textarea id="message" rows="6" className="block p-2.5 w-full mx-auto max-w-2xl text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark: dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
                  
                  <label for="email" className="block mt-10 mx-auto max-w-2xl text-sm font-normal text-gray-400 ">Discussion(Optional)</label>
                  <input type="email" id="email" aria-describedby="helper-text-explanation" className=" border mx-auto max-w-2xl border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="https://forum.balancer.fi/proposal"/>
            </form>
          </div>
    
    </>
    
    

    
  )
}
