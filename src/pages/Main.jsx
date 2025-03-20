import React from 'react';

const Main = ({ children }) => {
  return (
    <div>

      {/* Main Content */}
      <main>
        {children} {/* This will render the content of the specific page */}
      </main>

    </div>
  );
};

export default Main;