import ghpages from 'gh-pages';
import path from 'path';

const __filename = process.argv[1];
const __dirname = path.dirname(__filename);
 
ghpages.publish(path.resolve(__dirname, '../src'), err => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Successfully published');
});
