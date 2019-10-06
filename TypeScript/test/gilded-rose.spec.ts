import { expect } from "chai";
import {
  Item,
  GildedRose,
  CONJURED,
  AGED_BRIE,
  SULFURAS,
  BACKSTAGE_PASS
} from "../app/gilded-rose";

describe("Gilded Rose", () => {
  describe("a normal item", () => {
    it("quality should decrease by 1 after a day", () => {
      const gildedRose = new GildedRose([new Item("foo", 5, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(9);
    });

    it("sellIn should decrease by 1 after a day", () => {
      const gildedRose = new GildedRose([new Item("foo", 5, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(4);
    });

    it("quality should never go below 0", () => {
      const gildedRose = new GildedRose([new Item("foo", 5, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(0);
    });

    it("quality should decrease by 2 if sellIn is passed", () => {
      const gildedRose = new GildedRose([new Item("foo", 0, 4)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(2);
    });
  });

  describe("a Conjured item", () => {
    it("quality should decrease by 2 after a day", () => {
      const gildedRose = new GildedRose([new Item(`${CONJURED} foo`, 5, 6)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(4);
    });

    it("quality should decrease by 4 if sellIn is passed", () => {
      const gildedRose = new GildedRose([new Item(`${CONJURED} foo`, 0, 6)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(2);
    });
  });

  describe("Aged Brie", () => {
    it("quality should increase by 1 after a day", () => {
      const gildedRose = new GildedRose([new Item(AGED_BRIE, 5, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(11);
    });

    it("quality should increase by 2 to increase past sellIn", () => {
      const gildedRose = new GildedRose([new Item(AGED_BRIE, 0, 5)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(7);
    });

    it("quality should never go above 50", () => {
      const gildedRose = new GildedRose([new Item(AGED_BRIE, 5, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(50);
    });
  });

  describe("Sulfuras, Hand of Ragnaros", () => {
    it("never decreases in quality", () => {
      const gildedRose = new GildedRose([new Item(SULFURAS, 5, 80)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(80);
    });

    it("never decreases sellIn", () => {
      const gildedRose = new GildedRose([new Item(SULFURAS, 5, 80)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(5);
    });
  });

  describe("Backstage passes", () => {
    it("quality should increase by 1 after a day if more than 10 days", () => {
      const gildedRose = new GildedRose([new Item(BACKSTAGE_PASS, 11, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(11);
    });

    it("quality should increase by 2 after a day if 10 days or less left", () => {
      const gildedRose = new GildedRose([new Item(BACKSTAGE_PASS, 10, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(12);
    });

    it("quality should increase by 3 after a day if 5 days or less left", () => {
      const gildedRose = new GildedRose([new Item(BACKSTAGE_PASS, 5, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(13);
    });

    it("quality should never go above 50", () => {
      const gildedRose = new GildedRose([new Item(BACKSTAGE_PASS, 5, 49)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(50);
    });

    it("quality should be set to 0 if 0 days left", () => {
      const gildedRose = new GildedRose([new Item(BACKSTAGE_PASS, 0, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(0);
    });
  });
});
