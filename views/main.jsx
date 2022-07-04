import SectionMessage from '@atlaskit/section-message';
import React from 'react';
import ForgeUI, { useState, Button, Macro, render } from '@forge/ui';

const App = () => {
  const [count, setCount] = useState(0);
  return (
    <Button
      text={`Count is ${count}`}
      onClick={() => {
        setCount(count + 1);
      }}
    />
  );
};

export const run = render(<Macro app={<App />} />);
// export default function HelloWorld() {
//   const [excitementLevel, setExcitementLevel] = React.useState(0);
//   return <SectionMessage
//       title={`Hello, world${excitementLevel ? new Array(excitementLevel).fill('!').join('') : '.'}`}
//       actions={[
//         {
//           key: '1',
//           href: 'https://atlassian.design/components/',
//           text: 'Browse more components to add to your app',
//         },
//         {
//           key: '2',
//           onClick: () => setExcitementLevel(excitementLevel + 1),
//           text: 'Get excited!',
//         }
//       ]}
//     >
//       <p>
//         Congratulations! You have successfully created an Atlassian Connect app using the <a href={'https://bitbucket.org/atlassian/atlassian-connect-express'}>atlassian-connect-express</a> client library.
//       </p>
//     </SectionMessage>;
// }
