export const joditConfig = {
  readonly: false,
  height: 400, // Editor height in pixels
  placeholder: 'Type your content here...',
  // Other configurations...,
  focus: true,
  controls: {
    font: {
      component: 'select',
      list: {
        'Alegreya, serif': 'Alegreya',
        'Alegreya Sans,sans-serif': 'Alegreya Sans',
        'Alegreya Sans SC,sans-serif': 'Alegreya Sans SC',
        'Alegreya SC,serif': 'Alegreya SC',
        'Aleo,serif': 'Aleo',
        'Assistant,sans-serif': 'Assistant',
        'Barlow Condensed,sans-serif': 'Barlow Condensed',
        'Barlow Semi Condensed,sans-serif': 'Barlow Semi Condensed',
        'Bitter,serif': 'Bitter',
        'Caladea,serif': 'Caladea',
        'Dosis,sans-serif': 'Dosis',
        'Fira Sans,sans-serif': 'Fira Sans',
        'Fira Mono,monospace': 'Fira Mono',
        'IBM Plex Sans,sans-serif': 'IBM Plex Sans',
        'IBM Plex Mono,monospace': 'IBM Plex Mono',
        'Inconsolata,monospace': 'Inconsolata',
        'Lato,sans-serif': 'Lato',
        'Lora,serif': 'Lora',
        'Merriweather,serif': 'Merriweather',
        'Montserrat,sans-serif': 'Montserrat',
        'Nunito,sans-serif': 'Nunito',
        'Nunito Sans,sans-serif': 'Nunito Sans',
        'Open Sans,sans-serif': 'Open Sans',
        'Oswald,sans-serif': 'Oswald',
        'Overpass,sans-serif': 'Overpass',
        'Poppins,sans-serif': 'Poppins',
        'PT Sans,sans-serif': 'PT Sans',
        'PT Serif,serif': 'PT Serif',
        'Raleway,sans-serif': 'Raleway',
        'Roboto,sans-serif': 'Roboto',
        'Roboto Mono,monospace': 'Roboto Mono',
        'Roboto Slab,serif': 'Roboto Slab',
        'Rubik,sans-serif': 'Rubik',
        'Source Code Pro,monospace': 'Source Code Pro',
        'Source Sans Pro,sans-serif': 'Source Sans Pro',
        'Space Mono,monospace': 'Space Mono',
        'Spectral,serif': 'Spectral',
        'Titillium Web,sans-serif': 'Titillium Web',
        'Ubuntu,sans-serif': 'Ubuntu',
        'Vollkorn,serif': 'Vollkorn',
        'Work Sans,sans-serif': 'Work Sans',
        'Zilla Slab,serif': 'Zilla Slab',
        'Courier New,monospace': 'Courier New',
        'Georgia,serif': 'Georgia',
        'Times New Roman,serif': 'Times New Roman',
        'Verdana,sans-serif': 'Verdana',
        'Trebuchet MS,sans-serif': 'Trebuchet MS',
        'Arimo,sans-serif': 'Arimo',
        'Cabin,sans-serif': 'Cabin',
        'Chivo,sans-serif': 'Chivo',
        'Crimson Text,serif': 'Crimson Text',
        'Dancing Script,cursive': 'Dancing Script',
        'Exo,sans-serif': 'Exo',
        'Hind,sans-serif': 'Hind',
        'Indie Flower,cursive': 'Indie Flower',
        'Karla,sans-serif': 'Karla',
        'Libre Baskerville,serif': 'Libre Baskerville',
        'Libre Franklin,sans-serif': 'Libre Franklin',
        'Maven Pro,sans-serif': 'Maven Pro',
        'Mukta,sans-serif': 'Mukta',
        'Noto Sans,sans-serif': 'Noto Sans',
        'Noto Serif,serif': 'Noto Serif',
        'Oxygen,sans-serif': 'Oxygen',
        'Quicksand,sans-serif': 'Quicksand',
        'Rokkitt,serif': 'Rokkitt',
        'Saira,sans-serif': 'Saira',
        'Sarabun,sans-serif': 'Sarabun',
        'Signika,sans-serif': 'Signika',
        'Slabo 27px,serif': 'Slabo 27px',
        'Teko,sans-serif': 'Teko',
        'Varela Round,sans-serif': 'Varela Round',
        'Yellowtail,cursive': 'Yellowtail',
        'Antic Slab,serif': 'Antic Slab',
        'Arvo,serif': 'Arvo',
        'Asap,sans-serif': 'Asap',
        'Barlow,sans-serif': 'Barlow',
        'Bebas Neue,sans-serif': 'Bebas Neue',
        'Bellefair,serif': 'Bellefair',
        'Caveat,cursive': 'Caveat',
        'Comfortaa,sans-serif': 'Comfortaa',
        'Concert One,cursive': 'Concert One',
        'Crete Round,serif': 'Crete Round',
        'DM Sans,sans-serif': 'DM Sans',
        'DM Serif Display,serif': 'DM Serif Display',
        'Gloria Hallelujah,cursive': 'Gloria Hallelujah',
        'Jura,sans-serif': 'Jura',
        'Kanit,sans-serif': 'Kanit',
        'Lobster,cursive': 'Lobster',
        'Mada,sans-serif': 'Mada',
        'Manrope,sans-serif': 'Manrope',
        'Mukta Malar,sans-serif': 'Mukta Malar',
        'Orbitron,sans-serif': 'Orbitron',
        'Pacifico,cursive': 'Pacifico',
        'Permanent Marker,cursive': 'Permanent Marker',
        'Playfair Display,serif': 'Playfair Display',
        'Quattrocento,serif': 'Quattrocento',
        'Ramaraja,serif': 'Ramaraja',
      },
    },
  },
};

export const config = {
  readonly: false, // Enables editing
  height: 100, // Editor height in pixels
  placeholder: 'Write your post here...',
  toolbarSticky: true, // Toolbar will stick on top when scrolling
  buttons: [
    'bold',
    'italic',
    'underline',
    '|',
    'fontsize',
    'font',
    'paragraph',
    '|',
    'image',
    'link',
    'align',
    'undo',
    'redo',
    'hr',
    'eraser',
    'copyformat',
    '|',
    'outdent',
    'indent',
  ],
  buttonsXS: [
    'bold',
    'italic',
    'underline',
    'fontsize',
    'font',
    '|',
    'undo',
    'redo',
  ], // Toolbar for small screens
  uploader: {
    url: 'YOUR_IMAGE_UPLOAD_ENDPOINT', // Image upload URL endpoint
    format: 'json',
    isSuccess: function (response) {
      return response.success; // Customize response success logic
    },
  },
  style: {
    fontFamily: [
      'Arial',
      'Tahoma',
      'Georgia',
      'Times New Roman',
      'Courier New',
      'Comic Sans MS',
      'Helvetica',
    ],
  },
  showCharsCounter: true, // Shows character count
  showWordsCounter: true, // Shows word count
  showXPathInStatusbar: false, // XPath visibility in status bar
};
