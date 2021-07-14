import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";
/*
import path from "path";
import { getFileName } from "./Tools";

const electron = window.require("electron");
const fs = window.require("fs");
const { extractIcon } = window.require("@inithink/exe-icon-extractor");

const getFilesInFolderRecursively = (folder) => {
  const pathsToIgnore = [
    path.join("C:/ProgramData/Microsoft/Windows/Start Menu/Programs/Administrative Tools"),
    path.join("C:/ProgramData/Microsoft/Windows/Start Menu/Programs/Accessibility"),
    path.join("C:/ProgramData/Microsoft/Windows/Start Menu/Programs/Accessories"),
    path.join("C:/ProgramData/Microsoft/Windows/Start Menu/Programs/Windows Kits")
  ];

  if (pathsToIgnore.includes(path.join(folder))) {
    return [];
  }

  const contents = [];
  fs.readdirSync(folder).forEach((content) => {
    content = path.join(folder, content);
    if (fs.lstatSync(content).isDirectory()) {
      getFilesInFolderRecursively(content).forEach(subcontent => {
        contents.push(subcontent);
      })
    } else if (content.endsWith(".lnk")) {
      contents.push(content);
      try {
        const dir = path.join(electron.remote.app.getPath("userData"), "icons");
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);

        const target = path.join(electron.shell.readShortcutLink(content).target);
        const iconFile = path.join(dir, `${getFileName(target)}.ico`);
        fs.writeFileSync(iconFile, extractIcon(target, "large"));
      }
      catch (e) {
        //console.error(`Failed to load icon for ${content}: ${e}`);
      }
    }
  });
  return contents;
}*/
//console.log(getFilesInFolderRecursively("C:/ProgramData/Microsoft/Windows/Start Menu/Programs"));
//electron.shell.openExternal(electron.shell.readShortcutLink(getFilesInFolderRecursively("C:/ProgramData/Microsoft/Windows/Start Menu/Programs")[0]).target);

const firebaseConfig = {
  apiKey: "AIzaSyC4Qhu9o8UWhS1xwxOhjQJEnmt_UvyzK1A",
  authDomain: "routine-tracker-4db49.firebaseapp.com",
  databaseURL: "https://routine-tracker-4db49.firebaseio.com",
  projectId: "routine-tracker-4db49",
  storageBucket: "routine-tracker-4db49.appspot.com",
  messagingSenderId: "462881992703",
  appId: "1:462881992703:web:afd3733b3de13fe65741ca",
  measurementId: "G-YLX8EQPKTY"
};
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = firebase.storage();
export const database = firebase.database();

let user = null;
export const setFirebaseUser = (firebaseUser) => user = firebaseUser;

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const dataWrite = (path, data) => {
  database
    .ref(`users/${user.uid}/${path}`)
    .set(data);
};

export const dataRead = async (path, callback) => {
  return database
    .ref(`users/${user.uid}/${path}`)
    .once("value")
    .then(function (snapshot) {
      if (callback) callback(snapshot.val());
    });
};