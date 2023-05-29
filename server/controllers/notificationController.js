const asyncHandler = require("express-async-handler");
const { Types } = require("mongoose");
const { TransformStreamDefaultController } = require("stream/web");

const Notification = require("../models/NotificationModel");

// @desc    Get notifications
// @route   GET /api/users/:username/notifications
// @access  Private
const getNotifications = asyncHandler(async (req, res) => {
  let offset = parseInt(req.query.offset) || 0;

  const limit = 10;
  const skip = 0

  const notifications = await Notification.find({ target: req.user._id })
    .populate("target actor", "username avatar")
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);

  if (notifications.length === 0 && offset === 0) {
    res.status(404);
    throw new Error("You have no notifications.");
  } else if (notifications.length === 0 && offset >= 1) {
    res.status(404);
    throw new Error("No more notifications.");
  }

  const result = {
    notifications,
  };

  res.status(200).json(result);
});

// @desc    Get amount of unread notifications
// @route   GET /api/users/:username/notifications/unread
// @access  Private
const getUnreadNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({
    target: req.user._id,
    unread: true,
  });

  if (!notifications) {
    res.status(404);
    throw new Error("No notifications found.");
  }

  res.status(200).json({ count: notifications.length });
});

// @desc    Read many notifications
// @route   PATCH /api/users/:username/notifications/read
// @access  Private
const readNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.updateMany(
    { target: req.user._id },
    {
      $set: {
        unread: false,
      },
    }
  );

  if (!notifications) {
    res.status(404);
    throw Error("No notifications found.");
  }

  res.status(200).json({ state: false });
});

// @desc    Read a notification
// @route   PATCH /api/users/:username/notifications/:notificationId/read
// @access  Private
const readNotification = asyncHandler(async (req, res) => {
  const { notificationId } = req.params;
  const notification = await Notification.findById(notificationId);

  if (!notification) {
    res.status(400);
    throw new Error("Notification not found.");
  } else {
    await Notification.findByIdAndUpdate(id, {
      $set: {
        unread: false,
      },
    });

    res.status.json({ state: false });
  }
});

module.exports = {
  getNotifications,
  getUnreadNotifications,
  readNotifications,
  readNotification,
};
