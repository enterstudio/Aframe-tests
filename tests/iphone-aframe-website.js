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

  it("should get the url", function () {
    return driver
      .get('https://aframe.io/')
      .waitForElementByPartialLinkText('Hello World', 5000)
      .title().should.eventually.include('A-Frame');
  });

  it("Examples links exists", function () {
    return driver

# need to place in for loop after getting elements within subnav group as suggested by mbrandt
      .hasElementByLinkText('Hello World',5000)
      .hasElementByLinkText('Anime UI',5000)
      .hasElementByLinkText('Composite',5000)
      .hasElementByLinkText('360 Video',5000)
      .hasElementByLinkText('Curved Mockups',5000)
      .hasElementByLinkText('Spheres & Fog',5000)
      .hasElementByLinkText('Shopping',5000)
      .hasElementByLinkText('Warp',5000)
      .hasElementByLinkText('Logo',5000)
      .hasElementByLinkText('Unfold',5000)
      .hasElementByLinkText('Panorama',5000)
      .hasElementByLinkText('Cursor & Hover',5000)
      .hasElementByLinkText('Look At',5000)
  });


});

