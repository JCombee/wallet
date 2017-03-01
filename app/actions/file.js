import { ipcRenderer } from 'electron';

export function submitFile (file) {
  const filePath = file.path;
  ipcRenderer.send('submit-file', filePath);
  return {
    type: 'test'
  };
}
