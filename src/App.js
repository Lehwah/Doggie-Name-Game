import React, { Component } from 'react';
import './App.css';
import {WinView, LoseView} from './Modal'
import {Header} from './Header'
import {InformationPanel} from './Information'
import {CardGrid} from './CardGrid'
import {doggieData} from './Data'

const GAMESTATES = {
  WIN: 'WIN',
  IN_PROGRESS: 'IN_PROGRESS',
  LOADING: 'LOADING',
  LOSS: 'LOSS'
}

class App extends Component {
  state = {
    score: 0,
    lives: 3,
    doggies: doggieData,
    currentDoggies: [],
    gameState: GAMESTATES.LOADING
  }

  componentDidMount() {
    this.randomizeDoggies()
  }

  handleCardClick(name) {
    const correctName = this.getCorrectDoggie().name
    const correctGuess = (name === correctName)
    const wonGame = (this.state.score === 4)
    const lostGame = (this.state.lives === 1)

    if (correctGuess && wonGame) {
      this.setState({gameState: GAMESTATES.WIN})
    } else if (correctGuess) {
      this.setState({score: this.state.score+1})
      this.randomizeDoggies() 
    } else if (!correctGuess && lostGame) {
      this.setState({gameState: GAMESTATES.LOSS})
    } else {
      this.setState({lives: this.state.lives-1})
    }
  }

  randomizeDoggies() {
    const { doggies } = this.state 
    const doggieCount = doggies.length
    const doggiesForRound = []
    
    for (let i = 0; i < 6; i++) {
      const index = Math.round(Math.random() * (doggieCount - 1))
      const doggie = doggies[index]
      doggie.isDoggie = false
      doggiesForRound.push(doggie)
    }

    const randomIndex = Math.round(Math.random() * 5)
    doggiesForRound[randomIndex].isDoggie = true

    this.setState({
      currentDoggies: doggiesForRound, 
      gameState: GAMESTATES.IN_PROGRESS
    })
  }

  restartGame() {
    this.setState({
      score: 0,
      lives: 3,
      gameState: GAMESTATES.IN_PROGRESS
    })
    this.randomizeDoggies()
  }

  getCorrectDoggie() {
    return this.state.currentDoggies.filter(doggie => doggie.isDoggie)[0]
  }

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
            handleClick={this.handleCardClick.bind(this)}/>
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
}

export default App;
