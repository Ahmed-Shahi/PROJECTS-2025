// import logo from './logo.svg';
import './App.css';
// import { getDatabase, ref, set } from "firebase/database";
// import {app} from './FIREBASE-Config/Config'
import SignUp from './PAGES/SignUp'

// const db = getDatabase(app); 
function App() {
    // RealTime DataBase

  // (
  //   const main = () => {
  //     set(ref(db, 'Users/ahmed'),
  //       {
  //         UserName: 'Ahmed',
  //         Age: 19,
  
  //       }
  //     )
  //   }
  // )
  return (
    <div className="App">
      {/* <SignUp/> */}
      {/* RealTime DataBase */}

      {/* <h1>FIREBASE</h1>
      <button onClick={main}>CLICK ME</button> */}
    <SignUp/>  
  
    </div>
  );
}

export default App;
