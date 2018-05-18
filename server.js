'use strict';
 
require('zone.js/dist/zone-node');
require('reflect-metadata');
 
const express = require('express');
const {renderModuleFactory} = require('@angular/platform-server');
const {provideModuleMap} = require('@nguniversal/module-map-ngfactory-loader');
const fs = require('fs');
const path = require('path');
 
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist-server/main.bundle.js');
 
 
const app = express();
 
function angularRouter(req, res) {
  res.render(path.join(DIST_FOLDER, 'index.html'), {req, res});
}
 
const DIST_FOLDER = `${__dirname}/dist`;
const template = fs.readFileSync(path.join(DIST_FOLDER, 'index.html')).toString();
 
app.engine('html', (_, options, callback) => {
  renderModuleFactory(AppServerModuleNgFactory, {
    // Our index.html
    document: template,
    url: options.req.url,
    // DI so that we can get lazy-loading to work differently (since we need it to just instantly render it)
    extraProviders: [
      provideModuleMap(LAZY_MODULE_MAP)
    ]
  }).then(html => {
    callback(null, html);
  });
});
 
app.set('view engine', 'html');
app.set('views', DIST_FOLDER);
 
app.get('/', angularRouter);
 
app.use(express.static(DIST_FOLDER));
 
app.get('*', angularRouter);
 
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
// 'use strict';

// require('zone.js/dist/zone-node');
// require('reflect-metadata');

// const express = require('express');
// const ngUniversal = require('@nguniversal/express-engine');
// const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');

// //AppServerModuleNgFactory
// //LAZY_MODULE_MAP - This informs us which lazy loaded modules we have in our app.
// const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist-server/main.bundle');

// function angularRouter(req, res){
//     res.render('index', {req, res});    
// }

// const app = express();

// app.engine('html', ngUniversal.ngExpressEngine({
//     bootstrap: AppServerModuleNgFactory,
//     providers: [
//         provideModuleMap(LAZY_MODULE_MAP)
//     ]}));
// app.set('view engine','html');
// app.set('views','dist');

// //When the server enounters the route configure below (default route, it will call angularRouter)
// //This will render the selected route using the engine defined in the express server.
// //The root route, should be served via the angular router
// app.get('/', angularRouter);
// //Any static file (example.png) should be served as a single file.
// app.use(express.static('${__dirname}/dist'));
// //Any other route, should be served via the angular router.
// app.get('*', angularRouter);

// app.listen(3000, () =>{
//     console.log('Listening on port 3000');
// });
