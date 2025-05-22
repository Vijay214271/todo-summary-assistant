import axios from "axios";

async function sendToSlack(message) {
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) throw new Error('SLACK_WEBHOOK_URL is missing');

  await axios.post(webhookUrl, {
    text: `📝 Todo Summary:\n\n${message}`,
  });

}

export default sendToSlack;
