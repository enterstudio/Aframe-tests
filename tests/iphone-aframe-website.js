"use strict";

require("../helpers/setup");

var wd = require("wd"),
    _ = require('underscore'),
    serverConfigs = require('../helpers/appium-servers');

describe("ios safari", function () {
  this.timeout(300000);
  var driver;
  var allPassed = true;

  before(function () {
    var serverConfig = process.env.SAUCE ?
      serverConfigs.sauce : serverConfigs.local;
    driver = wd.promiseChainRemote(serverConfig);
    require("../helpers/logging").configure(driver);

    var desired = _.clone(require("../helpers/caps").ios93);
    desired.browserName = 'safari';
    if (process.env.SAUCE) {
      desired.name = 'ios - safari';
      desired.tags = ['sample'];
    }
    return driver.init(desired);
  });

  after(function () {
    return driver
      .quit()
      .finally(function () {
        if (process.env.SAUCE) {
          return driver.sauceJobStatus(allPassed);
        }
      });
  });

  afterEach(function () {
    allPassed = allPassed && this.currentTest.state === 'passed';
  });


//  ~~~~~~~ Landing Page ~~~~~~~~~
  it("should get the url", function () {
    return driver
      .get('https://aframe.io/')
      .waitForElementByPartialLinkText('Hello World', 5000)
      .title().should.eventually.include('A-Frame');
  });



//  ~~~~~~~ Side bar ~~~~~~~~~~~
// https://coderwall.com/p/kvzbpa/don-t-use-array-foreach-use-for-instead  
  it("Examples links exists", function () {
    var examples = driver.elementsByClassName('subnav examples-subnav borderless-links');
    console.log (examples);
    for (var i = 0, len = examples.length; i < len; i++) {
       console.log (examples[i]);
       driver.hasElementByLinkText(examples[i],5000);
    }
// loop isn't working quite right, not sure what the problem is yet.
// console.log doesn't seem to output what I want?
// need to make sure it's working the way that I want before removing the lines below : 
      driver.hasElementByLinkText('Hello World',5000)
      driver.hasElementByLinkText('Anime UI',5000)
      driver.hasElementByLinkText('Composite',5000)
      driver.hasElementByLinkText('360 Video',5000)
      driver.hasElementByLinkText('Curved Mockups',5000)
      driver.hasElementByLinkText('Spheres & Fog',5000)
      driver.hasElementByLinkText('Shopping',5000)
      driver.hasElementByLinkText('Warp',5000)
      driver.hasElementByLinkText('Logo',5000)
      driver.hasElementByLinkText('Unfold',5000)
      driver.hasElementByLinkText('Panorama',5000)
      driver.hasElementByLinkText('Cursor & Hover',5000)
      driver.hasElementByLinkText('Look At',5000)
 
    return driver;
   });

// ~~~~~~~ test screenshot ~~~~~~~
  it("Testing screenshots", function () {
    return driver
    .saveScreenshot('./screenshots/')
  });

});

