// This snippet file was generated by processing the source file:
// ./auth-next/apple.js
//
// To update the snippets in this file, edit the source and then run
// 'npm run snippets'.

// [START auth_apple_signin_redirect_modular]
import { getAuth, signInWithRedirect } from "firebase/auth";

const auth = getAuth();
signInWithRedirect(auth, provider);
// [END auth_apple_signin_redirect_modular]