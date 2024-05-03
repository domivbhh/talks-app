import React from 'react'
import Conversation from './Conversation';
import useGetConversation from '../../hooks/useGetConversations';
import { getRandomEmoji } from '../../utils/emojis';

const Conversations = () => {
  const{loading,conversations}=useGetConversation()
  console.log(conversations)
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {
        conversations.map((item,idx)=>(
          <Conversation key={item.id} conversation={item} emoji={getRandomEmoji()} lastIdx={idx===conversations.length-1}/>
        ))
      }
      {loading ? <span className='loading loading-spinner mx-auto'></span>:null}
      
    </div>
  );
}

export default Conversations
