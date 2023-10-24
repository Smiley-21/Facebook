import "./rightbar.css";
import { Users } from "../../dummyData";
import OnlineFriend from "../OnlineFriend/onlineFriend";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contest/AuthContext";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const Rightbar = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollow] = useState(
    currentUser.following.includes(user?.id)
  );

  useEffect(() => {
    setFollow(currentUser.following.includes(user?._id));
  }, [user]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const curUserFriendList = await axios.get(
          `/users/friends/${user._id}`
        );
        setFriends(curUserFriendList.data);
      } catch (err) {
        console.log(err);
        console.log("Error in accessing Friend List");
      }
    };
    getFriends();
  }, [user]);
  // console.log(friends);

  // console.log(followed);

  const handleFollow = async () => {
    try {
      if (followed) {
        await axios.put("/users/" + user._id + "/unfollow", {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put("/users/" + user._id + "/follow", {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollow(!followed);
    } catch (err) {
      console.log(err);
      console.log("Server Error in handling Following a User");
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src={PF + "/gift.png"} alt="" className="birthdayImg" />
          <span className="birthdayText">
            <b>Amigo</b> and <b>3 other friends</b> have a birthday today
          </span>
        </div>
        <img src={PF + "/ad.png"} alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => {
            return <OnlineFriend key={u.id} user={u} />;
          })}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleFollow}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <RemoveCircleIcon /> : <AddIcon />}
          </button>
        )}
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City</span>
            <span className="rightbarInfoValue">{user.city} </span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship</span>
            <span className="rightbarInfoValue">{user.relationship}</span>
          </div>
        </div>

        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              key={friend._id}
              style={{ textDecoration: "none" }}
              to={"/profile/" + friend.username}
            >
              <div className="rightbarFollowing" key={friend._id}>
                <img
                  src={
                    friend.profilePicture
                      ? PF + "/person/" + friend.profilePicture
                      : PF + "/person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">
                  {friend?.username ? friend.username : ""}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
};
export default Rightbar;
