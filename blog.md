---
layout: page
title: Blog
permalink: /blog/
weight: 1
---

<ul class="post-list">
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title}}</a>
      <p>{{ post.excerpt }}</p>
      <span class="post-meta">{{ post.date | date_to_string }}</span>
    </li>
  {% endfor %}
</ul>