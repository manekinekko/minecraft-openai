# Minecraft OpenAI

A proof of concept for controlling a Minecraft NPC using OpenAI.

## Requirements

- [Minecraft](https://www.minecraft.net/en-us/get-minecraft) (Java Edition) version 1.17
- An [OpenAI](https://openai.com) account 
- Copy your [OpenAI API key](https://beta.openai.com/account/api-keys) and save it in the `.env` file

```
CODEX_API_KEY=<your_api_key>
```

## How to use

### Start the Minecradt server

Here is how to start the Minecraft server:

1. Choose a host computer. This computer should be fast enough to play Minecraft, while running a server for other players as well.
2. Launch the game and click **Single Player**.
3. Create a new world or open an existing one. 
4. Inside that world, press the Esc key, and click **Open to LAN**. 
5. Choose a game mode to set for the other players.
6. Choose **Creative mode** that allows you to fly and place an infinite number of blocks.
7. Click **Start LAN World**, and you'll see a message that a local game has been hosted.
8. Take note of the port number.

### Launch the bot

From your terminal, run the following command:

```
npm start -- --port [PORT]
```

In a few seconds, you should see a message that the bot is running, and you should see the NPC pop up in Minecraft.

### Sending commands

Inside the Minecraft client, press the `T` key to open the chat box.

## Disclaimer

This is a proof of concept. It is not intended to be used in production.