import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { apiInstance } from "../../api/apiInstance";

const BlogContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6.9rem 22.8rem 6.9rem 22.8rem;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.4rem;
  h1 {
    font-size: 4.5rem;
    color: #6eeb83;
    font-family: "DM Serif Display";
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  p {
    color: #a5a5a5;
    font-family: "Lexend Deca";
    font-size: 2.25rem;
    font-style: normal;
    font-weight: 200;
    line-height: normal;
  }
`;
const Content = styled.div`
  color: #fff;
  font-family: "Lexend Deca";
  font-size: 2.2rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  &::first-letter {
    font-size: 7.2rem;
    color: #fff;
  }
`;

export default function ViewBlog() {
  const editor = useCreateBlockNote();

  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [body, setBody] = useState({});
  const [html, setHTML] = useState(null);
  const url = useLocation();

  function extractUrlParam() {
    const query = url.search;
    console.log(query);
    return new URLSearchParams(query);
  }

  const getBlogById = async () => {
    try {
      const params = extractUrlParam();
      console.log(params);
      const id = params.get("id");
      const blog = await apiInstance.get(`/blog/get-blog-by-id?id=${id}`, {
        params: {
          id,
        },
      });

      if (blog.status !== 200) {
        throw new Error(" Unable to fetch blogs ");
      }

      setTitle(blog.data.data.blogs.title);
      setAuthorName(blog.data.data.blogs.user_id);
      setBody(blog.data.data.blogs.body);

      const block = JSON.parse(blog.data.data.blogs.body);
      const convertedhtml = await editor.blocksToHTMLLossy(block);
      setHTML(convertedhtml);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getBlogById();
  }, []);

  return (
    <BlogContainer>
      <TitleContainer>
        <h1>{title}</h1>
        <p>{authorName}</p>
      </TitleContainer>
      <Content dangerouslySetInnerHTML={{ __html: html }}></Content>
    </BlogContainer>
  );
}
