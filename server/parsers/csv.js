import fs from 'fs';
import csv from 'fast-csv';

export default function (filePath, start, transaction, end) {
  const stream = fs.createReadStream(filePath);
  const csvStream = csv()
    .on('start', () => {
      start();
    })
    .on('data', (data) => {
      transaction(data);
    })
    .on('end', () => {
      end();
    });

  stream.pipe(csvStream);
}
