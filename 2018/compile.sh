node node_modules/uglify-es/bin/uglifyjs --compress --mangle --mangle-props --output coin-compressed.js -- coin.js
node reg.js
# wc -c coin-compressed.js
# wc -c coin-regpacked.js