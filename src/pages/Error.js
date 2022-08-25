import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import errorImage from '../images/404image.svg'
const Error = () => {
  return <Wrapper>
    <img src={errorImage} alt='error image' />
    <div>
      <h1>Oops!!!
      </h1>
      <h3>Page not be found</h3>
      <Link to="/" className='btn'>
        head back home
      </Link>
    </div>
  </Wrapper>;
};

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  min-height: 100vh;
  gap:5rem;
  background: var(--clr-primary-10);
  text-align: center;
  img{
    height: 50vh;
    width: 300px;
    margin-top: 50px;
  }
  h1 {
    font-size: 5rem;
  }
  h3 {
    color: var(--clr-grey-3);
    margin-bottom: 1.5rem;
  }
`;
export default Error;
