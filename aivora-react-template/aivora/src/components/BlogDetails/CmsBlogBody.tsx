import React from "react";

interface CmsBlogBodyProps {
  html: string;
}

/**
 * Renders HTML saved from the admin CMS. When you move to a backend, sanitize HTML server-side
 * before storing; here content is trusted admin-only input.
 */
const CmsBlogBody: React.FC<CmsBlogBodyProps> = ({ html }) => {
  if (!html.trim()) {
    return (
      <p className="mb-35" style={{ opacity: 0.7 }}>
        No article body yet. Edit this post in Admin → Blogs and add HTML content.
      </p>
    );
  }

  return (
    <div
      className="cms-blog-html"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default CmsBlogBody;
