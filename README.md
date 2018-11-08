#Polydiv  

## Clipping html element in random polygon  


### Demo:

### usage:

```html

<!-- Create html structure -->
<div>
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
    ...
</div>

<!-- Import Polydiv -->
<script type="text/javascript" src="./polydiv.min.js"></script>
```

```javascript
// Init Polydiv
var polydivInstance = new Polydiv({ itemClass: 'item'});

// Clip items 
polydivInstance.clipItems(function(err) {
    // All items are clipped
});

// Unclip items
polydivInstance.unClipItems(function(err) {
    // All items are unclipped
});
```

### Development:

```bash
# Install deps
npm install

# Uglify and minify
npm run dist
```


https://developer.mozilla.org/fr/docs/Web/CSS/clip-path  
Algo see: https://www.nayuki.io/page/convex-hull-algorithm<br/>
