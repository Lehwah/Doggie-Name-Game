import React, {Component} from 'react';
import {RestartView} from '../Modal'

export const Header = ({restartGame}) =>  
  <nav className="Header">
      <MenuIcon restartGame={restartGame}/>
      <HeaderTitle/>
  </nav>

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
    const modalDiv = (show)? 
      <RestartView
      restartGame={this.handleRestart.bind(this)} 
      keepGame={this.toggleMenu.bind(this)}/> : 
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

const HeaderTitle = () => 
  <header className="Header-Title-Container">
    <h1 className="Header-Title">Doggie Name Game!</h1>
  </header>
