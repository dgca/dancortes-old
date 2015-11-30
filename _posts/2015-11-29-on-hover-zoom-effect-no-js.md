---
layout:     post
title:      "On-hover image zoom effect using SCSS and Jade"
date:       2015-11-29
categories: web-design
heroimage:  /assets/img/hero-img-scss-jade-zoom-effect.jpg
excerpt:    I recently came across a clever use of :on-hover and the general sibling selector to create a mouseover zoom effect that follows your mouse cursor. Here's my take on that effect using SCSS and Jade to make it a bit more flexible.
---

On Turkey day, I was on Designer News and came across [this post](https://medium.com/@mjtweaver/css-product-magnification-without-javascript-497ab5932419#.gq4x4kksq) by [Michael Weaver](https://twitter.com/mjtweaver) that shows a really clever use of the *:on-hover* pseudo-selector and the (*~*) general sibling selector to create a mouseover zoom effect that follows your mouse cursor—similar to the effect that Amazon uses for its product photos—all without the use of JavaScript.

I wondered if it was possible to use SCSS and Jade's for loops to pull this off using a variable grid, instead of having to hardcode everything.

With a bit of work, I was able to put the following together. Note that the color overlays are just to show where the grid items are.

<p data-height="450" data-theme-id="0" data-slug-hash="JYQvbj" data-default-tab="result" data-user="dgca" class='codepen'>See the Pen <a href='http://codepen.io/dgca/pen/JYQvbj/'>No-JS On-Hover Image Zoom</a> by Daniel Cortes (<a href='http://codepen.io/dgca'>@dgca</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

So what's different about this approach than the original inspiration? Using Jade and SCSS, this approach lets us change the grid size by changing just two numbers—a variable in the Jade markup, and a variable in the SCSS markup.

The Jade is simple enough, using a single variable which we multiply by itself to generate the right number *div.grid-item* which act as the controls which shift the image around when it is zoomed. So in this example, our *gridRoot* variable is 5, so we get a 5x5 grid.

{% highlight jade %}
div.grid-wrapper
  - var gridRoot = 5;
  - for (i = 0; i < gridRoot * gridRoot; i++)
    div.grid-item
  img.zoom-image(alt='placeholder image' src='http://www.fillmurray.com/g/400/400')
{% endhighlight %}

And here's the workhorse of this project, the SCSS. Note that it also has a *$grid-root* variable. This needs to match the Jade's *gridRoot* variable in order for everything to work. We also set the size of the container and the on-hover zoom factor in the first three lines. Other than these three variable, the rest of the code can be left alone, as these three variables control the logic for how the rest of the code is generated.

For readability purposes, I'm just going to explain the rest of what's going on via code comments.

{% highlight scss %}
$container-size: 400px;
$grid-root: 5;
$zoom-factor: 1.5;
// The above variables control all the output logic!

// $zoom-size is the size of the image once it's
// zoomed in.
// $offset is the amount of the image that hangs off
// the wrapper div once it's zoomed in.
// $stepper-count lets us pen the whole image if the
// grid is an odd number of units across.
// $stepper is the number of pixels we need to shift
// the image as we move from grid item to grid item.
$zoom-size: $container-size * $zoom-factor;
$offset: $zoom-size - $container-size;
$stepper-count: $grid-root;
@if $grid-root % 2 == 1 {
  $stepper-count: $grid-root - 1;
}
$stepper: $offset / $stepper-count;

// Here's the main wrapper. Flexbox FTW.
.grid-wrapper {
  display: flex;
  flex-wrap: wrap;
  height: $container-size;
  overflow: hidden;
  position: relative;
  width: $container-size;
}

// Here are the individual grid items—each sized
// according to the size of the grid.
.grid-item {
  height: 100% / $grid-root;
  width: 100% / $grid-root;

  // SCSS has a neat percentage() function which
  // takes our 1.5 and turns it into 150%
  &:hover ~ img {
    height: percentage($zoom-factor);
    width: percentage($zoom-factor);
  }

  // This loop iterates through the size of the grid
  // and offsets the left and top positions accordingly
  @for $i from 1 through $grid-root {
    // Because SCSS thinks the stuff between the () is
    // a string, you have to interpolate variables using #{}
    &:hover:nth-of-type(#{$grid-root}n + #{$i}) ~ img {
      left: (($i - 1) * $stepper) * -1;
    }

    // Here we create a variable to get the math right for
    // how we shift the image when moving vertically
    $t: (($i - 1) * $grid-root) + 1;

    &:hover:nth-of-type(1n + #{$t}) ~ .zoom-image {
      top: (($i - 1) * $stepper) * -1;
    }
  }
}

// Base styles for the image element. Note the z-index
// of value -1. Without this, our image would be on
// top of our grid, and we wouldn't be able to hover
// on our grid items!
.zoom-image {
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transition: all 0.25s;
  width: 100%;
  z-index: -1;
}
{% endhighlight %}

And that's it for that. With a change of two variables, we could make a 10x10 or 25x25 grid.

> Yeah, yeah, but your scientists were so preoccupied with whether or not they could that they didn't stop to think if they should.
>
> — <cite><small>Dr. Ian Malcolm</small></cite>

Before wrapping up, I should mention that this is purely a proof of concept. Accomplishing this effect would be a job much better suited for JavaScript. It was a fun problem to tackle, though, and shows off some of SCSS's more advanced features, like its [built-in functions](http://sass-lang.com/documentation/Sass/Script/Functions.html), and what you can do with its [@for](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#_10) loops.
