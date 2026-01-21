---
layout: doc
---

# Claude Times

A daily newsletter powered by Claude.

<script setup>
import { data as posts } from './.vitepress/theme/posts.data'
import { withBase } from 'vitepress'
</script>

## Posts

<ul class="post-list">
  <li v-for="post of posts" :key="post.url">
    <a :href="withBase(post.url)">{{ post.title }}</a>
    <span class="post-date">{{ post.date.string }}</span>
    <p v-if="post.description" class="post-description">{{ post.description }}</p>
  </li>
</ul>
