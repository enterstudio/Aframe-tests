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
    var examples = driver.elementsByClassName('sidebar__link__text')
    for (var i = 0, len = examples.length; i < len; i++) {
       return driver.hasElementByLinkText(examples[i],5000);
    }
   });

  it("Examples links exists", function () {
    var examples = driver.elementsByClassName('sidebar__link__text')
    for (var i = 0, len = examples.length; i < len; i++) {
       driver.hasElementByLinkText(examples[i],5000)
       .click
       .title().should.eventually.include(examples[i])
    }
   return driver;
   });

// ~~~~~~~ test screenshot ~~~~~~~
  it("Testing screenshots", function () {
    return driver
    .saveScreenshot('./screenshots/')
  });

});

