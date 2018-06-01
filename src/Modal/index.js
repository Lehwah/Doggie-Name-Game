import React from 'react';
import win from '../images/win.svg'
import lose from '../images/lose.svg'
import redo from '../images/redo.svg'

const ModalView = ({image, phrase1, phrase2}) =>
  <div>
    <div>
      <img width={150} height={150} alt="win" src={image}/>
    </div>
    <div>
      <p>{phrase1}</p>
      <p>{phrase2}</p>
    </div>
  </div> 

const Modal = (props) => 
  <div className="Modal">
    <div className="Modal-popup">
      {props.children}
    </div>
  </div>

export const WinView = ({restartGame}) => 
  <Modal>
    <div>
      <ModalView 
        image={win} 
        phrase1='You got 5 correct...' 
        phrase2='You Win!'/>
      <div>
        <button onClick={restartGame} className="Modal-button New-game">NEW GAME</button>
      </div>
    </div>
  </Modal>

export const LoseView = ({restartGame}) => 
  <Modal>
    <div>
      <ModalView 
        image={lose} 
        phrase1='Oops! You missed 3 dogs in total.' 
        phrase2='You Lose...'/>
      <div>
        <button onClick={restartGame} className="Modal-button New-game">NEW GAME</button>
      </div>
    </div>
  </Modal>

export const RestartView = ({restartGame, keepGame}) => 
  <Modal>
    <div>
      <ModalView 
        image={redo} 
        phrase1='Would you like to restart?'/>
      <div>
        <button onClick={restartGame} className="Modal-button Yes">YES</button>
        <button onClick={keepGame} className="Modal-button No">NO</button>
      </div>
    </div>
  </Modal>


