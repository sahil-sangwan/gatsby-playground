import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import parse from "html-react-parser"

export const NavbarContainer = styled(Container)`
display: flex;
justify-content: space-between;
align-items: center;
height: 80px;
${Container};
`;

const Layout = ({ isHomePage, children }) => {
  const {
    allWpMenu: {
      nodes: {
        0: {
          menuItems: { nodes }
        }
      }
    }
  } = useStaticQuery(graphql`
    query LayoutQuery {
      allWpMenu {
        nodes {
          menuItems {
            nodes {
              label
              path
            }
          }
        }
      }
    }
  `);

  return (
    <div className="global-wrapper" data-is-root-path={isHomePage}>
      <header className="global-header">
        {isHomePage ? (
          <div className="main-heading">
            <NavbarContainer>
            {nodes.map((item, index) => {
              const { label, path } = item;
              return (
                <li key={index}>
                  <Link to={path}>{label}</Link>
                </li>
              );
            })}
            </NavbarContainer>
          </div>
        ) : (
          <Link className="header-link-home" to="/">
            {/* {title} */ "Back to Home"}
          </Link>
        )}
      </header>

      <main>{children}</main>

      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
        {` `}
        And <a href="https://wordpress.org/">WordPress</a>
      </footer>
    </div>
  )
}

export default Layout
