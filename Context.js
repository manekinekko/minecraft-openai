// Context Class, for constructing and updating contexts

class Context {
    constructor(seedContext) {
      if (seedContext) {
        this.seedContext = seedContext;
      } else {
        this.seedContext = "";
      }
      this.context = seedContext;
      this.interactions = [];
      this.lastInput = "";
    }
  
    addInteraction(input, completion) {
      this.interactions.push(`// ${input}\n${completion}`);
      this.createContext();
      console.log(this.context);
    }
  
    removeLastInteraction() {
      this.interactions.pop();
      this.createContext();
    }
  
    createContext() {
      this.context = this.interactions.reduce((context, interaction) => {
        return `${context}${interaction}`
      }, this.seedContext);
    }
  
    craftPrompt(input) {
      this.lastInput = input;
      return `${this.context}// ${input}\n`;
    }
  
    resetContext() {
      this.context = this.seedContext;
      this.interactions = [];
      console.log(this.context);
    }
  };
  
  module.exports = Context;
  