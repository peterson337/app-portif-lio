import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage} from 'firebase/storage';
import { getAuth} from "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyBcf8MXzkoHPVuZJLrusbwSQh-4koOBauw",
    authDomain: "portifolioapp-44d2e.firebaseapp.com",
    projectId: "portifolioapp-44d2e",
    storageBucket: "portifolioapp-44d2e.appspot.com",
    messagingSenderId: "717908193896",
    appId: "1:717908193896:web:3d4b782953d5c4c5cb01dd",
    measurementId: "G-WX3H97DXC6"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const storage = getStorage(app);

    export{db, auth, storage};

    const Firebase = () => {
        return null;
      };
      
      export default Firebase;