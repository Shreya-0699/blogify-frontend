import React from "react";
import styled from "styled-components";

const BlogContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  width: 80%;
  gap: 1.7rem;
`;

const BlogMetaLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
`;

const BlogDate = styled.div`
  width: 7.4rem;
  height: 7.4rem;
  p {
    font-size: 3.2rem;
    font-family: "Lexend Deca";
    font-weight: 600;
    text-align: right;
  }
`;

const BlogUser = styled.div`
  margin-top: 4rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: 1.6rem;
    font-family: "Lexend Deca";
    font-weight: 300;
    transform: rotate(-90deg);
  }
`;

const BlogMetaRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1.9rem;
`;

const BlogTitle = styled.h1`
  font-family: "DM Serif Display", serif;
  font-size: 3.2rem;
  color: #6eeb83;
  font-weight: 400;
`;

const BlogText = styled.p`
  font-family: "Lexend Deca";
  font-size: 2rem;
  color: #fff;
`;

// const tempTitle = "15 Disadvantages Of Freedom And How You Can Workaround It.";

// const tempText =
//   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Luctus venenatis lectus magna fringilla urna. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus. Urna molestie at elementum eu facilisis sed odio morbi. Eget mi proin sed libero enim. Quis varius quam quisque id diam vel quam. Duis at tellus at urna condimentum mattis pellentesque. Nulla facilisi cras fermentum odio eu feugiat pretium nibh. Ut tellus elementum sagittis vitae et leo. Cursus in hac habitasse platea dictumst quisque sagittis purus. Odio facilisis mauris sit amet. Quis vel eros donec ac odio. Orci a scelerisque purus semper. Amet justo donec enim diam vulputate ut pharetra. Arcu odio ut sem nulla pharetra diam sit amet nisl. Sapien eget mi proin sed libero enim. Nunc sed blandit libero volutpat sed cras ornare arcu dui. Neque viverra justo nec ultrices dui sapien eget mi. Cras semper auctor neque vitae tempus quam pellentesque nec nam. Vitae tortor condimentum lacinia quis vel eros donec ac. Consectetur adipiscing elit pellentesque habitant morbi. Enim tortor at auctor urna nunc id cursus metus. Elit sed vulputate mi sit. Quis viverra nibh cras pulvinar mattis nunc sed. In aliquam sem fringilla ut morbi tincidunt. Orci a scelerisque purus semper. Dignissim sodales ut eu sem integer vitae justo.";

export default function BlogMeta({ username, blogText, title, redirect }) {
  console.log(title);
  return (
    <BlogContainer>
      <BlogMetaLeft>
        <BlogDate>
          <p>15 MAY</p>
        </BlogDate>
        <BlogUser>
          <p>@{username}</p>
        </BlogUser>
      </BlogMetaLeft>
      <BlogMetaRight>
        <BlogTitle onClick={redirect}>{title}</BlogTitle>
        <BlogText>{blogText}</BlogText>
      </BlogMetaRight>
    </BlogContainer>
  );
}
