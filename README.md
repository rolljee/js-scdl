# 🎶 js-scdl

For personnal purpose, i've made a wrapper around [scdl](https://github.com/flyingrub/scdl)

I only made this for personal purpose and wanted to share it.

Great work by him.


## 📓 Requirements

* Install python3 & pip3
* Run `pip3 install scdl`

## 📓 Usage

```js
const scdl = require('js-scdl')

const Soundcloud = new scdl.SoundCloud();


Soundcloud.download('https://soundcloud.com/velcroo/velcro-lightspeed-quantum', '/home/rolljee/Downloads')
```