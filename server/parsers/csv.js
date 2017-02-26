import fs from 'fs';
import csv from 'fast-csv';

export default function (filePath, transaction, end) {
  const stream = fs.createReadStream(filePath);
  const csvStream = csv()
    .on('data', (data) => {
      transaction(data);
    })
    .on('end', () => {
      end();
    });

  stream.pipe(csvStream);
}
