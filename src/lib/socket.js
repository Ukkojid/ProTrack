import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  if (!io) {
    io = new Server(server, {
      cors: {
        origin: "*",
      },
    });

    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);

      socket.on("joinProject", (projectId) => {
        socket.join(projectId);
      });

      socket.on("sendMessage", (data) => {
        const { projectId, message } = data;

        io.to(projectId).emit("receiveMessage", message);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });
  }

  return io;
};