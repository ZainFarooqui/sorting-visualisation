import React from 'react';
import './component.css';
import Bar from './Bar';
import doBubbleSort from '../algorithm/bubbleSort'

const sortingState = {
  UNSORTED: 0,
  SORTING: 1,
  SORTED: 2
}

class Board extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      array: [500, 100 , 400, 200, 300],
      sortingStatus: sortingState.UNSORTED,
		}
  }

  componentDidMount() {
    this.setArray();
  }

  setArray() {
    const tempArray = [];
    for (let i=0; i < 10; i++) {
      tempArray.push(getRandomInt(10,700));
    }
    this.setState({array: tempArray, sortingStatus: sortingState.UNSORTED})
  }

  bubbleSort() {
    this.setState({sortingStatus: sortingState.SORTING})
    const arrayBars = document.getElementsByClassName('array-bar');
    const animationRecord = doBubbleSort(this.state.array);
    console.log(animationRecord)
    this.animateSort(0, animationRecord.length-1, animationRecord, arrayBars)
  };

  animateSort(start, end, animationRecord, arrayBars) {
    console.log(start, end)
    if (start > end) {
      this.setState({sortingStatus: sortingState.SORTED})
      return
    };
    setTimeout( ()=>{
      let barOneStyle = arrayBars[animationRecord[start][0]].style;
      let barTwoStyle = arrayBars[animationRecord[start][1]].style;
      let temp = barTwoStyle.height;
      barTwoStyle.height =barOneStyle.height;
      barOneStyle.height = temp;
      start++
      this.animateSort(start, end, animationRecord, arrayBars)
    }, 5)
  }

  render() { 
    return (
			<div>
				<div className="array-container">
					{this.state.array.map((values, i) => (
            <Bar value={values} index={i}/>
          ))}
				</div>
        <button className="button" onClick={() => this.setArray()} disabled={this.state.sortingStatus === 1}>
          Reset Array
        </button>
        <button className="button" onClick={() => this.bubbleSort()} disabled={this.state.sortingStatus !== 0}>
          Bubble Sort
        </button>
			</div >
    );
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); 
}

export default Board;
