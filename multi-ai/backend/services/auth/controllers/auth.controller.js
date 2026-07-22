import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";
import crypto from "crypto";
import User from "../models/user.model.js";
import redis from "../../../shared/redis/redis.js";

export const login = async (req, res) => {
  console.log("========== LOGIN API HIT ==========");

  try {
    const { token } = req.body;

    console.log("STEP 1: Token received");

    const decoded = await getAuth(app).verifyIdToken(token);

    console.log("STEP 2: Token verified");
    console.log(decoded);

    let user = await User.findOne({
        firebaseUid: decoded.uid,
    });

    console.log("STEP 3: User lookup completed");
    console.log(user);

    if (!user) {
      console.log("STEP 4: Creating new user...");

       user = await User.create({
        firebaseUid: decoded.uid,
        name: decoded.name,
        email: decoded.email,
        avatar: decoded.picture,
      });

      console.log("STEP 5: User created");
      console.log(user);
    }

    const sessionId = crypto.randomUUID();

    console.log("STEP 6: Session ID created");
    console.log(sessionId);

    await redis.set(
      `session-${sessionId}`,
      JSON.stringify({
        userId: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      }),
      "EX",
      7 * 24 * 60 * 60
    );

    console.log("STEP 7: Redis session saved");

    res.cookie("session", sessionId, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    console.log("STEP 8: Cookie sent");
    console.log("========== LOGIN SUCCESS ==========");

    return res.status(200).json(user);
  } catch (error) {
    console.error("========== LOGIN ERROR ==========");
    console.error(error);
    console.error(error.stack);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logOut = async (req, res) => {
  try {
    const sessionId = req.cookies?.session;

    if (sessionId) {
      await redis.del(`session-${sessionId}`);
    }

    res.clearCookie("session");

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};