import "./friend.css";

const friend =({user})=>{
    // console.log(user);
    return (
        <div className="friend">
             <li className="sidebarFriend">
            <img src={user.profilePicture}alt="" className="sidebarFriendImg" />
            <span className="sidebarFriendName">{user.username}</span>
          </li>
        </div>
    )
}

export default friend;