import fs from 'fs';
import { parse } from 'csv-parse';
import { stringify } from 'csv-stringify';

const inputPath = './swift.csv';
const outputPath = './db-init/swift_parsed.csv';

const parser = parse({
    delimiter: ',',
    quote: '"',
    columns: true,
    trim: true,
    skip_empty_lines: true
  });
  

const rows: any[] = [];

fs.createReadStream(inputPath)
  .pipe(parser)
  .on('data', (row) => {
    const swiftCode = row['SWIFT CODE'];
    const isHQ = swiftCode.endsWith('XXX');
    rows.push({
        swift_code: swiftCode,
        bic8: swiftCode.slice(0, 8),
        bank_name: row['NAME'],
        address: row['ADDRESS'],
        town_name: row['TOWN NAME'],
        country_iso2: row['COUNTRY ISO2 CODE'].toUpperCase(),
        country_name: row['COUNTRY NAME'].toUpperCase(),
        is_headquarter: isHQ
      });      
  })
  .on('end', () => {
    stringify(rows, { header: true }, (err, output) => {
      if (err) {
        console.error('Stringify error:', err);
        return;
      }
      fs.writeFileSync(outputPath, output);
      console.log(`✅ CSV zapisany jako ${outputPath}`);
    });
  });
