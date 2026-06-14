const express = require("express");
const ConnectionController = require("../controllers/connection.controller");
const privateRouter = express.Router();

privateRouter.post("/:userId/request", ConnectionController.sendRequest);
privateRouter.put("/:connectionId/accept", ConnectionController.acceptRequest);
privateRouter.put("/:connectionId/reject", ConnectionController.rejectRequest);
privateRouter.delete("/:connectionId/cancel", ConnectionController.cancelRequest);
privateRouter.delete("/:connectionId/remove", ConnectionController.removeConnection);
privateRouter.get("/requests/received", ConnectionController.getReceivedRequests);
privateRouter.get("/requests/sent", ConnectionController.getSentRequests);
privateRouter.get("/my", ConnectionController.getMyConnections);

module.exports = {
    private: privateRouter,
};