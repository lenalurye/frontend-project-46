### Hexlet tests and linter status

[![Hexlet Actions Status](https://github.com/lenalurye/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/lenalurye/frontend-project-46/actions)

[![Project Actions Status](https://github.com/lenalurye/frontend-project-46/actions/workflows/nodejs.yml/badge.svg)](https://github.com/lenalurye/frontend-project-46/actions)

[![Maintainability](https://api.codeclimate.com/v1/badges/28945928a913e297ecda/maintainability)](https://codeclimate.com/github/lenalurye/frontend-project-46/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/28945928a913e297ecda/test_coverage)](https://codeclimate.com/github/lenalurye/frontend-project-46/test_coverage)

### About

This program compares two configuration files in either of json / yaml formats and outputs the difference in
different formats:

* stylish (default) - nice-looking diff with indentation
* plain - a simple text format suitable for automatic processing
* json - machine-readable list of differences

### CLI usage

```
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  output format
  -h, --help           display help for command
```

### Library usage

```javascript
import diff from 'frontend-project-46/diff.js';

diff('file1', 'file2', 'stylish');  // contents of the diff
```

### Demos

Format stylish

https://asciinema.org/a/bAXKTiUB4NPIXQjP2vmQucGWr

Format plain

https://asciinema.org/a/U3HpE5nkuSELCgeFaaRhPLWz0

Format json

https://asciinema.org/a/wxYXVu8VS8AjXX1tL6YDHChkE