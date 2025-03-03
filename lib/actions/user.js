"use server";

import User from "../models/userModel";
import Question from "../models/questionModel"; // Import Question model
import { connect } from "../mongodb/mongoose";

export const createOrUpdateUser = async (
  id, first_name, last_name, image_url, email, username
) => {
  try {
    await connect();
    console.log("Creating/Updating user:", { id, first_name, last_name, image_url, email, username });
    
    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          image_url: image_url,
          email: email,
          userName: username,
        },
      },
      { new: true, upsert: true }
    );
    
    console.log("User after update:", user);
    return user;
  } catch (error) {
    console.error("Error creating or updating user:", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    await connect();
    const result = await User.findOneAndDelete({ clerkId: id });
    console.log("User deletion result:", result);
    return result;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const generateUserReport = async (userId) => {
  try {
    await connect();
    const user = await User.findOne({ clerkId: userId });
    
    if (!user) {
      throw new Error('User not found');
    }

    // Count questions asked by the user
    const questionsAsked = await Question.countDocuments({ author: user.userName });

    // Count questions answered by the user (based on replies)
    const questionsAnswered = await Question.countDocuments({ 
      'replies.author': user.userName 
    });

    // Calculate total upvotes and downvotes
    const userQuestions = await Question.find({ author: user.userName });
    
    const upvotes = userQuestions.reduce((total, question) => {
      return total + Math.max(question.votes, 0);
    }, 0);

    const downvotes = userQuestions.reduce((total, question) => {
      return total + Math.abs(Math.min(question.votes, 0));
    }, 0);

    // Prepare report data
    return {
      username: user.userName,
      questionsAsked,
      questionsAnswered,
      upvotes,
      downvotes,
      reportGeneratedAt: new Date()
    };
  } catch (error) {
    console.error("Error generating user report:", error);
    throw error;
  }
};