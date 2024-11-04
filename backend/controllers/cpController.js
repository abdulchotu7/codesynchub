import userModel from "../models/userModel.js";

export const putController = async (req, res) => {
    try {
        const { u_name,name, Codechef, Leetcode} = req.body;

        console.log("Request body:", req.body);

        if (!u_name) {
            return res.status(400).json({ message: "User name is required" });
        }

        const userfilled = await userModel.create({
            u_name,
            name,
            Codechef,
            Leetcode,
            
        });

        res.status(200).json(userfilled);
    } catch (error) {
        console.error("Error while pushing to the database:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getController = async (req, res) => {
    try {
        const { u_name } = req.params;

        const user = await userModel.findOne({ u_name });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error while retrieving user from the database:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const displayController = async (req, res) => {
    try {
        const { u_name } = req.params;

        const user = await userModel.findOne({ u_name });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const url = user.Leetcode;
        res.redirect(`/scrap/?url=${url}`);
    } catch (error) {
        console.error("Error while retrieving user from the database:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
