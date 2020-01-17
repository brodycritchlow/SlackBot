const SlackBot = require('slackbots')
const axios = require('axios')

const bot = new SlackBot({
    token: 'xoxb-905413253510-906404282708-Gkp9CGVkSFD8xlSnYOQnYCww'
});

// Start Handler
bot.on('start', () => {
    const params = {
        icon_emoji: ':smiley:'
    }

    bot.postMessageToUser('brodycritchlow', 'Hello! Do @JokeBot random joke to get a joke.', params); 

    bot.postMessageToChannel('general', 'Get Ready To Laugh With @JokeBot!', params)
});

// Error Handler

bot.on('error', (err) => console.log(err));

// Message Handler

bot.on('message', (data) => {
    if(data.type !== 'message') {
        return;
    }

    handleMessage(data.text);
});

// Respond to Data

function handleMessage(message){
    if(message.includes(' randomjoke')){
        randomJoke()
    } else if(message.includes(' randomimage')){
        randomImage()
    }
}

// Tell a Joke

function randomJoke(){
    axios.get('https://official-joke-api.appspot.com/random_joke')
        .then(res => {
            const Joke1 = res.data.setup;
            const Joke2 = res.data.punchline;

            const params = {
                icon_emoji: ':laughing:'
            }
        
            bot.postMessageToChannel('general', `Random Joke: ${Joke1}`, params)
            bot.postMessageToChannel('general', `Anwser: ${Joke2}`, params)
        })
}