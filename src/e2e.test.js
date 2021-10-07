import puppeteer from "puppeteer";
jest.setTimeout(60000);

describe("App.js", () => {
  let browser;
  let page;
  let navigationPromise;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    navigationPromise = page.waitForNavigation({
      waitUntil: "domcontentloaded",
    });
  });

  it("Home page has title Pokemons list", async () => {
    await page.goto("http://localhost:5000");
    await navigationPromise;
    await page.waitForSelector(".home-title");
    const text = await page.$eval(".home-title", (e) => e.textContent);
    expect(text).toContain("Pokemons list");
  });

  it("Home page lists pokemons", async () => {
    await page.goto("http://localhost:5000");
    await navigationPromise;
    await page.waitForSelector(".pokemon-list");
    const listElement = await page.$eval(".pokemon-list", (e) => e.outerHTML);
    expect(listElement === "").toBe(false);
  });

  it("Home page has pokemon items", async () => {
    await page.goto("http://localhost:5000");
    await navigationPromise;
    await page.waitForSelector(".pokemon-item");
    const pokemonItem = await page.$eval(".pokemon-item", (e) => e.outerHTML);
    expect(pokemonItem === "").toBe(false);
  });

  it("Pokemon Item has show button", async () => {
    await page.goto("http://localhost:5000");
    await navigationPromise;
    await page.waitForSelector(".pokemon-show");
    const showButton = await page.$eval(".pokemon-show", (e) => e.outerHTML);
    expect(showButton).toContain("button");
  });

  it("Pokemon show button displays pokemon modal with details", async () => {
    await page.goto("http://localhost:5000");
    await navigationPromise;

    await page.waitForSelector(".pokemon-show");
    await page.click(".pokemon-show");

    await page.waitForSelector(".pokemon-modal");
    const pokemonModal = await page.$eval(".pokemon-modal", (e) => e.innerHTML);
    expect(pokemonModal).toContain("Bulbasaur"); // Bulbasaur is a pokemon name
  });

  it("Pokemon modal closes when click on close button", async () => {
    await page.goto("http://localhost:5000");
    await navigationPromise;

    await page.waitForSelector(".pokemon-show");
    await page.click(".pokemon-show");

    await page.waitForSelector(".pokemon-modal");

    await page.waitForSelector(".modal-close");
    await page.click(".modal-close");

    const pokemonModal = await page.$(".pokemon-modal");
    expect(pokemonModal).toBe(null);
  });

  it("Home shows 5 pokemons in first load", async () => {
    await page.goto("http://localhost:5000");
    await navigationPromise;

    await page.waitForSelector(".pokemon-list");
    await page.waitForSelector(".pokemon-show");

    const listElementChildren = await page.$eval(
      ".pokemon-list",
      (e) => e.children.length
    );
    expect(listElementChildren).toEqual(5);
  });

  it("Home infinit scroll shows 10 pokemons", async () => {
    await page.goto("http://localhost:5000");
    await navigationPromise;

    await page.waitForSelector(".pokemon-list");
    await page.waitForSelector(".pokemon-show");

    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
    });
    await page.waitForTimeout(1000); // one second to load the next 5 items
    const listElementChildren = await page.$eval(
      ".pokemon-list",
      (e) => e.children.length
    );
    expect(listElementChildren).toEqual(10);
  });

  afterAll(() => browser.close());
});
