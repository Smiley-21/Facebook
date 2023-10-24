import "./sidebar.css";
import RssFeedOutlinedIcon from "@mui/icons-material/RssFeedOutlined";
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import GroupsIcon from '@mui/icons-material/Groups';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import WorkSharpIcon from '@mui/icons-material/WorkSharp';
import CalendarMonthSharpIcon from '@mui/icons-material/CalendarMonthSharp';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import {Users} from "../../dummyData"
import Friend from "../../components/Friend/friend";

const sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sideWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeedOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <ChatOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Chat</span>
          </li>
          <li className="sidebarListItem">
            <SmartDisplayIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <GroupsIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <BookmarkIcon className="sidebarIcon" />
            <span className="sidebarListItemText">BookMarks</span>
          </li>
          <li className="sidebarListItem">
            <QuestionMarkIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkSharpIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <CalendarMonthSharpIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <LibraryBooksIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr"/>

        <ul className="sidebarFriendList">
         
         {
          Users.map((u)=>{
            return <Friend key={u.id} user={u} />
          })
         }
        </ul>
      </div>
    </div>
  );
};

export default sidebar;
