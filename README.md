# Housing Search Automation

In here we have a project which looks at shared apartments listed on the [wg-gesucht](http://wg-gesucht.at) website and filters them by qualities that I would prefer.

The goal of the project is to automate the application of apartment hunting.

It uses Selenium and Javascript to automate an interaction on Safari on MacOS.

The process requires a human in the loop to monitor the progress and navigate around any Captcha tests, as well as to run specific tasks and work around times where there may be network lag or when the browser gets confused.

## Running:

Requires:
* MacOS
* Chrome or Safari, with [Browser Automation Enabled](https://developer.apple.com/documentation/webkit/testing_with_webdriver_in_safari?changes=_2)
* NodeJS

Setup:
```console
brew install --cask chromedriver
cd wg-gesucht
npm install
```

Running requires opening the code and executing parts into the NodeJS terminal

```console
code . &
node --experimental-fetch --experimental-repl-await
```
