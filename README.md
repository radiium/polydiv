# Polydiv  

### Clipping html element in random polygon with the css '[clip-path](https://developer.mozilla.org/fr/docs/Web/CSS/clip-path)' rule.


## how it works:  
This module generate random number of random 2d coordinate,  
finding and keeping convex hull (Algorithm found [here](https://www.nayuki.io/page/convex-hull-algorithm))  
then use it for add css "clip-path" rules  
<img src="https://raw.githubusercontent.com/radiium/polydiv/master/site/convex-hull.png" alt="Convex hull " height="100">


## Demo:

[https://radiium.github.io/polydiv/](https://radiium.github.io/polydiv/)


## Download:  

[polydiv.js](https://raw.githubusercontent.com/radiium/polydiv/master/polydiv.js)  
[polydiv.min.js](https://raw.githubusercontent.com/radiium/polydiv/master/polydiv.min.js)  


## Usage:

1 - In html
```html
<!-- Create structure -->
<div>
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
    ...
</div>

<!-- Import Polydiv -->
<script type="text/javascript" src="./polydiv.min.js"></script>
```


2 - In javascript
```javascript
// Init Polydiv
var polydivInstance = new Polydiv({ query: '.item'}, function(err) {
    // Polydiv init done
});

// Clip items 
polydivInstance.clipItems(function(err) {
    // All items are clipped
});

// Unclip items
polydivInstance.unClipItems(function(err) {
    // All items are unclipped
});

// Destroy Polydiv
polydivInstance.destroy(function(err) {
    // Polydiv destroy done
});
```


## Development:

```bash
# Install deps
npm install

# Uglify and minify
npm run dist
```


## References: 
- css 'clip-path' rule [developer.mozilla.org/fr/docs/Web/CSS/clip-path](https://developer.mozilla.org/fr/docs/Web/CSS/clip-path)  
- Convex hull algorithm [nayuki.io/page/convex-hull-algorithm](https://www.nayuki.io/page/convex-hull-algorithm)  
