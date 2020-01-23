const wd = require('wd');
var fs = require('fs');
var assert = require('assert');
const driver = wd.promiseChainRemote("http://localhost:4723/wd/hub");
const caps = {
    "deviceName": "Pixel 3 API 29",
    "uuid": "emulator-5554",
    "platformName": "Android",
    "platformVersion": "10.0",
};



async function main() {

    await driver.init(caps); //Initalize the driver with the desired capabilities that are configured for Appium

    //push file from local device to emulator
    await driver.pushFileToDevice("/sdcard/Pictures/image-appium-challenge.jpg", base64_encode('image-appium-challenge.jpg'));

    //launch google photos activity
    await driver.startActivity({
        appPackage: "com.google.android.apps.photos",
        appActivity: ".home.HomeActivity"
    });

    // await click("com.google.android.apps.photos:id/touch_outside", 'id');

    //this series clicks the uploaded photo, changes the screen orientation to landscape, and then click the info/more options  button
    await click("android.view.ViewGroup", 'class');
    await driver.setOrientation('LANDSCAPE');
    await click("More options", 'accID');

    //this is used to swipe up on the screen so the full path will be shown
    await (new wd.TouchAction(driver))
        .press({ x: 726, y: 334 })
        .moveTo({ x: 726, y: 129 })
        .release()
        .perform()


    //finds the full path using the xpath and grabs the text from it. Once I have the text I take a the file name substring and compare that to my local files name
    await driver.elementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[4]/androidx.viewpager.widget.ViewPager/android.view.ViewGroup/android.widget.FrameLayout[4]/android.widget.FrameLayout/android.support.v7.widget.RecyclerView/android.widget.LinearLayout[4]/android.widget.LinearLayout/android.widget.TextView[1]")
        .text()
        .then(function(path){
            // console.log(path.substring(path.lastIndexOf(('/') + 1)));
            var array = path.split('/');
            var lastsegment = array[array.length-1];
            assert(lastsegment == ("image-appium-challenge.jpg")); //if true it will move on and output the next line. If false it will through  an Assertion Error
            console.log("Assertion True: The image names match");
        });


}

function click(id, type) {
    if (type == 'id') {
        return driver.waitForElementById(id, 10000, 100) //waits for an element to be present in the DOM and then returns a promise of it being clicked. 
            .then(function (el) {
                return el.click();
            });
    }
    else if (type == 'class') {
        return driver.waitForElementByClassName(id, 10000, 100) //waits for an element to be present in the DOM and then returns a promise of it being clicked. 
            .then(function (el) {
                return el.click();
            });

    }
    else if (type == 'accID') {

        return driver.waitForElementByAccessibilityId(id, 10000, 100) //waits for an element to be present in the DOM and then returns a promise of it being clicked. 
            .then(function (el) {
                return el.click();
            });

    }

}

//basic function  to  convert an image  file in to base 64
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}



main().catch(console.log);
