/**
 * Simple node server
 */
const fs = require('fs');
const http = require('http');
const url = require('url');

// using sync version because we are only calling it once when application is loaded
const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);

/**
 * Replace template file variables with product data
 * @param {*} temp 
 * @param {*} product 
 * @returns 
 */
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  }
  return output;
};

const server = http.createServer((req, res) => {
  // destructure query and pathname from url
  const {query, pathname} = url.parse(req.url, true);
  console.log(pathname);
  switch (pathname) {

    case '/':
    case '/overview':
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });

      // map data to product card
      const cardsHtml = dataObject.map((el) => {
        return replaceTemplate(tempCard, el);
      }).join('');

      // replace key with product cards html
      const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

      res.end(output);
      break;
    case '/product':
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });

      const product = dataObject[query.id];
      const output1 = replaceTemplate(tempProduct, product);

      res.end(output1);
      break;
    case '/api':
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });

      res.end(data);
      break;
    default:
      res.writeHead(404, {
        'Content-Type': 'text/html'
      });
      res.end('<h1>Page not found!</h1>');
      break;
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening on port 8000...');
})
