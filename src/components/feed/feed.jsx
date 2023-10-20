import "./feed.css";
import Share from "../ShareComp/share";
import Post from "../Post/post";
import {Posts} from "../../dummyData";


const feed=()=>{
    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share/>
                {
                    Posts.map((p)=> <Post key={p.id} post={p}/>)
                }
            </div>
        </div>
    )
}

export default feed;