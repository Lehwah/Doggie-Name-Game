import React, { Component } from 'react';
import './App.css';
import win from './images/win.svg'
import lose from './images/lose.svg'
import redo from './images/redo.svg'

class Header extends Component {
  render() {
    return (
      <nav className="Header">
          <MenuIcon restartGame={this.props.restartGame}/>
          <HeaderTitle/>
      </nav>
    )
  }
}
class MenuIcon extends Component {
  state = { show: false }

  handleRestart() {
    this.setState({show: !this.state.show})
    this.props.restartGame()
  }

  toggleMenu() {
    this.setState({show: !this.state.show})
  }

  render() {
    const {show} = this.state
    const changeCss = (show)? 
      'show' :
      ''
    const restartProp = <RestartView
                          restartGame={this.handleRestart.bind(this)} 
                          keepGame={this.toggleMenu.bind(this)}/>
    const modalDiv = (show)? 
      <Modal render={restartProp}/> : 
      null
    
    return (
      <div>
        {
          modalDiv
        }
        <menu className="Header-menu-icon" onClick={this.toggleMenu.bind(this)}>
          <div className={`Header-menu-bar1 ${changeCss}`}/>
          <div className={`Header-menu-bar2 ${changeCss}`}/>
          <div className={`Header-menu-bar3 ${changeCss}`}/>
        </menu>
      </div>
    )
  }
}
class HeaderTitle extends Component {
  render() {
    return (
      <header className="Header-Title-Container">
        <h1 className="Header-Title">Doggie Name Game!</h1>
      </header>
    )
  }
}


class WinView extends Component {
  render() {
    return (
      <div>
        <div>
          <img width={150} height={150} alt="win" src={win}/>
        </div>
        <div>
          <p>You got 5 correct...</p>
          <p>You Win!</p>
        </div>
        <div>
          <button onClick={this.props.restartGame} className="Modal-button New-game">NEW GAME</button>
        </div>
      </div>
    )
  }
}
class LoseView extends Component {
  render() {
    return (
      <div>
        <div>
          <img width={150} height={150} alt="lose" src={lose}/>
        </div>
        <div>
          <p>Oops! You missed 3 dogs in total.</p>
          <p>You Lose...</p>
        </div>
        <div>
          <button onClick={this.props.restartGame} className="Modal-button New-game">NEW GAME</button>
        </div>
      </div>
    )
  }
}
class RestartView extends Component {
  render() {
    return (
      <div>
        <div>
          <img width={150} height={150} alt="restart" src={redo}/>
        </div>
        <div>
          <p>Would you like to restart?</p>
        </div>
        <div>
          <button onClick={this.props.restartGame} className="Modal-button Yes">YES</button>
          <button onClick={this.props.keepGame} className="Modal-button No">NO</button>
        </div>
      </div>
    )
  }
}
class Modal extends Component {
  render() {
    return (
        <div className="Modal">
          <div className="Modal-popup">
            {this.props.render}
          </div>
        </div>
    )
  }
}


class CardGrid extends Component {
  render() {
    return (
      <div className="Grid">
        {
          this.props.doggies.map((doggie, i) => <Card key={i} correctDoggie={this.props.correctDoggie} handleClick={this.props.handleClick} doggie={doggie}/>)
        }
      </div>
    )
  }
}
class Card extends Component {
  state = {
    clicked: false
  }

  componentWillUpdate(prevProps) {
    if(prevProps.doggie.name !== this.props.doggie.name) {
      this.setState({clicked: false})
    }
  }

  handleClick() {
    this.setState({clicked: true}); 
    setTimeout(() => {

      this.props.handleClick(this.props.doggie.name);
    }, 250)
    
  }

  render() {
    const cssString = (this.state.clicked && this.props.correctDoggie.name === this.props.doggie.name)? 'overlay Yes' :
                      (this.state.clicked && this.props.correctDoggie.name !== this.props.doggie.name)? 'overlay No' : ''
    return (
      <div className="Grid-card" onClick={this.handleClick.bind(this)}>
        <p style={{margin: 'auto'}}>
          {this.props.doggie.name}
        </p>
        <div className={cssString}/>
      </div>
    )
  }
}


class LivesPanel extends Component {
  render() {
    let lifeIcons = []
    for (let i = 1; i < 4; i++) {
      if (i <= this.props.lives) {
        lifeIcons.push(
            <div key={i} className="Circle"/>
        )
      } else {
        lifeIcons.push(
          <div key={i} style={{marginLeft: 40}}>
            <div className="Cross"/>
          </div>
        )
      }
      
    }
    return (
        <div className="Lives-container">
          {
            lifeIcons
          }
        </div>
    )
  }
}
class InformationPanel extends Component {
  render() {
    return (
      <div className="Information">
          <div className="Information-scoreboard">
            <span>Score:</span>
            <div>{this.props.score}</div>
          </div>
          <LivesPanel lives={this.props.lives}/>
          <p className="Information-intro">{`Which doggie is a(n) ${this.props.name}?`}</p>
      </div>
    )
  }
}

class App extends Component {
  state = {
    score: 0,
    lives: 3,
    doggies: [
      {name: 'beagle'}, 
      {name: 'hound'}, 
      {name: 'husky'}, 
      {name: 'shitzu'}, 
      {name: 'pug'}, 
      {name: 'akita'},
      {name: 'corgi'}, 
      {name: 'chihuahua'}, 
      {name: 'weiner'}, 
      {name: 'rottweiler'}, 
      {name: 'bernard'}, 
      {name: 'labrador retriever'}, 
      {name: 'poodle'}, 
      {name: 'bulldog'}, 
      {name: 'terrier'}, 
      {name: 'boxer'},
      {name: 'dobermann'}, 
      {name: 'chow'}, 
      {name: 'greyhound'}, 
      {name: 'malamute'},
    ],
    currentDoggies: [],
    gameState: 'pending' //'win' 'progress' 'lose' 'pending'
  }

  componentDidMount() {
    this.randomizeDoggies()
  }

  handleCardClick(name) {
    console.log(name, this.getCorrectDoggie().name)
    const correctGuess = (name === this.getCorrectDoggie().name)
    const wonGame = (this.state.score === 4)
    const lostGame = (this.state.lives === 1)

    if (correctGuess && wonGame) {
      this.setState({gameState: 'win'})
    } else if (correctGuess) {
      this.setState({score: this.state.score+1})
      this.randomizeDoggies() 
    } else if (!correctGuess && lostGame) {
      this.setState({gameState: 'lose'})
    } else {
      this.setState({lives: this.state.lives-1})
    }
  }

  randomizeDoggies() {
    const { doggies } = this.state 
    const totalDoggies = doggies.length
    const selectedDoggies = []
    
    for (let i = 0; i < 6; i++) {
      const index = Math.round(Math.random() * (totalDoggies - 1))
      const doggie = doggies[index]
      doggie.isDoggie = false
      selectedDoggies.push(doggie)
    }

    const selectedDoggieIndex = Math.round(Math.random() * 5)
    selectedDoggies[selectedDoggieIndex].isDoggie = true

    this.setState({currentDoggies: selectedDoggies, gameState: 'progress'})
  }

  restartGame() {
    this.setState({
      score: 0,
      lives: 3,
      gameState: 'progress'
    })
    this.randomizeDoggies()
  }

  getCorrectDoggie() {
    return this.state.currentDoggies.filter(doggie => doggie.isDoggie)[0]
  }

  getModalView() {
    return  (this.state.gameState === 'progress')? null : 
            (this.state.gameState === 'win')? <Modal render={<WinView restartGame={this.restartGame.bind(this)}/>}/> :
            <Modal render={<LoseView restartGame={this.restartGame.bind(this)}/>}/>
  }

  render() {
    const {currentDoggies, score} = this.state
    const correctDoggie = this.getCorrectDoggie()
    const modalDiv = this.getModalView()
    if(this.state.gameState === 'progress'){
      return (
        <div className="App">
          <Header restartGame={this.restartGame.bind(this)}/>
          <section className="Space"/>
          <InformationPanel lives={this.state.lives} score={score} name={correctDoggie.name}/>
          <CardGrid correctDoggie={correctDoggie} doggies={currentDoggies} handleClick={this.handleCardClick.bind(this)}/>
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
