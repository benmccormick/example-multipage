# requirejs/example-multipage Memory Leak example

This is a fork of requirejs' example multipage project designed to show that requirejs leaks memory when run through Node multiple times.

To run this test, you'll need to have nodejs installed.  Then go through these steps

1. Clone this repo
2. Run `npm install` from the base directory of the repo
3. run `node testrequire.js`, and then start saving files in the `www/js` directory. After each save, the script should build.  You can wait till the previous build finishes to save a file again

If memory is leaking, the first few builds will run fast, but the optimization will take longer over time and eventually fail due to a lack of memory.

This is meant to be a simplifed example of a problem I've seen trying to run r.js based on a watch command in a larger production application.
