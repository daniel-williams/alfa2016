
export default {
  subscribeDelay: 60000,
  galleries: [
    { name: 'Plein Air', slug: 'plein-air' },
    { name: 'Portraits & Figures', slug: 'portraits-and-figures' },
    { name: 'Stills from Life', slug: 'stills-from-life' },
    { name: 'Traditional', slug: 'traditional' },
    { name: 'Archive', slug: 'archive' }
  ],
  blog: {
    host: 'https://www.googleapis.com/blogger/v3/blogs/',
    id: '5080215156052292878',
    apiKey: 'AIzaSyAoTn6DttJFZ5mWGHuqfN5fE1eSvQ0jgaE',
    itemsPerPage: 5,
  },
  firebase: {
    host: 'https://blistering-torch-4532.firebaseio.com/'
  }
}
