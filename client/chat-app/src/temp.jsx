// Q1) Revert your name (without using the inbuilt function)
// For example:
// Name: Akshay
// Output: yahskA

function reversedname(name) {
    let reverse = "";
    for (let i = name.length - 1; i >= 0; i--) {
        reverse += name[i];
    }
    return reverse;
}
let Name = Akshay
console.log(reversedname(Name)); //Output:- yahskA


// Q2) How to create promises in Javascript.

function myPromiseFunction() {
    return new Promise((resolve, reject) => {
        const success = true; // Change this to false to test rejection
        if (success) {
            resolve("Promise resolved successfully!");
        } else {
            reject("Promise rejected!");
        }
    });
}
myPromiseFunction()
    .then((result) => console.log(result))
    .catch((error) => console.log(error));


// Q3) Count the number of times the element gets repeated.
// Question => const data = ['apple', 'banana', 'apple', 'orange', 'banana',
//     'apple'].

const NumberOfElementGetRepeated = arr => {
    const counts = {};
    arr.forEach(item => {
        counts[item] = (counts[item] || 0) + 1;
    });
    return counts;
};
console.log(NumberOfElementGetRepeated(data));

// Q4) Create a counter in react that start from 0 to 10 automatically when the
// page loads.

import React, { useState, useEffect } from 'react';
function Counter() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (count < 10) {
            const timer = setInterval(() => {
                setCount(prevCount => prevCount + 1);
            }, 1000);
            // Cleanup interval on component unmount
            return () => clearInterval(timer);
        }
    }, [count]);
    return (
        <div>
            <h1>Counter: {count}</h1>
        </div>
    );
}
export default Counter;