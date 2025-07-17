import React, { useEffect, useState } from 'react'
import {useParams} from "react-router"
import useAuthUser from './../hooks/useAuthUser';
import { useQuery } from '@tanstack/react-query';
import { getStreamToken } from '../lib/api';

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

import { StreamChat } from 'stream-chat';

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY
import { toast } from 'react-hot-toast';
import ChatLoader from './../components/ChatLoader';

function ChatPage() {
  const {id:targetUserId} = useParams();
  
  const [chatClient, setChatClient] = useState(null)
  const [channel, setChannel] = useState(null)
  const [loading, setLoading] = useState(true)

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser, // this will run only when authUser is available
  });

  useEffect(() => {
    const initChat = async () => {
      if(!tokenData?.token || !authUser ) return ;

      try {
        console.log("initializing stream client...");
        const client =  StreamChat.getInstance(STREAM_API_KEY)
        await client.connectUser({
          id:authUser._id,
          name: authUser.fullName,
          image:authUser.profilePic
        }, tokenData.token)

        const channelId = [authUser._id, targetUserId].sort().join('-');
        const currChannel = client.channel("messaging", channelId, {
          members:[authUser._id, targetUserId]
        })

        await currChannel.watch();

        setChatClient(client);
        setChannel(currChannel);

      } catch (error) {

        console.log("Error initializing chat:", error);
        toast.error("Could not connect to chat, Please try again.");

      }finally{
        setLoading(false);
      }
    }
    initChat();
  }, [])

  if(loading || !chatClient || !channel ) return <ChatLoader/>

  return <div className='h-[93vh] '>
    <Chat client={chatClient}>
      <Channel channel={channel}>
        <div className='w-full relative'>
          <Window>
            <ChannelHeader />
            <ChannelList />
            <ChannelInput focus />
          </Window>
        </div>
        <Thread/>
      </Channel>
    </Chat>
  </div>

}

export default ChatPage