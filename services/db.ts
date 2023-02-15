import dbItems from '../mock/items.json';
import { Item } from '../types/types';
import { encodeAndResize } from '../utils/encode';
import { formatPath } from '../utils/format';

// Simulate delay
const DELAY_MS = 400; //100;

function delay(t: number) {
    return new Promise((resolve) => setTimeout(() => resolve(true), t));
}

/**
 * Simulate dB find
 * @param itemId 
 */
export function fetchItem(itemId: string): Promise<Item | null> {
    return new Promise(async (resolve) => {
        const item = dbItems.find(item => item.id === itemId);
        if (!item) return resolve(null);

        await delay(DELAY_MS);
        const fItem = await transformItem(item);
        resolve(fItem);
    });
}

export function fetchItemByName(itemName: string): Promise<Item | null> {
    return new Promise(async (resolve) => {
        const item = dbItems.find(item => formatPath(item.name) === itemName);
        if (!item) return resolve(null);

        await delay(DELAY_MS);
        const fItem = await transformItem(item);
        resolve(fItem);
    });
}

export function fetchItems(): Promise<Item[]> {
    return new Promise(async (resolve) => {
        await delay(DELAY_MS);

        const items = await transformItems(dbItems);

        resolve(items);
    });
}

export function transformItems(items: Item[]) {
    return Promise.all(items.map(item => transformItem(item)));
}

export async function transformItem(item: Item): Promise<Item> {
    const img = await encodeAndResize(item.image);
    return {
        ...item,
        imageBlur: img
    }
}