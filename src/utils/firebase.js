// export const firebaseFun = (initializeApp, getAuth, GoogleAuthProvider, signInWithPopup) => {
//     const firebaseConfig = {
//         apiKey: "AIzaSyCMpDGKR-zFk0p2ZJgJe5n2_s8USXmdi6I",
//         authDomain: "leave-tracker-2bcd5.firebaseapp.com",
//         projectId: "leave-tracker-2bcd5",
//         storageBucket: "leave-tracker-2bcd5.appspot.com",
//         messagingSenderId: "232535910229",
//         appId: "1:232535910229:web:cffd139a832a477c8ab1dc",
//         measurementId: "G-LKD4R5QG5G",
//     }
//     // Initialize Firebase
//     const app = initializeApp(firebaseConfig);

//     const auth = getAuth(app);

//     const provider = new GoogleAuthProvider();
//     let newRes;
//     signInWithPopup(auth, provider).then((result) => {
//         newRes = result;
//     }).catch((err) => {
//         newRes = err;
//     });
//     return newRes;
// }