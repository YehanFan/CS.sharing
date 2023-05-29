const config = require("./config");
const User = require("../models/UserModel");

function initializeSocket(app, server) {
  const io = require("socket.io")(server);

  app.set("io", io);

  io.on("connection", (socket) => {

    socket.on("userConnect", async(id) => {
    const user = await User.findById(id)

    if(!user){
      console.error("User not found.")
    } else {
      socket.join(user._id.toString())
    }
    })

    socket.on("userDisconnect", (userId) => {
      socket.leave(userId);
  });

    socket.on("disconnect", () => {

  });
  })

}

module.exports = initializeSocket;