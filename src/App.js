import React from 'react';

import './css/App.css';
import * as Bootstrap from "react-bootstrap"
import CommunityTab from "./components/communityNews"
import MenuBar from "./components/nav-Bar";
import Cookies from "js-cookie"

let token = Cookies.get("userData")
let DarkTheme = true

export default function App() {
  return (
    <React.Fragment>

      <MenuBar token={token} darkTheme={DarkTheme} />
      <Bootstrap.Container>

        <Bootstrap.Row>
          <Bootstrap.Col sm="8">
            <CommunityTab token={token} darkTheme={DarkTheme} />
          </Bootstrap.Col>
        </Bootstrap.Row>

      </Bootstrap.Container>
    </React.Fragment>
  );
}

