import "./topbar.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
const topbar = () => {
  return (
    <div className="topbarContainer">
      {/* left topbar */}
      <div className="topbarLeft">
        <span className="logo">Facebook</span>
      </div>

      {/* center topbar */}
      <div className="topbarCenter">
        <div className="searchbar">
          <SearchOutlinedIcon  className="searchIcon" />
          <input
            type="text"
            placeholder="Search for friend , post or video"
            className="searchInput"
          />
        </div>
      </div>

      {/* right topbar */}
      <div className="topbarRight">
        <div className="topbarLinks">
          <div className="topbarLink">Homepage</div>
          <div className="topbarLink">Timeline</div>
        </div>
        <div className="topbarIcons">
            <div className="topbarIconItem">
                <PersonIcon/>
                <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
                <ChatIcon/>
                <span className="topbarIconBadge">2</span>
            </div>
            <div className="topbarIconItem">
                <NotificationsIcon/>
                <span className="topbarIconBadge">2</span>
            </div>
        </div>
        <img src="/assets/person/1.jpeg" alt="" className="topbarImg" />
      </div>
    </div>
  );
};
export default topbar;
