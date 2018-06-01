import React from 'react';

const Circle = () => <div  className="Circle"/>

const Cross = () =>   
  <div  style={{marginLeft: 40}}>
    <div className="Cross"/>
  </div>

const LivesPanel = ({lives}) => {
  let lifeIcons = []
  for (let i = 1; i < 4; i++) {
    lifeIcons.push((i <= lives)? <Circle key={i}/> : <Cross key={i}/>)
  }
  return (
    <div className="Lives-container">
      {lifeIcons}
    </div>
  )
}

export const InformationPanel = ({lives, score, name}) => 
  <div className="Information">
    <div className="Information-scoreboard">
      <span>Score:</span>
      <div>{score}</div>
    </div>
    <LivesPanel lives={lives}/>
    <p className="Information-intro">{`Which doggie is a(n) ${name}?`}</p>
  </div>
