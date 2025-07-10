
import User from './../models/User.js';


export async function getRecommendedUsers(req,res){
    try {
        const currentUserId = req.user.id;
        const currentUser = req.user;

        const recommendedusers = await User.find({
            $and:[
                {_id:{$ne : currentUserId}},
                {_id:{$nin : currentUser.friends}},
                {isOnBoarded: true}
            ]
        })

        res.status(200).json({success:true, recommendedusers})

    } catch (error) {
        console.log("error in get recommended users controller: ", error.message);
        res.status(500).json({success:false, message:"Internal Server Error"});
    }
}

export function getMyFriends(){

}
