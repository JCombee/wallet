import TransactionParser from './../TransactionParser';
import csv from './../../parsers/csv';

// https://www.rabobank.nl/images/pdf-verschillendocument-csv-oud-en-csv-nieuw_29860616.pdf

const parser = new TransactionParser;

parser.file = csv;

parser.inputHash = t => t.join(' ');
parser.account = t => t[ 0 ];
parser.currency = t => t[ 1 ];

export default parser;
