import React from 'react';
import styled from 'styled-components';

import NavItem from './NavItem/NavItem';

const Nav = styled.nav`
  display: flex;
  margin-top: ${props => (props.mobile ? '-6rem' : null)};
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: ${props => (props.mobile ? 'column' : 'row')};
  align-items: center;
  height: 100%;
`;

const NavItems = ({ mobile, clicked, loggedIn }) => {
  let links;
  if (loggedIn.uid) {
    links = (
      <Ul mobile={mobile}>
        <NavItem mobile={mobile} clicked={clicked} link="/">
          Tâches
        </NavItem>
        <NavItem mobile={mobile} clicked={clicked} link="/profile">
          Profil
        </NavItem>
        <NavItem mobile={mobile} clicked={clicked} link="/logout">
          Deconnexion
        </NavItem>
      </Ul>
    );
  } else {
    links = (
      <Ul mobile={mobile}>
        <NavItem mobile={mobile} clicked={clicked} link="/login">
          Connexion
        </NavItem>
        <NavItem mobile={mobile} clicked={clicked} link="/signup">
          S'inscrire
        </NavItem>
      </Ul>
    );
  }
  return <Nav mobile={mobile}>{links}</Nav>;
};

export default NavItems;
