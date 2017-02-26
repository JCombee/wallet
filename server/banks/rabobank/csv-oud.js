import TransactionParser from './../TransactionParser';
import csv from './../../parsers/csv';
import md5 from 'crypto-js/md5';

// https://www.rabobank.nl/images/pdf-verschillendocument-csv-oud-en-csv-nieuw_29860616.pdf

const parser = new TransactionParser();

parser.file = csv;

parser.inputHash = t => md5(t.join(' ')).toString();
parser.iban = t => t[0];
parser.currency = t => t[1];
parser.interestDate = t => dateStringToNewDate(t[2]);
parser.addSubstractCode = t => t[3];
parser.ammount = t => t[4];
parser.opposingIban = t => t[5];
parser.opposingAccountName = t => t[6];
parser.bookingDate = t => dateStringToNewDate(t[7]);
parser.bookingCode = t => t[8];
parser.description = t => t[10] + t[11] + t[12] + t[13] + t[14] + t[15];

function dateStringToNewDate(dateString) {
  const dateArr = [
    dateString.slice(0, 4),
    dateString.slice(4, 6),
    dateString.slice(6, 8)
  ];
  return new Date(dateArr.join(' '));
}

export default parser;
