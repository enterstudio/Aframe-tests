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
      .get('https://toji.github.io/webvr-samples/01-vr-input.html?polyfill=1')
      .waitForElementById('webgl-canvas', 5000)
      .title().should.eventually.include('VR Input');
  });

//  ~~~~~~~ Landing Page ~~~~~~~~~
  it("should get the url", function () {
    return driver
      .get('https://aframe.io/examples/?polyfill=1')
      .waitForElementByPartialLinkText('Hello World', 5000)
      .title().should.eventually.include('A-Frame');
  });

//  ~~~~~~~ Side bar ~~~~~~~~~~~
// https://coderwall.com/p/kvzbpa/don-t-use-array-foreach-use-for-instead  
  it("Examples links exists", function () {
    var el;
    return driver
        .elementsByClassName('sidebar__link__text')
        .then(function(_els) {
         var els = _els;
         el = els[0];
         return el.text();
         }).then ((item) => {
           return driver.hasElementByLinkText(item,5000);
        });
   });

  it("Examples are clickable", function() {
    return driver.elementsByClassName('sidebar__link__text')
      .then(function(els) {
        var actionsForEachElementPromises = els.map(function(element) {
          return element.text()
            .then(function(text) {
            return driver.clickElement(function () {return driver.elementByID('exampleNext')}).title().should.eventually.include(text)
          });
        });
        return Promise.all(actionsForEachElementPromises); // Every action is started here.
      });
  });

// ~~~~~~~ test screenshot ~~~~~~~
  it("Testing screenshots", function () {
    return driver
    .saveScreenshot('./screenshots/')
  });

});

