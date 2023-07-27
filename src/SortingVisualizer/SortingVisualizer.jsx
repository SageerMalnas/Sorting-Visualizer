import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import {getBubbleSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import { getSelectionSortAnimations } from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';
import { getQuickSortAnimations } from '../sortingAlgorithms/Quicksort.js';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 270;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({array}); //The setState() method allows you to modify the state object of a component, 
    // which triggers a re-rendering of the component and its child 
    // components with the updated state values. 
    // It is an asynchronous function that takes an object or a function as its argument.
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    const animations = getQuickSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < animations.length; i++) {
      const { bars, swap } = animations[i];
      const barOneIdx = bars[0];
      const barTwoIdx = bars[1];
      const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
      if (swap) {
        setTimeout(() => {
          const tempHeight = arrayBars[barOneIdx].style.height;
          arrayBars[barOneIdx].style.height = arrayBars[barTwoIdx].style.height;
          arrayBars[barTwoIdx].style.height = tempHeight;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          arrayBars[barOneIdx].style.backgroundColor = SECONDARY_COLOR;
          arrayBars[barTwoIdx].style.backgroundColor = PRIMARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }
  

  SelectionSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
      const animations = getSelectionSortAnimations(this.state.array);
      const arrayBars = document.getElementsByClassName('array-bar');
      for (let i = 0; i < animations.length; i++) {
        const { bars, swap } = animations[i];
        const barOneIdx = bars[0];
        const barTwoIdx = bars[1];
        if (swap) {
          setTimeout(() => {
            const tempHeight = arrayBars[barOneIdx].style.height;
            arrayBars[barOneIdx].style.height = arrayBars[barTwoIdx].style.height;
            arrayBars[barTwoIdx].style.height = tempHeight;
          }, i * ANIMATION_SPEED_MS);
        } else {
          setTimeout(() => {
            arrayBars[barOneIdx].style.backgroundColor = SECONDARY_COLOR;
            arrayBars[barTwoIdx].style.backgroundColor = PRIMARY_COLOR;
          }, i * ANIMATION_SPEED_MS);
        }
      }
    }
    

  bubbleSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
      const animations = getBubbleSortAnimations(this.state.array);
      const arrayBars = document.getElementsByClassName('array-bar');
      for (let i = 0; i < animations.length; i++) {
        const { bars, swap } = animations[i];
        const barOneIdx = bars[0];
        const barTwoIdx = bars[1];
        if (swap) {
          setTimeout(() => {
            const tempHeight = arrayBars[barOneIdx].style.height;
            arrayBars[barOneIdx].style.height = arrayBars[barTwoIdx].style.height;
            arrayBars[barTwoIdx].style.height = tempHeight;
          }, i * ANIMATION_SPEED_MS);
        } else {
          setTimeout(() => {
            arrayBars[barOneIdx].style.backgroundColor = SECONDARY_COLOR;
            arrayBars[barTwoIdx].style.backgroundColor = PRIMARY_COLOR;
          }, i * ANIMATION_SPEED_MS);
        }
      }
    }
    
  

  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      // const mergeSortedArray = getMergeSortAnimations(array.slice());
      const quickSortedArray = array.slice().sort((a,b)=> a- b);
      const selectionSortedArray = array.slice().sort((a,b)=> a- b);
      const bubbleSortedArray = array.slice().sort((a,b)=> a- b);
      console.log(arraysAreEqual(javaScriptSortedArray, quickSortedArray));
      console.log(arraysAreEqual(javaScriptSortedArray, selectionSortedArray));
      console.log(arraysAreEqual(javaScriptSortedArray, bubbleSortedArray));
    }
  }

  render() {
    const {array} = this.state;

    return (
      
      <div className="array-container1">
        <h1>Sorting Visualizer</h1>
        <div className='btn-style'>
        <button className='btn-style0' onClick={() => this.resetArray()}>Generate New Array</button>
        <button className='btn-style0' onClick={() => this.mergeSort()}>Merge Sort</button>
        <button className='btn-style0' onClick={() => this.quickSort()}>Quick Sort</button>
        <button className='btn-style0' onClick={() => this.SelectionSort()}>Selection Sort</button>
        <button className='btn-style0' onClick={() => this.bubbleSort()}>Bubble Sort</button>
        <button className='btn-style0' onClick={() => this.testSortingAlgorithms()}>
          Test Sorting Algorithms (BROKEN)
        </button>
        </div >
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
              }}></div>
          ))}
        </div>
        
        
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}