---
layout:     post
title:      "Roll your own hero image header with parallax scrolling effect"
date:       2015-05-09
categories: web-design
heroimage:  /assets/img/city_at_night.jpg
herollax:   yes
excerpt:    Nothing says 2014 like a beautifully designed hero image and header with a parallax scrolling effect. Let's build one.
---

Some posts over at [Medium](https://medium.com/) have this neat hero image and title where the title is overlaid on the hero and, as you scroll the page, the post's title scrolls slower than the rest of the content and it fades out as you scroll. I like that effect, and thought it would look cool with a little bit of parallax on the hero image as well. I wanted to have something like this on this blog, so I whipped the following up.

Since this site is built with Jekyll, all of my post content (title, date, post body) normally sits in a container div that's used for padding purposes. In order to get the header 

- Intro
- Shoutouts
- Structure (what happens)
- Building the effect
- How I use it in Jekyll
- End

{% highlight html %}
<header class="herollax">
  <h1>The Title</h1>
  <p>some-metadata
<header>
{% endhighlight %}

{% highlight scss %}
.herollax {
    height: 500px;
    position: relative;
    text-shadow: 0px 2px 5px black;
    background-position: 50% 0;

    .herowrap {
        position: relative;
        max-width: 800px;
        padding: 0 ($spacing-unit * 2);
        margin: 0 auto;
        top: 50%;
        transform: translate3d(0px, -25%, 0px);

        @media (max-width: $mobile) {
            padding: 0 $spacing-unit;
        }
    }

    .post-title, .post-meta {
        color: white
    }

    .post-title {
        font-size: 2.5em;
    }
}
{% endhighlight %}

- Intro
- Shoutouts
- Structure (what happens)
- Building the effect
- How I use it in Jekyll
- End