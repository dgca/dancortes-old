---
layout:     post
title:      "How to make a carousel using only HTML and CSS (no JavaScript required!)"
date:       2015-05-17
categories: web-design
heroimage:  /assets/img/css-carousel/hero.jpg
excerpt:    In this post, we'll go through the process of creating an interactive, user-controller carousel that uses only HTML and CSS. No JavaScript needed!
---

Recently, I've been working on a site that uses a CMS that's a bit limiting. I can add my own HTML and CSS to the site, but JavaScript is off-limits.

The designs I'm working from included a carousel. I had some ideas of how I could make that work using CSS animations and the transform property, but that would leave me with a carousel that scrolled automatically and didn't allow for user input which wasn't really what I was looking. After some thinking, I eneded up with a solution that uses absolute positioning and the *:target* pseudo-selector to change the *z-index* and *opacity* of our carousel items to cycle through them. It looks something like this:

<div class="carousel-wrapper" style="height: 400px;">
  <span class="hidden-target" id="target-item-1"></span>
  <span class="hidden-target" id="target-item-2"></span>
  <span class="hidden-target" id="target-item-3"></span>
  <div class="carousel-item item-1 light" style="background: url(/assets/img/css-carousel/soccer.jpg) 50% 50% / cover;">
    <h2>This is the first item</h2>
    <p>Idque Caesaris facere voluntate liceret: sese habere. Qui ipsorum lingua Celtae, nostra Galli appellantur. Inmensae subtilitatis, obscuris et malesuada fames.</p>
    <a class="arrow arrow-prev" href="#target-item-3"></a>
    <a class="arrow arrow-next" href="#target-item-2"></a>
  </div>
  <div class="carousel-item item-2">
    <h2>This is the second item</h2>
    <p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus. Idque Caesaris facere voluntate liceret: sese habere. Cum sociis natoque penatibus et magnis dis parturient. Nihilne te nocturnum praesidium Palati, nihil urbis vigiliae.</p>
    <a class="arrow arrow-prev" href="#target-item-1"></a>
    <a class="arrow arrow-next" href="#target-item-3"></a>
  </div>
  <div class="carousel-item item-3 light" style="background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.4)), url(/assets/img/css-carousel/harbor.jpg) 50% 50% / cover;">
    <h2>And finally, the third</h2>
    <p>Quis aute iure reprehenderit in voluptate velit esse. Cum ceteris in veneratione tui montes, nascetur mus. Prima luce, cum quibus mons aliud  consensu ab eo. Quam temere in vitiis, legem sancimus haerentia. Sed haec quis possit intrepidus aestimare tellus.</p>
    <a class="arrow arrow-prev" href="#target-item-2"></a>
    <a class="arrow arrow-next" href="#target-item-1"></a>
  </div>
</div>

Let's build one!

## The structure

The structure of our carousel goes something like this: We have a main *div.carousel-wrapper* that gives our carousel its size. Inside our wrapper, we have *span.hidden-target* elements with unique IDs that act as targets for our carousel items controls, and *div.carousel-item* elements that hold the content of each of our carousel items.

Each of our *div.carousel-item* elements have some content within them, and two links, *a.arrow-prev* and *a.arrow-next*, which we use to cycle between the carousel items.

Because our individual carousel items will be *position: absolute* (so we can stack them on top of eachother), we have to set the *div.carousel-wrapper*'s height manually, and it makes sense to do this inline. We're going to try to offload as much of our CSS to our external stylesheet, but some of the items we'll have write inline in order to make our carousel reusable and scalable.

I'm also using inline CSS to set the background image of two of our *div.carousel-item* elements to make them a little more vibrant, but we'll leave that out below so that our markup is more readable.

{% highlight html %}
<!--Here's our main wrapper.
Since our carousel items get their size from their parent,
we have to specify its height.-->
<div class="carousel-wrapper" style="height: 400px;">
  <!--The carousel uses regular links to cycle through each item.
  The links actually target these display: none; spans so our page doesn't 
  jump like it normally would when using jump links.-->
  <span id="target-item-1"></span>
  <span id="target-item-2"></span>
  <span id="target-item-3"></span>
  <!--Here are our carousel items.
  Each has a 'carousel-item' class, which we use for shared styling
  and an item-# class, which we use to control its opacity
  depending on which target-item-# is currently targeted-->
  <div class="carousel-item item-1">
    <!--We can add any content in here, just make sure that
    your .carousel-wrapper is big enough to hold all the content.-->
    <h2>Item 1</h2>
    <p>Content goes here.</p>
    <!--Here are the links that control the carousel! Make sure
    the href of each one is pointing to the right target-item-#
    so that the carousel cycles in sequence.-->
    <a class="arrow arrow-prev" href="#target-item-3"></a>
    <a class="arrow arrow-next" href="#target-item-2"></a>
  </div>
  <!--And here are a couple more carousel items so that
  we have some content to scroll to. Notice the 'light' class?
  Royal blue is a pretty dark background color, so we'll add a CSS
  rule to make the text white if a carousel item has this class-->
  <div class="carousel-item item-2 light" style="background-color: royalblue;">
    <h2>Item 2</h2>
    <p>Content goes here.</p>
    <a class="arrow arrow-prev" href="#target-item-1"></a>
    <a class="arrow arrow-next" href="#target-item-3"></a>
  </div>
  <div class="carousel-item item-3">
    <h2>Item 3</h2>
    <p>Content goes here.</p>
    <a class="arrow arrow-prev" href="#target-item-2"></a>
    <a class="arrow arrow-next" href="#target-item-1"></a>
  </div>
</div>
{% endhighlight %}

That's it for our HTML. It's surprisingly light. The CSS (SCSS, in this case) is where the magic happens.

## The styles

{% highlight scss wrap %}
/* Here's where our carousel begins, with the main wrapper being
relatively positioned, so that our absolutely positioned items are
in the right place. */
.carousel-wrapper {
  position: relative;

  /* Our absolutely positioned carousel items span the width and
  height of its parent. We're making them transparent by default so
  that they fade in when we cycle through them using the arrow links. */
  .carousel-item {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 25px 50px;
    opacity: 0;
    transition: all 0.5s ease-in-out;

    /* Did you notice the 50px left, right padding up above? It's so
    we can position our arrow links! Each one will be 50px wide. Also,
    I'm using empty links with a background image so that the links
    look like arrows. Make sure you swap out that URL with an actual
    URL so that your arrow links aren't just transparent rectangles. */
    .arrow {
    position: absolute;
    top: 0;
    display: block;
    width: 50px;
    height: 100%;
    background: url("/carousel-arrow-dark.png") 50% 50% / 20px no-repeat;

      /* Let's put our arrow to go back on the left. */
      &.arrow-prev {
        left: 0;
      }

      /* And our arrow to go forward on the right. Since I'm using
      the same arrow image for both my arrows, I'm rotating this one by
      180 degrees so that it points in the right direction */
      &.arrow-next {
        right: 0;
        -webkit-transform: rotate(180deg);
                transform: rotate(180deg);
      }
    }

    /* I really like how these carousel items look on a dark image
    background, so if a .carousel-item div has the class 'light',
    we'll make its text color white, and use a white arrow instad of
    a dark gray one. Again, make sure this arrow image exists somewhere */
    &.light {
      color: white;

      .arrow {
        background: url("/carousel-arrow-light.png") 50% 50% / 20px no-repeat;
      }
    }

    /* Let's use using some media queries to resize the arrows 
    on smaller devices.*/
    @media (max-width: 480px) {
      .arrow, &.light .arrow {
        background-size: 10px;
        background-position: 10px 50%;
      }
    }
  }

  /* Let's set our jump link targets display: none; so that we're not
  making the browser jump to the top of the carousel whenever a user
  clicks on one of our arrow links. This attribute selector will target
  any element whose id starts with 'target-item'. */
  [id^="target-item"] {
    display: none;
  }

  /* So, up above we made all our carousel items transparent, which means
  that on page-load, we'd have a big empty box where our carousel should be.
  Let's set our first item's opacity to 1 so that it displays instead. Also,
  we're setting its z-index to 2, so that it's positioned on top of the
  other carousel items. */
  .item-1 {
    z-index: 2;
    opacity: 1;
  }

  /* But we don't want the first item to ALAWYS be opacity: 1; otherwise
  it would peek through when cycling between items two and above. */
  *:target ~ .item-1 {
    opacity: 0;
  }

  /* ...but if #target-item-1 is targeted, well we do want the first item
  to show up, so we're selecting it with the ~ sibling selector and
  setting its opacity to 1 again :-) */
  #target-item-1:target ~ .item-1 {
    opacity: 1;
  }

  /* If any other target-item-# is targeted, let's select it using the sibling
  selector, make it fade in, and place it on top of the pile using z-index: 3.
  Here's where you'd add more target items if your carousel has more than three
  items. It might be worth adding like 10 items right off the bat. */
  #target-item-2:target ~ .item-2, #target-item-3:target ~ .item-3 {
    z-index: 3;
    opacity: 1;
  }
}
{% endhighlight %}

And that's it! You have a carousel that's fully functional and is 100% HTML and CSS! We only made a carousel with three items, but you can keep adding items, just make sure you add more target items, and you link up your arrow links correctly.

I hope you enjoyed this. Let me know your thoughts or what you would've done differently on Twitter at [@ddggccaa](https://twitter.com/ddggccaa).