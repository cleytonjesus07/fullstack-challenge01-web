import { useState } from 'react';

export function TweetForm({ user,setSigninUser }) {
  const [text, setText] = useState('');
  const MAX_TWEET_CHAR = 140;

  function changeText(e) {
    setText(e.target.value);
  }

  function autoResizeHeight(e) {
    e.target.style.height = "63px";
    let scHeight = e.target.scrollHeight;
    e.target.style.height = `${scHeight}px`;
  }

  function logout(){
    localStorage.getItem("user_data") && localStorage.removeItem("user_data");
    setSigninUser(null);
  }

  return (
    <div className='border-b border-silver p-4 space-y-6'>
      <div className='flex p-4 justify-between '>
        <div className='flex space-x-5 items-center'>
          <img src='../images/avatar.png' className='w-7' />
          <h1 className='font-bold text-xl'>Página Inicial</h1>
        </div>

        <div className='flex items-center space-x-5'>
        <span className='relative a'>{user && `Seja bem vindo(a) ${user.username}`}</span>
        <button onClick={logout} className='bg-red-600 px-4 py-2 rounded-full' >Logout</button>
        </div>
      </div>
      <form className='pl-12 text-lg flex flex-col'>
        <textarea
          type="text"
          name="text"
          value={text}
          onChange={changeText}
          onInput={autoResizeHeight}
          placeholder='O que está acontecendo?'
          className='bg-transparent outline-none resize-none overflow-hidden'
        />
      </form>
      <div className='flex justify-end items-center space-x-3'>
        <span className='text-sm'><span>{text.length}</span> / <span className='text-birdBlue'>{MAX_TWEET_CHAR}</span></span>
        <button className='bg-birdBlue px-4 py-2 rounded-full disabled:opacity-50' disabled={(text.length > MAX_TWEET_CHAR || text.length <= 0) && true}>Tweet</button>
      </div>
    </div>
  )
}
