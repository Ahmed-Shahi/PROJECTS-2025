const { GoogleGenerativeAI } = require("@google/generative-ai");
const {message} = require('./src/Components/Body/Body')
const genAI = new GoogleGenerativeAI("AIzaSyBgyVfrkvJv-Jnqm7iSzkxStZImn20awq8");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = message;

const result = await model.generateContent(prompt);
console.log(result.response.text());

module.exports = result