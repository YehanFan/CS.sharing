import React from "react";
import { Link } from "react-router-dom";
import styles from "./PostItem.module.scss";
import { sanitize } from "dompurify";
import draftToHtml from "draftjs-to-html";

import { formatRelativeDate } from "../../utils/dateUtils";

import Avatar from "react-avatar";

function PostItem({ post, username, avatar }) {
  const linkToUsername = `/${username}`;
  const linkToPost = linkToUsername + `/${post._id}`;
  const preview = post.content;
  preview.blocks = post.content.blocks.slice(0, 2);
  const sanitizedHTML = sanitize(draftToHtml(preview), {
    allowedTags: ["address", "article", "aside", "footer", "header", "h1", "h2", "h3", "h4",
    "h5", "h6", "hgroup", "main", "nav", "section", "blockquote", "dd", "div",
    "dl", "dt", "figcaption", "figure", "hr", "li", "main", "ol", "p", "pre",
    "ul", "a", "abbr", "b", "bdi", "bdo", "br", "cite", "code", "data", "dfn",
    "em", "i", "kbd", "mark", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp",
    "small", "span", "strong", "sub", "sup", "time", "u", "var", "wbr", "caption",
    "col", "colgroup", "table", "tbody", "td", "tfoot", "th", "thead", "tr"
  ]}
  );


  avatar = avatar ? avatar : post.author?.avatar?.url;

  return (
    <article className={styles.container}>
      <div className={styles.contentContainer}>
        <Link to={linkToPost} className={styles.titleLink}>
          <h2 className={styles.title}>{post.title}</h2>
        </Link>
        <Link to={linkToPost} className={styles.contentLink}>
          <p
            dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
            className={styles.contentPreview}
          ></p>
        </Link>
        <div className={styles.infoWrapper}>
          <Link to={linkToUsername}>
            <Avatar
              name={username}
              size="38"
              textSizeRatio={1.375}
              src={avatar}
              round
            />
          </Link>
          <div className={styles.infoContainer}>
            <Link to={linkToUsername} className={styles.contentLink}>
              <p className={styles.name}>{username}</p>
            </Link>
            <Link to={linkToPost} className={styles.contentLink}>
              <time dateTime={post.createdAt} className={styles.date}>
                {formatRelativeDate(post.createdAt)}
              </time>
            </Link>
          </div>
        </div>
      </div>
      {post.photo?.url ? (
        <Link to={linkToPost} className={styles.imageContainer}>
          <figure className={styles.figure}>
            <img
              className={styles.image}
              src={post.photo?.url}
              alt={post.title}
            />
          </figure>
        </Link>
      ) : (
        <div className={styles.imagePlaceholder}></div>
      )}
    </article>
  );
}

export default PostItem;
