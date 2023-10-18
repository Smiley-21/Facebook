const router=require("express").Router();
const bcrypt=require("bcrypt");
const User=require("../models/users");


// Update User
router.put("/:id",async (req,res)=>{

    // match current requested user id
    if(req.body.userId===req.params.id  || req.body.isAdmin)
    {
        if(req.body.password)
        {
            try{
                const salt=await bcrypt.genSalt(10);
                 req.body.password=await bcrypt.hash(req.body.password,salt);

            }
            catch(err)
            {
                return res.status(500).json(err);
            }
        }


        try{
            const user= await User.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            });

            res.status(200).json("Account has been Updated Successfully");
        }
        catch(err)
        {
            return res.status(500).json("User data couldn't be updated");
            console.log(err);
        }
    }
    else
    {
        return res.status(403).json("Updation can be done only by Admin");
    }
})



// Delete User

router.delete("/:id",async (req,res)=>{

    // match current requested user id
    if(req.body.userId===req.params.id  || req.body.isAdmin)
    {
        if(req.body.password)
        {
            try{
                const salt=await bcrypt.genSalt(10);
                 req.body.password=await bcrypt.hash(req.body.password,salt);

            }
            catch(err)
            {
                return res.status(500).json(err);
            }
        }


        try{
            const user= await User.findByIdAndDelete({_id:req.params.id});
            
            user && res.status(200).json("Account has been Deleted Successfully");
        }
        catch(err)
        {
            return res.status(500).json("User data couldn't be deleted");
            console.log(err);
        }
    }
    else
    {
        return res.status(403).json("User can delete only their's account");
    }
})


// Get a User

router.get("/:id",async(req,res)=>{

    try{

        const user=await User.findById(req.params.id);
        const {password,updatedAt,createdAt,...others}=user._doc;
        !user && res.status(200).json("User does not Found");
        user && res.status(200).json(others);

    }catch(err)
    {
        return res.status(500).json("Server Error");

    }
})


// Follow a User

router.put("/:id/follow",async(req,res)=>{
    if(req.body.userId!=req.params.id)
    {
        try{
            const user=await User.findById(req.params.id);
            const curUser=await User.findById(req.body.userId);
            // console.log(req.params.id);
            if(!user.followers.includes(curUser))
            {
                await user.updateOne({$push:{followers:req.body.userId}})
                await curUser.updateOne({$push:{following:req.params.id}});

                res.status(200).json("User has been followed");
            }else
            {
                res.status(403).json(`You already follow ${user.username}`);
            }
        }catch(err)
        {
            res.status(500).json("Server Error");
            // console.log(err);
        }
    }
    else
    {
        res.status(403).json("You can't follow yourself");
    }
});




// Unfollow a User

router.put("/:id/unfollow",async(req,res)=>{
    if(req.body.userId!=req.params.id)
    {
        try{
            const user=await User.findById(req.params.id);
            const curUser=await User.findById(req.body.userId);
            // console.log(req.params.id);
            if(user.followers.includes(curUser))
            {
                await user.updateOne({$pull:{followers:req.body.userId}})
                await curUser.updateOne({$pull:{following:req.params.id}});

                res.status(200).json("User has been Unfollowed");
            }else
            {
                res.status(403).json(`You already unfollow ${user.username}`);
            }
        }catch(err)
        {
            res.status(500).json("Server Error");
            // console.log(err);
        }
    }
    else
    {
        res.status(403).json("You can't unfollow yourself");
    }
});

module.exports=router;