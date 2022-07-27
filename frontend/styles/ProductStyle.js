import styled from "styled-components";

export const ProductStyle = styled.div`
  background: white;
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 1.5rem;
  cursor: pointer;
  img {
    width: 100%;
    cursor: pointer;
    object-fit: cover;
  }
  h2 {
    padding: 0.5rem 0rem;
  }
`;