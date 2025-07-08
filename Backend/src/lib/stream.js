import {StreamChat} from "stream-chat";
import dotenv from 'dotenv';

dotenv.config();

const apikey = process.env.STREAM_API_KEY
const apiSecret = process.env.STREAM_API_SECRET

if(!apikey || !apiSecret){
    console.log("Stream api key or secret is mission");
}

const streamClient = StreamChat.getInstance(apikey, apiSecret);

export const upsertStreamUser = async(userData) => {
    try {
        await streamClient.upsertUsers([userData]);
        return userData;
    } catch (error) {
        console.log("Error upserting Stream users: ", error);
    }
}

// todo: do it later
export const generateStreamToken = (userId) => {

}