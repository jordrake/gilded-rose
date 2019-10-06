export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export const AGED_BRIE = "Aged Brie";
export const SULFURAS = "Sulfuras, Hand of Ragnaros";
export const BACKSTAGE_PASS = "Backstage passes to a TAFKAL80ETC concert";
export const CONJURED = "Conjured";
const MAX_QUALITY = 50;

function increaseQuality(item: Item, amount: number = 1) {
  item.quality = Math.min(item.quality + amount, MAX_QUALITY);
}

function decreaseQuality(item: Item, amount: number = 1) {
  item.quality = Math.max(item.quality - amount, 0);
}

function updateSulfurasQuality(item: Item) {
  item.quality = 80;
}

function updateAgedBrieQuality(item: Item) {
  if (item.sellIn <= 0) {
    increaseQuality(item, 2);
  } else {
    increaseQuality(item);
  }

  item.sellIn = item.sellIn - 1;
}

function updateBackstagePassQuality(item: Item) {
  if (item.sellIn <= 0) {
    item.quality = 0;
  } else if (item.sellIn <= 5) {
    increaseQuality(item, 3);
  } else if (item.sellIn <= 10) {
    increaseQuality(item, 2);
  } else {
    increaseQuality(item);
  }

  item.sellIn = item.sellIn - 1;
}

function updateNormalItemQuality(item: Item) {
  const conjuredFactor = item.name.indexOf(CONJURED) > -1 ? 2 : 1;

  if (item.sellIn <= 0) {
    decreaseQuality(item, 2 * conjuredFactor);
  } else {
    decreaseQuality(item, conjuredFactor);
  }

  item.sellIn = item.sellIn - 1;
}

export class GildedRose {
  items: Item[];

  constructor(items: Item[]) {
    this.items = items;
  }

  updateQuality() {
    // An alternate approach when there are a larger number of items
    // could be to have a map of item names to handler function, for example:
    //
    // const handlers = { SULFURAS: updateSulfurasQuality };
    // if (handlers[item.name]) { handlers[item.name](item); } else { updateNormalItemQuality(item); }
    //
    // However I personally think a switch statement is fine for 4 scenarios

    this.items.forEach(item => {
      switch (item.name) {
        case SULFURAS:
          updateSulfurasQuality(item);
          break;

        case AGED_BRIE:
          updateAgedBrieQuality(item);
          break;

        case BACKSTAGE_PASS:
          updateBackstagePassQuality(item);
          break;

        default:
          updateNormalItemQuality(item);
          break;
      }
    });

    return this.items;
  }
}
