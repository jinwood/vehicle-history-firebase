import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {initializeApp} from "firebase-admin";
import {firebaseConfig} from "../config";

initializeApp(firebaseConfig);

exports.createFirestoreUser = functions.auth.user().onCreate(async (user) => {
  const db = admin.firestore();
  const userDocRef = db.collection("users").doc(user.uid);

  const userData = {
    email: user.email,
    displayName: user.displayName,
  };

  try {
    await userDocRef.set(userData);
    console.log("User document createdin Firestore.");
  } catch (error) {
    console.error("Error creating user document:", error);
  }
});
