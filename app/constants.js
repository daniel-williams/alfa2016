
export default {
  subscribeDelay: 60000,
  galleries: [
    {
      name: 'Plein Air',
      slug: 'plein-air',
      title: 'Plein Air Oil Paintings by Anna Lancaster Fine Art',
      description: 'Plein air oil paintings by Anna Lancaster Fine Art. Anna Lancaster paints beautiful scenes from the Pacific Northwest in oil.'
    },
    {
      name: 'Portraits & Figures',
      slug: 'portraits-and-figures',
      title: 'Portrait Oil Paintings by Anna Lancaster Fine Art',
      description: 'Animals and Portrait oil paintings by Anna Lancaster Fine Art. Anna Lancaster paints oil portraits in Tualatin Oregon.'
    },
    {
      name: 'Stills from Life',
      slug: 'stills-from-life',
      title: 'Still Oil Paintings by Anna Lancaster Fine Art',
      description: 'Still oil paintings by Anna Lancaster Fine Art. Anna Lancaster paints still life in Tualatin Oregon.'
    },
    {
      name: 'Traditional',
      slug: 'traditional',
      title: 'Traditional Oil Paintings by Anna Lancaster Fine Art',
      description: 'Traditional oil paintings by Anna Lancaster Fine Art. Anna Lancaster paints traditional artwork in Tualatin Oregon.'
    },
    {
      name: 'Archive',
      slug: 'archive',
      title: 'Contemporary Oil Paintings by Anna Lancaster Fine Art',
      description: 'Contemporary oil paintings by Anna Lancaster Fine Art. Anna Lancaster paints contemporary artwork in Tualatin Oregon.'
    }
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
