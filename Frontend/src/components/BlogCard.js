import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const BlogCard = (props) => {
  const { id, title, description, image, date } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageSrc(image || "images/blog-1.jpg");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "50px" }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [image]);

  return (
    <div className="blog-card">
      <div className="card-image">
        <div className="image-placeholder" ref={imgRef}>
          {imageSrc ? (
            <img
              src={imageSrc}
              className={`img-fluid w-100 ${isLoaded ? "loaded" : ""}`}
              alt="blog"
              onLoad={() => setIsLoaded(true)}
              loading="lazy"
            />
          ) : (
            <div className="image-skeleton"></div>
          )}
        </div>
      </div>
      <div className="blog-content">
        <p className="date">{date}</p>
        <h5 className="title">{title?.substr(0, 50)}...</h5>
        <p
          className="desc"
          dangerouslySetInnerHTML={{
            __html: description?.substr(0, 70) + "...",
          }}
        ></p>
        <Link to={"/blog/" + id} className="blog-read-btn">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default React.memo(BlogCard);
