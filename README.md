#Aframe NodeJS Selenium / Appium tests

This repository contains test that will be testing the A-Frame website, examplesand test pages.
* for the architecture and a basic understanding on how things connect : http://appium.io/introduction.html
* when connecting to real devices sometimes you may need a proxy to establish the connection

## Setup for Appium

### Windows
* install ( latest not stable ) node : https://nodejs.org/en/download/  
* install git/github
* install mocha : npm install -g mocha
* install appium : npm install -g appium
( if you run into issues doing the appium install, do a npm cache clear )
* install webdriver : npm install wd

### Mac 
* make sure to install the latest XCode ( you need at least xcode 7.1 or greater )
* install commandline for XCode
* you may also have to setup some certifications and have a developer.apple.com account
* install node : https://nodejs.org/en/download/
* install git/github if not already installed via XCode
* install mocha : npm install -g mocha
* install appium : npm install -g appium
( if you run into issues doing the appium install, do a npm cache clear )
* install webdriver : npm install wd

### iPhone
* NOTE: iPhone Simulator and Device is only for the Mac platform.
* Install: brew install ios-webkit-debug-proxy

#### Simulator
* run xcode so that you can get the the iphone simulator
* start the simulator
* start the appium app with the iphone simulator config
* run your test

#### Device
* run xcode app : SafariLauncher 
** you will need to have this installed to the device
* you can close out of it once it's installed
* git clone the appium repo 
* from the appium repo : ./bin/ios-webkit-debug-proxy-launcher.js -u f0f5e11e2a908f5984d233d06835592f8cc1c715:27753 -d
* launch appium with the real iphone settings 
* mocha <yourtest>.js

### Android 
* install java sdk/runtime 8
* install android studio ( on mac make sure to uninstall 1.1 HAXM and install version 6 installer then run the installer for HAXM ) 
* install Android SDK
* be sure to setup a path to the Java runtime, the android SDK tools and platfor
m in the system variables
* be sure to set the JAVA_HOME directory
* be sure to setup the Android SDK location : ie C:\Users\<userid>\AppData\Local
\Android\sdk for windows

#### Emulator 
* dowload the samsung s7/s7 edge/note 5 skins  ( s6 emulator has the wrong scaling)
* set up AVD with the skins : http://developer.samsung.com/technical-doc/view.do?v=T000000095
* launch the emulator for the device you want to test
* launch appium
* make sure that the settings reflect the emulator : 
** make sure to place in the Android SDK in the android setting
** select the AVD 
** select Browser for the browser 
* run your test

#### Device
* install chromedriver: http://chromedriver.storage.googleapis.com/index.html?path=2.21/
* adb start-server
* make sure you can show the device : adb devices
* run appium and use the config for android device
* run your test 

## Troubleshooting : 
### iOS/OS X:
* make sure you have ANDROID_HOME, JAVA_HOME, and the Android SDK paths set in your path
* a great way to see the devices that you can connect to and the IDs : instruments -s devices  

### Android : 
* adb devices : having one device attached or one emulator up would help out; though you can specific the device using -s <device id>

### Appium :
* run the appium-doctor app to make sure you have all the tools installed correctly  
* once you have the emulator, device, etc, up and running and appium started, try running the inspector.  If appium doesn't connect to the inspector and show you things within the inspector, chances are that might be where the break is.

### windows :
* make sure you have JAVA_HOME and ANDROID_HOME defined in the system variables.
* make sure you have paths set to the Android SDK ad the Java bin

## Using the tests : 
* TBD : trying to figure out a way to easily switch the tests between real device, emulators, iPhone vs Android vs Desktop

