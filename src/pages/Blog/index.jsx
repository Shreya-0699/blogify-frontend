import styled from "styled-components";
import searchIcon from "../../assets/search.png";
import addCircleIcon from "../../assets/add_circle.png";
import { useRef } from "react";
import BlogMeta from "../../components/BlogMeta";

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
  width: 100%;
  height: 6.7rem;
  font-size: 1.8rem;
  padding-left: 3.5rem;
  padding-top: 2.2rem;
  padding-bottom: 2.5rem;
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

const BlogContainer = styled.div``;

export default function Blog() {
  const searchInputRef = useRef(null);
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
          <BlogMeta />{" "}
        </BlogContainer>
      </MainContentContainer>
    </PageContainer>
  );
}
