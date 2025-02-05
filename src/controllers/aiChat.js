const OpenAI = require('openai')

const openai = new OpenAI({
    apiKey: process.env['ARK_API_KEY'],
    baseURL: 'https://ark.cn-beijing.volces.com/api/v3/bots/',
})

async function aiChat(msgRole) {
  console.log('----- standard request -----')
  const completion = await openai.chat.completions.create({
      model: 'bot-20250204212455-5z6wq',
      messages: msgRole,
  })
  const answer = completion.choices[0]?.message?.content
  return (answer)
}

module.exports = { aiChat }