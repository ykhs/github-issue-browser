#!/bin/bash

gulp nwbuild
cd build
zip -q github-issue-browser-osx.zip -r github-issue-browser/osx
cd ../
echo "ziped!"
