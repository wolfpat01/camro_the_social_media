import React from 'react';

import './css/App.css';
import * as Bootstrap from "react-bootstrap"
import CommunityNews from "./components/communityNews"
import MenuBar from "./components/nav-Bar";
import Cookies from "js-cookie"
let token = Cookies.get("userData")
let DarkTheme = true
function App() {
  console.log(token)
  return (
    <React.Fragment>

      <MenuBar token={token} darkTheme={DarkTheme} />
      <Bootstrap.Container>

        <Bootstrap.Row>
          <Bootstrap.Col sm="8">
            <CommunityNews token={token} darkTheme={DarkTheme} />
          </Bootstrap.Col>
        </Bootstrap.Row>

      </Bootstrap.Container>
    </React.Fragment>
  );
}

export default App;
