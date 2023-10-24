import "./post.css";
import { MoreVert } from "@mui/icons-material";
import axios from "axios";
// import {Users} from "../../dummyData";
import { useContext, useEffect, useState } from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contest/AuthContext";

const Post = ({ post }) => {

  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [User, setUser] = useState({});
  const [comment, setComment] = useState(post.comments.length);
  const { user: currentUser } = useContext(AuthContext);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;


  useEffect(()=>{
    setIsLiked(post.likes.includes(currentUser._id));
  },[currentUser,post.likes])

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {
      console.log("Error in handling likehandler");
    }

    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
 
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post?.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  return (
    <div className="post">
      <div className="postWrapper">
        {/* Top */}
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${User.username}`}>
              <img
                src={
                  User?.profilePicture
                    ? PF + "/person/"+ User.profilePicture
                    : PF + "/person/noAvatar.png"
                }
                alt=""
                className="postProfileImg"
              />
                <span className="postUsername">{User.username}</span>
            </Link>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>

          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>

        {/* Center */}
        <div className="postCenter">
          <span className="postText">{post?.description}</span>
          <img src={post?.img? PF + "/post/" + post?.img:PF+"/post/noImage.jpg"} alt="" className="postImg" />
        </div>

        {/* Bottom */}
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src={`${PF}/like.png`}
              alt=""
              className="likeIcon"
              onClick={likeHandler}
            />
            <img
              src={`${PF}/heart.png`}
              alt=""
              className="likeIcon"
              onClick={likeHandler}
            />
            <span className="postLikeCounter">{like} people liked it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
