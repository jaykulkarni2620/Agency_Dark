import React from "react";
// ICONS
import ItemDetailsContent from "./ItemDetailsContent";
import CommentsArea from "./CommentsArea";
import CommentForm from "./CommentForm";
import NewsletterBox from "./NewsletterBox";
import BlogSidebar from "../BlogSidebar/BlogSidebar";

import avatar1 from "../../images/avatar/author-img.png";
import RelatedBlog from "./RelatedBlog";
import { Link } from "react-router-dom";
import type { BlogPost } from "./blogPosts";

interface BlogDetailsSectionProps {
  post: BlogPost;
}

const BlogDetailsSection: React.FC<BlogDetailsSectionProps> = ({ post }) => {
  const { itemDetails } = post;

  return (
    <section className="blog_details_section pt-70">
      <div className="container">

        {/* MAIN IMAGE */}
        <div className="single-item-image mb-70">
          <img src={post.heroImage} alt="" />
        </div>

        {/* HEADER META */}
        <ItemDetailsContent
          metaTag={itemDetails.metaTag}
          lastUpdate={itemDetails.lastUpdate}
          title={itemDetails.title}
          intro={itemDetails.intro}
        />

        {/* CONTENT ROW */}
        <div className="row mt-none-30 g-0 align-items-start">
          <div className="col-lg-8 mt-30">

            <div className="blog_details_content">

              {post.body}

              {/* AUTHOR BLOCK */}
              <div className="post-block-wrap mb-50">
                <div className="postabmin_block xb-border ul_li">

                  <div className="admin_image">
                    <img src={avatar1} alt="Author" />
                  </div>

                  <div className="admin_content">
                    <h4 className="admin_name">Aiden Brooks</h4>
                    <span className="admin_designation">Content Manager</span>
                    <p>A content editor plays a pivotal role in shaping and refining digital content...</p>

                    <ul className="social_icons_blocks list-unstyled ul_li">
                      <li><Link to="/blog"><i className="fab fa-facebook-f"></i></Link></li>
                      <li><Link to="/blog"><i className="fab fa-instagram"></i></Link></li>
                      <li><Link to="/blog"><i className="fab fa-linkedin-in"></i></Link></li>
                    </ul>
                  </div>

                </div>
              </div>

              {/* TAGS + SOCIAL */}
              <div className="row mt-none-30">
                <div className="col-md-6 mt-30">
                  <ul className="tags_block list-unstyled">
                    <li><Link className="xb-border" to="/blog">AI Solutions</Link></li>
                    <li><Link className="xb-border" to="/blog">Data Science</Link></li>
                    <li><Link className="xb-border" to="/blog">SaaS</Link></li>
                  </ul>
                </div>

                <div className="col-md-6 mt-30">
                  <ul className="social_icons_block list-unstyled ul_li justify-content-md-end">
                    <li><Link className="xb-border" to="/blog"><i className="fab fa-facebook-f"></i></Link></li>
                    <li><Link className="xb-border" to="/blog"><i className="fab fa-twitter"></i></Link></li>
                    <li><Link className="xb-border" to="/blog"><i className="fab fa-linkedin-in"></i></Link></li>
                    <li><Link className="xb-border" to="/blog"><i className="fab fa-instagram"></i></Link></li>
                    <li><Link className="xb-border" to="/blog"><i className="fas fa-share-alt"></i></Link></li>
                  </ul>
                </div>
              </div>

              {/* COMMENTS AREA */}
              <CommentsArea />

              {/* COMMENT FORM */}
              <CommentForm />

              {/* SUBSCRIBE BOX */}
              <NewsletterBox />
            </div>
          </div>
          <BlogSidebar />
        </div>

        <RelatedBlog/>

      </div>
    </section>
  );
};

export default BlogDetailsSection;
