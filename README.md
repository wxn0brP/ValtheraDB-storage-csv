# @wxn0brp/db-storage-csv

A CSV storage adapter for the `@wxn0brp/db-core` library. This package allows you to use CSV files as a simple database backend.

## Usage

### Basic Setup

```typescript
import { DbStorageCsv } from '@wxn0brp/db-storage-csv';
import { ValtheraClass } from '@wxn0brp/db-core';

// Initialize the CSV storage
const csvStorage = new DbStorageCsv({
  dir: './data' // Directory where CSV files will be stored
});

// Or, for a single file
const singleFileStorage = new DbStorageCsv({
  file: './data.csv' // Path to a single CSV file
});
// Note: all collections redirect to the same file

const db = new ValtheraClass({
  dbAction: csvStorage
});
```

### Options

- `dir`: Path to a directory where CSV files for each collection will be stored.
- `file`: Path to a single CSV file to be used for storage (mutually exclusive with `dir`).

### Integration

This adapter is designed to work with `@wxn0brp/db-core`. You would typically use it by passing an instance of `DbStorageCsv` to your database core configuration.

## How it works

- When a collection is accessed, the adapter reads the corresponding CSV file.
- Data is parsed into JavaScript objects using the `csv` library.
- Writes stringify the data back into CSV format.

## License

MIT