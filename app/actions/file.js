import fetch from 'isomorphic-fetch';

export function submitFile(file) {
  const filePath = file.path;
  const body = JSON.stringify({ filePath });
  fetch('http://localhost:3000/file', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  });
  return {
    type: 'test'
  };
}
