import { ipcRenderer } from 'electron';

export function submitFile (file) {
  const filePath = file.path;
  console.log(filePath)
  ipcRenderer.send('submit-file', filePath);
  return {
    type: 'test'
  };
}
