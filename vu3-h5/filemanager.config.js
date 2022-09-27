const ViteFilemanager = require("filemanager-plugin").ViteFilemanager;

export default () =>
  ViteFilemanager({
    // events: {
    //   start: {
    //     del: {
    //       items: ['./dist'],
    //     },
    //   },
    //   end: {
    //     move: {
    //       items: [{ source: './www', destination: './dist' }],
    //     },
    //     zip: {
    //       items: [{ source: './dist', destination: './dist.zip', type: 'zip' }],
    //     },
    //     del: {
    //       // items: ['./dist','./www'],
    //     },
    //   },
    // },
    //https://rollupjs.org/guide/en/#output-generation-hooks
    customHooks: [
      {
        hookName: "closeBundle", //generateBundle
        commands: {
          move: {
            items: [{ source: "./www", destination: "./dist/" }],
          },
          zip: {
            items: [{ source: "./dist", destination: "./dist.zip", type: "zip" }],
          },
          del: {
            // items: ['./dist'],
          },
        },
      },
    ],
    options: {
      // parallel: 3,
      log: "all",
      cache: false,
    },
  });
