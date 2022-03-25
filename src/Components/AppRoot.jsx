import React from "react";

import BlockUi from "react-block-ui";
import "react-block-ui/style.css";

import ErrorBoundary from "../Error/AppComponentErrorBoundry";

export default function AppRoot({ children, loading }) {
  return (
    <div className="app-content content dashboard">
      <div className="content-wrapper">
        <div className="content-body">
          <section id="configuration">
            <ErrorBoundary>
              <BlockUi
                tag="div"
                blocking={loading}
                loader={
                  <div className="ft-refresh-cw icon-spin font-medium-2"></div>
                }
              >
                {children}
              </BlockUi>
            </ErrorBoundary>
          </section>
        </div>
      </div>
    </div>
  );
}
