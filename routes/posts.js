const Post = require("../models/postmodel");
const router = require("express").Router();
const User=require("../models/users");

// create a post

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);

  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a post
router.post("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
    } else {
      res.status(403).json("You can update only your own post");
    }
  } catch (err) {
    res.status(500).json("Internal Server error in posting");
  }
});

// delete a post

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json("Post not found");
    }
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("Post has been deleted Successfully");
    } else {
      res.status(403).json("You can delete only your own post");
    }
  } catch (err) {
    res.status(500).json("Internal Server Error");
  }
});

// like a post

router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("Post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("Post has been Unliked ");
    }
  } catch (err) {
    res.status(500).json("Internal Server Error");
  }
});

// get a post

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json("Post not found");
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json("Internal Server Error");
  }
});

// get timeline posts


router.get("/timeline/all",async(req,res)=>{
  try{


    const currUser=await User.findById(req.body.userId);
   
    const usersPosts=await Post.find({userId:currUser._id});
    const friendPosts=await Promise.all(
      currUser?.following.map((freindId)=>{
       return Post.find({userId:freindId});
      })
    );
    res.json(usersPosts.concat(...friendPosts));
  }
  catch(err)
  {
    res.status(500).json(err);
    console.log(err);
  }
})

module.exports = router;
