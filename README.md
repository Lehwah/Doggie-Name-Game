# Doggie-Name-Game

The goal of this tutorial be to finish the implementation of a game called the `Doggie Name Game` using ReactJS. While completing this tutorial, we hope you learn something more about the process of creating simple applications in ReactJS as well as gain an introductory look at what a day in the life of a software engineer can look like. 

 In this game, the player is prompted to pick, out of 6, the breed of dog which is asked for on the screen. If the player picks 5 dogs in a row correctly they win. Otherwise, they lose. Players can also restart the game randomly by clicking on the hamburger menu and pressing ‘Yes’ on the modal which pops up.

As our web app stands, it currently has a Header tab, a set of counters for Lives and Score, as well as a text prompting the user to correctly pick a specific dog by breed. Now, by looking at both the code and web app in the browser, let’s dissect what is going on in the code before we actually work on implementing the rest of our application.

To better understand our application, let’s take a look at App.js and take a glance at the class named `App`.

App holds an object called `state`. This object is what App uses to pass application specific data to other React Components. This is what the object looks like:

```javascript
class App extends Component {
  state = {
    score: 0,
    lives: 3,
    doggies: doggieData,
    currentDoggies: [],
    gameState: GAMESTATES.LOADING // When the game starts, it will be loading until all of the doggies are present
  }
 …
}
```

As you can probably tell, the score and lives fields hold the current count of the player’s score and lives at any given time. The values populating these fields at the moment only represent the initial state of the application. As we interact with the application, these values will change. We can update our state with a built in React function called`this.setState`, but we will save that for later in the tutorial. For now, try manually changing the values inside of score and lives up and down a few integers. What do you see? You should see the the game’s score count changes and, if you change the lives to anything between 0 and 3, that X’s appear in the place of circles, indicating the player has lost one or more lives. The way these elements update is  what makes React magical. We have a few additional state variables, but we will dig into the meaning of these as we progress. 

Lower down in App, we also have a `render` function which returns a Header, InformationPanel and a section for spacing. Each of these JSX elements exist in the Dom. You don’t have to know what each of these elements does besides a basic understanding of what each element does.  The Information Panel is responsible for showing game info like lives and the current dog which is to be guessed upon. In the Header, all that is relevant is to know that pressing the hamburger menu will cause a modal to pop up on the screen with a Y/N option set. By picking Y, you will be activating the restartGame prop passed into the Header Component, otherwise, nothing will happen and the modal will go away. 

```javascript
class App extends Component {
 …
 render() {
    const { score, lives} = this.state
    return (
      <div className="App">
        <Header restartGame={()=>{}}/> // The Header holds a hamburger which gets the ‘restartGame’ (currently no-op)
        <section className="Space"/> // This element is solely for spacing
        <InformationPanel 
          lives={lives} 
          score={score} 
          name='Fido'/> // Info Panel holds information relevant to score and lives
          {
            // TODO: Implement the CardGrid Component
          }
      </div>
    )
  }

}
```


THE NEXT SET OF CHANGES OCCUR IN CardGrid/index.js

Now, it is time to create a Grid for 6 cards to be displayed. This will be where the dogs will be picked. Start by creating a folder under `/src` called `CardGrid. Then make a file inside of it called `index.js`. From here, we can start creating both a CardGrid Component as well as a Card Component. Here is some boilerplate code for the file to get started:

```javascript
import React, {Component} from 'react';

export const CardGrid = (props) => 
  <div className="Grid">
        {props.doggies.map((doggie, i) => <Card key={i} doggie={doggie} {...props}/>)} //This is a for loop which returns a total of 6 (# of doggies per round) Cards
  </div>
  
class Card extends Component {
  state = { clicked: false }
  handleClick() {}
  render() {
    const { doggie } = this.props
    return (
      <div className="Grid-card" onClick={this.handleClick.bind(this)}> // for now, handle click does nothing
        <p className="Auto">{doggie.name}</p> // Each Card holds a doggie and displays it’s name (for now)
      </div>
    )
  }
}
```


In `CardGrid` we are using what will be an array of doggy objects (containing both a name and whether or not they are the doggy to be picked in this round) which will be used to create an array of Card Components. Each Card Component is passed the props object (we will soon discover what is inside of this props object), one of the 6 dogs and a key prop (this helps ReactJS optimize how it renders elements).

In the `Card` element, we store a state variable which allows us to know whether or not a given card has been clicked or not. This will be useful when we wish to update how our cards look in the future. The Card renders the name of the dog it holds (in the final version, this will be an image and a name).


THE NEXT SET OF CHANGES OCCUR IN APP.JS

Before putting the `CardGrid` into our application, we must set up the functionality to cipher through the doggie data and select 6 dogs to be used in any given round of play. The method of choice for this will be called `setDoggiesRandomly`:


```javascript
class App extends Component {
…
setDoggiesRandomly() {
    const { doggies } = this.state // All of the existing doggie elements
    const doggieCount = doggies.length
    const doggiesForRound = [] //All of the doggies to be used this round
    
    for (let i = 0; i < 6; i++) {
      const index = Math.round(Math.random() * (doggieCount - 1))
      const doggie = doggies[index]
      doggie.isDoggie = false
      doggiesForRound.push(doggie)
    }

    const randomIndex = Math.round(Math.random() * 5)
    doggiesForRound[randomIndex].isDoggie = true // This doggie will be the one displayed in the header “Which doggie is a(n) …?”

    this.setState({
      currentDoggies: doggiesForRound, 
      gameState: GAMESTATES.IN_PROGRESS // The game has been put into progress!
    })
  }
…
}
```

In essence, this function randomly takes 6 of the doggies from the data and sets one of them to have an ‘isDoggie’ field which is true. By doing this, the doggie which will be chosen in the Header Title of the Header Component is decided. What is more, the doggie object with the ‘isDoggie’ field set to true is attached to the card (or one of the cards) which contains it. Selecting this card leads to getting a point. 


As this function sets up our first batch of 6 dogs for a round and sets our game state to IN_PROGRESS, it would only make sense that it also be called right before the game begins. Luckily, React allows us to call this method in the very beginning of the components existing (near the beginning of what is called it’s lifecycle method)

```javascript
class App extends Component {
…
 componentDidMount() { //This runs the second the React Component mounts to the DOM
    this.setDoggiesRandomly()
  }

}
```

We will also need to add a function which allows for us get whichever doggie is the selected one on a whim:

```javascript
class App extends Component {
…
 getCorrectDoggie() {
    return this.state.currentDoggies.filter(doggie => doggie.isDoggie)[0]
  }
…
}
```

As players progress through the game, they will both win and lose. When either of these events happen, we want a modal, similar to the one which appears in the navigation bar. Thankfully, the ‘WinView and “LossView” components can just be exported and used.

```javascript
import {WinView, LoseView} from './Modal'

class App extends Component {
…
getModalView() {
    switch (this.state.gameState) {
      case GAMESTATES.WIN:
        return <WinView restartGame={this.restartGame.bind(this)}/>
      case GAMESTATES.LOSS:
        return <LoseView restartGame={this.restartGame.bind(this)}/>
      default:
        return null
    }
  }
…
}
```

Here we are using the gameState to decide whether or not a win view, loss view or no modal view would be best (for instance, nothing would need to pop up while there was no victory or success at the given moment.


Sometimes, it will be necessary for us to restart the game (upon user request in the Header, upon a win or lost condition). In order to handle this, we will need a function to restart the game:

```javascript
class App extends Component {
…
 restartGame() {
    this.setState({
      score: 0,
      lives: 3,
      gameState: GAMESTATES.IN_PROGRESS
    })
    this.setDoggiesRandomly()
  }
…
}
```

We now have functions on our app component which will help us to do things such as set up our doggie data to be used in game format as well as change the overall state of the game itself. The only thing missing is the game logic. As you remember, we want to allow our opponent to pick the dogs until either the player loses all of his chances or, until the player wins the game. To denote a win, the player must guess 5 dogs correct before striking out. To strikeout, one must lose 3 times in total. The following function sets up our game logic. This logic can then be deployed to each card in order to set up transfer the game 

```javascript
class App extends Component {
…
 handleCardClick(name) {
    const correctName = this.getCorrectDoggie().name
    const correctGuess = (name === correctName)
    const wonGame = (this.state.score === 4)
    const lostGame = (this.state.lives === 1)

    if (correctGuess && wonGame) {
      this.setState({gameState: GAMESTATES.WIN})
    } else if (correctGuess) {
      this.setState({score: this.state.score+1})
      this.setDoggiesRandomly() 
    } else if (!correctGuess && lostGame) {
      this.setState({gameState: GAMESTATES.LOSS})
    } else {
      this.setState({lives: this.state.lives-1})
    }
  }
…
}
```

With all of our pieces in place, we are ready to update the render method of our App and insert functionality

```javascript
class App extends Component {
…
render() {
    const {currentDoggies, score, lives, gameState} = this.state
    const correctDoggie = this.getCorrectDoggie()
    const modalDiv = this.getModalView()
    if (gameState === GAMESTATES.IN_PROGRESS) {
      return (
        <div className="App">
          <Header restartGame={this.restartGame.bind(this)}/>
          <section className="Space"/>
          <InformationPanel 
            lives={lives} 
            score={score} 
            name={correctDoggie.name}/>
          <CardGrid 
            correctDoggie={correctDoggie} 
            doggies={currentDoggies} 
            handleClick={this.handleCardClick.bind(this)}/> //Each Card is given access to the inner Game logic of the app via this function
        </div>
      )
    } else {
      return (
        <div className="app">
          {modalDiv}
        </div>
      )
    }
  }
…
}
```

THE NEXT SET OF CHANGES OCCUR IN CardGrid/INDEX.JS

With this new set up functions and data, we can finally update our Card Component to utilize them (we now see which props are used)

First comes the render method:
```javascript
class Card extends Component {
...
render() {
    const {clicked} = this.state
    const {correctDoggie, doggie} = this.props
    const cssString = (clicked && correctDoggie.name === doggie.name)? 'overlay Yes' : //Complicated CSS, don’t worry too much if it is confusing!
                      (clicked && correctDoggie.name !== doggie.name)? 'overlay No'  :
                      ''
    return (
      <div className="Grid-card" onClick={this.handleClick.bind(this)}>
        <p className="Auto">{doggie.name}</p>
        <div className={cssString}/>
      </div>
    )
  }
 ...
 }
```

With potential animations in place, we are ready to allow our Card to be aware it being clicked. We must now add a proper click event handler within Card which changes it’s internal state of being clicked as well as utilizes it’s ancestor’s click event handler to change the higher state:

```javascript
class Card extends Component {
...
handleClick() {
    const {doggie, handleClick} = this.props
    this.setState({clicked: true}); 
    setTimeout(() => handleClick(doggie.name), 450)
  }
  ...
  }

With this, there is only ONE more item needed, and that is the ability to reset cards from a clicked state after a new round begins :
class Card extends Component {
...
componentWillUpdate(prevProps) {
    if (prevProps.doggie.name !== this.props.doggie.name) 
      this.setState({clicked: false})
  }
  ...
  }
  ```


With that, you are done! Feel free to explore parts of the code not covered in the tutorial and feel free to experiment with your own small apps. Check out React Docs on React.com
