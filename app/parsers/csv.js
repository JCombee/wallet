import fs from 'fs';
import csv from 'fast-csv';

export default function (file, transaction, end) {
  const stream = fs.createReadStream(file.path);
  const csvStream = csv()
    .on('data', (data) => {
      transaction(data);
    })
    .on('end', () => {
      end();
    });

  stream.pipe(csvStream);
}
