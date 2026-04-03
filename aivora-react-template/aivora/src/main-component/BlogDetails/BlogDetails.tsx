import React, { Fragment, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "../../components/Header/Header";
import PageTitle from "../../components/pagetitle/PageTitle";
import BlogDetailsSection from "../../components/BlogDetails/BlogSingle";
import Scrollbar from "../../components/scrollbar/scrollbar";
import Footer from "../../components/footer/Footer";
import { fetchBlogPost } from "../../components/BlogDetails/blogResolver";
import type { BlogPost } from "../../components/BlogDetails/blogPosts";

const BlogDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    setPost(undefined);
    fetchBlogPost(slug).then((p) => {
      if (!cancelled) setPost(p);
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (post === undefined) {
    return (
      <Fragment>
        <div className="about-page inner-page">
          <div className="body_wrap o-clip">
            <Header />
            <main>
              <div className="container pt-120 pb-120">
                <p style={{ color: "var(--color-gray, #86878d)" }}>Loading article…</p>
              </div>
            </main>
            <Footer />
            <Scrollbar />
          </div>
        </div>
      </Fragment>
    );
  }

  if (!post) {
    return <Navigate to="/404" replace />;
  }

  return (
    <Fragment>
      <Helmet>
        <title>{post.itemDetails.title}</title>
        <meta name="description" content={post.metaDescription} />
      </Helmet>
      <div className='about-page inner-page'>
        <div className="body_wrap o-clip">
          <Header />
          <main>
            <PageTitle pageTitle={post.pageTitle} pagesub={post.pageSub} />
            <BlogDetailsSection post={post} />
          </main>
          <Footer />
          <Scrollbar />
        </div>
      </div>
    </Fragment>
  );
};

export default BlogDetails;
