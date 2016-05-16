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

  function doesElementExist(driver, element){
    driver.findElement(webdriver.By.id(element)).then(function(webElement) {
        console.log(element + ' exists');
    }, function(err) {
        if (err.state && err.state == 'no such element') {
            console.log(element + ' not found');
        } else {
            webdriver.promise.rejected(err);
        }
    });
  }

  it("should get the url", function () {
    return driver
      .get('https://aframe.io/')
      .sleep(1000)
      driver.wait('helloworld')
      .sleep(1000)
      .title().should.eventually.include('sauce labs');
  });

  it("Examples links exists", function () {
    return driver
      .get('https://aframe.io/')
      .sleep(1000)
      doesElementExist(driver, 'helloworld')
      .sleep(1000)
      doesElementExist(driver, 'anime-UI')
      .sleep(1000)
      doesElementExist(driver, 'composite')
      .sleep(1000)
      doesElementExist(driver, 'boilerplate-360video')
      .sleep(1000)
      doesElementExist(driver, 'showcase-curved-mockups')
      .sleep(1000)
      doesElementExist(driver, 'spheres-and-fog')
      .sleep(1000)
      doesElementExist(driver, 'shopping')
      .sleep(1000)
      doesElementExist(driver, 'warps')
      .sleep(1000)
      doesElementExist(driver, 'generic-logo')
      .sleep(1000)
      doesElementExist(driver, 'unfold')
      .sleep(1000)
      doesElementExist(driver, 'sky')
      .sleep(1000)
      doesElementExist(driver, 'cursor')
      .sleep(1000)
      doesElementExist(driver, 'lookat')
      doesElementExist(driver, 'doesntexist')
  });


});

