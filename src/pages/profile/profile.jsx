import "./profile.css";
import Topbar from "../../components/topbar/topbar";
import Sidebar from "../../components/Sidebar/sidebar";
import Feed from "../../components/feed/feed";
import Rightbar from "../../components/rightbar/rightbar";

const profile = () => {
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src="/assets/post/3.jpeg"
                className="profileCoverImg"
                alt=""
              />
              <img
                src="/assets/person/7.jpeg"
                className="profileUserImg"
                alt=""
              />
            </div>

            <div className="profileInfo">
              <h4 className="profileInfoName">Saurabh Patel</h4>
              <span className="profileInfodesc">Hello My Friend</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar profile={profile}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default profile;
