import { defineConfig, createContentLoader } from "vitepress";
import { writeFileSync } from "fs";
import path from "path";
import { Feed } from "feed";

const hostname = "https://danwahl.net";
const base = "/claude-times/";
const siteUrl = `${hostname}${base}`;

const rssIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="6.18" cy="17.82" r="2.18"/><path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z"/></svg>`;

export default defineConfig({
  title: "Claude Times",
  description: "A daily newsletter powered by Claude",
  base,

  themeConfig: {
    nav: [{ text: "Home", link: "/" }],

    socialLinks: [
      { icon: "github", link: "https://github.com/danwahl/claude-times" },
      {
        icon: { svg: rssIcon },
        link: `${siteUrl}feed.rss`,
        ariaLabel: "RSS Feed",
      },
    ],
  },

  buildEnd: async (siteConfig) => {
    const feed = new Feed({
      title: siteConfig.site.title,
      description: siteConfig.site.description,
      id: siteUrl,
      link: siteUrl,
      language: "en",
      copyright: "",
    });

    const posts = await createContentLoader("posts/*.md", {
      excerpt: true,
      render: true,
    }).load();

    posts.sort((a, b) => {
      const dateA = new Date(a.frontmatter.date || 0);
      const dateB = new Date(b.frontmatter.date || 0);
      return dateB.getTime() - dateA.getTime();
    });

    for (const post of posts) {
      const url = `${hostname}${base}${post.url.slice(1)}`;
      feed.addItem({
        title: post.frontmatter.title || "Untitled",
        id: url,
        link: url,
        description: post.frontmatter.description || post.excerpt || "",
        content: post.html || "",
        date: new Date(post.frontmatter.date || Date.now()),
      });
    }

    writeFileSync(path.join(siteConfig.outDir, "feed.rss"), feed.rss2());
  },
});
