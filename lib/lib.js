var puppeteer = require("puppeteer");

module.exports = {
  renderSVG: async (SVGContent) => {
    var browser = await puppeteer.launch();
    var page = await browser.newPage();

    await page.setContent(SVGContent);
    await page.setViewport({
      width: 1080,
      height: 1080,
      deviceScaleFactor: 2,
    });

    var imageBuffer = await page.screenshot({
      type: "png",
      fullPage: true,
    });

    await page.close();
    browser.close();
    return imageBuffer;
  },
};
