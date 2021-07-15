import path from "path";
import { getFileName } from "./Tools";

const electron = window.require("electron");
const fs = window.require("fs");
const childProcess = window.require("child_process");

const loadProgramData = (folder) => {
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
      loadProgramData(content).forEach(subcontent => {
        contents.push(subcontent);
      })
    } else if (content.endsWith(".lnk")) {
      try {
        const targetDirectory = path.join(electron.remote.app.getPath("userData"), "icons");
        if (!fs.existsSync(targetDirectory)) fs.mkdirSync(targetDirectory);

        const exeLocation = electron.shell.readShortcutLink(content).target;
        const targetIconLocation = path.join(targetDirectory, `${getFileName(exeLocation)}.bmp`);

        if (!exeLocation.endsWith(".exe")) return;

        childProcess.exec(`powershell "Add-Type -AssemblyName System.Drawing; [System.Drawing.Icon]::ExtractAssociatedIcon('${exeLocation}').ToBitmap().Save('${targetIconLocation}')"`);

        contents.push({
          exe: exeLocation,
          icon: targetIconLocation
        });
      } catch (e) {
        console.error(e, content);
      }
    }
  });
  return contents;
}

let programData = JSON.parse(localStorage.getItem("programData"));

if (!programData) {
  const programData = loadProgramData("C:/ProgramData/Microsoft/Windows/Start Menu/Programs");
  const userProgramData = loadProgramData("C:/Users/patri/AppData/Roaming/Microsoft/Windows/Start Menu/Programs");
  for (const userProgram of userProgramData) {
    programData.push(userProgram);
  }

  for (let i = 0; i < programData.length; i++) {
    for (let j = i + 1; j < programData.length; j++) {
      if (programData[i].exe === programData[j].exe) {
        programData.splice(j, 1);
        j--;
      }
    }
  }
  console.log(programData);
  localStorage.setItem("programData", JSON.stringify(programData));
}
//electron.shell.openExternal(electron.shell.readShortcutLink(getFilesInFolderRecursively("C:/ProgramData/Microsoft/Windows/Start Menu/Programs")[0]).target);

export const getProgramData = () => programData;