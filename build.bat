@echo off
call npx webpack
call pkg ./dist/bundle.js -o "! image deleter"