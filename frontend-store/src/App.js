// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload sisas.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// const user = {
//   name: 'Hedy Lamarr',
//   imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
//   imageSize: 90,
// };

// export default function Profile() {
//   return (
//     <>
//       <h1>{user.name}</h1>
//       <img
//         className="avatar"
//         src={user.imageUrl}
//         alt={'Photo of ' + user.name}
//         style={{
//           width: user.imageSize,
//           height: user.imageSize
//         }}
//       />
//     </>
//   );
// }

// const products = [
//   { title: 'Cabbage', id: 1 },
//   { title: 'Garlic', id: 2 },
//   { title: 'Apple', id: 3 },
// ];

// const listItems = products.map(product =>
//   <li key={product.id}>
//     {product.title}
//   </li>
// );

// return (
//   <ul>{listItems}</ul>
// );

import { useState } from "react";

// export default function MyButton() {

//   function handleClick() {

//     alert('You clicked me!');
//   }

//   return (
//     <button onClick={handleClick}>
//       Aqui mijo

//     </button>
//   );
// }

export default function Boton2(){
  const [count, setCount] = useState(0);

  function hand(){
    setCount(count+1);
  }
  return (
    <button onClick={hand}>
      clicked {count} TIMES
    </button>
  )
}


