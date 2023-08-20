import { Link } from 'react-router-dom'
import { Outlet } from "react-router-dom";




export default function Root() {
  return <>
      <nav>
          <ul>
            <li>
              <Link to={`/`}>Home</Link>
            </li>
            <li>
              <Link to={`/messages`}>Messages</Link>
            </li>
          </ul>
        </nav>
        <div id="detail">
        <Outlet />
      </div>
        

  </>;
}
