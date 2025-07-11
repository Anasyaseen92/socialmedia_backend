// controllers/users.js
import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// controllers/users.js
export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const friends = await Promise.all(
      user.friends.map((friendId) => User.findById(friendId))
    );

  const formattedFriends = friends.map(
  ({ _id, firstName, lastName, occupation, picturePath }) => ({
    _id,
    firstName,
    lastName,
    occupation,
    picturePath: typeof picturePath === "string" ? picturePath : "",
  })
);


    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    

    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: "User or friend not found" });
    }

    if (user.friends.includes(friendId)) {
      
      user.friends = user.friends.filter((fid) => fid.toString() !== friendId);
      friend.friends = friend.friends.filter((fid) => fid.toString() !== id);
    } else {
    
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((fid) => User.findById(fid))
    );

   const formattedFriends = friends.map(
  ({ _id, firstName, lastName, occupation, picturePath }) => ({
    _id,
    firstName,
    lastName,
    occupation,
    picturePath: typeof picturePath === "string" ? picturePath : "",
  })
);

    res.status(200).json(formattedFriends);
  } catch (err) {
    console.error("❌ Error in addRemoveFriend:", err.message);
    res.status(500).json({ error: err.message });
  }
};

