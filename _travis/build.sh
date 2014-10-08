#!/bin/bash

gulp build
cd build
zip -q github-issue-browser-osx.zip -r github-issue-browser/osx
cd ../
echo "ziped!"
