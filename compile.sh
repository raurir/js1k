# nvm use v5.5.0
echo compressing magic with regpack
node --use-strict reg.js magic magic-compressed-regpack
echo compressing magic with closure
node closure.js magic magic-compressed-closure
echo compressing closure with regpack
node --use-strict reg.js magic-compressed-closure magic-compressed-closure-regpack
echo compressing regpack with closure
node closure.js magic-compressed-regpack magic-compressed-regpack-closure