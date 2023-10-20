import "./rightbar.css";
import { Users } from "../../dummyData";
import OnlineFriend from "../OnlineFriend/onlineFriend";

const rightbar = ({ profile }) => {




  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src="/assets/gift.png" alt="" className="birthdayImg" />
          <span className="birthdayText">
            <b>Amigo</b> and <b>3 other friends</b> have a birthday today
          </span>
        </div>
        <img src="/assets/ad.png" alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => {
            return <OnlineFriend user={u} />;
          })}
        </ul>
      </>
    );
  };



  const ProfileRightbar=()=>{
    return (
      <>
      
      <h4 className="rightbarTitle">User Information</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City</span>
          <span className="rightbarInfoValue">New York</span>
        </div>

        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From</span>
          <span className="rightbarInfoValue">Madrid</span>
        </div>

        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship</span>
          <span className="rightbarInfoValue">Single</span>
        </div>
      </div>

      <h4 className="rightbarTitle">User Friends</h4>
      <div className="rightbarFollowings">
        <div className="rightbarFollowing">
          <img src="/assets/person/1.jpeg" alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">John kennady</span>
        </div>
        <div className="rightbarFollowing">
          <img src="/assets/person/2.jpeg" alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">Mcurthy</span>
        </div>
        <div className="rightbarFollowing">
          <img src="/assets/person/3.jpeg" alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">Sudha</span>
        </div>
        <div className="rightbarFollowing">
          <img src="/assets/person/4.jpeg" alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">Mahanadiyaa</span>
        </div>
        <div className="rightbarFollowing">
          <img src="/assets/person/5.jpeg" alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">John kennady</span>
        </div>
        <div className="rightbarFollowing">
          <img src="/assets/person/6.jpeg" alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">John kennady</span>
        </div>
      </div>
      </>
    )
  };

  // console.log(profile);
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
      {profile? <ProfileRightbar/>:<HomeRightbar/>}
      </div>
    </div>
  );
};
export default rightbar;
