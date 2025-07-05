import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import styled from "styled-components";
import { apiInstance } from "../../api/apiInstance";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "../../components/Snackbar";

// Your upload function: accepts only images and encodes to base64
const uploadFile = async (file) => {
  if (!file.type.startsWith("image/")) {
    throw new Error("Only image uploads are allowed.");
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result); // base64 image string
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
};

const PublishButton = styled.button`
  background-image: linear-gradient(
    to right,
    #ff6b6b 0%,
    #ffa600 51%,
    #ff6b6b 100%
  );
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 5px #ffa60080;
  font-size: 1.2rem;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  padding: 1rem 2rem;
  margin: 1rem;
  border: none;
  cursor: pointer;

  &:hover {
    background-position: right center;
    color: #fff;
    text-decoration: none;
  }

  @media screen and (min-width: 768px) {
    font-size: 1.8rem;
    padding: 1.2rem 2.5rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 2rem;
  padding: 0 2rem;
  gap: 1rem;

  @media screen and (min-width: 768px) {
    padding: 0 4rem;
  }
  @media screen and (min-width: 1024px) {
    padding: 0 6rem;
  }
  @media screen and (min-width: 1440px) {
    padding: 0 8rem;
  }
`;

const SaveAsDraftButton = styled.button`
  background-image: linear-gradient(
    to right,
    #6eeb83 0%,
    #32e0c4 51%,
    #6eeb83 100%
  );
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 5px #eee;
  font-size: 1.2rem;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  padding: 1rem 1.2rem;
  margin: 1rem;
  border: none;
  cursor: pointer;

  &:hover {
    background-position: right center;
    color: #fff;
    text-decoration: none;
  }
  @media screen and (min-width: 768px) {
    font-size: 1.5rem;
    padding: 1.2rem 2rem;
  }
`;

const CreateBlogContainer = styled.div`
  max-width: 80%;
  margin: 2rem auto;
  padding: 2rem;
  background: #1e1e1e;
  border-radius: 1rem;
  box-shadow: 0 0 1.25rem rgba(110, 235, 131, 0.2);
  color: white;

  @media (max-width: 768px) {
    max-width: 90%;
    padding: 1.5rem 1rem;
    margin: 1rem;
  }
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;
const TitleInput = styled.input`
  background-color: transparent;
  border: 1px solid #6eeb83;
  color: white;
  /* padding: 0.75rem 1rem; */
  border-radius: 0px;
  font-size: 1rem;
  width: 100%;
  height: 6.7rem;
  font-size: 1.8rem;
  padding-left: 3.5rem;
  padding-top: 2.2rem;
  padding-bottom: 2.5rem;
  margin-bottom: 2rem;
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

export default function CreateBlog() {
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  // Creates a new editor instance.
  const editor = useCreateBlockNote({
    uploadFile,
    uploadFileOptions: {
      maxFileSize: 5 * 1024 * 1024, // 5 MB
      allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
    },
  });

  console.log("ENVs", import.meta.env.VITE_BLOGIFY_SERVICE_URL);

  function extractPlainTextFromBlockNote(data) {
    return data
      .map((block) => {
        return block.content?.map((span) => span.text).join("") || "";
      })
      .join(". ")
      .substring(0, 500); // add newlines between blocks if needed
  }

  const handleSubmit = async (isPublished = false) => {
    try {
      const slug = title.replaceAll(" ", "-").toLowerCase();
      const content = editor.document;
      const description = extractPlainTextFromBlockNote(content);

      const submitBlog = await apiInstance.post("/blog/create", {
        title,
        body: content,
        slug,
        description,
        isPublished,
      });

      if (submitBlog.status !== 200) {
        setMessage("Error while saving blog");
      }

      setMessage("Blog saved successfully");
      navigate("/blog");
    } catch (error) {
      console.log(error);
      setMessage("Error while saving blog");
    }
  };

  // Renders the editor instance using a React component.
  return (
    <CreateBlogContainer>
      <Heading>Create a New Blog</Heading>
      <TitleInput
        placeholder="title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <BlockNoteView editor={editor} />
      <ButtonContainer>
        <SaveAsDraftButton
          onClick={() => {
            handleSubmit();
            // Logic to save as draft
            console.log("Saving as draft...");
          }}
        >
          Save as Draft
        </SaveAsDraftButton>
        <PublishButton
          onClick={() => {
            handleSubmit(true);
            console.log(editor.document);
            // Logic to publish the blog
            console.log("Publishing the blog...");
          }}
        >
          Publish
        </PublishButton>
      </ButtonContainer>
      <Snackbar message={message} duration={3000} position="top-right" />
    </CreateBlogContainer>
  );
}
