import express from "express";
import Thread from "../Models/Thread.js";
import generatePerplexityResponse from "../Utils/Perplexity.js";

const router = express.Router();

// //test
// router.post("/test", async (req, res) => {
//   try {
//     const thread = new Thread({
//       threadId: "abc",
//       title: " abc Test Thread",
//     });
//     const savedThread = await thread.save();
//     res.send(savedThread);
//   } catch (error) {
//     console.error("Error saving thread:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// Get all threads
router.get("/thread", async (req, res) => {
  try {
    let thread = await Thread.find({}).sort({ createdAt: -1 });
    res.json(thread);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
// Create a new thread or add a message to an existing thread
router.get("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    let thread = await Thread.findOne({ threadId });
    if (!thread) {
      return res.status(404).send("Thread is not found");
    }
    res.json(thread.messages);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to fetch thread");
  }
});
// Delete a thread
router.delete("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    let deletedthread = await Thread.findOneAndDelete({ threadId });
    if (!deletedthread) {
      return res.status(404).send("Thread is not found");
    }
    res.status(200).json({ message: "Thread deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to delete thread");
  }
});

//Chat with Perplexity
router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;

  if (!threadId || !message) {
    return res
      .status(400)
      .json({ error: "Missing required fields: threadId or message" });
  }
  try {
    let thread = await Thread.findOne({ threadId });
    if (!thread) {
      thread = new Thread({
        threadId,
        title: message,
        messages: [{ role: "user", content: message }],
      });
    } else {
      thread.messages.push({ role: "user", content: message });
    }
    const assistantResponse = await generatePerplexityResponse(message);
    thread.messages.push({ role: "assistant", content: assistantResponse });
    thread.updatedAt = new Date();
    await thread.save();

    res.json({ reply: assistantResponse });
  } catch (error) {
    console.error("Error in chat route:", error);
    res.status(500).json({ error: "Failed to process chat request" });
  }
});
export default router;
