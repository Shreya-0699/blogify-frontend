import styled from "styled-components";
import searchIcon from "../../assets/search.png";
import addCircleIcon from "../../assets/add_circle.png";
import { useEffect, useRef, useState } from "react";
import BlogMeta from "../../components/BlogMeta";
import { useCreateBlockNote } from "@blocknote/react";
import { apiInstance } from "../../api/apiInstance";
import { useNavigate, createSearchParams } from "react-router-dom";

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  gap: 5.3rem;
`;

const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: #272727;
  width: 9.5rem;
  height: 100vh;
  border-right: 0.3rem solid #6eeb83;
  padding: 1rem 1rem;
`;

const SidebarTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  img {
    height: 4rem;
    width: 4rem;
  }
`;

const SidebarBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    height: 4rem;
    width: 4rem;
  }
`;

const ProfileCircle = styled.div`
  width: 6.6rem;
  height: 6.6rem;
  border-radius: 50%;
  background: #6eeb83;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    font-family: "Lexend Deca";
    font-size: 3.2rem;
    font-style: normal;
    font-weight: 400;
    color: #000;
  }
`;

const ProfileImage = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  object-fit: cover;
`;

const Icons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  a {
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #fff;
    font-family: "Lexend Deca";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    img {
      height: 3.5rem;
      width: 3.5rem;
      cursor: pointer;
      &:hover {
        filter: brightness(0.8);
      }
    }
  }
`;

const GreenLine = styled.div`
  width: 0.3rem;
  height: 100%;
  background: #6eeb83;
`;

const MainContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-width: 90%;
  height: 100vh;
`;

const StyledInput = styled.input`
  position: fixed;
  top: 0;
  background-color: transparent;
  border: 1px solid #6eeb83;
  color: white;
  /* padding: 0.75rem 1rem; */
  border-radius: 0px;
  font-size: 1rem;
  width: 80%;
  height: 6.7rem;
  font-size: 1.8rem;
  padding-left: 3.5rem;
  padding-top: 2.2rem;
  padding-bottom: 2.5rem;
  margin-top: 5rem;
  &::placeholder {
    font-size: 1.8rem;
    /* padding-left: 2.5rem; */
    padding-top: 2.2rem;
    padding-bottom: 2.5rem;
    color: #a5a5a5;
  }

  &:focus {
    outline: none;
    border-color: #4ac26b;
    box-shadow: 0 0 0 2px rgba(110, 235, 131, 0.3);
  }
`;

const BlogContainer = styled.div`
  padding-top: 15rem;
  height: 100vh;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7rem;
  top: 20rem;
  overflow-y: auto;
  scrollbar-width: none;
`;

const InputContainer = styled.div`
  height: 20rem;
  width: 80%;
`;

export default function Blog() {
  const navigate = useNavigate();
  const [blogTextArray, setBlogTextArray] = useState([]);
  const searchInputRef = useRef(null);
  const blogT =
    '[\n  {\n    "id": "70e43fd8-af31-40a4-b7fa-c7514306621d",\n    "type": "paragraph",\n    "props": {\n      "textColor": "default",\n      "backgroundColor": "default",\n      "textAlignment": "left"\n    },\n    "content": [\n      {\n        "type": "text",\n        "text": "Welcome to this demo!",\n        "styles": {}\n      }\n    ],\n    "children": []\n  },\n  {\n    "id": "b2d3abea-8f94-462e-a7aa-c4e0ac07eadf",\n    "type": "heading",\n    "props": {\n      "textColor": "default",\n      "backgroundColor": "default",\n      "textAlignment": "left",\n      "level": 1,\n      "isToggleable": false\n    },\n    "content": [\n      {\n        "type": "text",\n        "text": "This is a sadsadsheading block",\n        "styles": {}\n      }\n    ],\n    "children": []\n  },\n  {\n    "id": "405a0cd3-de23-4e52-b938-63695253b51a",\n    "type": "paragraph",\n    "props": {\n      "textColor": "default",\n      "backgroundColor": "default",\n      "textAlignment": "left"\n    },\n    "content": [\n      {\n        "type": "text",\n        "text": "This is a paragraph block",\n        "styles": {}\n      }\n    ],\n    "children": []\n  },\n  {\n    "id": "062031a2-52b5-4a8a-8899-fb523e51e8a5",\n    "type": "paragraph",\n    "props": {\n      "textColor": "default",\n      "backgroundColor": "default",\n      "textAlignment": "left"\n    },\n    "content": [],\n    "children": []\n  }\n]';

  function extractPlainTextFromBlockNote(data) {
    return data
      .map((block) => {
        return block.content?.map((span) => span.text).join("") || "";
      })
      .join(". "); // add newlines between blocks if needed
  }

  const getAllBlogs = async () => {
    try {
      const blogs = await apiInstance.get("/blog/");
      setBlogTextArray(
        blogs.data.data.blogs.map((blog) => {
          return {
            ...blog,
            shortContent: extractPlainTextFromBlockNote(JSON.parse(blog.body)),
          };
        })
      );
      console.log(
        blogs.data.data.blogs.map((blog) => {
          return {
            ...blog,
            shortContent: extractPlainTextFromBlockNote(JSON.parse(blog.body)),
          };
        })
      );
      return blogs;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const blogContent = extractPlainTextFromBlockNote(JSON.parse(blogT));
    getAllBlogs();
    // console.log(blogContent);
    // setBlogText(blogContent);
  }, []);

  return (
    <PageContainer>
      <SideBarContainer>
        <SidebarTop>
          <ProfileCircle>
            <p>S</p>
          </ProfileCircle>
          <Icons>
            <a onClick={() => searchInputRef.current.focus()}>
              <img src={searchIcon} alt="Search" />
              Search
            </a>
          </Icons>
        </SidebarTop>
        <SidebarBottom>
          <Icons>
            <a href="/create-blog">
              <img src={addCircleIcon} alt="Add Post" />
              Create
            </a>
          </Icons>
        </SidebarBottom>
      </SideBarContainer>
      <MainContentContainer>
        <StyledInput
          type="text"
          ref={searchInputRef}
          placeholder="Search for blogs..."
          required
        />
        <BlogContainer>
          {blogTextArray.map((blogData) => (
            <BlogMeta
              redirect={() => {
                navigate({
                  pathname: "/view-blog",
                  search: `?${createSearchParams({ id: blogData._id })}`,
                });
              }}
              blogText={blogData.shortContent}
              title={blogData.title}
              username={"kevaldave"}
            />
          ))}
        </BlogContainer>
      </MainContentContainer>
    </PageContainer>
  );
}
