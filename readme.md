# jQuery Mobile Icon Pack

Extending jQuery Mobile's default icon set.

jQuery Mobile Icon Pack is based on based on the [Font Awesome](http://fortawesome.github.com/Font-Awesome/) library and includes 369 icons from a wide range of categories including currency symbols, media control, social media, common application icons, and more. You can use easily these icons in conjunction with jQuery Mobile's default icon set.

[View a demo of Icon Pack](http://andymatthews.net/code/jQuery-Mobile-Icon-Pack/).

[Build your own custom Icon Pack.](http://andymatthews.net/code/jQuery-Mobile-Icon-Pack/builder/)

## Major upgrade
This version of Icon Pack is a **breaking upgrade** from previous versions of jQuery Mobile. Previously jQuery Mobile used the `:after` property to apply the PNG icons to the specified container. In jQuery Mobile 1.4 the team chose to look to the future and apply SVG icons with the `background-image` property. In addition to this decision they've inlined the actual file contents of each icon using [Data URIs](http://css-tricks.com/data-uris/). While this does increase the size of the resulting CSS, it also means there are no external dependencies (not counting the PNG fallbacks).

If you're looking to support jQuery Mobile 1.3 (or lower) applications, you can use the [1.3.x tagged build](https://github.com/commadelimited/jQuery-Mobile-Icon-Pack/releases/tag/v1.3.x) for that release.

### Centered Icons

Every jQuery Mobile app is slightly different. In many cases sizes, and positions, of icons are also different. To that end I've intentionally not applied any sort of alignment or positioning of the icons contained within Icon Pack. This means that in the demos some of the icons might be centered, some of them might be aligned to the left. **This is by design (at least for the time being)**.

If you need to adjust the position of icons in your implementation, here's how you do it. In your CSS, for the icon you'd like to position, add a `background-position` declaration. Here's an example for the `adjust` icon:

```
.ui-icon-adjust:after {
    background-image: url("<url removed for brevity>");
    background-repeat: no-repeat;
    background-position: 4px 3px;
}
```

## Quick start

Clone the git repo - `git clone https://github.com/commadelimited/jQuery-Mobile-Icon-Pack.git` - or [download it](https://github.com/commadelimited/jQuery-Mobile-Icon-Pack/zipball/master). Open up index.html in your browser, preview to your hearts content. The icon definitions are 100% contained within the `jqm-icon-pack-fa.css` CSS file in the `dist` folder within this repository.

If you so desire, run `npm install` and build the icons from scratch by running the `grunt` command.

While this is a good way to get familiar with Icon Pack, it's not recommended that you use this file for production use.

## Font Awesome Icon Pack Usage

Drop `dist/jqm-icon-pack-fa.css` and the associated `png` folder into your project. Images are relative to the CSS file. Use them just as you would the standard icons.

## My License
Dual license: MIT/GPL

## Font Awesome License
The [Font Awesome license](http://fontawesome.io/license/) can be seen on their website.

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/commadelimited/jquery-mobile-icon-pack/trend.png)](https://bitdeli.com/free "Bitdeli Badge")