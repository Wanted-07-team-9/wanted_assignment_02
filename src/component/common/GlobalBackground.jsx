import React from 'react';
import tw from 'tailwind-styled-components';

const GlobalBackground = ({ children }) => {
  return <GlobalBackgroundWrapper>{children}</GlobalBackgroundWrapper>;
};

const GlobalBackgroundWrapper = tw.div`
min-w-[480px]
w-screen 
min-h-screen 
h-auto 
bg-white 
dark:bg-gray-800
`;

export default GlobalBackground;