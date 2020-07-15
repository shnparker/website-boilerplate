/**
 * PAGE SCAFFOLDING
 *
 * Adds nav/footer components to the page
 * Adds analytics to the page
 * Adds error handling display
 */

import * as Sentry from "@sentry/node";
import { Amplitude, LogOnMount } from "@amplitude/react-amplitude";
import classnames from "classnames";
import React from "react";
import PropTypes from "prop-types";
import ErrorLayout from "components/layout/ErrorLayout";
import ErrorPage from "pages/_error";
import Head from "./Head";
import Nav from "./Nav";
import Footer from "./Footer";

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  headProps: PropTypes.object.isRequired,
  pageName: PropTypes.string.isRequired,
  isInIframe: PropTypes.bool,
  error: PropTypes.object,
};

function PageLayout(props) {
  const { children, error, headProps = {}, pageName } = props;

  Sentry.addBreadcrumb({
    category: "fileLabel",
    message: `Rendering layout for page ${pageName}`,
    level: Sentry.Severity.Debug,
  });

  return (
    <Amplitude
      eventProperties={(inheritedProps) => ({
        ...inheritedProps,
        page: {
          ...inheritedProps.page,
          name: pageName,
        },
      })}
    >
      <Head {...headProps} />
      <LogOnMount eventType="page-displayed" />

      <Nav />

      <div className={classnames("page-wrapper")}>
        {error ? (
          <ErrorPage statusCode={500} isReadyToRender={true} err={error}>
            <ErrorLayout error={error} />
          </ErrorPage>
        ) : (
          <main>{children}</main>
        )}
      </div>

      <Footer />
    </Amplitude>
  );
}

export default PageLayout;
