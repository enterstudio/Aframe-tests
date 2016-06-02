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
      .get('https://aframe.io/examples/?polyfill=1')
      .waitForElementByPartialLinkText('Hello World', 5000)
      .title().should.eventually.include('A-Frame');
  });

//  ~~~~~~~ Side bar ~~~~~~~~~~~
  it("Examples are clickable", function() {
    return driver
      .get('https://aframe.io/examples/?polyfill=1')
      .waitForElementByPartialLinkText('Hello World', 5000)
      // get each element in the side bar
      .elementsByClassName('sidebar__link__text')
      .then (function(els) {
         var actionsForEachElementPromises = els.map(function(el) {
             return el.text()
             .then(function (text){
                 var textCheck = text
                     return driver.elementById('exampleNext')
                     .then(function(element){
                         return driver.clickElement(element).title().should.eventually.include(text);
                     });
             });
         });
         return Promise.all(actionsForEachElementPromises); // Every action is started here.
      });
  })
});
