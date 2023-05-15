import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import parse from "html-react-parser"

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
    {
      allWpMenu {
        nodes {
          menuItems {
            nodes {
              label
              url
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
            {/* <Link to="/">{parse(title)}</Link> */}
            {nodes.map((item, index) => {
              const { label, url } = item;

              return (
                <li key={index}>
                  <Link to={url}>{label}</Link>
                </li>
              );
            })}
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
