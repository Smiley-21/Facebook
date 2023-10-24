import "./onlineFriend.css";


const onnlineFriend = ({user}) => {
    // console.log(user);
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="onlineFriend">
      <li className="rightbarFriend">
        <div className="rightbarProfileImgContainer">
          <img
            src={PF+"/"+user.profilePicture}
            alt=""
            className="rightbarProfileImg"
          />
          <span className="rightbarOnline"></span>
        </div>
        <span className="rightbarUsername">{user.username}</span>
      </li>
    </div>
  );
};

export default onnlineFriend;
