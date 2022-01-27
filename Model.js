const fetch = require('isomorphic-fetch');

// Model Class

class Model {
  constructor() {
    this.completions = [];
  }

  async getCompletion(prompt) {
    console.log(prompt)
    const response = await fetch(
      'https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': ` Bearer ${process.env.CODEX_API_KEY}`
        },
        body: JSON.stringify({
          prompt: prompt,
          max_tokens: 300,
          temperature: 0,
          stop: "//",
          n: 1
        })
      }
    );

    console.log(response)

    // catch errors
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const json = await response.json();

    this.completions = json.choices.map(choice => choice.text);
    this.removeDuplicateCompletions();
    return this.getNextCompletion();
  }

  getNextCompletion() {
    if (this.completions.length > 0) {
      return this.completions.shift();
    } else {
      return null;
    }
  }

  removeDuplicateCompletions() {
    this.completions = this.completions.filter((item, pos) => {
      return this.completions.indexOf(item) == pos;
    });
  }
}

module.exports = Model;
