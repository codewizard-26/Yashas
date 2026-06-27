const connectedUsers = new Map();

const initializeSocket = (io) => {
    io.on("connection", (socket) => {
        console.log(`🔌 Connected: ${socket.id}`);

        socket.on("join", (userId) => {
            connectedUsers.set(userId, socket.id);
            console.log(`👤 User ${userId} joined`);
        });

        socket.on("disconnect", () => {
            for (const [userId, socketId] of connectedUsers.entries()) {
                if (socketId === socket.id) {
                    connectedUsers.delete(userId);
                    break;
                }
            }

            console.log(`❌ Disconnected: ${socket.id}`);
        });
    });
};

module.exports = {
    initializeSocket,
    connectedUsers,
};