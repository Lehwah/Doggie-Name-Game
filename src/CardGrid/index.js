import React, {Component} from 'react';

export const CardGrid = (props) => 
  <div className="Grid">
        {props.doggies.map((doggie, i) => <Card key={i} doggie={doggie} {...props}/>)}
  </div>
  
class Card extends Component {
  state = { clicked: false }

  componentWillUpdate(prevProps) {
    if (prevProps.doggie.name !== this.props.doggie.name) 
      this.setState({clicked: false})
  }

  handleClick() {
    const {doggie, handleClick} = this.props
    this.setState({clicked: true}); 
    setTimeout(() => handleClick(doggie.name), 450)
  }

  render() {
    const {clicked} = this.state
    const {correctDoggie, doggie} = this.props
    const cssString = (clicked && correctDoggie.name === doggie.name)? 'overlay Yes' :
                      (clicked && correctDoggie.name !== doggie.name)? 'overlay No'  :
                      ''
    return (
      <div className="Grid-card" onClick={this.handleClick.bind(this)}>
        <p className="Auto">{doggie.name}</p>
        <div className={cssString}/>
      </div>
    )
  }
}