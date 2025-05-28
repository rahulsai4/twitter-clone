import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = async (userId, res) => {
    const token = jwt.sign({ userId }, process.env.SECRET, { expiresIn: "1d" });
    res.cookie("jwt", token, {
        maxAge: 1*24*60*60*1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    })
};
