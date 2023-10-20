import "./post.css";
import {MoreVert} from "@mui/icons-material";
import {Users} from "../../dummyData";
import { useState } from "react";

const Post=({post})=>{

   
    // const username=Users.filter(u=>u.id===post.userId);
    // console.log(username[0].username);

    const [like,setLike] =useState(post.like);
    const [isLiked,setIsLiked]=useState(false);

    const likeHandler=()=>{
        setLike(isLiked?like-1:like+1);
        setIsLiked(!isLiked);
    }
    

    return (
        <div className="post">
            <div className="postWrapper">
                {/* Top */}
                <div className="postTop">
                    <div className="postTopLeft">
                        <img src={Users.filter(u=>u.id===post.userId)[0].profilePicture} alt="" className="postProfileImg" />
                        <span className="postUsername">{Users.filter(u=>u.id===post.userId)[0].username}</span>
                        <span className="postDate">{post?.date}</span>
                    </div>

                    <div className="postTopRight">
                        <MoreVert/>
                    </div>
                </div>

                {/* Center */}
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img src={post.photo} alt="" className="postImg" />
                </div>

                {/* Bottom */}
                <div className="postBottom">
                    <div className="postBottomLeft" >
                        <img src="/assets/like.png" alt="" className="likeIcon" onClick={likeHandler} />
                        <img src="/assets/heart.png" alt="" className="likeIcon"onClick={likeHandler} />
                        <span className="postLikeCounter">{like}</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post?.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post;