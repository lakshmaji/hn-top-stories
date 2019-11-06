export const HOST = 'https://hacker-news.firebaseio.com/v0/';

export const GET_TOP_STORIES = `${HOST}topstories.json`;
export const getStoryDetail = itemId => `${HOST}item/${itemId}.json`;

export const PAGE_SIZES = [5, 8, 10];
